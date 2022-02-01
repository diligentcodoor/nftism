import { generateBalances, generateSnapshot } from "../../lib/src/snapshot";
import { generateMerkleTree } from "../../lib/src/merkle";
import { AirdropType } from "../../lib/src/types";

(async () => {
  await generateSnapshot(AirdropType.Huxlxy, 14119983);
  await generateBalances(AirdropType.Huxlxy);
  const tree = generateMerkleTree(AirdropType.Huxlxy);
  console.log(`Merkle Root: ${tree.getHexRoot()}`);
})();
