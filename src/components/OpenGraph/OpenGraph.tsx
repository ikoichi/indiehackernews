import { removeHttpProtocol } from "@/utils/removeHttpProtocol";
import Head from "next/head";

type OpenGraphProps = {
  description: string;
  imageUrl: string;
  title: string;
  websiteUrl: string;
};

export const OpenGraph = ({
  description,
  imageUrl,
  title,
  websiteUrl,
}: OpenGraphProps) => {
  return (
    <Head>
      <meta property="og:url" content={websiteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content={removeHttpProtocol(websiteUrl)}
      />
      <meta property="twitter:url" content={websiteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};
