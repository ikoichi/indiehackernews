"use client";

import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Section } from "../Hero/Section";
import { colors } from "@/theme";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onAddToWaitlist = () => {
    if (email) {
      setLoading(true);
      axios
        .post("/api/waitlist", {
          email,
        })
        .then(() => {
          toast.success("You've been added to the waitlist!");
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <Section flexDir="column" mb="160px" mt="80px">
      <Flex
        p="80px 32px"
        borderRadius="16px"
        flexDir="column"
        w="90%"
        minW={["90%", "90%", "90%", "800px"]}
        maxW="1000px"
        alignItems="center"
        textAlign="center"
        bgGradient="linear(15deg, brand.100, brand.300)"
        color="blackAlpha.900"
      >
        <Stack maxW="800px" spacing="16px">
          <Text fontSize={["22px", "26px", "28px", "30px"]} fontWeight={700}>
            You caught us before we&apos;re ready.
          </Text>
          <Text>
            We&apos;re working hard to put the finishing touches.
            <br />
            If you&apos;d like us to send you a reminder when we&apos;re ready,
            just put your email below.
          </Text>
          <Stack direction={["column", "column", "row"]}>
            <Input
              bgColor="white"
              borderColor="blackAlpha.300"
              _placeholder={{
                color: "blackAlpha.500",
              }}
              _hover={{
                borderColor: "brand.400",
              }}
              _focus={{
                borderColor: "brand.400",
              }}
              placeholder="john@doe.com"
              _focusVisible={{
                boxShadow: `0 0 0 4px ${colors.brand["50"]} inset}`,
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              textAlign={["center", "center", "left"]}
            />
            <Button
              colorScheme="brand"
              minW="180px"
              onClick={onAddToWaitlist}
              isLoading={isLoading}
            >
              Remind me
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Section>
  );
};
