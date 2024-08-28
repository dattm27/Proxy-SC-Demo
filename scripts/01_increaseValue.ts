
import Web3 from "web3";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

import * as fs from "fs";


const web3 = new Web3(process.env.RPC!);
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

    const txCount = await web3.eth.getTransactionCount(user);

    const contract = new web3.eth.Contract(Box, address);

    const txData = await contract.methods
        .inc()
        .encodeABI();
    console.log(txData);

     //using ETH
    const calculateFeeData = await web3.eth.calculateFeeData()
  
    console.log(await web3.eth.getGasPrice());
     const txObj = {
        nonce: txCount,
        gas: web3.utils.toHex(1000000),
        gasPrice: await web3.eth.getGasPrice(),
        // maxPriorityFeePerGas:web3.utils.toHex (100),
    
        data: txData,
        to: address,
        from: user,
      };
  
      const signedTx = await web3.eth.accounts.signTransaction(txObj, user_pk!);
  
      const result = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction!
      );
      console.log(result);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
