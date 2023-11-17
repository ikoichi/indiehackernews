import { Routes } from "@/data/routes";
import { useIsLogged } from "@/hooks/useIsLogged";
import { Flex, Heading, Button, HStack, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbArrowRight, TbCalendarDue, TbStarFilled } from "react-icons/tb";

export const Hero = () => {
  const router = useRouter();
  const { user } = useIsLogged();

  const [isLoadingCta, setLoadingCta] = useState(false);
  const onGetStartedClick = () => {
    setLoadingCta(true);
    if (user) {
      router.push(Routes.home);
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
            color="blackAlpha.800"
            fontWeight="extrabold"
            fontSize={["24px", "36px", "50px", "50px", "60px"]}
            lineHeight={["34px", "46px", "56px", "60px", "66px"]}
            px="16px"
            letterSpacing={["-0.5px", "-0.5px", "-0.7px", "-1.1px"]}
            wordBreak="keep-all"
            whiteSpace="nowrap"
            as="h1"
          >
            <Text
              bgGradient="linear(to-r, teal.400, teal.300)"
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
            color="blackAlpha.600"
            mt="16px"
            px="16px"
            fontSize={["14px", "15px", "18px", "20px"]}
            maxW={["70%", "70%", "70%", "560px"]}
          >
            Launch now and start making money today.
          </Text>

          <Flex flexDir="column" alignItems="center" px="16px" mt="24px">
            <Flex flexDir={["column-reverse", "column-reverse", "row"]}>
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
                  Try FREE now
                </Button>
              </Flex>
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
                    href={"https://yourcalendlylink.com"}
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
                      color: "blackAlpha.800",
                      textDecor: "underline",
                    }}
                    _active={{
                      bgColor: "transparent",
                      color: "blackAlpha.800",
                    }}
                    h="28px"
                  >
                    Talk to us
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              mt="48px"
              alignSelf={["center", "center", "center", "flex-start"]}
              flexDir={["column", "column", "row"]}
              alignItems="center"
            >
              <Text fontWeight={600} color="blackAlpha.700">
                Trusted by 900+ users
              </Text>
              <HStack
                color="#FF9800"
                ml={["0", "0", "8px"]}
                mt={["4px", "4px", "0"]}
              >
                <TbStarFilled />
                <TbStarFilled />
                <TbStarFilled />
                <TbStarFilled />
                <TbStarFilled />
              </HStack>
            </Flex>
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
          bg="linear-gradient(267.2deg,#ffa800,#fa5a00)"
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
