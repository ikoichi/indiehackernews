import { extendTheme } from "@chakra-ui/react";

export const colorBlue = "#2962ff";

export const meshGradient = `
radial-gradient(at 40% 20%, hsla(21,77%,88%,1) 0px, transparent 50%),
radial-gradient(at 80% 0%, hsla(189,85%,91%,1) 0px, transparent 50%),
radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
radial-gradient(at 80% 50%, hsla(340,88%,89%,1) 0px, transparent 50%),
radial-gradient(at 0% 100%, hsla(11,70%,91%,1) 0px, transparent 50%),
radial-gradient(at 80% 100%, hsla(240,73%,90%,1) 0px, transparent 50%),
radial-gradient(at 0% 0%, hsla(333,57%,95%,1) 0px, transparent 50%)
`;

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

const baseTheme = {
  styles: {
    global: {
      '[role="menu"]': {
        p: "4px !important",
      },
      '[role="menuitem"]': {
        borderRadius: "8px",
      },
      '[role="menuitem"]:hover svg, [role="menuitem"]:focus svg': {
        fill: "blackAlpha.700",
      },
      '[role="menuitem"]:hover, [role="menuitem"]:focus': {
        bgColor: "blackAlpha.50",
      },
    },
    fontFamily,
  },
  fontFamily,
  radii: {
    none: "0",
    sm: "0.075rem",
    base: "0.125rem",
    md: "0.25rem",
    lg: "0.375rem",
    xl: "0.5rem",
    "2xl": "0.75rem",
    "3xl": "1rem",
    full: "9999px",
  },
  box: {
    color: "#333333",
    bgColor: "#F9FAFC",
    borderColor: "#E6EAF3",
    border: "0.87068px solid #E6EAF3",
    borderRadius: "16px",
    boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.03)",
  },
  lightBox: {
    color: "#333333",
    bgColor: "white",
    background: "#FFFFFF",
    boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.03)",
    borderRadius: "16px",
  },
  buttonGradient:
    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
  styledButton: {
    cursor: "pointer",
    border: "none",
    padding: "24px 64px",
    borderRadius: "16px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "29px",
    textAlign: "center",
    color: "#FFFFFF",
    bgColor: "#333333",
  },
  colors: {
    blue: colorBlue,
    blueDark: "#1b4edc",
    primaryDark: "#7e306c",
    primaryExtraLight: "#ffeffb",
    primary: {
      10: "#ffeffb",
      50: "#fdbfef",
      100: "#fda0e7",
      200: "#fc80df",
      300: "#fb70db",
      400: "#fb60d7",
      500: "#e256c2",
      600: "#c94dac",
      700: "#b04397",
      800: "#973a81",
      900: "#7e306c",
    },
    black: {
      50: "#00000011",
      100: "#00000033",
      200: "#00000055",
      300: "#00000066",
      400: "#00000088",
      500: "#00000099",
      600: "#000000aa",
      700: "#000000cc",
      800: "#000000",
      900: "#000000",
    },
  },
};

export const theme = extendTheme(baseTheme, {
  components: {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
    IconButton: { baseStyle: { _focus: { boxShadow: "none" } } },
  },
});
