import { brandName } from "@/config";
import { Metadata } from "next";

type OpenGraphProps = {
  description?: string;
  imageUrl?: string;
  title?: string;
  websiteUrl?: string;
  siteName?: string;
  twitterImageUrl?: string;
  twitterHandle?: string;
  twitterMakerHandle?: string;
};

// see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields for all the metadata fields supported
export const getOpenGraph = ({
  description = "",
  imageUrl = "",
  title = "",
  websiteUrl = "",
  siteName = brandName,
  twitterImageUrl,
  twitterHandle,
  twitterMakerHandle,
}: OpenGraphProps): Metadata => {
  return {
    openGraph: {
      type: "website",
      url: websiteUrl,
      title,
      description,
      siteName: siteName,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: `${twitterHandle}`,
      creator: `${twitterMakerHandle}`,
      images: twitterImageUrl,
    },
  };
};
