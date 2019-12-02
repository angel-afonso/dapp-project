pragma solidity ^0.5.8;

contract ArrayRemovetor {
    function removeString(uint index, string[] storage array) internal returns(string[] memory) {
        array[index] = array[array.length-1];
        delete array[array.length - 1];
        array.length--;
        return array;
    }

    function removeAddress(uint index, address[] storage array) internal returns(address[] memory) {
        array[index] = array[array.length-1];
        delete array[array.length - 1];
        array.length--;
        return array;
    }

    function removeUint(uint index, uint[] storage array) internal returns(uint[] memory) {
        array[index] = array[array.length-1];
        delete array[array.length - 1];
        array.length--;
    }
}