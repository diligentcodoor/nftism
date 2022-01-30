import { expect } from "chai";
import { ethers } from "hardhat";
import { generateMerkleTree } from "../../lib/src/merkle";
import { AirdropType } from "../../lib/src/types";
import { HuxlxyNFT, HuxlxyNFT__factory } from "../typechain";

describe("HuxlxyNFT", function () {
  let HuxlxyNFTFactory: HuxlxyNFT__factory;
  let huxlxy: HuxlxyNFT;

  it("Should deploy", async function () {
    HuxlxyNFTFactory = await ethers.getContractFactory("HuxlxyNFT");
    huxlxy = await HuxlxyNFTFactory.deploy(
      generateMerkleTree(AirdropType.Huxlxy).getHexRoot()
    );
    await huxlxy.deployed();
  });
});
