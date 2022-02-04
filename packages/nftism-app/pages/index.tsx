import type { NextPage } from "next";

import LandingLayout from "@components/layouts/LandingLayout";
import Hero from "@components/sections/Hero";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <Hero
        subtitle=""
        image="/nftism-token.jpg"
        ctaText="Enter NFTism"
        ctaLink="/blog"
      />
    </LandingLayout>
  );
};

export default Home;
