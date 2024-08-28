import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers, upgrades } from "hardhat";
import { saveContract } from "../scripts/utils";
import * as dotenv from "dotenv";
dotenv.config();

const upgrade: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts , network} = hre;
  const { deployer } = await getNamedAccounts();

//   // Fetch the address of the proxy contract
//   const boxProxy = await deployments.get("Box");

  // Get the new implementation contract
  const NewBox = await ethers.getContractFactory("Box");

  //console.log("Upgrading Box Proxy at:", boxProxy.address);

  // Upgrade the proxy to the new implementation
  const upgradedBox = await upgrades.upgradeProxy("0xb4Ce2741Ac97C9fAdBd6a19Ec0883569cFCd36bE", NewBox);

  console.log("Box Proxy upgraded. New implementation deployed at:", await upgrades.erc1967.getImplementationAddress(await upgradedBox.getAddress()));

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(await upgradedBox.getAddress());
   
  // Save the new implementation address
  await saveContract(network.name, "BoxImplementation", implementationAddress);
};

upgrade.tags = ["BoxUpgrade"];
export default upgrade;
