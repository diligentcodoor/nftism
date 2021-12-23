import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import { getSnapshotEntry } from "../../utils/getSnapshotEntry";
import { ethers } from "ethers";
import { AIRDROP_ABI } from "../../utils/constants";
import ClaimButton from "./ClaimButton";
import { DEFAULT_NETWORK, networkConfig } from "../../utils/blockchain";

function Eligibility() {
  const { provider, address } = useWeb3Context();
  const [claimed, setClaimed] = useState(false);
  const eligible = getSnapshotEntry(address).amount !== 0;
  useEffect(() => {
    if (!address) return;
    const fetchClaimed = async () => {
      const airdrop = new ethers.Contract(
        networkConfig[DEFAULT_NETWORK].airdropContract,
        AIRDROP_ABI,
        provider
      );
      const _claimed = await airdrop.isClaimed(address);
      setClaimed(_claimed);
    };
    fetchClaimed();
  }, [address, provider, setClaimed]);
  return claimed ? (
    <Text>{"You have already claimed your airdrop"}</Text>
  ) : eligible ? (
    <Flex direction="column" align="center">
      <Text mb={4}>
        You are eligible to claim {getSnapshotEntry(address).amount} NFTism
      </Text>
      <ClaimButton />
    </Flex>
  ) : (
    <Text mb={4}>You are not eligible for the NFTism airdrop.</Text>
  );
}

export default Eligibility;
