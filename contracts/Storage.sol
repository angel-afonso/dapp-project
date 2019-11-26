pragma solidity ^0.5.8;

contract Storage {
    event StoredFile(address owner, uint index);

    struct File {
        address owner;
        string hash;
        uint amount;
        mapping(address => bool) sharedWith;
    }

    File[] private files;

    mapping(address => string[]) hashes;
    mapping(string => address[]) hashShared;
    mapping(address => uint[]) ownFiles;

    modifier canView(uint index) {
        require(files[index].sharedWith[msg.sender] || files[index].owner == msg.sender, 'You can not see the file');
        _;
    }

    function add(string memory hash, uint amount, address[] memory shareWith) public {
        hashShared[hash] = shareWith;
        uint index = files.push(File(msg.sender, hash, amount)) - 1;
        for(uint32 i; i < shareWith.length; i++){
            files[index].sharedWith[shareWith[i]] = true;
        }

        ownFiles[msg.sender].push(index);
        hashes[msg.sender].push(hash);
        emit StoredFile(msg.sender, index);
    }

    function deleteFile(uint index) public canView(index) {
        delete hashShared[files[index].hash];
        delete files[index];
        hashes[msg.sender] = removeHashes(index, hashes[msg.sender]);
        ownFiles[msg.sender] = remove(index, ownFiles[msg.sender]);
    }

    function getFile(uint index) public view canView(index) returns(string memory){
        return files[index].hash;
    }

    function getIndexes() public view returns (uint[] memory) {
        return ownFiles[msg.sender];
    }

    function removeHashes(uint index, string[] memory array) private pure returns(string[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        return array;
    }

    function remove(uint index, uint[] memory array) private pure returns(uint[] memory) {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        return array;
    }
}