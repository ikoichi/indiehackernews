"use client";

import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Section } from "../Hero/Section";
import { useState } from "react";
import { LifetimeDeal } from "./LifetimeDeal";
import { lifetimeDeals } from "@/config";

export const Lifetime = () => {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null);

  return (
    <>
      <Section flexDir="column" id="pricing">
        <Heading as="h4" fontSize="16px" color="brand.400" mb="16px">
          Lifetime deal
        </Heading>
        <Heading as="h2" fontSize="48px" mb="32px" fontWeight="extrabold">
          Start making money today.
        </Heading>
        <Text>
          Get access to all these features, forever, with our pre-sale lifetime
          deal.
        </Text>
        <Text mt="8px">
          We&apos;ll give you access as soon as the product is ready.
        </Text>
        <Text fontSize="14px" color="blackAlpha.600" mt="24px">
          30-day refund if you&apos;re not satisfied.
        </Text>
      </Section>
      <Section mt="32px" alignItems="center">
        <SimpleGrid columns={[1, 1, 1, 1, lifetimeDeals.length]}>
          {lifetimeDeals.map((plan, index) => {
            return (
              <LifetimeDeal
                key={index}
                title={plan.title}
                price={plan.price}
                isLoading={loadingPlan === index}
                isMostPopular={index === 1}
                {...(index === 0
                  ? {
                      borderTopLeftRadius: "24px !important",
                      borderBottomLeftRadius: "24px !important",
                      borderRightWidth: ["1px", "1px", "1px", "1px", "0"],
                    }
                  : {})}
                {...(index === lifetimeDeals.length - 1
                  ? {
                      borderTopRightRadius: "24px !important",
                      borderBottomRightRadius: "24px !important",
                      borderRightWidth: "1px !important",
                    }
                  : {})}
                onClick={() => {
                  setLoadingPlan(index);
                  router.push(plan.checkoutUrl);
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
