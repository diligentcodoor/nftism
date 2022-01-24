import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";

import useUser from "@lib/hooks/useUser";
import fetchJson, { FetchError } from "@lib/api/fetchJson";
import { NFTISM_LOGIN_MESSAGE } from "@lib/constants";

export default function useLogin() {
  // here we just check if user is already logged in and redirect to profile
  const { user, mutateUser } = useUser({
    redirectTo: "",
    redirectIfFound: false,
  });
  const [, signMessage] = useSignMessage();
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.isLoggedIn) return;

    const login = async () => {
      try {
        const { data } = await signMessage({ message: NFTISM_LOGIN_MESSAGE });
        const body = { signature: data };
        mutateUser(
          await fetchJson("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        );
      } catch (error) {
        if (error instanceof FetchError) {
          setError(error.data.message);
        } else {
          console.error("An unexpected error happened:", error);
        }
      }
    };
    login();
  }, [user, setError, signMessage, mutateUser]);

  return { error };
}
