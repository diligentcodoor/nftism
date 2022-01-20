// import React, {
//   useState,
//   ReactElement,
//   useContext,
//   useMemo,
//   useCallback,
// } from "react";
// import Web3Modal from "web3modal";
// import {
//   StaticJsonRpcProvider,
//   JsonRpcProvider,
//   Web3Provider,
// } from "@ethersproject/providers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletLink from "walletlink";

// import { DEFAULT_NETWORK, networkConfig } from "../utils/blockchain";
// import { Networks } from "../utils/blockchain";
// import { messages } from "../utils/shared";
// import { switchNetwork } from "../utils/switch-network";

// const isBrowser = () => typeof window !== "undefined";

// type onChainProvider = {
//   connect: () => Promise<Web3Provider>;
//   disconnect: () => void;
//   checkWrongNetwork: () => Promise<boolean>;
//   provider: JsonRpcProvider;
//   address: string;
//   connected: Boolean;
//   web3Modal?: Web3Modal;
//   chainID: number;
//   web3?: any;
//   providerChainID: number;
//   hasCachedProvider: () => boolean;
// };

// export type Web3ContextData = {
//   onChainProvider: onChainProvider;
// } | null;

// const Web3Context = React.createContext<Web3ContextData>(null);

// export const useWeb3Context = () => {
//   const web3Context = useContext(Web3Context);
//   if (!web3Context) {
//     throw new Error(
//       "useWeb3Context() can only be used inside of <Web3ContextProvider />, " +
//         "please declare it at a higher level."
//     );
//   }
//   const { onChainProvider } = web3Context;
//   return useMemo(() => {
//     return { ...onChainProvider };
//   }, [web3Context]);
// };

// export const useAddress = () => {
//   const { address } = useWeb3Context();
//   return address;
// };

// export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({
//   children,
// }) => {
//   const [connected, setConnected] = useState(false);
//   const [chainID, setChainID] = useState(DEFAULT_NETWORK);
//   const [providerChainID, setProviderChainID] = useState(DEFAULT_NETWORK);
//   const [address, setAddress] = useState("");

//   const [uri, setUri] = useState(networkConfig[DEFAULT_NETWORK].uri);
//   const [provider, setProvider] = useState<JsonRpcProvider>(
//     new StaticJsonRpcProvider(uri)
//   );

//   let web3Modal: Web3Modal | undefined;

//   if (isBrowser()) {
//     [web3Modal] = useState<Web3Modal>(
//       new Web3Modal({
//         cacheProvider: true,
//         theme: "dark",
//         providerOptions: {
//           walletconnect: {
//             package: WalletConnectProvider,
//             options: {
//               rpc: {
//                 [Networks.LOCAL]: networkConfig[Networks.LOCAL].uri,
//                 [Networks.MAINNET]: networkConfig[Networks.MAINNET].uri,
//                 [Networks.RINKEBY]: networkConfig[Networks.RINKEBY].uri,
//               },
//             },
//           },
//           walletlink: {
//             package: WalletLink,
//             options: {
//               appName: "CryptoMutts Airdrop",
//               infuraId: "dd03b0b31e154af88bdd60ade7d6c6d0",
//               rpc: {
//                 [Networks.LOCAL]: networkConfig[Networks.LOCAL].uri,
//                 [Networks.MAINNET]: networkConfig[Networks.MAINNET].uri,
//                 [Networks.RINKEBY]: networkConfig[Networks.RINKEBY].uri,
//               },
//             },
//           },
//         },
//       })
//     );
//   }

//   const hasCachedProvider = (): boolean => {
//     if (!web3Modal) return false;
//     if (!web3Modal.cachedProvider) return false;
//     return true;
//   };

//   const _initListeners = useCallback(
//     (rawProvider: JsonRpcProvider) => {
//       if (!rawProvider.on) {
//         return;
//       }

//       rawProvider.on("accountsChanged", () =>
//         setTimeout(() => isBrowser() && window.location.reload(), 1)
//       );

//       rawProvider.on("chainChanged", async (chain: number) => {
//         changeNetwork(chain);
//       });

//       rawProvider.on("network", (_newNetwork, oldNetwork) => {
//         if (!oldNetwork) return;
//         isBrowser() && window.location.reload();
//       });
//     },
//     [provider]
//   );

//   const changeNetwork = async (otherChainID: number) => {
//     const network = Number(otherChainID);

//     setProviderChainID(network);
//   };

//   const connect = useCallback(async () => {
//     const rawProvider = await web3Modal!.connect();

//     _initListeners(rawProvider);

//     const connectedProvider = new Web3Provider(rawProvider, "any");

//     const chainId = await connectedProvider
//       .getNetwork()
//       .then((network) => Number(network.chainId));
//     const connectedAddress = await connectedProvider.getSigner().getAddress();

//     setAddress(connectedAddress);

//     setProviderChainID(chainId);

//     setProvider(connectedProvider);
//     setConnected(true);

//     return connectedProvider;
//   }, [provider, web3Modal, connected]);

//   const checkWrongNetwork = async (): Promise<boolean> => {
//     if (providerChainID !== DEFAULT_NETWORK) {
//       const shouldSwitch =
//         isBrowser() && window.confirm(messages.switch_to_ethereum);
//       if (shouldSwitch) {
//         await switchNetwork();
//         isBrowser() && window.location.reload();
//       }
//       return true;
//     }

//     return false;
//   };

//   const disconnect = useCallback(async () => {
//     web3Modal!.clearCachedProvider();
//     setConnected(false);

//     setTimeout(() => {
//       isBrowser() && window.location.reload();
//     }, 1);
//   }, [provider, web3Modal, connected]);

//   const onChainProvider = useMemo(
//     () => ({
//       connect,
//       disconnect,
//       hasCachedProvider,
//       provider,
//       connected,
//       address,
//       chainID,
//       web3Modal,
//       providerChainID,
//       checkWrongNetwork,
//     }),
//     [
//       connect,
//       disconnect,
//       hasCachedProvider,
//       provider,
//       connected,
//       address,
//       chainID,
//       web3Modal,
//       providerChainID,
//     ]
//   );
//   //@ts-ignore
//   return (
//     <Web3Context.Provider value={{ onChainProvider }}>
//       {children}
//     </Web3Context.Provider>
//   );
// };
