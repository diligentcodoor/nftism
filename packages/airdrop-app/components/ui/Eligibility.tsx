import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import { getBalance } from "../../utils/getBalance";
import { ethers } from "ethers";
import { AIRDROP_ABI, AIRDROP_ADDRESS } from "../../utils/constants";

function Eligibility() {
  const { provider, address } = useWeb3Context();
  const [claimed, setClaimed] = useState(false);
  useEffect(() => {
    if (!address) return;
    const fetchClaimed = async () => {
      const airdrop = new ethers.Contract(
        AIRDROP_ADDRESS,
        AIRDROP_ABI,
        provider
      );
      console.log(provider.network);
      console.log(address);
      const _claimed = await airdrop.isClaimed(address);
      setClaimed(_claimed);
    };
    fetchClaimed();
  }, [address, provider, setClaimed]);
  return claimed ? (
    <Text>{"You have already claimed your airdrop"}</Text>
  ) : (
    <Text>You are eligible to claim {getBalance(address)} NFTism</Text>
  );
}

export default Eligibility;
