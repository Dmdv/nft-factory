import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({path:__dirname+'/.env'})

const { GOERLI_PRIVATE_KEY } = process.env
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(`Account and balance = ${account.address}: ${await account.getBalance()}`);
  }
});

task(
    "deploy",
    "Deploys NFT Factory contract",
    async () => {
  // @ts-ignore
  const Factory = await ethers.getContractFactory("Factory");
  const nft = await Factory.deploy();
  await nft.deployed();
  console.log(`Deployed FarawayNFT to ${nft.address}`);
});

const config: HardhatUserConfig = {
  etherscan: {
    apiKey: {
      goerli: `${ETHERSCAN_API_KEY}`,
    }
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    },
  },
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
