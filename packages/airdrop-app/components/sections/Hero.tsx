import { Box, Flex, Image, Heading, Spinner } from "@chakra-ui/react";
import ConnectButton from "../ui/ConnectButton";
import Eligibility from "../ui/Eligibility";
import { useConnect } from "wagmi";
import { useSwitchNetwork } from "../../hooks/useSwitchNetwork";
interface HeroProps {
  title?: string;
  subtitle: string;
  image?: string;
  gif?: string;
  ctaText: string;
  ctaLink: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle = "",
  image,
  gif,
  ctaText = "",
  ctaLink = "",
}) => {
  const [{ data: connectionData }] = useConnect();
  const { shouldSwitch } = useSwitchNetwork();

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column", md: "column" }}
      px={8}
      my={16}
    >
      <Box w={{ base: "80%", sm: "80%", md: "60%" }} mb={5}>
        {image && <Image rounded="lg" src={image} alt="NFTism" size="100%" />}
      </Box>
      {title && <Heading size="2xl">{title}</Heading>}
      <Heading mb={5} size="2xl">
        Airdrop
      </Heading>
      <Box w={{ base: "80%", sm: "80%", md: "40%" }} mb={5}>
        {gif && <Image rounded="lg" src={gif} alt="Huxlxy" size="100%" />}
      </Box>

      {!connectionData.connected && <ConnectButton />}
      {shouldSwitch ? (
        <Spinner size="lg" />
      ) : (
        connectionData.connected && <Eligibility />
      )}
    </Flex>
  );
};

export default Hero;
