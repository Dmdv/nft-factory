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

const INFURA_API_KEY = "YOUR_INFURA_API_KEY";
const GOERLI_PRIVATE_KEY = "YOUR_GOERLI_PRIVATE_KEY";
const ETHERSCAN_API_KEY = "YOUR_ETHERSCAN_API_KEY";

const config: HardhatUserConfig = {
  etherscan: {
    apiKey: {
      goerli: `${ETHERSCAN_API_KEY}`,
    }
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
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
