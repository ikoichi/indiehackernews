import React from "react";
import { ComponentWithAs, Flex, FlexProps } from "@chakra-ui/react";
import { theme } from "../../theme";

export const LightBox: ComponentWithAs<"div", FlexProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex
      color={theme.lightBox.color}
      bgColor={theme.lightBox.bgColor}
      border={theme.lightBox.border}
      borderRadius={theme.lightBox.borderRadius}
      boxShadow={theme.lightBox.boxShadow}
      padding="16px"
      fontFamily={theme.styles.fontFamily}
      {...props}
    >
      {children}
    </Flex>
  );
};
