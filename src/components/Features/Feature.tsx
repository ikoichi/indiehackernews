"use client";

import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { TbArrowRight } from "react-icons/tb";
import { Section } from "../atoms/Section/Section";
import { useGetStarted } from "@/hooks/useGetStarted";
import { ReactNode } from "react";
import { useColorModeValues } from "@/hooks/useColorModeValues";

export type FeatureProps = {
  category: string;
  title: string;
  description: string | ReactNode;
  imageUrl: string;
  showCta: boolean;
};

export const Feature = ({
  category,
  title,
  description,
  imageUrl,
  showCta,
}: FeatureProps) => {
  const { isLoadingCta, onGetStartedClick } = useGetStarted();
  const { primaryTextColor } = useColorModeValues();
  return (
    <Section
      px="40px"
      maxW="1280px"
      flexDir={["column", "column", "column", "row"]}
    >
      <Flex
        flexDir="column"
        alignItems="flex-start"
        mr={["0", "0", "0", "30px"]}
        w={["calc(100vw - 24px)", "400px", "600px"]}
      >
        <Text color="brand.400" fontSize="20px" fontWeight={600}>
          {category}
        </Text>
        <Heading mt="4px" mb="16px">
          {title}
        </Heading>

        <Text
          color={primaryTextColor}
          maxWidth="calc(100vw - 48px)"
          fontSize="18px"
        >
          {description}
        </Text>

        {showCta && (
          <Button
            size="md"
            variant="solid"
            colorScheme="brand"
            h="50px"
            minH="50px"
            w="220px"
            px="24px"
            borderRadius="16px"
            my="16px"
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
              bgColor: "brand.300",
              svg: {
                transform: "translateX(4px)",
              },
            }}
          >
            Try FREE now
          </Button>
        )}
      </Flex>
      <Flex
        w={["calc(100vw - 24px)", "400px", "600px"]}
        minW={["calc(100vw - 24px)", "400px", "600px"]}
        h={["auto", "250px", "400px"]}
        bgColor="blackAlpha.50"
        borderRadius="16px"
        alignItems="center"
        justifyContent="center"
        mt={["16px", "16px", "16px", "0px"]}
        sx={{
          img: {
            w: ["100%", "400px", "600px"],
            h: ["auto", "250px", "400px"],
          },
        }}
      >
        <img src={imageUrl} alt="feature_image" />
      </Flex>
    </Section>
  );
};
