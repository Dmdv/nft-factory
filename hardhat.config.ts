import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import {ethers} from "hardhat";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(`Account and balance = ${account.address}: ${await account.getBalance()}`);
  }
});

task("deploy", "Deploys NFT contract", async (taskArgs, hre) => {
  // @ts-ignore
  const FarawayNFT = await ethers.getContractFactory("FarawayNFT");
  const nft = await FarawayNFT.deploy();
  await nft.deployed();
  console.log(`Deployed FarawayNFT to ${nft.address}`);
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
};

export default config;
