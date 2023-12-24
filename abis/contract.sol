//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract dummy {

    uint256 deposited;

    function getEarned() public pure returns (uint256 _earned) {
    _earned = 2 ether;
    }

    function getDeposited() public view returns (uint256) {
        return deposited;
    }

    function deposit(uint256 _dai, uint256 _USDC, uint _USDT) public {
        deposited += (_dai + _USDC + _USDT);
    }

    function getWalletUSDCBalance() public pure returns (uint) {
        uint amount = 44 ether;
        return amount;
    }

    function getWalletUSDTBalance() public pure returns (uint) {
        uint amount = 12 ether;
        return amount;
    }

    function getWalletDAIBalance() public pure returns (uint) {
        uint amount = 5.43 ether;
        return amount;
    }

    function getUSDCDeposited() public pure returns (uint) {
        uint amount = 5443 ether;
        return amount;
    }

    function getUSDTDeposited() public pure returns (uint) {
        uint amount = 1504 ether;
        return amount;
    }

    function getDAIDeposited() public pure returns (uint) {
        uint amount = 901 ether;
        return amount;
    }

    function getCRVUSDAmount() public pure returns (uint ) {
        uint amount = 56.43 ether;
        return amount;
    }

    function withdraw() public {
        deposited = 0;
    }

    
}