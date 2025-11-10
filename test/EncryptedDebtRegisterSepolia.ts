import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { EncryptedDebtRegister } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("EncryptedDebtRegisterSepolia", function () {
  let signers: Signers;
  let debtRegisterContract: EncryptedDebtRegister;
  let debtRegisterContractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const EncryptedDebtRegisterDeployment = await deployments.get("EncryptedDebtRegister");
      debtRegisterContractAddress = EncryptedDebtRegisterDeployment.address;
      debtRegisterContract = await ethers.getContractAt("EncryptedDebtRegister", EncryptedDebtRegisterDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("should submit and decrypt a debt record", async function () {
    steps = 12;
    this.timeout(4 * 40000);

    const debtAmount = 5000;
    const debtType = 0; // Loan

    progress("Encrypting owner address...");
    const encryptedOwner = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .addAddress(signers.alice.address)
      .encrypt();

    progress("Encrypting debt amount...");
    const encryptedAmount = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .add32(debtAmount)
      .encrypt();

    progress(`Submitting debt: amount=${debtAmount}, type=${debtType}...`);
    let tx = await debtRegisterContract
      .connect(signers.alice)
      .submitDebt(
        encryptedOwner.handles[0],
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        debtType
      );
    await tx.wait();

    progress("Getting user debt count...");
    const userDebtCount = await debtRegisterContract.getUserDebtCount(signers.alice.address);
    expect(userDebtCount).to.be.gt(0);

    progress("Getting debt ID...");
    const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, userDebtCount - 1n);

    progress("Getting debt metadata...");
    const metadata = await debtRegisterContract.getDebtMetadata(debtId);
    expect(metadata.submitter).to.eq(signers.alice.address);
    expect(metadata.debtType).to.eq(debtType);

    progress("Getting encrypted debt amount...");
    const encryptedDebtAmount = await debtRegisterContract.getEncryptedAmount(debtId);
    expect(encryptedDebtAmount).to.not.eq(ethers.ZeroHash);

    progress(`Decrypting debt amount=${encryptedDebtAmount}...`);
    const clearAmount = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedDebtAmount,
      debtRegisterContractAddress,
      signers.alice,
    );
    progress(`Clear debt amount=${clearAmount}`);

    expect(clearAmount).to.eq(debtAmount);
  });
});

