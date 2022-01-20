import { useDisclosure } from "@chakra-ui/react";
import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import { DEFAULT_NETWORK, INFURA_ID } from "../utils/blockchain";

// Chains for connectors to support
const chains = defaultChains;

// Set up connectors
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
        appName: "My wagmi app",
        jsonRpcUrl: `${rpcUrl}/${INFURA_ID}`,
      },
    }),
  ];
};

type WagmiProviderProps = { children: React.ReactNode };
const WagmiProvider: React.FC<WagmiProviderProps> = ({ children }) => {
  return (
    <Provider
      autoConnect
      connectorStorageKey="nftism.connector"
      connectors={connectors({ chainId: DEFAULT_NETWORK })}
    >
      {children}
    </Provider>
  );
};

export default WagmiProvider;
