import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";

export enum Networks {
  MAINNET = 1,
  RINKEBY = 4,
  LOCAL = 31337,
}

// export const DEFAULT_NETWORK = Networks.MAINNET;
// export const DEFAULT_NETWORK = Networks.LOCAL;
export const DEFAULT_NETWORK = Networks.RINKEBY;

export const networkConfig = {
  [Networks.MAINNET]: {
    airdropContract: "",
    uri: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    etherscan: "https://etherscan.io/tx",
  },
  [Networks.RINKEBY]: {
    airdropContract: "0x155a2B5da8aB175662F64c8cb54e8b0b19a796E6",
    uri: "https://rinkeby.infura.io/v3/dd03b0b31e154af88bdd60ade7d6c6d0",
    etherscan: "https://rinkeby.etherscan.io/tx",
  },
  [Networks.LOCAL]: {
    airdropContract: "0x155a2B5da8aB175662F64c8cb54e8b0b19a796E6",
    uri: "http://localhost:8545",
    etherscan: "https://rinkeby.etherscan.io/tx",
  },
};

export const etherscanLink = (txnHash: string) => {
  return `${networkConfig[DEFAULT_NETWORK].etherscan}/${txnHash}`;
};

export const getGasPrice = async (provider: Provider) => {
  const GAS = "5";
  const gasPrice = await provider.getGasPrice();
  const convertGas = ethers.utils.parseUnits(GAS, "gwei");
  return gasPrice.add(convertGas);
};
