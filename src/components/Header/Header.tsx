"use client";

import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Routes } from "@/data/routes";
import { brandName } from "@/config";
import { TbMenu2 } from "react-icons/tb";
import { useIsLogged } from "@/hooks/useIsLogged";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { signOut } from "next-auth/react";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  const router = useRouter();
  const { isLoading, isLogged } = useIsLogged();
  const { profile } = useProfile();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Flex
      w="100vw"
      p="16px 24px"
      alignItems="center"
      flexDir="row"
      justifyContent="center"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Flex w="100%" alignItems="center">
        <Flex alignItems="baseline">
          <Flex
            w="auto"
            h="32px"
            mr="8px"
            overflow="hidden"
            bgColor="blackAlpha.200"
            alignItems="center"
          >
            👩‍💻🧑‍💻
          </Flex>
          <Link
            w="auto"
            mr="8px"
            href={Routes.root}
            cursor="pointer"
            fontWeight="extrabold"
          >
            {brandName}
          </Link>
          <Text
            fontSize="13px"
            color="whiteAlpha.600"
            display={["none", null, "block"]}
          >
            — Stories, products, articles, and more.
          </Text>
        </Flex>
        <Spacer />
        <HStack
          fontSize="14px"
          spacing={["16px", "16px", "16px", "32px"]}
          fontWeight={500}
        >
          {profile && (
            <>
              <Flex
                borderRight="1px solid"
                borderColor="whiteAlpha.400"
                pr="32px"
                display={["none", null, "flex"]}
              >
                {!profile?.name && (
                  <Link href={Routes.profile}>Set nickname</Link>
                )}
                {profile?.name && (
                  <Link href={Routes.profile}>{profile.name}</Link>
                )}
              </Flex>
            </>
          )}
          {!isLogged && (
            <Link href={Routes.login} display={["none", "block"]}>
              Login
            </Link>
          )}
          <Button
            size="sm"
            variant="solid"
            colorScheme="brand"
            isLoading={isLoading}
            onClick={() => {
              if (isLogged) {
                router.push(Routes.submit);
                return;
              }
              router.push(Routes.signUp);
            }}
          >
            {isLogged ? "Submit" : "Sign up"}
          </Button>
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
                <VStack spacing="24px" w="100%">
                  {profile?.name && (
                    <Link href={Routes.profile}>{profile.name}</Link>
                  )}
                  {!profile?.name && <Link href={Routes.login}>Login</Link>}
                  <Button
                    size="md"
                    w="100%"
                    variant="solid"
                    colorScheme="brand"
                    isLoading={isLoading}
                    onClick={() => {
                      if (isLogged) {
                        router.push(Routes.submit);
                        return;
                      }
                      router.push(Routes.signUp);
                    }}
                  >
                    {isLogged ? "Submit" : "Sign up"}
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    w="100%"
                    onClick={() => {
                      signOut({
                        redirect: true,
                        callbackUrl: "/",
                      });
                    }}
                  >
                    Log out
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
