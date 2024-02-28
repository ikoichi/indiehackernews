import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonProps,
  ComponentWithAs,
  Flex,
} from "@chakra-ui/react";
import { theme } from "../../theme";

export const WidgetButton: ComponentWithAs<"button", ButtonProps> = ({
  children,
  ...props
}) => {
  const [isHover, setHover] = useState(false);
  return (
    <Flex display="inline-flex" position="relative">
      <Box
        position="absolute"
        bg={theme.buttonGradient}
        filter="blur(16px)"
        w="100%"
        h="100%"
        opacity={isHover ? "1" : "0.7"}
        transition="all 0.2s ease"
        borderRadius="0.75rem"
      />
      <Button
        {...theme.styledButton}
        padding="16px 32px"
        fontSize="16px"
        fontWeight={700}
        borderRadius="8px"
        lineHeight="19px"
        fontFamily={theme.styles.fontFamily}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Button>
    </Flex>
  );
};
