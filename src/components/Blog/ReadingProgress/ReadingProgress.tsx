"use client";

import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ReadingProgressProps = {
  topRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
};

export const ReadingProgress = ({
  topRef,
  contentRef,
}: ReadingProgressProps) => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const scrollTop = window.scrollY;

    const topRefHeight = topRef?.current?.scrollHeight || 0;
    const scrollHeight = contentRef?.current?.scrollHeight || 0;

    const percent = (scrollTop / (scrollHeight - topRefHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  return (
    <Flex w="100vw" position="fixed" top="0" left="0">
      <Flex w={`${width}%`} h="4px" bg="brand.500" />
    </Flex>
  );
};
