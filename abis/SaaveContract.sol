//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


//add loading up contract with gas

contract SAAVEFactory  {

    // Variables
    uint totalFlowed;
    mapping(address => uint) userId;
    mapping(uint => mapping(address => uint)) userBalance;
    uint userIdCounter;

    //set first auto compounding interval to 3 months from deployment date
    uint autoCompoundInterval;

    address constant DAI = 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063;
    address constant USDC = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address constant USDT = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;



    mapping(address => uint256) addressDaiDeposit;
    mapping(address => uint256) addressUSDCDeposit;
    mapping(address => uint256) addressUSDTDeposit;

    uint timeLock;

    constructor() {
        autoCompoundInterval = block.timestamp + 12 weeks;
    }

    function tokenDeposit(address _owner) internal {

    }



    //deposit function
    function deposit() public payable {
        addressDaiDeposit[msg.sender] += 100 ether;
        addressUSDCDeposit[msg.sender] += 100 ether;
        addressUSDTDeposit[msg.sender] += 100 ether;

    }

    

    //withdraw from all positions, send funds to user
    //delete user Id balance
    //return matic deposited in receiver to owner
    function withdraw() public {
        //uint _userId = userId[msg.sender];
        delete addressDaiDeposit[msg.sender];
        delete addressUSDCDeposit[msg.sender];
        delete addressUSDTDeposit[msg.sender];
    }


    //chainlink upkeep stuff

    function checkUpkeep(bytes calldata /* checkData */) external view returns (bool upkeepNeeded, bytes memory /*performData*/) {
        //check condition
        //upkeepNeeded = something
        if(block.timestamp >= autoCompoundInterval){
            upkeepNeeded = true;
        }
    }

    function performUpkeep(bytes calldata /*performData*/) external {

    }



    //frontend functions ===================================================================

    
    // CALCULATE CURVE SUPPLY ON FRONTEND <----
    // DAI and USDT return 5 decimal places
    // USDC returns 17 decimal places for some reason
    // CALCULATION:
    // 1. Get ratio of LP Tokens relative to total supply
    // 2. multiply times each token supply
    
    function getPoolDAIBalance() public view returns (uint) {
        //   $7,858,040
        uint amt = 7858040 ether;
        return amt;
    }

    function getPoolUSDCBalance() public view returns (uint) {
        //   $8,477,587
        uint amt = 8477587 ether;
        return amt;
    }

    function getPoolUSDTBalance() public view returns (uint) {
        //    $6,755,678
        uint amt = 6755678 ether;
        return amt;
    }

    //USER DEPOSIT
    function getUserDeposit() public view returns (uint256) {
        uint _daiDeposit = addressDaiDeposit[msg.sender];
        uint _USDCDeposit = addressUSDCDeposit[msg.sender];
        uint _USDTDeposit = addressUSDTDeposit[msg.sender];
        uint sum = (_daiDeposit + _USDCDeposit + _USDTDeposit);
        return sum;
    }
    //GET USER LP TOKEN AMOUNT
    function getUserLP() public view returns (uint256) {
     uint amt = 600 ether;
     return amt;
    }
    //GET TOTAL SUPPLY OF LP
    function totalLP() public view returns (uint256) {
        uint amt = 6000 ether;
        return amt;
    }

    function getDaiAllowance() public view returns (uint256) {
        return 100 ether;
    }

    function getUSDCAllowance() public view returns (uint256) {
        return 100 ether;
    }

    function getUSDTAllowance() public view returns (uint256) {
        return 100 ether;
    }


    //return the total amount in wei of CRV earned through curve gauge
    function totalCRVEarned() public view returns (uint256) {
        return 3 ether;
    }

    //chainlink pricefeed for CRV

    function getLatestPrice() public view returns (uint) {
        //$1.21
        return 121226600;
    }

    //returns the $ amount using chainlink pricefeed * CRV Earned
    function getCRVSold() public view returns (uint256) {
        return totalCRVEarned() * getLatestPrice();
    }   
}