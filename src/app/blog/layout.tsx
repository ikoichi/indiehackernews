import type { Metadata } from "next";
import {
  blogOpenGraphImageUrl,
  landingPageDescription,
  landingPageTitle,
  openGraphImageUrl,
  twitterHandle,
  twitterMakerHandle,
  websiteUrl,
} from "@/config";
import { getOpenGraph } from "@/components/OpenGraph/OpenGraph";
import { getSEOTags } from "@/components/SEOTags/SEOTags";

export const metadata: Metadata = {
  ...getSEOTags({
    metadataBase: new URL(websiteUrl),
    title: `${landingPageTitle} | Blog`,
    description: landingPageDescription,
  }),
  ...getOpenGraph({
    title: landingPageTitle,
    description: landingPageDescription,
    imageUrl: blogOpenGraphImageUrl,
    websiteUrl,
    twitterImageUrl: openGraphImageUrl,
    twitterHandle: twitterHandle,
    twitterMakerHandle: twitterMakerHandle,
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
