import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import ConnectButton from "../ui/ConnectButton";
import { useWeb3Context } from "../../hooks/web3-context";
import Eligibility from "../ui/Eligibility";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "",
  subtitle = "",
  image = "",
  ctaText = "",
  ctaLink = "",
}) => {
  const { connected } = useWeb3Context();
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column", md: "column" }}
      wrap="nowrap"
      px={8}
      my={16}
    >
      <Box w={{ base: "80%", sm: "80%", md: "60%" }} mb={5}>
        <Image rounded="lg" src={image} alt="NFTism" size="100%" />
      </Box>
      <Heading mb={5} size="2xl">
        Airdrop
      </Heading>

      {connected ? <Eligibility /> : <ConnectButton />}
    </Flex>
  );
};

export default Hero;
