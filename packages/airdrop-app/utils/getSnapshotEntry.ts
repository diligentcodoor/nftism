import _balances from "../../balances.json";

interface SnapshotEntry {
  amount: number;
  merkleIndex: number;
}

export const getSnapshotEntry = (address: string): SnapshotEntry => {
  const entries = _balances as Record<string, SnapshotEntry>;
  return entries[address] || { amount: 0, merkleIndex: -1 };
};
