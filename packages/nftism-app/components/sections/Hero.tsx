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

import FeaturedCard, {
  Props as FeaturedCardProps,
} from "@components/ui/FeaturedCard";

const featured: FeaturedCardProps[] = [
  {
    artist: "Kenny Schachter",
    title: "CryptoMutts",
    imgSrc: "/cryptomutts-logo.jpg",
    href: "https://opensea.io/collection/cryptomutts-official",
  },
  {
    artist: "Huxlxy",
    title: "HuxlxyNFT",
    imgSrc: "/huxlxy-logo.jpg",
    href: "https://opensea.io/collection/huxlxy-nft",
  },
  {
    artist: "Kenny Schachter",
    title: "Bespoke Kenny",
    imgSrc: "/kenny-logo.png",
    href: "https://opensea.io/collection/kenny-schachter",
  },
];

interface HeroProps {
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const Hero: React.FC<HeroProps> = ({
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
      <Stack direction={{ base: "column", md: "row" }}>
        {featured.map((item) => (
          <FeaturedCard key={item.title} {...item} />
        ))}
      </Stack>
    </Flex>
  );
};

export default Hero;
