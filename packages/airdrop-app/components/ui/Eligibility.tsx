import { Flex, Text, Box, Image, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import { getSnapshotEntry } from "../../utils/getSnapshotEntry";
import { ethers } from "ethers";
import { AIRDROP_ABIS } from "../../utils/constants";
import ClaimButton from "./ClaimButton";
import { DEFAULT_NETWORK, networkConfig } from "../../utils/blockchain";
import { useAirdrop } from "../../hooks/airdrop";
import { AirdropType } from "../../../lib/src/types";

function Eligibility() {
  const airdropType = useAirdrop();
  const { provider, address } = useWeb3Context();
  const [claimed, setClaimed] = useState(false);
  const eligible = getSnapshotEntry(address).amount !== 0;
  useEffect(() => {
    if (!address) return;
    const fetchClaimed = async () => {
      const airdrop = new ethers.Contract(
        networkConfig[DEFAULT_NETWORK].airdropContract[airdropType],
        AIRDROP_ABIS[airdropType],
        provider
      );
      if (provider.network.chainId === networkConfig[DEFAULT_NETWORK].chainId) {
        const _claimed = await airdrop.isClaimed(address);
        setClaimed(_claimed);
      }
    };
    fetchClaimed();
  }, [airdropType, address, provider, setClaimed]);
  return claimed ? (
    <Text>{"You have already claimed your airdrop"}</Text>
  ) : eligible ? (
    <Flex direction="column" align="center">
      <HStack spacing="5px" alignItems="center" mb={5}>
        <Box>
          <Text>
            You are eligible to claim{" "}
            {getSnapshotEntry(address, airdropType).amount}
          </Text>
        </Box>
        {airdropType === AirdropType.NFTism && (
          <Box w="20px">
            <Image
              rounded="full"
              src="/nftism-token.jpeg"
              alt="CryptoMutts"
              size="100%"
            />
          </Box>
        )}
      </HStack>
      <ClaimButton />
    </Flex>
  ) : (
    <Text mb={4}>You are not eligible for this airdrop.</Text>
  );
}

export default Eligibility;
