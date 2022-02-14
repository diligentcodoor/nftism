import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { withIronSessionSsr } from "iron-session/next";

import LandingLayout from "@components/layouts/LandingLayout";
import { getRoleProps, sessionOptions, User, UserRole } from "@lib/session";
import Error from "next/error";

const DynamicBuyNow = dynamic(() => import("@components/ui/BuyNow"), {
  ssr: false,
});

type ShopProps = {
  collectionId: string;
  errorCode: number;
  errorMsg: string;
};

const Shop: NextPage<ShopProps> = ({ collectionId, errorCode, errorMsg }) => {
  return (
    <LandingLayout>
      {errorCode > 0 ? (
        <Error statusCode={errorCode} title={errorMsg} />
      ) : (
        <DynamicBuyNow id={collectionId} type="collection" />
      )}
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    return await getRoleProps(
      req.session.user,
      { collectionId: "270705098870" },
      { collectionId: "-1" }
    );
  },
  sessionOptions
);

export default Shop;
