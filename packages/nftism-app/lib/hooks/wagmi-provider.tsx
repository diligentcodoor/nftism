import { Provider, chain, defaultChains, Connector } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

import {
  DEFAULT_NETWORK,
  INFURA_ID,
  networkConfig,
  Networks,
} from "@lib/blockchain";
import { providers } from "ethers";

const chains = defaultChains;

const connectors = ({ chainId }: { chainId: number }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId: INFURA_ID,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "NFTism",
        jsonRpcUrl: `${rpcUrl}/${INFURA_ID}`,
      },
    }),
  ];
};

type GetProviderArgs = {
  chainId?: number;
  connector?: Connector;
};

const provider = ({
  chainId = DEFAULT_NETWORK,
  connector,
}: GetProviderArgs) => {
  return new providers.JsonRpcProvider(networkConfig[chainId as Networks].uri);
};

type WagmiProviderProps = { children: React.ReactNode };
const WagmiProvider: React.FC<WagmiProviderProps> = ({ children }) => {
  return (
    <Provider
      autoConnect
      connectorStorageKey="nftism.connector"
      connectors={connectors({ chainId: DEFAULT_NETWORK })}
      provider={provider}
    >
      {children}
    </Provider>
  );
};

export default WagmiProvider;
