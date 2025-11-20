import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "solidity-coverage";

import "./tasks/accounts";
import "./tasks/EncryptedDebtRegister";

// Run 'npx hardhat vars setup' to see the list of variables that need to be set

const MNEMONIC: string = vars.get("MNEMONIC", "test test test test test test test test test test test junk");
const PRIVATE_KEY: string = vars.get("PRIVATE_KEY", process.env.PRIVATE_KEY || "");
const INFURA_API_KEY: string = vars.get("INFURA_API_KEY", process.env.INFURA_API_KEY || "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
      mainnet: vars.get("ETHERSCAN_API_KEY", ""),
      polygon: vars.get("POLYGONSCAN_API_KEY", ""),
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    gasPrice: 20,
    coinmarketcap: vars.get("COINMARKETCAP_API_KEY", ""),
    token: "ETH",
    showTimeSpent: true,
    showMethodSig: true,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
      fhevm: true,
    },
    anvil: {
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 31337,
      url: "http://localhost:8545",
      fhevm: true,
    },
    localhost: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
      url: "http://localhost:8545",
      fhevm: true,
    },
    },
    sepolia: {
      accounts: PRIVATE_KEY && PRIVATE_KEY.trim() !== ""
        ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`]
        : {
            mnemonic: MNEMONIC,
            path: "m/44'/60'/0'/0/",
            count: 10,
          },
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      fhevm: true,
      timeout: 60000, // 60 seconds timeout for FHE operations
      gasPrice: 20000000000, // 20 gwei
    },
    mainnet: {
      accounts: PRIVATE_KEY && PRIVATE_KEY.trim() !== ""
        ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`]
        : [],
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      fhevm: false, // FHEVM not available on mainnet yet
      timeout: 120000, // 2 minutes timeout
      gasPrice: 50000000000, // 50 gwei
    },
    polygon: {
      accounts: PRIVATE_KEY && PRIVATE_KEY.trim() !== ""
        ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`]
        : [],
      chainId: 137,
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      fhevm: false, // FHEVM not available on Polygon yet
      timeout: 60000,
      gasPrice: 500000000000, // 500 gwei
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.27",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "cancun",
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;

