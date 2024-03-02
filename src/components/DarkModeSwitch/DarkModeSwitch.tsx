"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { TbMoon, TbSun } from "react-icons/tb";
import { useTheme } from "next-themes";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { setTheme } = useTheme();

  return (
    <IconButton
      onClick={(e) => {
        toggleColorMode();
        setTheme(colorMode === "light" ? "dark" : "light");
      }}
      icon={colorMode === "light" ? <TbSun /> : <TbMoon />}
      aria-label={"dark mode switch"}
      variant="ghost"
      _hover={{
        bgColor: "transparent",
        color: "brand.500",
      }}
    />
  );
};
