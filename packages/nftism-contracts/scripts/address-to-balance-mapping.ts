import { AirdropType, generateBalances } from "../../lib/snapshot";

async function main() {
  generateBalances(AirdropType.NFTism);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
