import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { EncryptedDebtRegister, EncryptedDebtRegister__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("EncryptedDebtRegister")) as EncryptedDebtRegister__factory;
  const debtRegisterContract = (await factory.deploy()) as EncryptedDebtRegister;
  const debtRegisterContractAddress = await debtRegisterContract.getAddress();

  return { debtRegisterContract, debtRegisterContractAddress };
}

describe("EncryptedDebtRegister", function () {
  let signers: Signers;
  let debtRegisterContract: EncryptedDebtRegister;
  let debtRegisterContractAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    // Check whether the tests are running against an FHEVM mock environment
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ debtRegisterContract, debtRegisterContractAddress } = await deployFixture());
  });

  it("should initialize with zero debts", async function () {
    const totalCount = await debtRegisterContract.getTotalDebtCount();
    expect(totalCount).to.eq(0);
  });

  it("should submit a new debt record", async function () {
    const debtAmount = 5000; // $5000
    const debtType = 0; // Loan

    // Encrypt owner address
    const encryptedOwner = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .addAddress(signers.alice.address)
      .encrypt();

    // Encrypt debt amount
    const encryptedAmount = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .add32(debtAmount)
      .encrypt();

    const tx = await debtRegisterContract
      .connect(signers.alice)
      .submitDebt(
        encryptedOwner.handles[0],
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        debtType
      );
    await tx.wait();

    const totalCount = await debtRegisterContract.getTotalDebtCount();
    expect(totalCount).to.eq(1);

    const userDebtCount = await debtRegisterContract.getUserDebtCount(signers.alice.address);
    expect(userDebtCount).to.eq(1);

    const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 0);
    expect(debtId).to.eq(1);

    const metadata = await debtRegisterContract.getDebtMetadata(debtId);
    expect(metadata.submitter).to.eq(signers.alice.address);
    expect(metadata.debtType).to.eq(debtType);
    expect(metadata.isActive).to.eq(true);
  });

  it("should retrieve and decrypt encrypted debt amount", async function () {
    const debtAmount = 3000; // $3000
    const debtType = 1; // CreditCard

    // Encrypt owner address
    const encryptedOwner = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .addAddress(signers.alice.address)
      .encrypt();

    // Encrypt debt amount
    const encryptedAmount = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .add32(debtAmount)
      .encrypt();

    const tx = await debtRegisterContract
      .connect(signers.alice)
      .submitDebt(
        encryptedOwner.handles[0],
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        debtType
      );
    await tx.wait();

    const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 0);
    const encryptedDebtAmount = await debtRegisterContract.getEncryptedAmount(debtId);

    // Decrypt the amount
    const clearAmount = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedDebtAmount,
      debtRegisterContractAddress,
      signers.alice,
    );

    expect(clearAmount).to.eq(debtAmount);
  });

  it("should update debt status", async function () {
    const debtAmount = 2000;
    const debtType = 2; // Borrowing

    // Encrypt owner address
    const encryptedOwner = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .addAddress(signers.alice.address)
      .encrypt();

    // Encrypt debt amount
    const encryptedAmount = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .add32(debtAmount)
      .encrypt();

    let tx = await debtRegisterContract
      .connect(signers.alice)
      .submitDebt(
        encryptedOwner.handles[0],
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        debtType
      );
    await tx.wait();

    const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 0);
    
    // Mark debt as inactive (paid/closed)
    tx = await debtRegisterContract
      .connect(signers.alice)
      .updateDebtStatus(debtId, false);
    await tx.wait();

    const metadata = await debtRegisterContract.getDebtMetadata(debtId);
    expect(metadata.isActive).to.eq(false);
  });

  it("should track debt type statistics", async function () {
    const debtAmount = 1000;

    // Submit Loan (type 0)
    const encryptedOwner1 = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .addAddress(signers.alice.address)
      .encrypt();
    const encryptedAmount1 = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.alice.address)
      .add32(debtAmount)
      .encrypt();

    await debtRegisterContract
      .connect(signers.alice)
      .submitDebt(
        encryptedOwner1.handles[0],
        encryptedAmount1.handles[0],
        encryptedAmount1.inputProof,
        0
      );

    // Submit CreditCard (type 1)
    const encryptedOwner2 = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.bob.address)
      .addAddress(signers.bob.address)
      .encrypt();
    const encryptedAmount2 = await fhevm
      .createEncryptedInput(debtRegisterContractAddress, signers.bob.address)
      .add32(debtAmount)
      .encrypt();

    await debtRegisterContract
      .connect(signers.bob)
      .submitDebt(
        encryptedOwner2.handles[0],
        encryptedAmount2.handles[0],
        encryptedAmount2.inputProof,
        1
      );

    const loanCount = await debtRegisterContract.typeCounts(0);
    const creditCardCount = await debtRegisterContract.typeCounts(1);

    expect(loanCount).to.eq(1);
    expect(creditCardCount).to.eq(1);
  });

  it("should validate debt ownership", async function () {
    const debtAmount = 3000;
    const debtType = 2; // Borrowing

    const encryptedAmount = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await debtRegisterContract.connect(signers.alice).submitDebt(
      encryptedOwner.handles[0],
      encryptedAmount.handles[0],
      encryptedAmount.inputProof,
      debtType
    );

    const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 0);
    const isValid = await debtRegisterContract.validateDebtOwnership(debtId);
    expect(isValid).to.be.true;

    // Test with wrong owner
    const isValidForBob = await debtRegisterContract.connect(signers.bob).validateDebtOwnership(debtId);
    expect(isValidForBob).to.be.false;
  });

  it("should provide user debt summary", async function () {
    // Alice submits two loans
    const encryptedAmount1 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner1 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await debtRegisterContract.connect(signers.alice).submitDebt(
      encryptedOwner1.handles[0],
      encryptedAmount1.handles[0],
      encryptedAmount1.inputProof,
      0 // Loan
    );

    const encryptedAmount2 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner2 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await debtRegisterContract.connect(signers.alice).submitDebt(
      encryptedOwner2.handles[0],
      encryptedAmount2.handles[0],
      encryptedAmount2.inputProof,
      1 // Credit Card
    );

    const [totalDebts, activeDebts, totalTypes] = await debtRegisterContract.getUserDebtSummary(signers.alice.address);
    expect(totalDebts).to.eq(2);
    expect(activeDebts).to.eq(2);
    expect(totalTypes).to.eq(2);
  });

  it("should batch update debt statuses", async function () {
    // Alice submits two debts
    const encryptedAmount1 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner1 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await debtRegisterContract.connect(signers.alice).submitDebt(
      encryptedOwner1.handles[0],
      encryptedAmount1.handles[0],
      encryptedAmount1.inputProof,
      0
    );

    const encryptedAmount2 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner2 = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await debtRegisterContract.connect(signers.alice).submitDebt(
      encryptedOwner2.handles[0],
      encryptedAmount2.handles[0],
      encryptedAmount2.inputProof,
      1
    );

    const debtId1 = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 0);
    const debtId2 = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 1);

    const ids = [debtId1, debtId2];
    const statuses = [false, false]; // Mark both as inactive

    await debtRegisterContract.connect(signers.alice).batchUpdateDebtStatus(ids, statuses);

    const [, , , isActive1] = await debtRegisterContract.getDebtMetadata(debtId1);
    const [, , , isActive2] = await debtRegisterContract.getDebtMetadata(debtId2);

    expect(isActive1).to.be.false;
    expect(isActive2).to.be.false;
  });

  it("should reject batch updates exceeding maximum size", async function () {
    const ids: number[] = [];
    const statuses: boolean[] = [];

    // Create 51 items (exceeds limit of 50)
    for (let i = 0; i < 51; i++) {
      ids.push(i + 1);
      statuses.push(false);
    }

    await expect(
      DebtRegister.connect(signers.alice).batchUpdateDebtStatus(ids, statuses)
    ).to.be.revertedWith("Too many updates");
  });

  it("should handle invalid debt types correctly", async function () {
    const debtAmount = 1000;
    const invalidDebtType = 5; // Invalid type (> 3)

    const encryptedAmount = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await expect(
      debtRegisterContract.connect(signers.alice).submitDebt(
        encryptedOwner.handles[0],
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        invalidDebtType
      )
    ).to.be.revertedWith("Invalid debt type");
  });

  it("should prevent updating non-owned debts", async function () {
    const debtAmount = 2000;
    const debtType = 1;

    const encryptedAmount = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
    const encryptedOwner = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

    await debtRegisterContract.connect(signers.alice).submitDebt(
      encryptedOwner.handles[0],
      encryptedAmount.handles[0],
      encryptedAmount.inputProof,
      debtType
    );

    const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, 0);

    // Bob tries to update Alice's debt
    await expect(
      debtRegisterContract.connect(signers.bob).updateDebtStatus(debtId, false)
    ).to.be.revertedWith("Not your debt");
  });

  it("should provide accurate user debt counts", async function () {
    // Alice submits 3 debts
    for (let i = 0; i < 3; i++) {
      const encryptedAmount = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);
      const encryptedOwner = await fhevm.createEncryptedInput(debtRegisterContractAddress, signers.alice.address);

      await debtRegisterContract.connect(signers.alice).submitDebt(
        encryptedOwner.handles[0],
        encryptedAmount.handles[0],
        encryptedAmount.inputProof,
        i % 4 // Cycle through debt types
      );
    }

    const count = await debtRegisterContract.getUserDebtCount(signers.alice.address);
    expect(count).to.eq(3);

    // Verify each debt ID exists
    for (let i = 0; i < 3; i++) {
      const debtId = await debtRegisterContract.getUserDebtIdAt(signers.alice.address, i);
      expect(debtId).to.be.gt(0);
    }
  });
});

