import { Stack, useBreakpointValue } from "@chakra-ui/react";
import FeaturedCard, {
  Props as FeaturedCardProps,
} from "@components/ui/FeaturedCard";

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
    title: "NFTism Merch",
    imgSrc: "/white-hoodie-nftism.jpg",
    href: "/shop",
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
    title: "NFTs",
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

type Props = {};

const Featured: React.FC<Props> = () => {
  const perRow = useBreakpointValue({ base: 1, md: 2, lg: 3 }, "base");
  const rowCount = Math.ceil(featured.length / perRow!);
  const rows: FeaturedCardProps[][] = Array(rowCount)
    .fill(0)
    .map(() => []);
  for (const [i, feature] of featured.entries()) {
    rows[Math.floor(i / perRow!)].push(feature);
  }

  return (
    <>
      {rows.map((row, i) => (
        <Stack key={i} direction="row">
          {row.map((item) => (
            <FeaturedCard key={item.title} {...item} />
          ))}
        </Stack>
      ))}
    </>
  );
};

export default Featured;
