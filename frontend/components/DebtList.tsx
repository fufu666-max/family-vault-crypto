"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { BrowserProvider, Contract } from "ethers";
import { useFhevm } from "../fhevm/useFhevm";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contracts";

const DEBT_TYPE_LABELS: Record<number, { label: string; icon: string }> = {
  0: { label: "Loan", icon: "🏦" },
  1: { label: "Credit Card", icon: "💳" },
  2: { label: "Borrowing", icon: "🤝" },
  3: { label: "Other", icon: "📝" },
};

interface DebtRecord {
  id: bigint;
  submitter: string;
  debtType: number;
  timestamp: bigint;
  isActive: boolean;
  decryptedAmount?: bigint;
  isDecrypting?: boolean;
}

export function DebtList() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  // Use window.ethereum for FHEVM (it needs EIP1193 provider)
  const { instance, status: fhevmStatus } = useFhevm({
    provider: typeof window !== "undefined" ? (window as any).ethereum : undefined,
    chainId: walletClient?.chain?.id,
    enabled: !!walletClient && typeof window !== "undefined",
    initialMockChains: { 31337: "http://localhost:8545" },
  });

  const [debts, setDebts] = useState<DebtRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [filterType, setFilterType] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"timestamp" | "amount">("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

  const loadDebts = async () => {
    if (!address || !CONTRACT_ADDRESS) {
      setStatus("Please connect wallet and ensure contract is deployed");
      return;
    }

    setLoading(true);
    setStatus("Loading your debt records...");

    try {
      const provider = new BrowserProvider((window as any).ethereum);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI as any, provider);

      const count = await contract.getUserDebtCount(address);
      const debtList: DebtRecord[] = [];

      for (let i = 0; i < Number(count); i++) {
        const debtId = await contract.getUserDebtIdAt(address, i);
        const metadata = await contract.getDebtMetadata(debtId);

        debtList.push({
          id: debtId,
          submitter: metadata.submitter,
          debtType: metadata.debtType,
          timestamp: metadata.timestamp,
          isActive: metadata.isActive,
        });
      }

      setDebts(debtList);
      setStatus(`Found ${debtList.length} debt record(s)`);
    } catch (error: any) {
      setStatus(`Error loading debts: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const decryptDebt = async (debtId: bigint) => {
    if (!instance || fhevmStatus !== "ready" || !address || !CONTRACT_ADDRESS || !walletClient) {
      setStatus("Encryption system not ready");
      return;
    }

    setDebts((prev) =>
      prev.map((d) => (d.id === debtId ? { ...d, isDecrypting: true } : d))
    );

    try {
      const provider = new BrowserProvider((window as any).ethereum);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI as any, provider);

      const encryptedAmount = await contract.getEncryptedAmount(debtId);

      // Check if handle is zero (uninitialized)
      const zeroHandle = "0x0000000000000000000000000000000000000000000000000000000000000000";
      if (encryptedAmount === zeroHandle || encryptedAmount === "0x0") {
        setDebts((prev) =>
          prev.map((d) => (d.id === debtId ? { ...d, decryptedAmount: 0n, isDecrypting: false } : d))
        );
        return;
      }

      // Generate keypair for decryption
      const keypair = instance.generateKeypair();
      const handleContractPairs = [
        {
          handle: encryptedAmount,
          contractAddress: CONTRACT_ADDRESS,
        },
      ];

      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = "10";
      const contractAddresses = [CONTRACT_ADDRESS];

      // Create EIP712 signature
      const eip712 = instance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays
      );

      // Sign typed data using wallet client
      const signature = await walletClient.signTypedData({
        account: address as `0x${string}`,
        domain: eip712.domain as any,
        types: {
          UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification,
        },
        primaryType: "UserDecryptRequestVerification",
        message: eip712.message as any,
      });

      // Decrypt using FHEVM
      const result = await instance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace("0x", ""),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays
      );

      const amountValue = result[encryptedAmount];
      const amount: bigint = typeof amountValue === 'bigint' 
        ? amountValue 
        : typeof amountValue === 'string' 
          ? BigInt(amountValue) 
          : BigInt(0);

      setDebts((prev) =>
        prev.map((d) =>
          d.id === debtId ? { ...d, decryptedAmount: amount, isDecrypting: false } : d
        )
      );
    } catch (error: any) {
      setStatus(`Error decrypting: ${error.message}`);
      setDebts((prev) =>
        prev.map((d) => (d.id === debtId ? { ...d, isDecrypting: false } : d))
      );
      console.error(error);
    }
  };

  useEffect(() => {
    if (address) {
      loadDebts();
    }
  }, [address]);

  return (
    <div>
      <div
        style={{
          marginBottom: "32px",
          paddingBottom: "24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
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
            <span>📋</span>
            My Debt Records
          </h2>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            View and decrypt your encrypted debt records
          </p>
        </div>
        <button
          onClick={loadDebts}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {status && (
        <div
          style={{
            marginBottom: "24px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: status.includes("Error") ? "#fee2e2" : "#dbeafe",
            color: status.includes("Error") ? "#991b1b" : "#1e40af",
            fontSize: "14px",
          }}
        >
          {status}
        </div>
      )}

      {/* Filters */}
      {debts.length > 0 && (
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            background: "white",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value === "all" ? "all" : parseInt(e.target.value))}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                background: "white",
              }}
            >
              <option value="all">All Types</option>
              {Object.entries(DEBT_TYPE_LABELS).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                background: "white",
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "timestamp" | "amount")}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                background: "white",
              }}
            >
              <option value="timestamp">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
              Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                background: "white",
              }}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      )}

      {debts.length === 0 ? (
        <div
          style={{
            padding: "48px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          <p style={{ fontSize: "18px", margin: "0 0 8px" }}>No debt records found</p>
          <p style={{ fontSize: "14px", margin: 0 }}>
            Submit a debt record to get started
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {(() => {
            const filteredDebts = debts
              .filter((debt) => {
                if (filterType !== "all" && debt.debtType !== filterType) return false;
                if (filterStatus === "active" && !debt.isActive) return false;
                if (filterStatus === "inactive" && debt.isActive) return false;
                return true;
              })
              .sort((a, b) => {
                if (sortBy === "timestamp") {
                  const aTime = Number(a.timestamp);
                  const bTime = Number(b.timestamp);
                  return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
                } else {
                  const aAmount = a.decryptedAmount ? Number(a.decryptedAmount) : 0;
                  const bAmount = b.decryptedAmount ? Number(b.decryptedAmount) : 0;
                  return sortOrder === "desc" ? bAmount - aAmount : aAmount - bAmount;
                }
              });

            const totalPages = Math.ceil(filteredDebts.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedDebts = filteredDebts.slice(startIndex, startIndex + itemsPerPage);

            return paginatedDebts;
            .map((debt) => {
            const typeInfo = DEBT_TYPE_LABELS[debt.debtType] || {
              label: "Unknown",
              icon: "❓",
            };
            const date = new Date(Number(debt.timestamp) * 1000).toLocaleString();

            return (
              <div
                key={debt.id.toString()}
                style={{
                  padding: "20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  background: "white",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{typeInfo.icon}</span>
                      <span style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                        {typeInfo.label}
                      </span>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                          background: debt.isActive ? "#d1fae5" : "#fee2e2",
                          color: debt.isActive ? "#065f46" : "#991b1b",
                        }}
                      >
                        {debt.isActive ? "Active" : "Closed"}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                      Recorded: {date}
                    </p>
                  </div>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                    ID: {debt.id.toString()}
                  </span>
                </div>

                {debt.decryptedAmount !== undefined ? (
                  <div
                    style={{
                      padding: "16px",
                      background: "#f0f9ff",
                      borderRadius: "8px",
                      border: "1px solid #bae6fd",
                    }}
                  >
                    <div style={{ fontSize: "12px", color: "#0369a1", marginBottom: "4px" }}>
                      Decrypted Amount
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#0c4a6e",
                      }}
                    >
                      ${Number(debt.decryptedAmount).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => decryptDebt(debt.id)}
                    disabled={!instance || fhevmStatus !== "ready" || debt.isDecrypting}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background:
                        !instance || fhevmStatus !== "ready"
                          ? "#d1d5db"
                          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor:
                        !instance || fhevmStatus !== "ready" ? "not-allowed" : "pointer",
                      opacity: debt.isDecrypting ? 0.6 : 1,
                    }}
                  >
                    {debt.isDecrypting
                      ? "Decrypting..."
                      : !instance || fhevmStatus !== "ready"
                        ? "Encryption Not Ready"
                        : "🔓 Decrypt Amount"}
                  </button>
                )}
              </div>
            );
          })()}

          {/* Pagination */}
          {(() => {
            const filteredDebts = debts
              .filter((debt) => {
                if (filterType !== "all" && debt.debtType !== filterType) return false;
                if (filterStatus === "active" && !debt.isActive) return false;
                if (filterStatus === "inactive" && debt.isActive) return false;
                return true;
              });

            const totalPages = Math.ceil(filteredDebts.length / itemsPerPage);

            if (totalPages <= 1) return null;

            return (
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    background: currentPage === 1 ? "#f3f4f6" : "white",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: "14px",
                  }}
                >
                  Previous
                </button>

                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    background: currentPage === totalPages ? "#f3f4f6" : "white",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: "14px",
                  }}
                >
                  Next
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

