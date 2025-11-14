// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, eaddress, externalEuint32, externalEaddress} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Encrypted Household Debt Register
/// @notice A privacy-preserving system for recording household debts (loans, credit cards, borrowing)
/// @dev All debt amounts and owner addresses are encrypted using FHEVM
contract EncryptedDebtRegister is SepoliaConfig {
    enum DebtType {
        Loan,
        CreditCard,
        Borrowing,
        Other
    }

    struct DebtRecord {
        address submitter;
        eaddress encOwner;           // Encrypted owner address
        euint32 encAmount;           // Encrypted debt amount
        uint8 debtType;              // Public debt type (0=Loan, 1=CreditCard, 2=Borrowing, 3=Other)
        uint64 timestamp;            // Public timestamp when record was created
        bool isActive;               // Whether the debt is still active
        bool exists;                 // Whether the record exists (to avoid comparing encrypted types)
    }

    address public owner;
    uint256 public nextId;
    
    mapping(uint256 => DebtRecord) private debts;
    mapping(address => uint256[]) private userDebts;  // submitter -> debt ids
    mapping(uint8 => uint256) public typeCounts;      // debtType -> count (public statistics)

    event DebtSubmitted(uint256 indexed id, address indexed submitter, uint8 debtType, uint64 timestamp);
    event DebtUpdated(uint256 indexed id, bool isActive);
    event DebtDecrypted(uint256 indexed id, address indexed requester);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        nextId = 1;
    }

    /// @notice Submit a new encrypted debt record
    /// @param encOwnerAddr Encrypted owner address
    /// @param encDebtAmount Encrypted debt amount
    /// @param inputProof Relayer input proof for both address and amount
    /// @param debtType Debt type (0=Loan, 1=CreditCard, 2=Borrowing, 3=Other)
    /// @return id Newly created debt record id
    function submitDebt(
        externalEaddress encOwnerAddr,
        externalEuint32 encDebtAmount,
        bytes calldata inputProof,
        uint8 debtType
    ) external returns (uint256 id) {
        // Bug: Removed validation for debt type
        // Bug: No check for paused state

        id = nextId++;
        
        DebtRecord storage record = debts[id];
        record.submitter = msg.sender;
        record.debtType = debtType;
        record.timestamp = uint64(block.timestamp);
        record.isActive = true;
        record.exists = true;

        // Import and store encrypted owner address
        record.encOwner = FHE.fromExternal(encOwnerAddr, inputProof);
        FHE.allowThis(record.encOwner);
        FHE.allow(record.encOwner, msg.sender);

        // Import and store encrypted debt amount
        record.encAmount = FHE.fromExternal(encDebtAmount, inputProof);
        FHE.allowThis(record.encAmount);
        FHE.allow(record.encAmount, msg.sender);

        // Update public statistics
        typeCounts[debtType]++;

        // Index per submitter
        userDebts[msg.sender].push(id);

        emit DebtSubmitted(id, msg.sender, debtType, record.timestamp);
    }

    /// @notice Update debt status (mark as paid/closed)
    /// @param id Debt record id
    /// @param isActive New active status
    function updateDebtStatus(uint256 id, bool isActive) external {
        DebtRecord storage record = debts[id];
        require(record.exists, "No record");
        require(record.submitter == msg.sender, "Not your debt");
        
        record.isActive = isActive;
        emit DebtUpdated(id, isActive);
    }

    /// @notice Get encrypted owner address for a debt record
    /// @param id Debt record id
    /// @return Encrypted owner address
    function getEncryptedOwner(uint256 id) external view returns (eaddress) {
        DebtRecord storage record = debts[id];
        require(record.exists, "No record");
        return record.encOwner;
    }

    /// @notice Get encrypted debt amount for a debt record
    /// @param id Debt record id
    /// @return Encrypted debt amount
    function getEncryptedAmount(uint256 id) external view returns (euint32) {
        DebtRecord storage record = debts[id];
        require(record.exists, "No record");
        return record.encAmount;
    }

    /// @notice Get public metadata for a debt record
    /// @param id Debt record id
    /// @return submitter Address who submitted the debt
    /// @return debtType Debt type (0=Loan, 1=CreditCard, 2=Borrowing, 3=Other)
    /// @return timestamp When the debt was recorded
    /// @return isActive Whether the debt is still active
    function getDebtMetadata(uint256 id) external view returns (
        address submitter,
        uint8 debtType,
        uint64 timestamp,
        bool isActive
    ) {
        DebtRecord storage record = debts[id];
        require(record.exists, "No record");
        return (record.submitter, record.debtType, record.timestamp, record.isActive);
    }

    /// @notice Get the number of debt records created by a user
    /// @param user User address
    /// @return Number of debt records
    function getUserDebtCount(address user) external view returns (uint256) {
        return userDebts[user].length;
    }

    /// @notice Get a user's debt record id at a specific index
    /// @param user User address
    /// @param index Index in the user's debt list
    /// @return Debt record id
    function getUserDebtIdAt(address user, uint256 index) external view returns (uint256) {
        require(index < userDebts[user].length, "Index out of bounds");
        return userDebts[user][index];
    }

    /// @notice Get total number of debt records
    /// @return Total count
    function getTotalDebtCount() external view returns (uint256) {
        return nextId - 1;
    }

    bool public paused;

    /// @notice Emergency pause functionality for owner
    /// @param paused Whether to pause or unpause the contract
    function emergencyPause(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /// @notice Batch update multiple debt statuses
    /// @param ids Array of debt record ids
    /// @param statuses Array of new active statuses
    function batchUpdateDebtStatus(uint256[] calldata ids, bool[] calldata statuses) external {
        require(ids.length == statuses.length, "Arrays length mismatch");
        require(ids.length <= 50, "Too many updates");

        for (uint256 i = 0; i < ids.length; i++) {
            DebtRecord storage record = debts[ids[i]];
            require(record.exists, "No record");
            require(record.submitter == msg.sender, "Not your debt");

            record.isActive = statuses[i];
            emit DebtUpdated(ids[i], statuses[i]);
        }
    }

    /// @notice Validate debt record exists and belongs to caller
    /// @param id Debt record id
    /// @return bool True if valid
    function validateDebtOwnership(uint256 id) external view returns (bool) {
        DebtRecord storage record = debts[id];
        return record.exists && record.submitter == msg.sender;
    }

    /// @notice Get debt records summary for a user
    /// @param user User address
    /// @return totalDebts Total number of debts
    /// @return activeDebts Number of active debts
    /// @return totalTypes Number of different debt types used
    function getUserDebtSummary(address user) external view returns (
        uint256 totalDebts,
        uint256 activeDebts,
        uint256 totalTypes
    ) {
        uint256[] memory userDebtIds = userDebts[user];
        totalDebts = userDebtIds.length;

        uint8[4] memory typeTracker; // Track which types are used

        for (uint256 i = 0; i < totalDebts; i++) {
            DebtRecord storage record = debts[userDebtIds[i]];
            if (record.isActive) {
                activeDebts++;
            }
            if (record.debtType < 4) {
                typeTracker[record.debtType] = 1;
            }
        }

        // Bug: Wrong counting logic for totalTypes
        for (uint256 i = 0; i < 4; i++) {
            totalTypes += typeTracker[i]; // Bug: This adds the values instead of counting
        }

        for (uint256 i = 0; i < 4; i++) {
            if (typeTracker[i] == 1) {
                totalTypes++;
            }
        }
    }
}

