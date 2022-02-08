import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { withIronSessionSsr } from "iron-session/next";

import LandingLayout from "@components/layouts/LandingLayout";
import { sessionOptions } from "@lib/session";

const DynamicBuyNow = dynamic(() => import("@components/ui/BuyNow"), {
  ssr: false,
});

type ShopProps = {
  collectionId: string;
};

const Shop: NextPage<ShopProps> = ({ collectionId }) => {
  return (
    <LandingLayout>
      <DynamicBuyNow id={collectionId} type="collection" />
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    if (!req.session.user?.isLoggedIn) {
      return { notFound: true };
    }
    return { props: { collectionId: "270705098870" } };
  },
  sessionOptions
);

export default Shop;
