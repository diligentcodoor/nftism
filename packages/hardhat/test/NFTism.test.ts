/* eslint-disable camelcase */
import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTism, NFTism__factory } from "../typechain";

describe("NFTism", function () {
  let NFTismFactory: NFTism__factory;
  let nftism: NFTism;

  before(async () => {
    NFTismFactory = await ethers.getContractFactory("NFTism");
    nftism = await NFTismFactory.deploy();
    await nftism.deployed();
  });

  it("Should have the right name and symbol", async function () {
    expect(await nftism.name()).to.equal("NFTism");
    expect(await nftism.symbol()).to.equal("NFTism");
  });

  it("Should have 10 million initial supply", async function () {
    const TEN_MILLION = 10_000_000;
    expect(await nftism.totalSupply()).to.equal(
      ethers.utils.parseEther(TEN_MILLION.toString())
    );
  });
});
