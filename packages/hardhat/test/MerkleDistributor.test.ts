import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {
  MerkleDistributor,
  MerkleDistributor__factory,
  NFTism,
  NFTism__factory,
} from "../typechain";

const ZERO_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("MerkleDistributor", function () {
  const users = [
    { address: "0xD08c8e6d78a1f64B1796d6DC3137B19665cb6F1F", amount: 100 },
    { address: "0xb7D15753D3F76e7C892B63db6b4729f700C01298", amount: 15 },
    { address: "0xf69Ca530Cd4849e3d1329FBEC06787a96a3f9A68", amount: 20 },
    { address: "0xa8532aAa27E9f7c3a96d754674c99F1E2f824800", amount: 30 },
  ];

  // equal to MerkleDistributor.sol #keccak256(abi.encodePacked(account, amount));
  const elements = users.map((user) =>
    utils.solidityKeccak256(["address", "uint256"], [user.address, user.amount])
  );

  let Distributor: MerkleDistributor__factory;
  let distributor: MerkleDistributor;
  let NFTismFactory: NFTism__factory;
  let nftism: NFTism;
  let merkleTree: MerkleTree;
  let leaf: any;
  let proof: string[];

  beforeEach("deploy token", async () => {
    NFTismFactory = await ethers.getContractFactory("NFTism");
    nftism = await NFTismFactory.deploy();
    await nftism.deployed();
    Distributor = await ethers.getContractFactory("MerkleDistributor");
  });

  describe("#token", () => {
    it("returns the token address", async () => {
      distributor = await Distributor.deploy(nftism.address, ZERO_BYTES32);
      expect(await distributor.token()).to.eq(nftism.address);
    });
  });

  describe("#merkleRoot", () => {
    it("returns the zero merkle root", async () => {
      distributor = await Distributor.deploy(nftism.address, ZERO_BYTES32);
      expect(await distributor.merkleRoot()).to.eq(ZERO_BYTES32);
    });
  });

  describe("#claim", () => {
    beforeEach("Deploy the distributor", async () => {
      merkleTree = new MerkleTree(elements, keccak256, { sort: true });
      const root = merkleTree.getHexRoot();
      leaf = elements[3];
      proof = merkleTree.getHexProof(leaf);
      distributor = await Distributor.deploy(nftism.address, root);
      await distributor.deployed();

      const ONE_MILLION = 1_000_000;
      await nftism.transfer(
        distributor.address,
        ethers.utils.parseEther(ONE_MILLION.toString())
      );
    });

    it("should claim successfully for valid proof", async () => {
      await expect(distributor.claim(users[3].address, users[3].amount, proof))
        .to.emit(distributor, "Claimed")
        .withArgs(users[3].address, users[3].amount);
    });

    it("transfers the token", async () => {
      merkleTree = new MerkleTree(elements, keccak256, { sort: true });
      leaf = elements[0];
      proof = merkleTree.getHexProof(leaf);

      expect(await nftism.balanceOf(users[0].address)).to.eq(0);
      await distributor.claim(users[0].address, 100, proof);
      expect(await nftism.balanceOf(users[0].address)).to.eq(100);
    });

    it("must have enough to transfer", async () => {
      merkleTree = new MerkleTree(elements, keccak256, { sort: true });
      const root = merkleTree.getHexRoot();
      leaf = elements[0];
      proof = merkleTree.getHexProof(leaf);
      distributor = await Distributor.deploy(nftism.address, root);
      await distributor.deployed();

      await nftism.transfer(distributor.address, 99);
      await expect(
        distributor.claim(users[0].address, 100, proof)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("sets #isClaimed", async () => {
      expect(await distributor.isClaimed(users[3].address)).to.eq(false);
      expect(await distributor.isClaimed(users[0].address)).to.eq(false);
      await distributor.claim(users[3].address, users[3].amount, proof);
      expect(await distributor.isClaimed(users[3].address)).to.eq(true);
      expect(await distributor.isClaimed(users[0].address)).to.eq(false);
    });

    it("fails for empty proof", async () => {
      distributor = await Distributor.deploy(nftism.address, ZERO_BYTES32);
      await expect(
        distributor.claim(users[0].address, users[0].amount, [])
      ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
    });

    it("should throw for invalid amount or address", async () => {
      // random amount
      await expect(
        distributor.claim(users[3].address, 10000, proof)
      ).to.be.revertedWith("MerkleDistributor: Invalid proof.");

      // random address
      await expect(
        distributor.claim(
          "0x94069d197c64D831fdB7C3222Dd512af5339bd2d",
          users[3].amount,
          proof
        )
      ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
    });

    it("should throw for invalid proof", async () => {
      // Attempt to claim and verify success
      await expect(
        distributor.claim(users[3].address, users[3].amount, [])
      ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
    });

    it("should throw for double claim", async () => {
      // Attempt to claim and verify success
      await expect(distributor.claim(users[3].address, users[3].amount, proof))
        .to.emit(distributor, "Claimed")
        .withArgs(users[3].address, users[3].amount);

      await expect(
        distributor.claim(users[3].address, users[3].amount, proof)
      ).to.be.revertedWith("MerkleDistributor: Drop already claimed.");
    });
  });
});
