export interface SnapshotEntry {
  address: string;
  amount: number;
}

export interface BalanceEntry {
  amount: number;
  merkleIndex: number;
}

export enum AirdropType {
  NFTism = "nftism",
  Huxlxy = "huxlxy",
}
