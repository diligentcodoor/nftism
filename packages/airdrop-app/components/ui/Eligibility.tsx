import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";

function Eligibility() {
  const { connected, provider } = useWeb3Context();
  const [isConnected, setConnected] = useState(connected);
  return <Heading>Lol</Heading>;
}

export default Eligibility;
