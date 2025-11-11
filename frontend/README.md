# Encrypted Debt Register Frontend

Frontend application for the Encrypted Household Debt Register system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Contract address after deployment
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id # From https://cloud.walletconnect.com
```

3. Generate ABI files:
```bash
npm run genabi
```

4. Run development server:
```bash
npm run dev
```

## Features

- **Submit Debt**: Encrypt and submit debt records (amount and type)
- **View Debts**: List all your encrypted debt records
- **Decrypt**: Decrypt and view debt amounts locally
- **Statistics**: View public statistics on debt types

## Wallet Integration

Uses RainbowKit for wallet connection. Supports:
- Rainbow Wallet
- MetaMask
- WalletConnect
- And other EIP-6963 compatible wallets

