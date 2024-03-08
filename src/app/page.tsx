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
      <Flex position="fixed" top="0" left="0" bgColor="#1a202c">
        <Header />
      </Flex>
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
