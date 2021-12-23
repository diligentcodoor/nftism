import { ethers } from "hardhat";
import { writeFileSync } from "fs";

const MUTTS_ADDRESS = "0x25C65721E26fa5F3c97f129F4e24972482327BC9";
const SNAPSHOT_BLOCKNUMBER = 13856344;
const MUTTS_ABI = [
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
];

interface SnapshotEntry {
  address: string;
  amount: number;
}

async function main() {
  const provider = new ethers.providers.InfuraProvider();
  const mutts = new ethers.Contract(MUTTS_ADDRESS, MUTTS_ABI, provider);
  const totalSupply = Number(await mutts.totalSupply());
  console.log("Total Supply: ", totalSupply);
  const balances: Record<string, number> = {};
  for (let i = 0; i < totalSupply; i++) {
    const address = await mutts.ownerOf(i);
    balances[address] = balances[address] || 0;
    balances[address] += 1;
    console.log("Address: ", address, "Balance: ", balances[address]);
  }
  const balancesArray: SnapshotEntry[] = [];

  for (const [address, balance] of Object.entries(balances)) {
    balancesArray.push({ address, amount: balance * 100 });
  }

  const file = writeFileSync("../snapshot.json", JSON.stringify(balancesArray));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
