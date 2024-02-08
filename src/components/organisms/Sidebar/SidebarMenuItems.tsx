import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Link as NextJsChakraLink } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  chakra,
  Text,
  Link as ChakraLink,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  TbUsers,
  TbHeartHandshake,
  TbBrandHipchat,
  TbStar,
} from "react-icons/tb";
import { Routes } from "../../../data/routes";
import { brandName, cannyUrl } from "@/config";

type MenuItemProps = {
  route?: Routes | string;
  currentPage: Routes;
  children: any;
  isExternal?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  route,
  currentPage,
  children,
  isExternal = false,
  ...props
}) => {
  const menuItemColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
  const menuItemBgColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const menuItemActiveBgColor = useColorModeValue(
    "blackAlpha.50",
    "whiteAlpha.50"
  );

  const isActive = currentPage === route;
  const href = route && route.startsWith("http") ? route : `${route}`;

  const [isLoading, setLoading] = useState(false);
  return (
    <chakra.div
      w="100%"
      _hover={{
        bgColor: isActive ? menuItemActiveBgColor : menuItemBgColor,
      }}
      transition="background-color 0.2s ease-in-out"
      color={menuItemColor}
      bgColor={isActive ? menuItemBgColor : "transparent"}
      cursor="pointer"
      borderTopWidth="0"
      borderRadius="8px"
      mb={["0", "0", "0", "4px"]}
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="left"
      as={!route ? "button" : "div"}
      p="8px 16px"
      onClick={() => {
        if (!isActive && !isExternal && href.startsWith("/")) {
          setLoading(true);
        }
      }}
      sx={{
        ".Canny_BadgeContainer": {
          top: "16px",
          right: "8px",
        },
        ".Canny_Badge": {
          bgColor: "primary.500",
          overflow: "visible",
          border: "none",
          padding: 0,
          w: "6px",
          h: "6px",
        },
        ".Canny_Badge:after": {
          content: '""',
          zIndex: -1,
          w: "16px",
          h: "16px",
          top: "-5px",
          left: "-5px",
          position: "absolute",
          display: "block",
          boxSizing: "border-box",
          borderRadius: "45px",
          backgroundColor: "#b366b3",
          animation:
            "pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        },
      }}
      {...props}
    >
      {route && (
        <Link
          href={href}
          target={isExternal ? "_blank" : "_self"}
          passHref
          legacyBehavior
        >
          <ChakraLink
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="flex-start"
            flexDir="row"
            target={isExternal ? "_blank" : "_self"}
            _hover={{ textDecoration: "none" }}
            sx={{
              svg: {
                stroke: menuItemColor,
              },
            }}
            onClick={(e) => {
              if (!route) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
          >
            {children}
          </ChakraLink>
        </Link>
      )}
      {!route && (
        <Flex
          display="flex"
          flexGrow={1}
          alignItems="center"
          justifyContent="flex-start"
          flexDir="row"
          _hover={{ textDecoration: "none" }}
          sx={{
            svg: {
              stroke: "blackAlpha.800",
            },
          }}
        >
          {children}
        </Flex>
      )}
      {isLoading && <Spinner size="xs" color="blackAlpha.300" />}
    </chakra.div>
  );
};

type MenuLabelProps = {
  children: any;
};

export const MenuLabel: React.FC<MenuLabelProps> = ({ children }) => (
  <Box display="inline-block" fontWeight="500" fontSize="14px" ml="4px">
    {children}
  </Box>
);

type MenuProps = {
  currentPage: Routes;
};

export const SidebarMenuItems: React.FC<MenuProps> = ({ currentPage }) => {
  const sectionColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");

  return (
    <Box p="0" width="100%">
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center" mb="24px">
          <Flex
            w="32px"
            h="32px"
            mr="8px"
            overflow="hidden"
            bgColor="blackAlpha.200"
          >
            <Image src="/logo.png" alt="logo" width={32} height={32} />
          </Flex>
          <NextJsChakraLink
            w="100px"
            href={Routes.root}
            cursor="pointer"
            fontWeight="extrabold"
          >
            {brandName}
          </NextJsChakraLink>
        </Flex>

        <MenuItem route={Routes.dashboard} currentPage={currentPage}>
          <TbUsers size="16px" /> &nbsp;<MenuLabel>Dashboard</MenuLabel>
        </MenuItem>

        <Text
          fontSize="18px"
          fontWeight="semibold"
          letterSpacing="-0.45px"
          color={sectionColor}
          mt="16px"
          mb="4px"
          mx="8px"
        >
          Resources
        </Text>
        <MenuItem route={`/#pricing`} currentPage={currentPage} isExternal>
          <TbStar size="16px" /> &nbsp;
          <MenuLabel>Upgrade</MenuLabel>
        </MenuItem>
        <MenuItem
          route={Routes.affiliates}
          currentPage={currentPage}
          isExternal
        >
          <TbHeartHandshake size="16px" /> &nbsp;
          <MenuLabel>Affiliate program</MenuLabel>
        </MenuItem>
        <MenuItem route={cannyUrl} currentPage={currentPage} isExternal>
          <TbBrandHipchat size="16px" /> &nbsp;
          <MenuLabel>Feedback</MenuLabel>
        </MenuItem>
        {/* uncomment if you are using the Canny Changelog widget */}
        {/* <MenuItem currentPage={currentPage} data-canny-changelog isExternal>
          <TbSpeakerphone size="16px" /> &nbsp;
          <MenuLabel>What&apos;s new</MenuLabel>
        </MenuItem> */}
      </Flex>
    </Box>
  );
};
