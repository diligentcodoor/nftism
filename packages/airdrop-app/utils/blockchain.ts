import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";

export const getMainnetURI = (): string => {
  return "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
};

export enum Networks {
  MAINNET = 1,
  RINKEBY = 4,
}

export const DEFAULT_NETWORK = Networks.MAINNET;

export const getGasPrice = async (provider: Provider) => {
  const GAS = "5";
  const gasPrice = await provider.getGasPrice();
  const convertGas = ethers.utils.parseUnits(GAS, "gwei");
  return gasPrice.add(convertGas);
};
