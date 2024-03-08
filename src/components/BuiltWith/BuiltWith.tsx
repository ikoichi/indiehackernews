import { Stack, Text } from "@chakra-ui/react";
import { ShippedLogoSmall } from "../ShippedLogo/ShippedLogo";

export const BuiltWith = () => {
  return (
    <Stack
      direction="row"
      border="1px solid"
      borderColor="whiteAlpha.200"
      color="whiteAlpha.700"
      bgColor="whiteAlpha.50"
      p="4px 6px"
      borderRadius="8px"
      alignItems="center"
      as="a"
      href="https://shipped.club"
      target="_blank"
      fontSize="12px"
      transition="all .15s linear"
      _hover={{
        color: "whiteAlpha.700",
        bgColor: "whiteAlpha.100",
        borderColor: "whiteAlpha.300",
      }}
    >
      <Text>Built with</Text>
      <Stack direction="row" spacing="4px" alignItems="center">
        <ShippedLogoSmall />
        <Text fontWeight="bold" color="purple.400">
          Shipped.club
        </Text>
      </Stack>
    </Stack>
  );
};
