import Head from "next/head";

type SEOTagsProps = {
  title: string;
  description: string;
};

export const SEOTags = ({ title, description }: SEOTagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
