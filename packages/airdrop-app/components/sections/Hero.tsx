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
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column", md: "column" }}
      wrap="nowrap"
      px={8}
      mb={16}
    >
      <Box w={{ base: "80%", sm: "60%", md: "30%" }} mb={{ base: 12, md: 0 }}>
        <Image src={image} alt="CryptoMutts" size="100%" />
      </Box>
      <ConnectButton />
      <Stack spacing={4} w={{ base: "80%", md: "40%" }} align={["center"]}>
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="white"
          textAlign={["center"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="white"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center"]}
        >
          {subtitle}
        </Heading>
        <Link href={ctaLink} passHref>
          <Button
            size="md"
            rounded="md"
            variant="outline"
            colorScheme="red"
            color="white"
            _hover={{
              bg: "white",
              color: "red.900",
            }}
            lineHeight="1"
          >
            {ctaText}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="white"
          opacity="0.6"
        >
          CryptoMutts.
        </Text>
      </Stack>
    </Flex>
  );
};

export default Hero;
