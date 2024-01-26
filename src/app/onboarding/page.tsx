import { brandName } from "@/config";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { Metadata } from "next";
import { UserOnboarding } from "@/components/UserOnboarding/UserOnboarding";

export const metadata: Metadata = getSEOTags({
  title: `Onboarding | ${brandName}`,
  description: `Tell us about you`,
});

const OnboardingPage = () => {
  return <UserOnboarding />;
};

export default OnboardingPage;
