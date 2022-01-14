import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "ethers";

import { AirdropType, SnapshotEntry } from "./snapshot";
import { readFileSync } from "fs";

export const elements = (
  airdropType: AirdropType,
  _users?: SnapshotEntry[]
): string[] => {
  const users =
    _users ??
    JSON.parse(readFileSync(`${airdropType}-snapshot.json`).toString());
  return users.map((user: SnapshotEntry) =>
    utils.solidityKeccak256(["address", "uint256"], [user.address, user.amount])
  );
};

export const generateMerkleTree = (
  airdropType: AirdropType,
  users?: SnapshotEntry[]
): MerkleTree => {
  return new MerkleTree(elements(airdropType, users), keccak256, {
    sort: true,
  });
};

export const generateMerkleProof = (
  index: number,
  airdropType: AirdropType,
  users?: SnapshotEntry[]
) => {
  const merkleTree = generateMerkleTree(airdropType, users);
  const leaf = elements(airdropType, users)[index];
  return merkleTree.getHexProof(leaf);
};
