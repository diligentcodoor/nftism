import { writeFileSync } from "fs";
import balancesArray from "../../snapshot.json";
interface SnapshotEntry {
  amount: number;
  merkleIndex: number;
}

async function main() {
  const balances: Record<string, SnapshotEntry> = {};
  for (let i = 0; i < balancesArray.length; i++) {
    const { address, amount } = balancesArray[i];
    balances[address] = { amount, merkleIndex: i };
    console.log("Address: ", address, "Balance: ", balances[address]);
  }
  writeFileSync("../balances.json", JSON.stringify(balances));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
