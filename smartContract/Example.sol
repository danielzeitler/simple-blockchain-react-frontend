// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract example {
    string private name = "";
    uint256 num1 = 3;
    uint256 num2 = 3;
    int[] public numbers;

    constructor(string memory _name) {
        name = _name;
    }

    function addNumbers() public {
        numbers.push(1);
        numbers.push(2);

        int[] memory myArray = numbers;
        myArray[0] = 0;
    }


    // View example 
    function calculareView() public view returns(uint256) {
        return num1 + num2;
    }

    // Pure example 
    function calculatePure() external pure returns(uint256) {
        uint num3 = 3;
        uint num4 = 3;
        return num3 + num4;
    }

    function calculate() public view returns(uint) {
        return this.calculatePure();
    }
    
    function getName() public view returns(string memory) {
        return name;
    }
}