pragma solidity ^0.5.8;

import "./ArrayRemovetor.sol";

contract Storage is ArrayRemovetor {
    event StoredFile(address owner, uint index);

    struct File {
        address payable owner;
        string hash;
        uint amount;
        string title;
        mapping(address => bool) sharedWith;
    }

    File[] private files;

    mapping(address => string[]) private hashes;
    mapping(uint => address[]) private sharedWith;
    mapping(address => uint[]) private ownFiles;

    modifier onlyOwner(uint index) {
        require(files[index].owner == msg.sender, "You aren't the file owner");
        _;
    }

    modifier onlyShared(uint index) {
        require(files[index].sharedWith[msg.sender], 'You can not see the file');
        _;
    }

    modifier validAmount(uint index) {
        require(files[index].amount == msg.value, "Invalid amount");
        _;
    }

    function add(string memory hash, uint amount, string memory title, address[] memory shareWith) public {
        uint index = files.push(File(msg.sender, hash, amount, title)) - 1;
        for(uint32 i; i < shareWith.length; i++){
            files[index].sharedWith[shareWith[i]] = true;
        }

        ownFiles[msg.sender].push(index);
        hashes[msg.sender].push(hash);
        emit StoredFile(msg.sender, index);
    }

    function setAmount(uint index, uint amount) public onlyOwner(index) {
        files[amount].amount = amount;
    }

    function edit(string memory title, uint amount, uint index) public {
        files[index].title = title;
        files[index].amount = amount;
    }

    function getFileSharedAddresses(uint index) public view onlyOwner(index) returns(address[] memory) {
        return sharedWith[index];
    }

    function addAddressToShare(address[] memory users, uint index) public onlyOwner(index) {
        for (uint i = 0; i < users.length; i++) {
            files[index].sharedWith[users[i]] = true;
            sharedWith[index] = users;
        }
    }

    function removeAddressToShare(address[] memory users, uint index) public onlyOwner(index) {
        for (uint i = 0; i < users.length; i++) {
        delete files[index].sharedWith[users[i]];
            for (uint j = 0; j < sharedWith[index].length; j++) {
                if(sharedWith[index][j] == users[i]) {
                    sharedWith[index] = removeAddress(j, sharedWith[index]);
                    return;
                }
            }
        }
    }

    function deleteFile(uint index) public onlyOwner(index) {
        delete files[index];
        hashes[msg.sender] = removeString(index, hashes[msg.sender]);
        ownFiles[msg.sender] = removeUint(index, ownFiles[msg.sender]);
    }

    function getFile(uint index) public view onlyOwner(index) returns(string memory, string memory, uint amount){
        return (files[index].hash, files[index].title, files[index].amount);
    }

    function viewFile(uint index) public payable onlyShared(index) validAmount(index) returns (string memory, string memory, uint amount){
        files[index].owner.transfer(msg.value);
        return (files[index].hash, files[index].title, files[index].amount);
    }

    function getIndexes() public view returns (uint[] memory) {
        return ownFiles[msg.sender];
    }
}