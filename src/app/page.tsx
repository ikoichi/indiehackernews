import { BuiltWith } from "@/components/BuiltWith/BuiltWith";
import { Header } from "@/components/Header/Header";
import { Resources } from "@/components/Resources/Resources";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { landingPageDescription, landingPageTitle } from "@/config";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: landingPageTitle,
  description: landingPageDescription,
});

export default function Home() {
  return (
    <>
      <Header />
      <Box p="8px 16px">
        <Resources />
      </Box>
      <Flex px="8px" position="fixed" bottom="8px">
        <BuiltWith />
      </Flex>
    </>
  );
}
