import React from "react";
import { brandName } from "@/config";
import { Affiliates } from "@/components/pages/Affiliates/Affiliates";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: `Affiliates | ${brandName}`,
  description: `Earn 40% on each sale you refer to ${brandName}`,
});

function AffiliatesPage() {
  return <Affiliates />;
}

export default AffiliatesPage;
