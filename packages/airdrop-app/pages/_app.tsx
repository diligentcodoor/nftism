import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import customTheme from "../utils/theme";
import { Web3ContextProvider } from "../hooks/web3-context";
import WagmiProvider from "../hooks/WagmiProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <WagmiProvider>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
