import { ethers } from "hardhat";

async function main() {
    const FarawayNFT = await ethers.getContractFactory("FarawayNFT");
    const nft = await FarawayNFT.deploy();

    await nft.deployed();

    console.log(`Deployed FarawayNFT to ${nft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
