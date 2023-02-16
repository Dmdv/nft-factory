import {expect} from "chai";
import {ethers} from "hardhat";

const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Contracts should be deployable", function () {
    it("Testing contract FarawayNFT", async function () {
        const FarawayNFT = await ethers.getContractFactory("FarawayNFT");

        const nft = await FarawayNFT.deploy("FarawayNFT", "FRW");
        await nft.deployed();

        console.log(`Deployed to ${nft.address}`);

        expect(await nft.name()).to.equal("FarawayNFT");
    });
    it("Testing contract Factory", async function () {
        const Factory = await ethers.getContractFactory("Factory");

        const factory = await Factory.deploy();
        await factory.deployed();

        console.log(`Deployed to ${factory.address}`);

        expect(await factory.count()).to.equal(0);
    });
});

describe("Contracts should be able to create new NFT Collection", function () {
    it("Testing contract Factory", async function () {
        const [owner] = await ethers.getSigners();
        // Checking that factory is deployed
        const Factory = await ethers.getContractFactory("Factory");
        const factory = await Factory.deploy();
        await factory.deployed();

        // Checking that no NFT collection is created
        expect(await factory.count()).to.equal(0);

        // Checking that new NFT collection is created
        const transaction = await factory.create("FarawayNFT", "FRW");
        await expect(transaction).not.to.be.reverted;

        // Checking there are events
        const receipt = await transaction.wait();
        const events = receipt.events;
        expect(events).to.not.be.undefined;
        expect(events).to.have.length(3);

        // Checking events arguments
        // Checking that TokenCreated event has 4 arguments and
        await expect(transaction).to
            .emit(factory, "TokenCreated")
            .withArgs(owner.address, anyValue, "FarawayNFT", "FRW");

        // Looking for TokenCreated event
        const tokenCreated = events?.find((event) => event.event === "TokenCreated");
        let args = tokenCreated?.args;

        // Checking that TokenCreated event has 4 arguments and NFT collection address is not zero
        let sender = args?.[0];
        let contractAddress = args?.[1];

        expect(sender).to.equal(owner.address);
        expect(contractAddress).to.not.equal(ethers.constants.AddressZero);
        expect(ethers.utils.isAddress(contractAddress)).to.be.true;

        // Checking that NFT collection is created
        expect(await factory.count()).to.equal(1);
    });
});

describe("Should be able to mint new tokens to a new collection", function () {
    it("Testing contract Factory", async function () {
        const [owner] = await ethers.getSigners();

        // Checking that factory is deployed
        const Factory = await ethers.getContractFactory("Factory");
        const factory = await Factory.deploy();
        await factory.deployed();

        // Checking that no NFT collection is created
        expect(await factory.count()).to.equal(0);

        // Checking that new NFT collection is created
        const transaction = await factory.create("FarawayNFT", "FRW");
        await expect(transaction).not.to.be.reverted;
        const receipt = await transaction.wait();
        const events = receipt.events;

        // Checking that NFT collection is created
        expect(await factory.count()).to.equal(1);

        // Looking for TokenCreated event
        const tokenCreated = events?.find((event) => event.event === "TokenCreated");
        let args = tokenCreated?.args;

        // Checking that TokenCreated event has 4 arguments and NFT collection address is not zero
        let contractAddress = args?.[1];

        let count = await factory.tokenTotalSupply(contractAddress);
        expect(count).to.equal(0);

        await factory.mint(contractAddress, owner.address, "https://example.com/1.json");

        count = await factory.tokenTotalSupply(contractAddress);
        expect(count).to.equal(1);

        const name = await factory.tokenName(contractAddress);
        const symbol = await factory.tokenSymbol(contractAddress);
        const uri = await factory.tokenUri(contractAddress, 0);

        expect(uri).to.equal("https://example.com/1.json");
        expect(name).to.equal("FarawayNFT");
        expect(symbol).to.equal("FRW");
    });
});