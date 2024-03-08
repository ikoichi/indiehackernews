import { brandName } from "@/config";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { Metadata } from "next";
import Submit from "@/components/pages/Submit/Submit";

export const metadata: Metadata = getSEOTags({
  title: `Submit | ${brandName}`,
  description: `Submit your indie hacking resource`,
});

const SubmitPage = () => {
  return <Submit />;
};

export default SubmitPage;
