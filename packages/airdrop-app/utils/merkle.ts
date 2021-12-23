import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "ethers";

import users from "../../snapshot.json";

const elements = users.map((user) =>
  utils.solidityKeccak256(["address", "uint256"], [user.address, user.amount])
);

export const generateMerkleTree = (): MerkleTree => {
  return new MerkleTree(elements, keccak256, { sort: true });
};

export const generateMerkleProof = (index: number) => {
  const merkleTree = generateMerkleTree();
  const leaf = elements[index];
  return merkleTree.getHexProof(leaf);
};
