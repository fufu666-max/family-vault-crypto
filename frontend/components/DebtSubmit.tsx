"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { BrowserProvider, Contract } from "ethers";
import { useFhevm } from "../fhevm/useFhevm";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contracts";

const DEBT_TYPES = [
  { value: 0, label: "Loan", icon: "🏦" },
  { value: 1, label: "Credit Card", icon: "💳" },
  { value: 2, label: "Borrowing", icon: "🤝" },
  { value: 3, label: "Other", icon: "📝" },
];

export function DebtSubmit() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  // Use window.ethereum for FHEVM (it needs EIP1193 provider)
  const { instance, status: fhevmStatus, error: fhevmError } = useFhevm({
    provider: typeof window !== "undefined" ? (window as any).ethereum : undefined,
    chainId: walletClient?.chain?.id,
    enabled: !!walletClient && typeof window !== "undefined",
    initialMockChains: { 31337: "http://localhost:8545" },
  });

  const [amount, setAmount] = useState("");
  const [debtType, setDebtType] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!address) {
      setStatus("Please connect your wallet");
      return;
    }

    if (!instance || fhevmStatus !== "ready") {
      setStatus("Encryption system not ready. Please wait...");
      return;
    }

    const contractAddress = CONTRACT_ADDRESS;
    if (!contractAddress) {
      setStatus("Contract not deployed. Please deploy the contract first.");
      return;
    }

    const amountNum = parseInt(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setStatus("Please enter a valid debt amount");
      return;
    }

    try {
      setStatus("Encrypting data...");

      // Let the browser repaint before running encryption (CPU-intensive)
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Encrypt owner address and debt amount with retry logic
      const buffer = instance.createEncryptedInput(contractAddress, address);
      buffer.addAddress(address);
      buffer.add32(amountNum);
      
      // Retry logic for FHE encryption (relayer may be temporarily unavailable)
      let encrypted;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          setStatus(`Encrypting data (attempt ${retryCount + 1}/${maxRetries})...`);
          encrypted = await buffer.encrypt();
          console.log("FHE encryption successful");
          break;
        } catch (encryptError: any) {
          retryCount++;
          const errorMsg = encryptError?.message || String(encryptError);
          console.warn(`FHE encryption attempt ${retryCount} failed:`, errorMsg);
          
          if (retryCount >= maxRetries) {
            // Provide more helpful error message
            if (errorMsg.includes("Relayer") || errorMsg.includes("Bad JSON")) {
              throw new Error(
                `Encryption failed: Unable to connect to FHEVM Relayer service. ` +
                `This may be due to network issues or the relayer being temporarily unavailable. ` +
                `Please check your internet connection and try again in a few moments.`
              );
            }
            throw new Error(`Encryption failed after ${maxRetries} attempts: ${errorMsg}`);
          }
          
          // Exponential backoff: 2s, 4s, 8s
          const waitTime = Math.pow(2, retryCount) * 1000;
          setStatus(`Encryption failed, retrying in ${waitTime / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
      
      if (!encrypted) {
        throw new Error("Encryption failed: No encrypted data generated");
      }

      setStatus("Submitting transaction...");

      // Validate encrypted handles
      if (!encrypted.handles || encrypted.handles.length < 2) {
        throw new Error("Invalid encrypted data: Missing required handles");
      }
      if (!encrypted.inputProof) {
        throw new Error("Invalid encrypted data: Missing input proof");
      }

      // Prepare contract interaction
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, CONTRACT_ABI as any, signer);

      const tx = await contract.submitDebt(
        encrypted.handles[0], // encrypted owner address
        encrypted.handles[1], // encrypted amount
        encrypted.inputProof,
        debtType
      );

      setStatus(`Transaction submitted: ${tx.hash}. Waiting for confirmation...`);
      await tx.wait();
      setStatus("✅ Debt record submitted successfully!");
      setAmount("");
    } catch (error: any) {
      setStatus(`Error: ${error.message || "Transaction failed"}`);
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "32px",
          paddingBottom: "24px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span>➕</span>
          Submit New Debt Record
        </h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
          Record your debt amount and type. All data is encrypted before being stored on-chain.
        </p>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: "24px", maxWidth: "600px" }}>
        <label style={{ display: "grid", gap: "8px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>💰</span>
            Debt Amount (USD)
            <span style={{ color: "#ef4444", fontSize: "16px" }}>*</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter debt amount (e.g., 5000)"
            min="1"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "#f9fafb",
              color: "#111827",
              fontSize: "15px",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </label>

        <label style={{ display: "grid", gap: "8px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>📋</span>
            Debt Type
            <span style={{ color: "#ef4444", fontSize: "16px" }}>*</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {DEBT_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setDebtType(type.value)}
                style={{
                  padding: "16px",
                  border: debtType === type.value ? "2px solid #667eea" : "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: debtType === type.value ? "#eef2ff" : "white",
                  color: "#111827",
                  fontSize: "14px",
                  fontWeight: debtType === type.value ? "600" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </label>

        <button
          type="submit"
          disabled={!mounted || !address || fhevmStatus !== "ready" || status.includes("Submitting") || status.includes("Transaction")}
          style={{
            padding: "14px 24px",
            background:
              !mounted || !address || fhevmStatus !== "ready"
                ? "#d1d5db"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: !mounted || !address || fhevmStatus !== "ready" ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {!mounted
            ? "Loading..."
            : !address
              ? "Connect Wallet"
              : fhevmStatus === "error"
                ? "Encryption Error - Relayer Unavailable"
              : fhevmStatus !== "ready"
                ? "Initializing Encryption..."
                : status.includes("Submitting") || status.includes("Transaction")
                  ? "Processing..."
                  : "Submit Debt Record"}
        </button>

        {fhevmStatus === "error" && fhevmError && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "#fee2e2",
              color: "#991b1b",
              fontSize: "14px",
              marginTop: "16px",
            }}
          >
            ⚠️ Encryption System Error: {fhevmError.message || "The FHEVM relayer is currently unavailable. Please try again later or check your network connection."}
          </div>
        )}

        {status && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: status.includes("✅")
                ? "#d1fae5"
                : status.includes("Error")
                  ? "#fee2e2"
                  : "#dbeafe",
              color: status.includes("✅")
                ? "#065f46"
                : status.includes("Error")
                  ? "#991b1b"
                  : "#1e40af",
              fontSize: "14px",
            }}
          >
            {status}
          </div>
        )}
      </form>
    </div>
  );
}

