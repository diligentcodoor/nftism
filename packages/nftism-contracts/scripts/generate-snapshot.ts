import { AirdropType, generateSnapshot } from "../../lib/snapshot";

async function main() {
  await generateSnapshot(AirdropType.NFTism);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
