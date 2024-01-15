import React from "react";
import NextLink from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArticleType } from "@/app/blog/blog.types";

type ArticlePreviewProps = {
  article: ArticleType;
};

const ArticlePreview = ({ article }: ArticlePreviewProps) => (
  <Flex
    as="article"
    flexDir={["column-reverse", "column-reverse", "row"]}
    borderRadius="8px"
    overflow="hidden"
    mb="48px"
  >
    <Flex
      flexDir="column"
      w="100%"
      alignItems="flex-start"
      p="24px"
      bgColor="white"
    >
      <Text
        fontSize="24px"
        fontWeight={600}
        mb="16px"
        lineHeight="28px"
        _hover={{
          color: "gray.600",
        }}
      >
        <NextLink as={`/blog/${article.slug}`} href="/blog/[slug]">
          {article.title}
        </NextLink>
      </Text>

      <Text as="p" color="gray.600" mb="16px" fontSize="18px">
        {article.description}
      </Text>

      <Flex flexDir="row" mb="16px" color="gray.500" fontSize="14px">
        <p>{article.timeReading.text}</p>

        <Box mx="8px">•</Box>

        <p>{article.date}</p>
      </Flex>
    </Flex>
    <img
      src={article.ogImage.url}
      alt="Image for article"
      style={{
        width: "100%",
        height: 250,
        objectFit: "cover",
      }}
    />
  </Flex>
);

export default ArticlePreview;
