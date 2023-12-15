import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "./providers";
import {
  landingPageDescription,
  landingPageTitle,
  openGraphImageUrl,
  websiteUrl,
} from "@/config";
import { getOpenGraph } from "@/components/OpenGraph/OpenGraph";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { customTheme } from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...getSEOTags({
    metadataBase: new URL(websiteUrl),
    title: landingPageTitle,
    description: landingPageDescription,
  }),
  ...getOpenGraph({
    title: landingPageTitle,
    description: landingPageDescription,
    imageUrl: openGraphImageUrl,
    websiteUrl,
    twitterImageUrl: openGraphImageUrl,
    twitterHandle: "",
    twitterMakerHandle: "",
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
        <script
          defer
          type="text/javascript"
          src="/pirsch-extended.js"
          id="pirschextendedjs"
          data-code=""
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
