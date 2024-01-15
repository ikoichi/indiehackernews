import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";

interface Props {
  content: React.ReactNode;
}

const ArticleContent = ({ content }: Props) => {
  return (
    <Container maxW="container.md">
      <Flex flexDir="column">
        <Box
          fontSize="18px"
          lineHeight="30px"
          sx={{
            h1: {
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: 800,
              mt: "24px",
              mb: "16px",
            },
            h2: {
              fontSize: "26px",
              lineHeight: "32px",
              fontWeight: 700,
              mt: "64px",
              mb: "16px",
            },
            "ul, ol": {
              ml: "24px",
              p: "4px",
            },
            li: {
              ml: "16px",
              pl: 0,
            },
            img: {
              my: "16px",
              objectFit: "contain",
            },
            p: {
              my: "24px",
            },
            a: {
              color: "primary.400",
              _hover: {
                color: "primary.600",
              },
            },
            "pre, code": {
              fontSize: "14px",
              color: "gray.600",
              px: "4px",
              py: "2px",
              backgroundColor: "gray.100",
              borderRadius: "4px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "gray.20",
            },
            pre: {
              my: "16px",
              p: "16px",
              overflowX: "scroll",
            },
            "pre > code": {
              borderWidth: "0",
              fontSize: "14px",
            },
            blockquote: {
              p: "16px 24px",
              bgColor: "primary.10",
              borderLeftWidth: "4px",
              borderLeftStyle: "solid",
              borderLeftColor: "primary.300",
            },
            "blockquote a": {
              color: "gray.700",
              borderBottomWidth: "1px",
              borderBottomStyle: "dotted",
              borderBottomColor: "gray.600",
            },
            "blockquote a:hover": {
              color: "primary.600",
            },
            "blockquote::first-line": {
              fontWeight: "bold",
              color: "primary.800",
            },
            "blockquote > p": {
              my: "4px",
            },
          }}
        >
          {content}
        </Box>
      </Flex>
    </Container>
  );
};

export default ArticleContent;
