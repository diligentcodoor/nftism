import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import customTheme from "../utils/theme";
import WagmiProvider from "../hooks/wagmi-provider";
import { WagmiModal } from "../components/ui/WagmiModal";

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
