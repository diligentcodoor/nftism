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
import useUser from "@lib/hooks/useUser";

const featured: FeaturedCardProps[] = [
  {
    type: "single",
    artist: "Kenny Schachter",
    title: "METADADA",
    imgSrc: "/metadada-logo.jpg",
    href: "https://nagel-draxler.de/exhibition/metadada/",
  },
  {
    type: "single",
    artist: "Kenny Schachter",
    title: "CryptoMutts",
    imgSrc: "/cryptomutts-logo.jpg",
    href: "https://opensea.io/collection/cryptomutts-official",
  },
  {
    type: "multi",
    artist: "Kenny Schachter",
    title: "Bespoke",
    imgSrc: "/kenny-logo.png",
    hrefs: [
      {
        title: "Opensea",
        link: "https://opensea.io/collection/kenny-schachter",
      },
      {
        title: "Nifty Gateway",
        link: "https://niftygateway.com/profile/kennyschachter/collections",
      },
      { title: "Rarible", link: "https://rarible.com/kennyschachter/created" },
      { title: "Foundation", link: "https://foundation.app/@kennyschac" },
      { title: "SuperRare", link: "https://superrare.com/kschac/creations" },
    ],
  },
  {
    type: "single",
    artist: "Huxlxy",
    title: "HuxlxyNFT",
    imgSrc: "/huxlxy-logo.jpg",
    href: "https://opensea.io/collection/huxlxy-nft",
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
  const { user } = useUser();
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
            _hover={{ bg: "red.500", color: "white" }}
            colorScheme="red"
            lineHeight="1"
            disabled={!user?.isLoggedIn}
          >
            {user?.isLoggedIn ? ctaText : "Please Sign In"}
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
      <Stack direction={{ base: "column", lg: "row" }}>
        {featured.map((item) => (
          <FeaturedCard key={item.title} {...item} />
        ))}
      </Stack>
    </Flex>
  );
};

export default Hero;
