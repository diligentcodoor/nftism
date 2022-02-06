export enum Networks {
  MAINNET = 1,
  RINKEBY = 4,
  LOCAL = 31337,
}

export const ERC20_ABI = [
  "function balanceOf(address) public view returns (uint256)",
];

export const DEFAULT_NETWORK = Networks.MAINNET;
// export const DEFAULT_NETWORK = Networks.LOCAL;
// export const DEFAULT_NETWORK = Networks.RINKEBY;

export const INFURA_ID = "9aa3d95b3bc440fa88ea12eaa4456161";

export const networkConfig = {
  [Networks.MAINNET]: {
    nftismContract: "0xF8Fe4dbE106AC2a1e6C96C3Ca77B344A1b1A49e1",
    chainId: 1,
    chainName: "Ethereum Mainnet",
    uri: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    etherscan: "https://etherscan.io",
  },
  [Networks.RINKEBY]: {
    nftismContract: "0xF8Fe4dbE106AC2a1e6C96C3Ca77B344A1b1A49e1",
    chainId: 4,
    chainName: "Rinkeby Testnet",
    uri: "https://rinkeby.infura.io/v3/dd03b0b31e154af88bdd60ade7d6c6d0",
    etherscan: "https://rinkeby.etherscan.io",
  },
  [Networks.LOCAL]: {
    nftismContract: "0xF8Fe4dbE106AC2a1e6C96C3Ca77B344A1b1A49e1",
    chainId: 31337,
    chainName: "Local Testnet",
    uri: "http://localhost:8545",
    etherscan: "https://rinkeby.etherscan.io",
  },
};

export const messages = {
  please_connect:
    "Please connect your wallet to the Ethereum network to use the dashboard.",
  please_connect_wallet: "Please connect your wallet.",
  tx_successfully_send: "Your transaction was successfully sent",
  your_balance_updated: "Your balance was successfully updated",
  nothing_to_claim: "You have nothing to claim",
  something_wrong: "Something went wrong",
  switch_to_ethereum: "Switch to the Ethereum network.",
  your_balance_update_soon: "Your balance will update soon",
};
export const etherscanLink = (txnHash: string) => {
  return `${networkConfig[DEFAULT_NETWORK].etherscan}/tx/${txnHash}`;
};
