import { BuiltWith } from "@/components/BuiltWith/BuiltWith";
import { Comments } from "@/components/Comments/Comments";
import { FixedHeader } from "@/components/Header/FixedHeader";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { landingPageDescription, landingPageTitle } from "@/config";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: landingPageTitle,
  description: landingPageDescription,
});

export default function Home({ params }: { params: { id: string } }) {
  return (
    <>
      <FixedHeader />
      <Box p="8px 16px" pb="54px" pt="81px">
        <Comments resourceId={params.id} />
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
