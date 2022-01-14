import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "ethers";

import { AirdropType, SnapshotEntry } from "../../lib/src/types";
import nftismUsers from "../../lib/nftism-snapshot.json";
import huxlxyUsers from "../../lib/huxlxy-snapshot.json";

export const elements = (airdropType: AirdropType): string[] => {
  const users = airdropType === AirdropType.NFTism ? nftismUsers : huxlxyUsers;
  return users.map((user: SnapshotEntry) =>
    utils.solidityKeccak256(["address", "uint256"], [user.address, user.amount])
  );
};

export const generateMerkleTree = (airdropType: AirdropType): MerkleTree => {
  return new MerkleTree(elements(airdropType), keccak256, {
    sort: true,
  });
};

export const generateMerkleProof = (
  index: number,
  airdropType: AirdropType
) => {
  const merkleTree = generateMerkleTree(airdropType);
  const leaf = elements(airdropType)[index];
  return merkleTree.getHexProof(leaf);
};
