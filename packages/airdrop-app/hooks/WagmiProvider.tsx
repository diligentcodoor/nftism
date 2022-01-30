import React from "react";
import { providers } from "ethers";

import { Connector, Provider, defaultChains, developmentChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import {
  DEFAULT_NETWORK,
  INFURA_ID,
  networkConfig,
  Networks,
} from "../utils/blockchain";

const chains = [defaultChains, developmentChains].flat();
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl = networkConfig[chainId as Networks].uri;
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId: INFURA_ID,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: "CryptoMutts Airdrop",
        jsonRpcUrl: `${rpcUrl}/${INFURA_ID}`,
      },
    }),
  ];
};

type ProviderConfig = { chainId?: number; connector?: Connector };

const provider = ({ chainId = DEFAULT_NETWORK }: ProviderConfig) =>
  new providers.JsonRpcProvider(networkConfig[chainId as Networks].uri);

type WagmiProviderProps = { children: React.ReactNode };
const WagmiProvider: React.FC<WagmiProviderProps> = ({ children }) => (
  <Provider
    autoConnect
    connectorStorageKey="cryptomutts.connector"
    connectors={connectors({ chainId: DEFAULT_NETWORK })}
    provider={provider}
  >
    {children}
  </Provider>
);

export default WagmiProvider;
