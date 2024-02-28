import {
  Button,
  ChakraProvider,
  Flex,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbCheck } from "react-icons/tb";
import { Brand } from "../../atoms/Brand/Brand";
import { GrayBox } from "../../atoms/GrayBox/GrayBox";
import { WidgetButton } from "../../atoms/WidgetButton/WidgetButton";
import { theme } from "../../theme";
import { baseUrl } from "../../../config";

export type PopupProps = {
  userName: string | undefined;
};

export const Popup: React.FC<PopupProps> = ({ userName }) => {
  return (
    <ChakraProvider theme={theme}>
      <GrayBox
        position="relative"
        top="0px"
        bottom="0px"
        left="0px"
        right="0px"
        height="260px"
        w="500px"
        padding="16px"
        fontSize="14px"
        flexDir="column"
        textAlign="left"
        overflow="hidden"
        borderRadius="0"
      >
        <Flex alignSelf="flex-start" w="24px">
          <Brand />
        </Flex>

        {!userName && (
          <Flex flexDir="column" mt="16px" zIndex={10}>
            <Text fontSize="16px" fontWeight="bold" color="#333333">
              Sign up now to unlock the full potential:
            </Text>
            <List spacing={3} mt="16px" fontWeight="500" color="gray.700">
              <ListItem>
                <ListIcon as={TbCheck} color={theme.colors.purple["600"]} />
                Create workspace
              </ListItem>
              <ListItem>
                <ListIcon as={TbCheck} color={theme.colors.purple["600"]} />
                Team members
              </ListItem>
              <ListItem>
                <ListIcon as={TbCheck} color={theme.colors.purple["600"]} />
                Personalized tasks
              </ListItem>
            </List>
            <Flex mt="16px" w="100px">
              <WidgetButton
                onClick={() => window.open(`${baseUrl}/login`)}
                _hover={{
                  bgColor: "black",
                }}
              >
                Sign up
              </WidgetButton>
            </Flex>
          </Flex>
        )}

        {userName && (
          <Flex flexDir="column" color={theme.colors.gray["600"]}>
            <Flex mt="24px">
              <Text>Welcome {userName}</Text>
            </Flex>
          </Flex>
        )}
      </GrayBox>
    </ChakraProvider>
  );
};

export default Popup;
