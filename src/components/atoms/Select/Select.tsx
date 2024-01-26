import { useColorModeValues } from "@/hooks/useColorModeValues";
import { Select as ChakraSelect } from "@chakra-ui/react";
import { SelectProps } from "@chakra-ui/react";

export const Select = (props: SelectProps) => {
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

  return (
    <ChakraSelect {...inputProps} {...props}>
      {props.children}
    </ChakraSelect>
  );
};
