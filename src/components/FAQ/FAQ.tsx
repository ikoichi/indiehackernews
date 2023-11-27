"use client";

import { Accordion, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Section } from "../Hero/Section";
import { FAQQuestionProps, FAQquestion } from "./FAQquestion";
import { brandName, supportEmail } from "@/config";

const faqs: FAQQuestionProps[] = [
  {
    question: "Is there a free plan?",
    answer: `Yes, there is a free plan. You can use ${brandName} with limited features for free.`,
  },
  {
    question: "Can I invite team members?",
    answer: "Yes, you can invite team members from your workspace.",
  },
  {
    question: "Can I do this?",
    answer: "Yes, you can do this.",
  },
  {
    question: "Can I do that?",
    answer: "Yes, you can do that.",
  },
];

export const FAQ = () => {
  return (
    <Section>
      <Flex
        bgColor="blackAlpha.50"
        w="90%"
        maxW="1000px"
        alignItems="center"
        justifyContent="center"
        p="54px"
        borderRadius="16px"
        flexDir="column"
      >
        <VStack maxW="800px">
          <Heading alignItems="center" textAlign="center" my="16px">
            Frequently asked questions
          </Heading>

          <Text color="blackAlpha.700" textAlign="center">
            More questions? Email us at{" "}
            <Link
              href={`mailto:${supportEmail}`}
              fontWeight="bold"
              color="brand.500"
            >
              {supportEmail}
            </Link>{" "}
          </Text>
        </VStack>

        <Accordion mt="40px" w="100%" borderColor="blackAlpha.300">
          {faqs.map((faq, index) => {
            return (
              <FAQquestion
                question={faq.question}
                answer={faq.answer}
                key={index}
              />
            );
          })}
        </Accordion>
      </Flex>
    </Section>
  );
};
