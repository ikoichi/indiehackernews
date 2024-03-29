import { BuiltWith } from "@/components/BuiltWith/BuiltWith";
import { FixedHeader } from "@/components/Header/FixedHeader";
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
      <FixedHeader />
      <Box p="8px 16px" pb="54px" pt="81px">
        <Resources />
      </Box>
      <Flex
        p="8px"
        position="fixed"
        bottom="0"
        bgColor="#1a202c"
        w="100%"
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
      >
        <BuiltWith />
      </Flex>
    </>
  );
}
