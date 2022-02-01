import { useEffect, useState } from "react";
import { useConnect, useNetwork } from "wagmi";
import { DEFAULT_NETWORK } from "../utils/blockchain";
export const useSwitchNetwork = () => {
  const [shouldSwitch, setShouldSwitch] = useState<Boolean>(false);
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const [
    { data: connectionData, error: connectError, loading: connectLoading },
  ] = useConnect();

  useEffect(() => {
    if (
      !connectionData.connected ||
      connectError ||
      connectLoading ||
      error ||
      loading
    )
      return;
    if (data.chain?.unsupported || data.chain?.id !== DEFAULT_NETWORK) {
      setShouldSwitch(true);
      switchNetwork && switchNetwork(DEFAULT_NETWORK);
    } else {
      setShouldSwitch(false);
    }
  }, [
    connectionData,
    connectError,
    connectLoading,
    data,
    error,
    loading,
    switchNetwork,
  ]);

  return { shouldSwitch };
};
