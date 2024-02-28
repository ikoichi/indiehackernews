"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Brand } from "../../../../extension/src/components/atoms/Brand/Brand";
import { theme } from "../../../../extension/src/components/theme";
import { extensionName } from "../../../../extension/src/config";

const Triangle = () => {
  return (
    <Flex>
      <Box
        w="0"
        h="0"
        borderLeft="5px solid transparent"
        borderRight="5px solid transparent"
        borderBottom="5px solid black"
        borderBottomColor={theme.box.bgColor}
      />
    </Flex>
  );
};

export const ExtensionWelcome = () => {
  const { status, data: session } = useSession();

  const [showHelper, setShowHelper] = useState(true);

  return (
    <Flex w="100vw" minH="100vh" alignItems="center">
      <Center alignItems="center" justifyContent="center" w="100vw">
        {status === "loading" && <Spinner color="brand.500" />}
        {(status === "unauthenticated" || status === "authenticated") && (
          <>
            <VStack>
              {status === "authenticated" && (
                <Text>Welcome {session.user?.name || session.user?.email}</Text>
              )}
              <Heading>How to use this extension</Heading>
              <Text>
                Guide the user through the first steps to understand how to use
                the extension.
              </Text>
            </VStack>

            {showHelper && (
              <Flex>
                <Flex
                  w="100vw"
                  h="100vh"
                  bgColor="blackAlpha.900"
                  backdropFilter="blur(12px)"
                  position="fixed"
                  top="0"
                  right="0"
                  zIndex={9}
                />
                <Flex
                  position="fixed"
                  top="16px"
                  right="24px"
                  w="500px"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  color={theme.box.color}
                  bgColor={theme.box.bgColor}
                  boxShadow={theme.box.boxShadow}
                  padding="32px"
                  fontFamily={theme.styles.fontFamily}
                  borderRadius="8px"
                  zIndex={10}
                >
                  <Flex position="absolute" top="-5px" right="80px">
                    <Triangle />
                  </Flex>

                  <Flex
                    flexDir="column"
                    alignItems="center"
                    mb="16px"
                    color="#14202E"
                    w="100%"
                  >
                    <Text color="#14202E" fontWeight="semibold" fontSize="16px">
                      You successfully installed {extensionName}!
                    </Text>
                    <Flex w="40px" my="24px">
                      <Brand />
                    </Flex>
                    <Text>Pin the extension for easy access:</Text>
                  </Flex>

                  <Flex
                    borderRadius="8px"
                    mb="24px"
                    border="1px solid black"
                    borderColor="blackAlpha.200"
                    overflow="hidden"
                  >
                    <video
                      src="https://d19ad4knscjax5.cloudfront.net/pin_extension.mp4"
                      width="484"
                      height="302"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </Flex>
                  <Flex mt="16px">
                    <Button
                      p="16px 32px"
                      onClick={() => setShowHelper(false)}
                      colorScheme="brand"
                    >
                      I&apos;m all set
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </>
        )}
      </Center>
    </Flex>
  );
};
