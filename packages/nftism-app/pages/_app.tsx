import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

import WagmiProvider from "@lib/hooks/wagmi-provider";

const ProgressBar = dynamic(() => import("@components/ui/ProgressBar"), {
  ssr: false,
});
import customTheme from "@styles/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <WagmiProvider>
          <Component {...pageProps} />
        </WagmiProvider>
      </ChakraProvider>
      <ProgressBar />
    </>
  );
}

export default MyApp;
