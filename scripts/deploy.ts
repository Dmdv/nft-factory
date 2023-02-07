import { ethers } from "hardhat";

async function main() {
    const FarawayNFT = await ethers.getContractFactory("FarawayNFT");

    const nft = await FarawayNFT.deploy();
    await nft.deployed();

    console.log(`Deployed FarawayNFT to ${nft.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
