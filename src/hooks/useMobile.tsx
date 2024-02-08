import { useBreakpointValue } from "@chakra-ui/react";

export const useMobile = () => {
  const isMobile = useBreakpointValue({
    base: true,
    xs: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
    "2xl": false,
  });

  return isMobile;
};
