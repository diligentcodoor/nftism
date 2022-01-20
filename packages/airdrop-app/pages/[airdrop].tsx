import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { AirdropType } from "../../lib/src/types";

import LandingLayout from "../components/layouts/LandingLayout";
import Hero from "../components/sections/Hero";
import Nav from "../components/sections/Nav";
import { useAirdrop } from "../hooks/airdrop";
const Airdrop: NextPage = () => {
  const airdrop = useAirdrop();

  let title: string | undefined;
  let image: string | undefined;
  let gif: string | undefined;

  if (airdrop === AirdropType.NFTism) {
    image = "/nftism.gif";
  } else if (airdrop === AirdropType.Huxlxy) {
    title = "Huxlxy";
    gif = "/huxlxy.gif";
  } else {
    return <Error statusCode={404} />;
  }

  return (
    <LandingLayout>
      <Nav />
      <Hero
        title={title}
        subtitle=""
        image={image}
        gif={gif}
        ctaText=""
        ctaLink=""
      />
    </LandingLayout>
  );
};

export default Airdrop;
