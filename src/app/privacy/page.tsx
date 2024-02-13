import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Center,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { TbArrowLeft } from "react-icons/tb";
import { brandName } from "@/config";

/*
  ChatGPT prompt:

  “You are LawyerGPT. The only purpose of LawyerGPT is to write privacy policies. Using your expertise in crafting privacy policies, generate a very detailed privacy policy that adheres to the principles of clarity and transparency. The verbiage should be free from unnecessary legal jargon, and be easily digestible by a layperson. Your policy should encompass all dimensions of personal data processing, and be rooted in the following specifics about the website and its technological underpinnings:

  Name of the Website: XXX

  Website Domain: https://example.com

  Name of the Website: XXX, by <author>
  Website Type: SaaS

  Products & Services: XXX does XYZ.

  Analytics Tools: 

  Monitoring Tools: 

  Third Party Tools: 

  Age Restrictions: No age restrictions apply

  Affiliate Programs: Affiliate Program provided by Lemon Squeezy, it tracks the users locally, and communicate with Lemon Squeezy under the hood to recognize the referral. No personal data of any type is ever shared.

  Additional Details: 

  Write the content in HTML format.
*/

function PrivacyPage() {
  return (
    <div>
      <Head>
        <title>Privacy Policy | {brandName}</title>
        <meta name="description" content={`Privacy Policy | ${brandName}`} />
      </Head>

      <Box minW="100vw" minH="100vh" position="relative">
        <Flex
          w="100vw"
          h="800px"
          bgGradient="linear-gradient(267.2deg,brand.400,brand.50)"
          position="absolute"
          top="-500px"
          left="0"
          filter="blur(200px)"
          opacity="0.1"
          zIndex="-1"
        />

        <Container maxW="container.sm" flexDirection="column">
          <Center
            flexDirection="column"
            alignItems="flex-start"
            sx={{
              section: {
                py: "16px",
              },
              p: {
                py: "8px",
              },
              h2: {
                fontSize: "24px",
                fontWeight: "semibold",
                mb: "8px",
              },
            }}
          >
            <Button
              variant="ghost"
              size="small"
              leftIcon={<TbArrowLeft />}
              mt="24px"
              as="a"
              href="/"
              p="4px 8px"
            >
              Back
            </Button>
            <Heading mt="16px" as="h1">
              Privacy Policy of {brandName}
            </Heading>
          </Center>
        </Container>
      </Box>
    </div>
  );
}

export default PrivacyPage;
