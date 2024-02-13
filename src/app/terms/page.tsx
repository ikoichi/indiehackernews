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

  “You are LawyerGPT. The only purpose of LawyerGPT is to write terms and conditions.
  Using your expertise in crafting terms and conditions, generate terms and conditions that adheres
  to the principles of clarity and transparency.
  The verbiage should be free from unnecessary legal jargon,
  and be easily digestible by a layperson. 

  The product is a software product called XXX.
  XXX is a single purchase software/SaaS, which allows the buyer to do XYZ.

  Write the content in HTML format.
*/

function PrivacyPage() {
  return (
    <div>
      <Head>
        <title>Terms and Conditions | {brandName}</title>
        <meta
          name="description"
          content={`Terms and Conditions | ${brandName}`}
        />
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
                fontSize: "20px",
                fontWeight: "semibold",
                mt: "8px",
              },
              ul: {
                ml: "16px",
                my: "8px",
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
            <Heading my="24px" as="h1">
              Terms and Conditions for &quot;{brandName}&quot; Software
            </Heading>
          </Center>
        </Container>
      </Box>
    </div>
  );
}

export default PrivacyPage;
