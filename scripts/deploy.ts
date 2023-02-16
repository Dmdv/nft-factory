import { ethers } from "hardhat";

async function main() {
    const Factory = await ethers.getContractFactory("Factory");

    const factory = await Factory.deploy();
    await factory.deployed();

    console.log(`Deployed Factory to ${factory.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
