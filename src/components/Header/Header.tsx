"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Routes } from "@/data/routes";
import { useGetStarted } from "@/hooks/useGetStarted";
import { brandName } from "@/config";
import { DarkModeSwitch } from "../DarkModeSwitch/DarkModeSwitch";
import { useMobile } from "@/hooks/useMobile";
import { TbMenu2 } from "react-icons/tb";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  const isMobile = useMobile();
  const { isLogged, isLoadingCta, onGetStartedClick } = useGetStarted();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Flex
      w="100vw"
      p="16px 24px"
      alignItems="center"
      flexDir="row"
      justifyContent="center"
      mb="40px"
    >
      <Flex maxW="1280px" w="100%">
        <Flex alignItems="center">
          <Flex
            w="32px"
            h="32px"
            mr="8px"
            overflow="hidden"
            bgColor="blackAlpha.200"
          >
            <Image src="/logo.png" alt="logo" width={32} height={32} />
          </Flex>
          <Link
            w="auto"
            href={Routes.root}
            cursor="pointer"
            fontWeight="extrabold"
          >
            {brandName}
          </Link>
        </Flex>
        <Spacer />
        <HStack
          fontSize="14px"
          spacing={["16px", "16px", "16px", "32px"]}
          fontWeight={500}
        >
          <Link href="/#pricing" display={["none", "block"]}>
            Pricing
          </Link>
          <Link href={Routes.login} display={["none", "block"]}>
            Login
          </Link>
          <Button
            size="sm"
            variant="solid"
            colorScheme="brand"
            onClick={() => onGetStartedClick()}
            isLoading={isLoadingCta}
          >
            {isLogged ? "Go to app" : "Get started"}
          </Button>
          <Flex display={["none", null, "flex"]}>
            <DarkModeSwitch />
          </Flex>
          <Flex display={["flex", "none"]}>
            <IconButton
              aria-label={"menu"}
              icon={<TbMenu2 />}
              onClick={() => setMenuOpen(true)}
              bgColor="transparent"
            />
          </Flex>

          <Drawer
            isOpen={isMenuOpen}
            placement="right"
            onClose={() => setMenuOpen(false)}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody mt="40px">
                <VStack spacing="16px" w="100%">
                  <Link
                    href="/#"
                    onClick={() => {
                      setMenuOpen(false);
                      setTimeout(() => {
                        document.getElementById("pricing")?.scrollIntoView();
                      }, 500);
                    }}
                  >
                    Pricing
                  </Link>
                  <Link href={Routes.login}>Login</Link>
                  <DarkModeSwitch />
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="brand"
                    onClick={() => onGetStartedClick()}
                    isLoading={isLoadingCta}
                    w="100%"
                    h="40px"
                  >
                    Get started
                  </Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
      </Flex>
    </Flex>
  );
};
