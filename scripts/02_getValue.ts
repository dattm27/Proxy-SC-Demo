
import Web3 from "web3";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

import * as fs from "fs";


const web3 = new Web3(process.env.RPC!);
console.log(process.env.RPC);
const user_pk = process.env.PK;

const user = web3.eth.accounts.privateKeyToAccount(user_pk!).address;

async function main() {
    const address = process.env.SC_ADDRESS;

    const Box = JSON.parse(
        fs.readFileSync(
            "./artifacts/contracts/Box.sol/Box.json",
            "utf-8"
        )
    ).abi;

    //   const txCount = await web3.eth.getTransactionCount(user);

    const contract = new web3.eth.Contract(Box, address);


    const txData = await contract.methods
        .val()
        .call();
    console.log(txData);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
