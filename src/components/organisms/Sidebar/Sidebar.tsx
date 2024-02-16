import React from "react";
import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Routes } from "../../../data/routes";
import { AccountMenu } from "@/components/AccountMenu/AccountMenu";
import { useSession } from "next-auth/react";
import { useMobile } from "@/hooks/useMobile";
import { MenuLabel, SidebarMenuItems } from "./SidebarMenuItems";
import { DarkModeSwitch } from "@/components/DarkModeSwitch/DarkModeSwitch";
import { useColorModeValues } from "@/hooks/useColorModeValues";

export const sidebarWidth = "240px";

type SideBarProps = {
  currentPage: Routes;
};

export const SideBar: React.FC<SideBarProps> = ({ currentPage }) => {
  const isMobile = useMobile();
  const { borderColor } = useColorModeValues();

  const { data: session } = useSession();

  const [loadingRoute, setLoadingRoute] = React.useState<Routes | string>(
    "" as Routes
  );

  return (
    <Flex
      h="100vh"
      minW={sidebarWidth}
      maxW={sidebarWidth}
      p="8px 12px"
      flexDirection="column"
      justifyItems="flex-start"
      position="fixed"
      top="0"
      bottom="auto"
      left="0"
      pt="24px"
      marginInlineStart={"0 !important"}
      zIndex="10"
      borderRight={isMobile ? "none" : "1px solid"}
      borderColor={borderColor}
    >
      <SidebarMenuItems
        currentPage={currentPage}
        loadingRoute={loadingRoute}
        onMenuItemClick={setLoadingRoute}
      />

      <Stack
        direction="column"
        alignItems="flex-start"
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
      >
        <HStack px="12px">
          <MenuLabel>Color mode</MenuLabel>
          <DarkModeSwitch />
        </HStack>
        <Flex
          borderTop="1px solid"
          borderColor={borderColor}
          w="100%"
          px="12px"
          pt="8px"
        >
          <AccountMenu
            userEmail={session?.user?.email || ""}
            userName={session?.user?.name || ""}
            userPictureUrl={session?.user?.image || ""}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
