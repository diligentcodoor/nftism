export const TWITTER_LINK = "";
export const TELEGRAM_LINK = "";
export const AIRDROP_ADDRESS = "0xe8D2A1E88c91DCd5433208d4152Cc4F399a7e91d";

export const AIRDROP_ABI = [
  "function isClaimed(address user) public view returns (bool)",
  "function claim(address account, uint256 amount, bytes32[] calldata merkleProof) public",
];
