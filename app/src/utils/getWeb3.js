import Web3 from "web3";

export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        console.log("here");
        resolve(web3);
      } catch (error) {
        reject(error);
      }
      reject();
    });
  });