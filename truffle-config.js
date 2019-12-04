const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let mnemonic;
try {
  mnemonic = require("./config").mnemonic
} catch (error) {
  mnemonic = "";
}

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/c67459d8f70b424782fb50e9d3467c3c"),
      network_id: 3
    },
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
        }
      }
    }
  }
}