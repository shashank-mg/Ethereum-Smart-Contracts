const path = require("path");
const fs = require("fs");
const solc = require("solc");
const pathIndex = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(pathIndex, "utf8");
module.exports = solc.compile(source, 1).contracts[":Inbox"];
