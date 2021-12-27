import type { NextPage } from "next";
import LandingLayout from "../components/layouts/LandingLayout";
import Hero from "../components/sections/Hero";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <Hero title="" subtitle="" image="/nftism.gif" ctaText="" ctaLink="" />
    </LandingLayout>
  );
};

export default Home;
