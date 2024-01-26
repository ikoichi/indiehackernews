"use client";

import { useColorModeValues } from "@/hooks/useColorModeValues";
import { Input as ChakraInput } from "@chakra-ui/react";
import { InputProps } from "@chakra-ui/react";

export const Input = (props: InputProps) => {
  const { borderColor, outlineColor } = useColorModeValues();

  const inputProps = {
    _focusVisible: {
      boxShadow: "none",
      outline: `2px solid ${outlineColor}`,
    },
    _focus: {
      boxShadow: "none",
      borderColor,
    },
    _active: {
      boxShadow: "none",
    },
    _hover: {
      boxShadow: "none",
    },
  };

  return <ChakraInput {...inputProps} {...props} />;
};
