const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    }
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