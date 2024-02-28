import { brandName } from "@/config";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { Metadata } from "next";
import { ExtensionWelcome } from "@/components/pages/ExtensionWelcome/ExtensionWelcome";

export const metadata: Metadata = getSEOTags({
  title: `Welcome | ${brandName}`,
  description: `Welcome ${brandName} extension`,
});

const ExtensionWelcomePage = () => {
  return <ExtensionWelcome />;
};

export default ExtensionWelcomePage;
