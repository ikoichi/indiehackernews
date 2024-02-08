import React from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Routes } from "../../../data/routes";
import { AccountMenu } from "@/components/AccountMenu/AccountMenu";
import { useSession } from "next-auth/react";
import { useMobile } from "@/hooks/useMobile";
import { SidebarMenuItems } from "./SidebarMenuItems";

export const sidebarWidth = "240px";

type SideBarProps = {
  currentPage: Routes;
};

export const SideBar: React.FC<SideBarProps> = ({ currentPage }) => {
  const isMobile = useMobile();

  const { data: session } = useSession();

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
      borderColor="blackAlpha.300"
    >
      <SidebarMenuItems currentPage={currentPage} />

      <Flex position="absolute" bottom="0" left="0" w="100%" px="12px">
        <AccountMenu
          userEmail={session?.user?.email || ""}
          userName={session?.user?.name || ""}
          userPictureUrl={session?.user?.image || ""}
        />
      </Flex>
    </Flex>
  );
};
