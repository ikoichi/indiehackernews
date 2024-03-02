"use client";

import { demoCalendlyLink } from "@/config";
import { Routes } from "@/data/routes";
import { useColorModeValues } from "@/hooks/useColorModeValues";
import { useIsLogged } from "@/hooks/useIsLogged";
import {
  Flex,
  Heading,
  Button,
  HStack,
  Text,
  Stack,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbArrowRight, TbCalendarDue, TbStarFilled } from "react-icons/tb";

type HeroProps = {
  showBookDemo?: boolean;
  showCta?: boolean;
  showUsers?: boolean;
};

export const Hero = ({
  showUsers = true,
  showCta = true,
  showBookDemo = true,
}: HeroProps) => {
  const router = useRouter();
  const { user, isLogged } = useIsLogged();

  const { primaryTextColor, secondaryTextColor } = useColorModeValues();

  const [isLoadingCta, setLoadingCta] = useState(false);
  const onGetStartedClick = () => {
    setLoadingCta(true);
    if (user) {
      router.push(Routes.dashboard);
      return;
    }
    router.push(Routes.signUp);
  };

  return (
    <Flex
      w="100vw"
      alignItems="center"
      flexDir="column"
      mt={["0", "0", "0", "100px"]}
    >
      <Flex
        flexDir={["column", "column", "column", "row"]}
        maxW="1280px"
        w="100vw"
        position="relative"
      >
        <Flex
          flexDir="column"
          w={["100%", "100%", "100%", "60%"]}
          alignItems={["center", "center", "center", "flex-start"]}
          justifyContent="center"
          pl={["0", "0", "0", "40px", "40px"]}
          zIndex={2}
        >
          <Heading
            textAlign={["center", "center", "center", "left"]}
            fontWeight="extrabold"
            fontSize={["24px", "36px", "50px", "50px", "60px"]}
            lineHeight={["34px", "46px", "56px", "60px", "66px"]}
            px="16px"
            letterSpacing={["-0.5px", "-0.5px", "-0.7px", "-1.1px"]}
            wordBreak="keep-all"
            whiteSpace="nowrap"
            as="h1"
            color={primaryTextColor}
          >
            <Text
              bgGradient="linear(to-r, brand.400, brand.300)"
              backgroundClip="text"
              as="span"
            >
              Make money
            </Text>
            <br />
            while you sleep
          </Heading>
          <Text
            textAlign={["center", "center", "center", "left"]}
            color={secondaryTextColor}
            mt="16px"
            px="16px"
            fontSize={["14px", "15px", "18px", "20px"]}
            maxW={["70%", "70%", "70%", "560px"]}
          >
            Launch faster and start making money today.
          </Text>

          <Flex flexDir="column" alignItems="flex-start" px="16px" mt="24px">
            <Flex flexDir={["column-reverse", "column-reverse", "row"]}>
              {showCta && (
                <Flex flexDir="column">
                  <Button
                    size="md"
                    variant="solid"
                    colorScheme="brand"
                    h="50px"
                    minH="50px"
                    w="220px"
                    px="24px"
                    borderRadius="16px"
                    mt="16px"
                    onClick={() => onGetStartedClick()}
                    isLoading={isLoadingCta}
                    rightIcon={<TbArrowRight />}
                    sx={{
                      svg: {
                        transition: "all .15s linear",
                        transform: "translateX(0px)",
                      },
                    }}
                    _hover={{
                      svg: {
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    {isLogged ? "Go to app" : "Try FREE now"}
                  </Button>
                </Flex>
              )}
              {showBookDemo && (
                <Flex
                  flexDir="row"
                  ml={["0px", "0px", "24px"]}
                  alignItems="center"
                  justifyContent="center"
                  mt="16px"
                >
                  <Flex flexDir="column">
                    <Button
                      variant="ghost"
                      as="a"
                      href={demoCalendlyLink}
                      target="_blank"
                      rel="noopener"
                      fontWeight={500}
                      pr="8px"
                      ml={["0", "0", "24px"]}
                      leftIcon={
                        <Flex mb="2px">
                          <TbCalendarDue />
                        </Flex>
                      }
                      _hover={{
                        bgColor: "transparent",
                        color: primaryTextColor,
                        textDecor: "underline",
                      }}
                      _active={{
                        bgColor: "transparent",
                        color: primaryTextColor,
                      }}
                      h="28px"
                    >
                      Talk to us
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Flex>
            {showUsers && (
              <Stack
                direction={["column", "column", "column", "row"]}
                alignItems="center"
                mt="48px"
                spacing="16px"
                alignSelf={["center", "center", "center", "flex-start"]}
              >
                <AvatarGroup size="md" max={6}>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                </AvatarGroup>
                <Stack
                  alignSelf={["center", "center", "center", "flex-start"]}
                  alignItems={["center", "center", "center", "flex-start"]}
                  spacing="4px"
                >
                  <Text fontWeight={600} color={primaryTextColor}>
                    Trusted by 900+ users
                  </Text>
                  <HStack color="#FF9800" mt={["4px", "4px", "0"]}>
                    <TbStarFilled />
                    <TbStarFilled />
                    <TbStarFilled />
                    <TbStarFilled />
                    <TbStarFilled />
                  </HStack>
                </Stack>
              </Stack>
            )}
          </Flex>
        </Flex>
        <Flex
          w={["100%", "100%", "100%", "600px", "700px"]}
          mt={["40px", "40px", "40px", "0px"]}
          ml={["0", "0", "0", "-80px", "-100px"]}
          pr={["0", "0", "0", "40px", "0"]}
          h="auto"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          sx={{
            img: {
              objectFit: "contain",
              maxH: ["400px", "300px", "400px", "700px"],
            },
          }}
        >
          <img src="https://placehold.co/400x400" alt="hero" />
        </Flex>
        <Flex
          w={["180px", "240px", "300px", "300px", "300px"]}
          minW={["180px", "240px", "300px", "300px", "300px"]}
          h={["100px", "150px", "200px", "300px"]}
          minH={["100px", "150px", "200px", "300px"]}
          bgGradient="linear-gradient(267.2deg,brand.400,brand.300)"
          position="absolute"
          top="100px"
          left="0"
          filter="blur(130px)"
          opacity={[0, 0, 0, "0.1"]}
          zIndex="-1"
        />
      </Flex>
    </Flex>
  );
};
