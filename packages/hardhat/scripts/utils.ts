import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "ethers";

import users from "../../snapshot.json";

export const generateMerkleTree = (): MerkleTree => {
  const elements = users.map((user) =>
    utils.solidityKeccak256(["address", "uint256"], [user.address, user.amount])
  );
  return new MerkleTree(elements, keccak256, { sort: true });
};
