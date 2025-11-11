"use client";

import { useEffect } from "react";

/**
 * Client-side error filter to suppress expected errors that don't affect functionality
 * This component filters out:
 * - Base Account SDK COOP warnings
 * - Coinbase Analytics errors (blocked by COEP)
 * - Resource preload warnings
 * - Network errors for blocked resources
 */
export function ErrorFilter() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;

    // Filter function for errors
    const filteredError = (...args: any[]) => {
      const message = args.join(" ");
      const firstArg = args[0];
      
      // Filter out Base Account SDK COOP warnings
      if (message.includes("Base Account SDK requires the Cross-Origin-Opener-Policy")) {
        return;
      }
      
      // Filter out Coinbase Analytics errors
      if (
        message.includes("cca-lite.coinbase.com") ||
        message.includes("Analytics SDK") ||
        (message.includes("Failed to fetch") && (
          message.includes("coinbase") || 
          firstArg?.message?.includes("coinbase") ||
          firstArg?.stack?.includes("coinbase")
        ))
      ) {
        return;
      }
      
      // Filter out COEP-related errors for known blocked resources
      if (
        message.includes("ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep") ||
        (typeof firstArg === "string" && firstArg.includes("ERR_BLOCKED_BY_RESPONSE") && firstArg.includes("coinbase"))
      ) {
        return;
      }
      
      // Filter out generic "Failed to fetch" errors from Coinbase Analytics
      if (
        typeof firstArg === "object" &&
        firstArg !== null &&
        "message" in firstArg &&
        typeof firstArg.message === "string" &&
        firstArg.message.includes("Failed to fetch") &&
        (message.includes("coinbase") || firstArg.message.includes("coinbase"))
      ) {
        return;
      }
      
      // Call original error if not filtered
      originalError.apply(console, args);
    };

    // Filter function for warnings
    const filteredWarn = (...args: any[]) => {
      const message = args.join(" ");
      
      // Filter out resource preload warnings
      if (
        message.includes("was preloaded using link preload but not used") ||
        message.includes("preload but not used within a few seconds") ||
        message.includes("was preloaded using link preload")
      ) {
        return;
      }
      
      // Filter out Lit dev mode warnings (harmless)
      if (message.includes("Lit is in dev mode")) {
        return;
      }
      
      // Filter out MetaMask SDK React Native warnings
      if (
        message.includes("@react-native-async-storage/async-storage") ||
        (message.includes("Module not found") && message.includes("metamask"))
      ) {
        return;
      }
      
      // Call original warn if not filtered
      originalWarn.apply(console, args);
    };

    // Override console methods
    console.error = filteredError;
    console.warn = filteredWarn;

    // Also filter window error events for network errors
    const handleError = (event: ErrorEvent) => {
      const message = event.message || "";
      const source = event.filename || "";
      
      // Filter out Coinbase Analytics network errors
      if (
        source.includes("coinbase") ||
        message.includes("coinbase") ||
        message.includes("ERR_BLOCKED_BY_RESPONSE") ||
        (message.includes("Failed to fetch") && source.includes("coinbase"))
      ) {
        event.preventDefault();
        return false;
      }
      
      return true;
    };

    // Also filter unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const reasonStr = typeof reason === "string" ? reason : reason?.message || "";
      
      // Filter out Coinbase Analytics promise rejections
      if (
        reasonStr.includes("coinbase") ||
        reasonStr.includes("Failed to fetch") ||
        reasonStr.includes("ERR_BLOCKED_BY_RESPONSE")
      ) {
        event.preventDefault();
        return false;
      }
      
      return true;
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Cleanup on unmount
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}

