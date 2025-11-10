import { ethers } from "hardhat";
import { fhevm } from "hardhat";

async function main() {
  console.log("Deploying EncryptedDebtRegister to Sepolia testnet...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    throw new Error("Account has no balance. Please fund the account with Sepolia ETH.");
  }

  // Deploy the contract
  console.log("Deploying EncryptedDebtRegister contract...");
  const EncryptedDebtRegister = await ethers.getContractFactory("EncryptedDebtRegister");
  const debtRegister = await EncryptedDebtRegister.deploy();
  
  await debtRegister.waitForDeployment();
  const contractAddress = await debtRegister.getAddress();

  console.log("\n✅ EncryptedDebtRegister deployed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Network: Sepolia (Chain ID: 11155111)");
  console.log("\nNext steps:");
  console.log("1. Update frontend/config/contracts.ts with the new address");
  console.log("2. Run 'npm run genabi' in the frontend directory");
  console.log("3. Test the deployment with: npx hardhat test --network sepolia test/EncryptedDebtRegisterSepolia.ts");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

