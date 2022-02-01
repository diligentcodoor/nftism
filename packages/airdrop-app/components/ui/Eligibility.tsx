import { Flex, Text, Box, Image, HStack } from "@chakra-ui/react";
import ClaimButton from "./ClaimButton";
import { useAirdrop } from "../../hooks/airdrop";
import { AirdropType } from "../../../lib/src/types";
import { useClaimed } from "../../hooks/useClaimed";

function Eligibility() {
  const airdropType = useAirdrop();
  const { amount, claimed, eligible } = useClaimed();

  return claimed ? (
    <Text>{"You have already claimed your airdrop"}</Text>
  ) : eligible ? (
    <Flex direction="column" align="center">
      <HStack spacing="5px" alignItems="center" mb={5}>
        <Box>
          <Text>You are eligible to claim {amount}</Text>
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
