import { writeFileSync } from "fs";
import balancesArray from "../../snapshot.json";

async function main() {
  const balances: Record<string, number> = {};
  for (let i = 0; i < balancesArray.length; i++) {
    const { address, amount } = balancesArray[i];
    balances[address] = amount;
    console.log("Address: ", address, "Balance: ", balances[address]);
  }
  writeFileSync("../balances.json", JSON.stringify(balances));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
