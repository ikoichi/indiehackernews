import { ThemeConfig, extendTheme, theme } from "@chakra-ui/react";

export const colors = {
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

const components = {
  Input: {
    baseStyle: {
      field: {
        borderColor: "rgba(0, 0, 0, 0.16)",
        _focusVisible: {
          boxShadow: `0 0 0 3px #319795`,
        },
      },
    },
  },
  Tooltip: {
    baseStyle: {
      p: "8px 16px",
      borderRadius: "6px",
      boxShadow: "sm",
      bgColor: "white",
      color: "blackAlpha.700",
      border: "1px solid",
      borderColor: "blackAlpha.50",
      fontWeight: 500,
      fontSize: "12px",
    },
  },
};

export const customTheme = extendTheme({
  colors,
  components,
  shadows: { outline: `0 0 0 3px ${colors.brand["100"]}` },
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },
});
