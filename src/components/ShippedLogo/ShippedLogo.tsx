import { Flex } from "@chakra-ui/react";
import { TbRocket } from "react-icons/tb";

export const ShippedLogo = () => {
  return (
    <Flex bgColor="purple.500" color="white" p="4px" borderRadius="6px">
      <TbRocket size="20px" />
    </Flex>
  );
};

export const ShippedLogoSmall = () => {
  return (
    <Flex bgColor="purple.500" color="white" p="2px" borderRadius="4px">
      <TbRocket size="14px" />
    </Flex>
  );
};
