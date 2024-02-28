import { chakra, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { theme } from "../../theme";

export const Tooltip = chakra(ChakraTooltip, {
  baseStyle: {
    bgColor: theme.colors.gray["700"],
    color: "white",
    border: "none",
    fontSize: "11px",
    borderRadius: "4px",
    fontWeight: 600,
    boxShadow: theme.shadows.sm,
    lineHeight: "14px",
    zIndex: 24,
    p: "4px 8px",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
});
