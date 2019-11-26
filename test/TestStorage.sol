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
    store.add("0x0",0, new address[](0));
    Assert.equal(store.getIndexes().length, 1, "It should have 1 item.");
  }

  function testItGetFile() public {
    store.add("0x0",0, new address[](0));
    Assert.equal(store.getFile(0), '0x0', 'It should return 0x0');
  }
}