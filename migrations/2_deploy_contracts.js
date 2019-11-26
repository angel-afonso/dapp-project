var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Storage = artifacts.require("./Storage.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Storage);
};
