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
      <Box w={{ base: "80%", sm: "60%", md: "60%" }} mb={{ base: 12, md: 0 }}>
        <Image src={image} alt="NFTism" size="100%" rounded="full" />
      </Box>
      <Stack spacing={4} w={{ base: "80%", md: "40%" }} align={["center"]}>
        {/* <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="gray.700"
          textAlign={["center"]}
        >
          {title}
        </Heading> */}
        <Heading
          as="h2"
          size="md"
          opacity="0.8"
          color="black"
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
            colorScheme="blue"
            lineHeight="1"
          >
            {ctaText}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="gray.700"
          opacity="0.6"
        >
          Beware of Metadada.
        </Text>
      </Stack>
    </Flex>
  );
};

export default Hero;
