import { generateBalances } from "../../lib/src/snapshot";
import { generateMerkleTree, generateMerkleProof } from "../../lib/src/merkle";
import { AirdropType } from "../../lib/src/types";
import balances from "../../lib/huxlxy-balances.json";
import { HUXLXY_WALLET, JWALLET, KENNY_WALLET } from "../../lib/src/constants";

(async () => {
  // await generateBalances(AirdropType.Huxlxy);
  const tree = generateMerkleTree(AirdropType.Huxlxy);
  console.log(`Merkle Root: ${tree.getHexRoot()}`);
  const kennyProof = generateMerkleProof(
    balances[KENNY_WALLET].merkleIndex,
    AirdropType.Huxlxy
  );
  const huxlxyProof = generateMerkleProof(
    balances[HUXLXY_WALLET].merkleIndex,
    AirdropType.Huxlxy
  );
  const jProof = generateMerkleProof(
    balances[JWALLET].merkleIndex,
    AirdropType.Huxlxy
  );
  console.log(`Proof for Kenny: ${kennyProof}`);
  console.log(`Proof for Huxlxy: ${huxlxyProof}`);
  console.log(`Proof for J: ${jProof}`);
})();
