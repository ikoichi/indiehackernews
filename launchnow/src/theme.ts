import { extendTheme, theme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: theme.colors.teal["50"],
    100: theme.colors.teal["100"],
    200: theme.colors.teal["200"],
    300: theme.colors.teal["300"],
    400: theme.colors.teal["400"],
    500: theme.colors.teal["500"],
    600: theme.colors.teal["600"],
    700: theme.colors.teal["700"],
    800: theme.colors.teal["800"],
    900: theme.colors.teal["900"],
  },
};

export const customTheme = extendTheme({ colors });
