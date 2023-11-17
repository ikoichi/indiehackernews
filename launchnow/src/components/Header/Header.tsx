import React, { useState } from "react";
import { Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Routes } from "@/data/routes";
import { useGetStated } from "@/hooks/useGetStarted";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  const { isLoadingCta, onGetStartedClick } = useGetStated();

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
            borderRadius="16px"
            overflow="hidden"
            bgColor="blackAlpha.200"
          ></Flex>
          <Link
            w="100px"
            href={Routes.root}
            cursor="pointer"
            fontWeight="extrabold"
            color="blackAlpha.800"
          >
            MakeMoney
          </Link>
        </Flex>
        <Spacer />
        <HStack
          fontSize="14px"
          spacing={["16px", "16px", "16px", "32px"]}
          fontWeight={500}
        >
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
            Get started
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
