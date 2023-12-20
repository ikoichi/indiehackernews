"use client";

import { useColorModeValues } from "@/hooks/useColorModeValues";
import {
  Menu,
  MenuButton,
  Flex,
  Avatar,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { TbSelector, TbLogout, TbCreditCard } from "react-icons/tb";

type AccountMenuProps = {
  userName: string;
  userEmail: string;
  userPictureUrl: string;
};

export const AccountMenu = ({
  userName,
  userEmail,
  userPictureUrl,
}: AccountMenuProps) => {
  const { primaryTextColor, secondaryTextColor } = useColorModeValues();

  const onLoadCustomerPortal = async () => {
    const response = await axios.get("/api/subscriptions");
    if (response?.data?.customerPortalUrl) {
      window.open(response.data.customerPortalUrl, "_blank");
      return;
    }

    toast.error("You don't have an active subscription");
  };

  return (
    <Menu colorScheme="blackAlpha">
      <MenuButton
        mb="8px"
        p="8px"
        display="flex"
        flexDir="row"
        alignItems="center"
      >
        <Flex alignItems="center">
          <Flex mr="8px">
            <Avatar src={userPictureUrl} size="sm" />
          </Flex>
          <Flex flexDir="column" fontSize="13px" alignItems="flex-start">
            <Text fontWeight="semibold" color={primaryTextColor}>
              {userName}
            </Text>
            <Text
              color={secondaryTextColor}
              fontSize="12px"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              w="140px"
              display="flex"
            >
              {userEmail}
            </Text>
          </Flex>
          <Flex ml="8px" color={secondaryTextColor}>
            <TbSelector size="24px" />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList fontSize="13px" color={primaryTextColor} ml="4px">
        <MenuItem onClick={() => onLoadCustomerPortal()}>
          <Flex mr="8px">
            <TbCreditCard size="16px" />
          </Flex>
          Billing
        </MenuItem>

        <MenuItem
          onClick={() => {
            signOut({
              callbackUrl: "/",
            });
          }}
        >
          <Flex mr="8px">
            <TbLogout size="16px" />
          </Flex>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
