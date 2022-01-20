import nftismBalances from "../../lib/nftism-balances.json";
import huxlxyBalances from "../../lib/huxlxy-balances.json";
import { AirdropType, BalanceEntry } from "../../lib/src/types";

export const getSnapshotEntry = (
  address: string,
  airdropType: AirdropType
): BalanceEntry => {
  const entries = (
    airdropType === AirdropType.NFTism ? nftismBalances : huxlxyBalances
  ) as Record<string, BalanceEntry>;
  return entries[address] || { amount: 0, merkleIndex: -1 };
};
