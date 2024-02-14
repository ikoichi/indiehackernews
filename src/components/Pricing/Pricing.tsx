"use client";

import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { PricingPlan } from "./PricingPlan";
import { useRouter } from "next/navigation";
import { Section } from "../atoms/Section/Section";
import { useState } from "react";
import { pricingPlans } from "@/config";
import { useColorModeValues } from "@/hooks/useColorModeValues";

export const Pricing = () => {
  const router = useRouter();
  const { primaryTextColor, secondaryTextColor, borderColor } =
    useColorModeValues();
  const [planType, setPlanType] = useState<"monthly" | "annual">("annual");
  const isMonthly = planType === "monthly";

  const [loadingPlan, setLoadingPlan] = useState<number | null>(null);

  return (
    <>
      <Section flexDir="column" id="pricing">
        <Heading as="h4" fontSize="16px" color="brand.400" mb="16px">
          Pricing
        </Heading>
        <Heading
          as="h2"
          fontSize={["26px", "40px", "48px"]}
          lineHeight={["32px", "48px", "56px"]}
          mb="32px"
          fontWeight="extrabold"
          textAlign="center"
        >
          Start making money today.
        </Heading>
        <Flex
          alignItems="center"
          fontSize="13px"
          border="1px solid gray"
          borderColor={borderColor}
          p="4px"
          borderRadius="100px"
          color={primaryTextColor}
        >
          <Text
            p="4px 16px"
            borderRadius="24px"
            bgColor={planType === "monthly" ? "brand.400" : "transparent"}
            color={planType === "monthly" ? "white" : "inherit"}
            fontWeight={planType === "monthly" ? 700 : 600}
            mr="8px"
            cursor="pointer"
            onClick={() => setPlanType("monthly")}
          >
            Monthly
          </Text>
          <Text
            p="4px 16px"
            borderRadius="24px"
            bgColor={planType === "annual" ? "brand.400" : "transparent"}
            color={planType === "annual" ? "white" : "inherit"}
            fontWeight={planType === "annual" ? 700 : 600}
            cursor="pointer"
            onClick={() => setPlanType("annual")}
          >
            Annual
          </Text>
        </Flex>

        <Flex mt="16px" fontSize="14px" color={secondaryTextColor}>
          <Text
            textDecor={isMonthly ? "line-through" : "none"}
            color="brand.400"
          >
            save 2 months
          </Text>
          <Text ml="5px">with the annual plan</Text>
        </Flex>
      </Section>
      <Section mt="60px" alignItems="center">
        <SimpleGrid columns={[1, 1, 1, 1, pricingPlans.length]}>
          {pricingPlans.map((plan, index) => {
            return (
              <PricingPlan
                key={index}
                title={plan.title}
                isMonthly={isMonthly}
                price={isMonthly ? plan.monthlyPrice : plan.annualPrice}
                isLoading={loadingPlan === index}
                isMostPopular={index === 1}
                {...(index === 0
                  ? {
                      borderTopLeftRadius: "24px !important",
                      borderBottomLeftRadius: "24px !important",
                      borderRightWidth: ["1px", "1px", "1px", "1px", "0"],
                    }
                  : {})}
                {...(index === pricingPlans.length - 1
                  ? {
                      borderTopRightRadius: "24px !important",
                      borderBottomRightRadius: "24px !important",
                      borderRightWidth: "1px !important",
                    }
                  : {})}
                onClick={() => {
                  setLoadingPlan(index);
                  router.push(
                    // @ts-ignore
                    isMonthly ? plan.monthlyCheckoutUrl : plan.annualCheckoutUrl
                  );
                }}
                features={plan.features}
              />
            );
          })}
        </SimpleGrid>
      </Section>
    </>
  );
};
