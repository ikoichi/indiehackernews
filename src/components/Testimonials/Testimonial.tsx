"use client";

import { useColorModeValues } from "@/hooks/useColorModeValues";
import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { TbQuote, TbStarFilled } from "react-icons/tb";

const highlightText = (
  text: string,
  highlightSentences: string[] | undefined = []
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bgColor = useColorModeValue("brand.50", "brand.900");

  const textChunks = text.split(".").filter((chunk) => {
    return chunk.trim() !== "";
  });

  return textChunks.map((chunk, index) => {
    const isHighlighted = highlightSentences?.includes(chunk.trim());
    return (
      <Text
        key={index}
        as="span"
        bgColor={isHighlighted ? bgColor : ""}
        color={isHighlighted ? "brand.400" : ""}
        fontWeight={isHighlighted ? 600 : 400}
      >
        {chunk}.
      </Text>
    );
  });
};

export type TestimonialProps = {
  text: string;
  name: string;
  job: string;
  pictureUrl: string;
  highlightSentences?: string[];
};

export const Testimonial = ({
  text,
  name,
  job,
  pictureUrl,
  highlightSentences,
}: TestimonialProps) => {
  const textChunks = highlightText(text, highlightSentences);

  const { primaryTextColor } = useColorModeValues();

  return (
    <Stack maxW="600px">
      <Stack direction="row">
        <Flex color="brand.400">
          <TbQuote size="24px" />
        </Flex>
        <Text
          color={primaryTextColor}
          mt="4px"
          fontStyle="italic"
          lineHeight="28px"
          fontSize="18px"
        >
          {textChunks}
        </Text>
      </Stack>
      <Stack pl="28px" mt="8px">
        <Stack
          direction="row"
          color="#FF9800"
          ml={["0", "0", "8px"]}
          mt={["4px", "4px", "0"]}
        >
          <TbStarFilled />
          <TbStarFilled />
          <TbStarFilled />
          <TbStarFilled />
          <TbStarFilled />
        </Stack>
        <Stack mt="8px" direction="row" alignItems="center" ml="6px">
          <Flex
            w="60px"
            h="60px"
            sx={{
              img: {
                borderRadius: "60px",
              },
            }}
          >
            <img src={pictureUrl} alt={name} />
          </Flex>
          <Stack
            direction="column"
            spacing="0px"
            color={primaryTextColor}
            ml="8px"
            fontSize="14px"
          >
            <Text fontWeight={600}>{name}</Text>
            <Text>{job}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
