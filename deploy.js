const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const { mneumonic, api } = require("./keys");
const provider = new HDWalletProvider(mneumonic, api); //! add your mneumonic and infura api
const web3 = new Web3(provider);

const deploy = async () => {
  let accounts = await web3.eth.getAccounts();
  console.log("deploying from the account", accounts[0]);
  let inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hello World"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed at address ", inbox.options.address);
};
deploy();
