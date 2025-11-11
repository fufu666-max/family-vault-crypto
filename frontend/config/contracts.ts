// Import generated ABI
import { EncryptedDebtRegisterABI } from "../abi/EncryptedDebtRegisterABI";

// Network configurations
export const NETWORKS = {
  sepolia: {
    name: "Sepolia Testnet",
    chainId: 11155111,
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  localhost: {
    name: "Localhost",
    chainId: 31337,
    rpcUrl: "http://localhost:8545",
    blockExplorer: null,
  },
} as const;

// Sepolia testnet deployment address
// Update this when deploying to a new network
export const CONTRACT_ADDRESS: `0x${string}` | undefined =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` | undefined) ||
  "0xf7CcdcDf8bfdf79187832777fB2Eb77a8A3cC6C7" as `0x${string}`; // Sepolia deployment

// Use generated ABI
export const CONTRACT_ABI = EncryptedDebtRegisterABI.abi;

// Contract configuration
export const CONTRACT_CONFIG = {
  maxBatchSize: 50, // Maximum number of debt updates in a single batch
  supportedDebtTypes: 4, // Number of supported debt types (0-3)
  encryptionRetries: 3, // Maximum retries for encryption operations
  defaultGasLimit: 300000, // Default gas limit for transactions
} as const;

