import Head from "next/head";
import { useRouter } from "next/router";

const HeadSection: React.FC = () => {
  const router = useRouter();
  const url = `https://www.nftism.com${router.pathname}`;
  const title = "NFTism";
  const description =
    "NFTism is the community that binds us together and empowers us as independent creators and collectors.";
  const nftismTokenImage = "https://www.nftism.com/nftism-token.png";

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width,height=device-height,initial-scale=1"
      />
      <link rel="icon" href="/favicon.ico" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:image" content={nftismTokenImage} key="ogimage" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:site_name" content={title} key="ogsitename" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={nftismTokenImage} />
      <meta name="twitter:site" content="@kennyschac" />
      <meta name="twitter:creator" content="@kennyschac" />
    </Head>
  );
};

export default HeadSection;
