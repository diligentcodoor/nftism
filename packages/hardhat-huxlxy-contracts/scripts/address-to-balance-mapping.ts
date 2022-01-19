import { generateBalances } from "../../lib/src/snapshot";
import { AirdropType } from "../../lib/src/types";

async function main() {
  generateBalances(AirdropType.Huxlxy);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
