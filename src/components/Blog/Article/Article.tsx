"use client";

import { Flex, Box, Text, Container } from "@chakra-ui/react";
import React, { useRef } from "react";
import ArticleContent from "./ArticleContent";
import { Header } from "@/components/Header/Header";
import { CtaBox } from "@/components/CtaBox/CtaBox";
import { ReadingProgress } from "../ReadingProgress/ReadingProgress";

interface Props {
  readingTime: {
    text: string;
  };
  title: string;
  description: string;
  date: string;
  ogImage: {
    url: string;
  };
  content: React.ReactNode;
  slug: string;
}

const Article = ({
  readingTime,
  title,
  description,
  date,
  ogImage,
  content,
}: Props) => {
  const topRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <>
      <ReadingProgress topRef={topRef} contentRef={contentRef} />
      <Flex ref={topRef}>
        <Header />
      </Flex>
      <main>
        <Container maxW="container.md">
          <Flex
            as="article"
            flexDir="column"
            overflow="hidden"
            mb="0"
            mt="48px"
          >
            <Flex flexDir="column" w="100%" alignItems="flex-start">
              <Text
                fontSize="40px"
                fontWeight={800}
                mb="16px"
                lineHeight="42px"
              >
                {title}
              </Text>

              <Text as="p" color="gray.600" mb="16px" fontSize="18px">
                {description}
              </Text>

              <Flex flexDir="row" mb="16px" color="gray.500" fontSize="14px">
                <p>{readingTime.text}</p>

                <Box mx="8px">•</Box>

                <p>{date}</p>
              </Flex>
            </Flex>

            <Flex
              borderTopLeftRadius="12px"
              borderTopRightRadius="12px"
              overflow="hidden"
            >
              <img
                src={ogImage.url}
                alt="Image for article"
                style={{
                  width: "100%",

                  objectFit: "contain",
                }}
              />
            </Flex>
          </Flex>
        </Container>
        <hr />
        <Box h="16px" />
        <Flex ref={contentRef}>
          <ArticleContent content={content} />
        </Flex>
      </main>
      <Box h="64px" />

      <hr />
      <Box h="32px" />
      <CtaBox />
    </>
  );
};

export default Article;
