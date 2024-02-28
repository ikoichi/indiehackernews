import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { theme } from "../../theme";

export const GrayBox = ({ children, ...props }: FlexProps) => {
  return (
    <Flex
      color={theme.box.color}
      bgColor={theme.box.bgColor}
      border={theme.box.border}
      borderRadius={theme.box.borderRadius}
      boxShadow={theme.box.boxShadow}
      padding="16px"
      fontFamily={theme.styles.fontFamily}
      {...props}
    >
      {children}
    </Flex>
  );
};
