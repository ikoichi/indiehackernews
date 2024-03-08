import { brandName } from "@/config";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { Metadata } from "next";
import Profile from "@/components/pages/Profile/Profile";

export const metadata: Metadata = getSEOTags({
  title: `Profile | ${brandName}`,
  description: `Your profile`,
});

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
