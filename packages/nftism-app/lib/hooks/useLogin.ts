import { useCallback, useState } from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

import useUser from "@lib/hooks/useUser";
import fetchJson, { FetchError } from "@lib/api/fetchJson";
import { UserRejectedRequestError } from "wagmi-private";
import { fetchLogin } from "@lib/api/fetchUser";

export default function useLogin() {
  const { mutateUser } = useUser({
    redirectTo: "",
    redirectIfFound: false,
  });
  const [, signMessage] = useSignMessage();
  const [state, setState] = useState<{
    error?: string;
    loading?: boolean;
  }>({});
  const [{ data: accountData }] = useAccount();
  const [{ data: networkData }] = useNetwork();

  const logout = useCallback(async () => {
    await fetch("/api/logout");
    mutateUser(undefined);
    setState({});
  }, [setState, mutateUser]);

  const login = useCallback(async () => {
    try {
      const address = accountData?.address;
      const chainId = networkData?.chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      const nonceRes = await fetch("/api/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to NFTism.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await nonceRes.text(),
      });
      const signRes = await signMessage({
        message: message.prepareMessage(),
      });
      if (signRes.error) throw signRes.error;

      mutateUser(await fetchLogin(message, signRes.data));
      setState((x) => ({ ...x, address, loading: false }));
    } catch (error) {
      if (error instanceof FetchError) {
        const {
          data: { message },
        } = error as FetchError;
        setState((x) => ({ ...x, error: message, loading: false }));
      } else if (error instanceof UserRejectedRequestError) {
        setState((x) => ({
          ...x,
          error: "Please Sign with your Wallet to Login",
          loading: false,
        }));
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  }, [signMessage, mutateUser, accountData?.address, networkData?.chain?.id]);

  return { login, logout, state };
}
