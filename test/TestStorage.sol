pragma solidity ^0.5.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Storage.sol";

contract TestStorage {
  Storage store;

  function beforeEach() public {
    store = Storage(DeployedAddresses.Storage());
  }

  function testItGetFilesCount() public {
    store.add("0x1",0, 'test file');
    Assert.equal(store.getIndexes().length, 1, "It should have 1 item.");
  }

  function testItGetFile() public {
    store.add("0x1",0, 'test file');
    (string memory hash, string memory title, uint amount) = store.getFile(0);
    Assert.equal(hash, '0x1', 'It should return 0x1');
    Assert.equal(title, 'test file', 'It should return test file');
    Assert.equal(amount, 0, 'It should return 0');
  }
}