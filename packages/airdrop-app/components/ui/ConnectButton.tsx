import { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import { DEFAULT_NETWORK } from "../../utils/blockchain";
import HeaderButton from "./HeaderButton";

function ConnectButton() {
  const {
    connect,
    disconnect,
    connected,
    web3,
    providerChainID,
    checkWrongNetwork,
  } = useWeb3Context();
  const [isConnected, setConnected] = useState(connected);

  let pendingTransactions: any[] = [];

  let buttonText = "Connect Wallet";
  let clickFunc: any = connect;
  let buttonStyle = {};

  if (isConnected) {
    buttonText = "Disconnect";
    clickFunc = disconnect;
  }

  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = `${pendingTransactions.length} Pending `;
    clickFunc = () => {};
  }

  if (isConnected && providerChainID !== DEFAULT_NETWORK) {
    buttonText = "Wrong network";
    buttonStyle = { backgroundColor: "rgb(255, 67, 67)" };
    clickFunc = () => {
      checkWrongNetwork();
    };
  }

  useEffect(() => {
    setConnected(connected);
  }, [web3, connected]);

  return <HeaderButton onClick={clickFunc}>{buttonText}</HeaderButton>;
}

export default ConnectButton;
