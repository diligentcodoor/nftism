import { DEFAULT_NETWORK, networkConfig, Networks } from "./blockchain";

const switchRequest = () => {
  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [
      { chainId: "0x" + networkConfig[DEFAULT_NETWORK].chainId.toString(16) },
    ],
  });
};

const addChainRequest = () => {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x" + networkConfig[DEFAULT_NETWORK].chainId.toString(16),
        chainName: networkConfig[DEFAULT_NETWORK].chainName,
        rpcUrls: [networkConfig[DEFAULT_NETWORK].uri],
        blockExplorerUrls: [networkConfig[DEFAULT_NETWORK].etherscan],
        nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
        },
      },
    ],
  });
};

export const switchNetwork = async () => {
  if (window.ethereum) {
    try {
      await switchRequest();
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await addChainRequest();
          await switchRequest();
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
