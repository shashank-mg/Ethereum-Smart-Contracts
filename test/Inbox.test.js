const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
beforeEach(async () => {
  // Get all accounts
  accounts = await web3.eth.getAccounts();

  // Deploying the contracts to local test network
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hello there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Index", () => {
  it("address of contract", () => {
    assert.ok(inbox.options.address);
  });
  it("getting the initial val of the message", async () => {
    let msg = await inbox.methods.message().call();
    assert.equal(msg, "Hello there!");
  });
  it("change the message", async () => {
    await inbox.methods.setMessage("Bye").send({ from: accounts[2] });
    let msg = await inbox.methods.message().call();
    assert.equal(msg, "Bye");
  });
});
