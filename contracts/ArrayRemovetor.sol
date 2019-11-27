pragma solidity ^0.5.8;

contract ArrayRemovetor {
    function removeString(uint index, string[] memory array) internal pure returns(string[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        return array;
    }

    function removeAddress(uint index, address[] memory array) internal pure returns(address[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        return array;
    }

    function removeUint(uint index, uint[] memory array) internal pure returns(uint[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        return array;
    }
}