pragma solidity ^0.5.8;

contract ArrayRemovetor {
    function removeString(uint index, string[] storage array) internal returns(string[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
        return array;
    }

    function removeAddress(uint index, address[] storage array) internal returns(address[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
        return array;
    }

    function removeUint(uint index, uint[] storage array) internal returns(uint[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
        return array;
    }
}