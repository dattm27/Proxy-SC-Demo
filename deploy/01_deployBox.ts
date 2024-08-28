import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { saveContract } from "../scripts/utils";
import * as dotenv from "dotenv";
dotenv.config();

const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { ethers, upgrades, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying Box...");

  // Get the contract factory
  const Box = await ethers.getContractFactory("Box");

  // Deploy the proxy
  const box = await upgrades.deployProxy(Box, [42], {
    initializer: "initialize",
  });



  console.log("Box deployed to:", await box.getAddress());

  // Save contract details
  await saveContract(network.name, "Box", await box.getAddress());

  try {
    // Verify the implementation contract
    await hre.run("verify:verify", {
      address: await upgrades.erc1967.getImplementationAddress(await box.getAddress()),
      constructorArguments: [],
    });
  } catch (e) {
    console.log(e);
  }
};

deploy.tags = ["Box"];
export default deploy;
