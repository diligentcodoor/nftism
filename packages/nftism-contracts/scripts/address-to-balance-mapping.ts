import { generateBalances } from "../../lib/src/snapshot";
import { AirdropType } from "../../lib/src/types";

async function main() {
  generateBalances(AirdropType.NFTism);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
