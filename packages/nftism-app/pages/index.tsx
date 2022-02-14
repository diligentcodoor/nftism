import type { NextPage } from "next";

import LandingLayout from "@components/layouts/LandingLayout";
import Hero from "@components/sections/Hero";
import Featured from "@components/sections/Featured";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <Hero
        subtitle=""
        image="/nftism-token.png"
        ctaText="Enter NFTism"
        ctaLink="/blog"
      />
      <Featured />
    </LandingLayout>
  );
};

export default Home;
