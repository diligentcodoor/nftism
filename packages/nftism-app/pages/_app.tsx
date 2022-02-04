import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import WagmiProvider from "@lib/hooks/wagmi-provider";
import customTheme from "@styles/theme";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <WagmiProvider>
        <Component {...pageProps} />
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
