import { useColorModeValue } from "@chakra-ui/react";

export const useColorModeValues = () => {
  const primaryTextColor = useColorModeValue(
    "blackAlpha.800",
    "whiteAlpha.800"
  );

  const secondaryTextColor = useColorModeValue(
    "blackAlpha.600",
    "whiteAlpha.600"
  );

  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  return { primaryTextColor, secondaryTextColor, borderColor };
};
