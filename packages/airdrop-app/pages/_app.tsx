import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import customTheme from "../utils/theme";
import { Web3ContextProvider } from "../hooks/web3-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
