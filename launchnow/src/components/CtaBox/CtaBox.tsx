import { Routes } from "@/data/routes";
import { Text, Flex, Heading, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { TbArrowRight, TbCalendarDue, TbCircleCheck } from "react-icons/tb";
import { useIsLogged } from "@/hooks/useIsLogged";
import { useRouter } from "next/navigation";
import { Section } from "../Hero/Section";

export const CtaBox = () => {
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
    <Section flexDir="column" mb="160px" mt="80px">
      <Flex
        p="80px 24px"
        borderRadius="16px"
        flexDir="column"
        w="90%"
        minW={["90%", "90%", "90%", "800px"]}
        maxW="1000px"
        color="blackAlpha.800"
        alignItems="center"
        textAlign="center"
        bgColor="blackAlpha.50"
      >
        <Heading fontSize={["22px", "26px", "32px", "48px"]} mb="8px">
          Start making money today.
        </Heading>
        <Text fontSize="16px" my="8px" color="blackAlpha.700" maxW="600px">
          Get started with MakeMoney today.
          <br />
          Start making money with your audience.
        </Text>

        <Stack direction={["column", "column", "column", "row"]} mt="24px">
          <Flex maxW="524px" flexDir="row">
            <Button
              size="md"
              variant="solid"
              colorScheme="brand"
              h="50px"
              minH="50px"
              w="220px"
              px="24px"
              borderRadius="16px"
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
            flexDir="column"
            alignItems="center"
            px="16px"
            mt={["24px", "24px", "24px", "0"]}
          >
            <Flex flexDir="column">
              <Flex flexDir="row" alignItems="center" justifyContent="center">
                <Button
                  variant="outline"
                  as="a"
                  href={"https://yourcalendlylink.com"}
                  target="_blank"
                  rel="noopener"
                  borderRadius="16px"
                  fontWeight={500}
                  h="50px"
                  minH="50px"
                  leftIcon={
                    <Flex mb="2px">
                      <TbCalendarDue />
                    </Flex>
                  }
                >
                  Book a demo
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Stack>

        <Stack
          direction={["column", "column", "row"]}
          alignItems="center"
          my="32px"
          fontSize="13px"
          color="brand.300"
          spacing={["16px", "16px", "32px"]}
        >
          <Stack direction="row" alignItems="center">
            <Flex minW="16px" color="brand.400">
              <TbCircleCheck size="16px" />
            </Flex>
            <Text color="blackAlpha.700">Personalized onboarding</Text>
          </Stack>
          <Stack direction="row" alignItems="center" color="brand.400">
            <TbCircleCheck size="16px" />
            <Text color="blackAlpha.700">Friendly pricing as you scale</Text>
          </Stack>
        </Stack>
      </Flex>
    </Section>
  );
};
