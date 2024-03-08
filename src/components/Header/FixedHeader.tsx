import { Flex } from "@chakra-ui/react";
import { Header } from "./Header";

export const FixedHeader = () => {
  return (
    <Flex position="fixed" top="0" left="0" bgColor="#1a202c" zIndex={1}>
      <Header />
    </Flex>
  );
};
