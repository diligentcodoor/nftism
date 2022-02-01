import { AirdropType } from "../../lib/src/types";

export const TWITTER_LINK = "https://twitter.com/kennyschac";
export const DISCORD_LINK = "https://discord.com/invite/3BzwMQpyqq";

export const AIRDROP_ABIS = {
  [AirdropType.NFTism]: [
    "function isClaimed(address user) public view returns (bool)",
    "function claim(address account, uint256 amount, bytes32[] calldata merkleProof) public",
  ],
  [AirdropType.Huxlxy]: [
    "function isClaimed(address user) public view returns (bool)",
    "function mint(address account, uint256 amount, bytes32[] calldata merkleProof) external",
  ],
};
