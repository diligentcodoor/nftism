import type { NextPage } from "next";
import { useAccount } from "wagmi";

import LandingLayout from "../components/layouts/LandingLayout";
// import Hero from "../components/sections/Hero";

const Home: NextPage = () => {
  const [{ data, error, loading }, disconnect] = useAccount({
    fetchEns: true,
  });
  return (
    <LandingLayout>
      {data?.address}
      {/* <Hero title="" subtitle="" image="/nftism.gif" ctaText="" ctaLink="" /> */}
    </LandingLayout>
  );
};

export default Home;
