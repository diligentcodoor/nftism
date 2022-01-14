import _balances from "../../lib/nftism-balances.json";
import { BalanceEntry } from "../../lib/src/types";

export const getSnapshotEntry = (address: string): BalanceEntry => {
  const entries = _balances as Record<string, BalanceEntry>;
  return entries[address] || { amount: 0, merkleIndex: -1 };
};
