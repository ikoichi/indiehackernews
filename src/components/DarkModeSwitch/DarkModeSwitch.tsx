"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { TbMoon, TbSun } from "react-icons/tb";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
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
