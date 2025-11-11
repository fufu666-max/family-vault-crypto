"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contracts";

const DEBT_TYPE_LABELS: Record<number, { label: string; icon: string; color: string }> = {
  0: { label: "Loan", icon: "🏦", color: "#3b82f6" },
  1: { label: "Credit Card", icon: "💳", color: "#8b5cf6" },
  2: { label: "Borrowing", icon: "🤝", color: "#10b981" },
  3: { label: "Other", icon: "📝", color: "#f59e0b" },
};

export function DebtStatistics() {
  const [stats, setStats] = useState<Record<number, bigint>>({});
  const [totalCount, setTotalCount] = useState<bigint>(0n);
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    if (!CONTRACT_ADDRESS) {
      return;
    }

    setLoading(true);
    try {
      const provider = new BrowserProvider((window as any).ethereum);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI as any, provider);

      const total = await contract.getTotalDebtCount();
      setTotalCount(total);

      const typeStats: Record<number, bigint> = {};
      for (let i = 0; i <= 3; i++) {
        const count = await contract.typeCounts(i);
        typeStats[i] = count;
      }
      setStats(typeStats);
    } catch (error: any) {
      console.error("Error loading statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

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
            <span>📊</span>
            Debt Statistics
          </h2>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Public statistics on debt types (amounts remain encrypted)
          </p>
        </div>
        <button
          onClick={loadStats}
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

      <div style={{ display: "grid", gap: "24px" }}>
        <div
          style={{
            padding: "24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "8px" }}>
            Total Debt Records
          </div>
          <div style={{ fontSize: "36px", fontWeight: "700" }}>
            {Number(totalCount).toLocaleString()}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {Object.entries(DEBT_TYPE_LABELS).map(([key, info]) => {
            const count = stats[Number(key)] || 0n;
            return (
              <div
                key={key}
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
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{info.icon}</span>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                    {info.label}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: info.color,
                  }}
                >
                  {Number(count).toLocaleString()}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                  records
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

