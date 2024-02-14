"use client";

import {
  Flex,
  Spacer,
  Stack,
  Text,
  Tooltip,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { TbBrandDiscord, TbBrandX, TbBrandYoutube } from "react-icons/tb";
import { Section } from "../atoms/Section/Section";
import { Link } from "@chakra-ui/next-js";
import { brandName, discordLink, twitterLink, youTubeLink } from "@/config";
import Image from "next/image";
import { useColorModeValues } from "@/hooks/useColorModeValues";
import { Routes } from "@/data/routes";

export const Footer = () => {
  const { secondaryTextColor, borderColor } = useColorModeValues();
  return (
    <Section flexDir="column" my="80px">
      <Flex
        w="90%"
        maxW="1000px"
        flexDir="column"
        fontSize="12px"
        color={secondaryTextColor}
      >
        <Flex
          borderTop="1px solid gray"
          borderColor={borderColor}
          mt="32px"
          mb="80px"
        />

        <Flex
          mb="40px"
          alignItems="flex-start"
          flexDir={["column", "column", "row"]}
        >
          <Stack alignItems="flex-start" mr="32px">
            <Stack direction="row" alignItems="center">
              <Flex>
                <Image src="/logo.png" alt="logo" width={32} height={32} />
              </Flex>
              <Text fontWeight={700} fontSize="16px">
                {brandName}
              </Text>
            </Stack>
            <Text fontWeight={500} fontSize="14px">
              Start making money today.
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
              <Link href={Routes.blog} mr="8px">
                Blog
              </Link>
              <Link href="/#pricing" mr="8px">
                Pricing
              </Link>
              <Link href={Routes.affiliates} isExternal alignItems="flex-start">
                Affiliate — Earn 30%
              </Link>
            </VStack>

            <VStack mr="8px" alignItems="flex-start">
              <Text fontWeight="bold" textTransform="uppercase">
                Legal
              </Text>
              <Link href={Routes.privacy}>Privacy Policy</Link>
              <Link href={Routes.terms}>Terms and Conditions</Link>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Text fontWeight="bold" textTransform="uppercase">
                Social
              </Text>
              <HStack>
                <Tooltip label="Join Discord community" placement="top">
                  <Link href={discordLink} target="_blank" rel="noopener">
                    <TbBrandDiscord size="20px" />
                  </Link>
                </Tooltip>
                <Tooltip label="Follow X account" placement="top">
                  <Link href={twitterLink} target="_blank" rel="noopener">
                    <TbBrandX size="20px" />
                  </Link>
                </Tooltip>
                <Tooltip label="Join YouTube Channel" placement="top">
                  <Link href={youTubeLink} target="_blank" rel="noopener">
                    <TbBrandYoutube size="20px" />
                  </Link>
                </Tooltip>
              </HStack>
            </VStack>
          </Stack>
        </Flex>

        <Text fontSize="12px" color={secondaryTextColor} mb="40px">
          <br />© Copyright {new Date().getFullYear()} {brandName}. All rights
          reserved.
        </Text>
      </Flex>
    </Section>
  );
};
