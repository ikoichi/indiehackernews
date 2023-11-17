import { Flex, Spacer, Stack, Text, Tooltip, VStack } from "@chakra-ui/react";
import {
  TbBrandDiscord,
  TbBrandTwitter,
  TbBrandX,
  TbBrandYoutube,
} from "react-icons/tb";
import { Section } from "../Hero/Section";
import { Link } from "@chakra-ui/next-js";

export const Footer = () => {
  return (
    <Section flexDir="column" mb="160px" mt="80px">
      <Flex
        w="90%"
        maxW="1000px"
        flexDir="column"
        fontSize="12px"
        color="blackAlpha.600"
        pb="120px"
      >
        <Flex
          borderTop="1px solid gray"
          borderColor="blackAlpha.200"
          mt="32px"
          mb="80px"
        />

        <Flex
          mb="40px"
          alignItems="flex-start"
          flexDir={["column", "column", "row"]}
        >
          <Stack alignItems="flex-start" mr="32px">
            <Text fontWeight={700} fontSize="16px">
              MakeMoney
            </Text>
            <Text fontSize="14px">
              Start making money today.
              <br />
              Copyright © 2023 - All rights reserved
            </Text>
          </Stack>
          <Spacer />
          <Stack
            direction={["column", "column", "row"]}
            spacing="24px"
            alignItems="flex-start"
            mt={["16px", "16px", "0"]}
          >
            <VStack mr="8px" alignItems="flex-start">
              <Text fontWeight="bold" textTransform="uppercase">
                Links
              </Text>
              <Link href="#pricing" mr="8px">
                Pricing
              </Link>
              <Link href="/affiliates" isExternal alignItems="flex-start">
                Affiliate — Earn 30%
              </Link>
            </VStack>

            <VStack mr="8px" alignItems="flex-start">
              <Text fontWeight="bold" textTransform="uppercase">
                Legal
              </Text>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms and Conditions</Link>
            </VStack>

            <Stack spacing="16px">
              <Tooltip label="Join Discord community" placement="top">
                <Link
                  href="https://discord.gg/<your link>"
                  target="_blank"
                  rel="noopener"
                >
                  <TbBrandDiscord size="20px" />
                </Link>
              </Tooltip>
              <Tooltip label="Follow X account" placement="top">
                <Link
                  href="https://twitter.com/<your handle>"
                  target="_blank"
                  rel="noopener"
                >
                  <TbBrandX size="20px" />
                </Link>
              </Tooltip>
              <Tooltip label="Join YouTube Channel" placement="top">
                <Link
                  href="https://www.youtube.com/channel/<your channel>"
                  target="_blank"
                  rel="noopener"
                >
                  <TbBrandYoutube size="20px" />
                </Link>
              </Tooltip>
            </Stack>
          </Stack>
        </Flex>

        <Text fontSize="12px" color="blackAlpha.600" mb="40px">
          Notion and the Notion logo are trademarks of Notion Labs, Inc.
          <br />© Copyright 2023 Userdesk. All rights reserved.
        </Text>
      </Flex>
    </Section>
  );
};
