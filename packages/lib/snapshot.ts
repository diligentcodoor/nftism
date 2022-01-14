import { ethers } from "ethers";
import { readFileSync, writeFileSync } from "fs";
import axios from "axios";
import {
  HUXLXY_WALLET,
  JWALLET,
  KENNY_WALLET,
  MUTTS_ABI,
  MUTTS_ADDRESS,
  NIFTY_GATEWAY_WALLET,
} from "./constants";

type BalanceMap = Record<string, number>;

export interface SnapshotEntry {
  address: string;
  amount: number;
}

export interface BalanceEntry {
  amount: number;
  merkleIndex: number;
}

interface NiftyGatewayResponse {
  next: string | null;
  results: NiftyGatewayResult[];
}

interface NiftyGatewayResult {
  owner: { airdropAddressEth: string };
}

export enum AirdropType {
  NFTism = "nftism",
  Huxlxy = "huxlxy",
}

async function ngHolders(balances: BalanceMap) {
  console.log("Gathering Nifty Gateway holders");
  let next: string | null =
    "https://api.niftygateway.com/v1/creators/cryptomutts/collectors/?limit=20&offset=0";
  while (next !== null) {
    try {
      const response = await axios.get(next);
      const json = response.data as NiftyGatewayResponse;
      next = json.next;
      const { results } = json;
      results.forEach((result: NiftyGatewayResult) => {
        let {
          owner: { airdropAddressEth },
        } = result;
        if (airdropAddressEth === "null" || airdropAddressEth === null) {
          airdropAddressEth = JWALLET;
        }
        airdropAddressEth = ethers.utils.getAddress(airdropAddressEth);
        balances[airdropAddressEth] = balances[airdropAddressEth] || 0;
        balances[airdropAddressEth] += 1;
        console.log(
          "Address: ",
          airdropAddressEth,
          "Balance: ",
          balances[airdropAddressEth]
        );
      });
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        console.error(e.code);
        console.error(e.response?.data);
      } else {
        console.error(e.message);
      }
      process.exit(1);
    }
  }
}

async function muttsHolders(balances: BalanceMap) {
  console.log("Gathering Mutts holders");
  const provider = new ethers.providers.InfuraProvider();
  const mutts = new ethers.Contract(MUTTS_ADDRESS, MUTTS_ABI, provider);
  const totalSupply = Number(await mutts.totalSupply());
  console.log("Total Supply: ", totalSupply);
  for (let i = 0; i < totalSupply; i++) {
    const address = await mutts.ownerOf(i);
    if (address === NIFTY_GATEWAY_WALLET) continue;
    balances[address] = balances[address] || 0;
    balances[address] += 1;
    console.log("Address: ", address, "Balance: ", balances[address]);
  }
}

const adjustBalances = (balances: BalanceMap): void => {
  balances[KENNY_WALLET] = 150;
  balances[HUXLXY_WALLET] = 850;
  const tokensAirdropped = Object.values(balances).reduce(
    (acc, balance) => acc + balance,
    0
  );
  balances["0x74f22345c476B22F4bbD926889ed2ab2284bDaa9"] +=
    10000 - tokensAirdropped;
};

export const generateSnapshot = async (
  airdropType: AirdropType
): Promise<void> => {
  const balances: BalanceMap = {};
  console.log("Generating Snapshot");
  await ngHolders(balances);
  await muttsHolders(balances);
  if (airdropType === AirdropType.Huxlxy) {
    adjustBalances(balances);
  }
  const snapshot: SnapshotEntry[] = Object.keys(balances).map((address) => ({
    address,
    amount: balances[address],
  }));

  const tokensAirdropped = snapshot.reduce((acc, curr) => acc + curr.amount, 0);
  console.log("Total Tokens being airdropped:", tokensAirdropped);
  writeFileSync(
    `${airdropType}-snapshot.json`,
    JSON.stringify(snapshot, null, 2)
  );
  console.log("Snapshot generated");
};

export const generateBalances = (airdropType: AirdropType): void => {
  const balances: Record<string, BalanceEntry> = {};
  const snapshot: SnapshotEntry[] = JSON.parse(
    readFileSync(`${airdropType}-snapshot.json`).toString()
  );
  for (let i = 0; i < snapshot.length; i++) {
    const { address, amount } = snapshot[i];
    balances[address] = { amount, merkleIndex: i };
    console.log("Address: ", address, "Balance: ", balances[address]);
  }
  writeFileSync(`${airdropType}-balances.json`, JSON.stringify(balances));
};
