"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DebtSubmit } from "./DebtSubmit";
import { DebtList } from "./DebtList";
import { DebtStatistics } from "./DebtStatistics";

export function DebtRegisterApp() {
  const [activeTab, setActiveTab] = useState<"submit" | "view" | "stats">("submit");

  const tabs = [
    { id: "submit" as const, label: "Submit Debt", icon: "➕" },
    { id: "view" as const, label: "My Debts", icon: "📋" },
    { id: "stats" as const, label: "Statistics", icon: "📊" },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "24px", width: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "48px",
            padding: "24px 32px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                fontSize: "32px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              💳
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Encrypted Debt Register
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Privacy-First Financial Management
              </p>
            </div>
          </div>
          <ConnectButton />
        </header>

        {/* Navigation Tabs */}
        <nav
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            padding: "8px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "transparent",
                color: activeTab === tab.id ? "white" : "#6b7280",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeTab === tab.id ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.color = "#374151";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#6b7280";
                }
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            minHeight: "500px",
          }}
        >
          {activeTab === "submit" && <DebtSubmit />}
          {activeTab === "view" && <DebtList />}
          {activeTab === "stats" && <DebtStatistics />}
        </main>

        {/* Footer */}
        <footer
          style={{
            marginTop: "32px",
            padding: "24px",
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: 0 }}>
            Built with 🔐 using <span style={{ color: "#667eea" }}>Zama FHEVM</span> · Privacy-First
            Debt Management
          </p>
        </footer>
      </div>
    </div>
  );
}

