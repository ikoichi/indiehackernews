"use client";

import { Button, Flex, Input, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import * as isEmail from "isemail";
import { brandName, signInCallbackUrl } from "@/config";
import Image from "next/image";

const Login = () => {
  const [isSigningInWithGoogle, setSigningInWithGoogle] = useState(false);
  const onGoogleSignIn = () => {
    setSigningInWithGoogle(true);
    signIn("google", {
      callbackUrl: signInCallbackUrl,
    });
  };

  const [isSigningInWithEmail, setSigningInWithEmail] = useState(false);
  const [email, setEmail] = useState("");
  const onEmailSignIn = () => {
    setSigningInWithEmail(true);
    signIn("email", {
      email,
      callbackUrl: signInCallbackUrl,
    });
  };

  return (
    <Flex
      w="100vw"
      minH="100vh"
      alignItems="center"
      justifyContent="flex-start"
      flexDir="column"
    >
      <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Flex
          flexDir="column"
          p="0 60px 40px"
          borderRadius="24px"
          boxShadow={["none", "lg"]}
          border={["0", "1px solid gray"]}
          borderColor={[
            "blackAlpha.50",
            "blackAlpha.50",
            "blackAlpha.50",
            "blackAlpha.50",
          ]}
          alignItems="flex-start"
          position="relative"
          bgColor="white"
          w="400px"
        >
          <Flex
            w={["360px", "480px", "560px", "640px", "780px"]}
            minW={["360px", "480px", "560px", "640px", "780px"]}
            h={["100px", "150px", "200px", "300px"]}
            minH={["100px", "150px", "200px", "300px"]}
            bgGradient="linear-gradient(267.2deg,brand.100,brand.300)"
            position="absolute"
            top="200px"
            right={["-20px", "-40px", "-80px", "-120px", "-190px"]}
            filter="blur(200px)"
            opacity="0.2"
            zIndex="-1"
          />
          <Flex
            alignItems="center"
            justifyContent="center"
            alignSelf="center"
            color="white"
            fontSize="18px"
            mb="64px"
            mt="-60px"
            ml="0px"
          >
            <Flex w="32px" h="32px">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
            </Flex>
            <Text color="blackAlpha.700" fontWeight="extrabold" ml="8px">
              {brandName}
            </Text>
          </Flex>
          <Text
            color="blackAlpha.800"
            textAlign="left"
            fontSize="18px"
            fontWeight="semibold"
            as="h1"
          >
            Sign in to your account
          </Text>

          <Button
            my="24px"
            h="36px"
            variant="solid"
            size="sm"
            w="100%"
            leftIcon={<FcGoogle />}
            bgColor="white"
            border="1px solid"
            borderColor="brand.400"
            _hover={{
              bgColor: "white",
              borderColor: "brand.300",
            }}
            onClick={onGoogleSignIn}
            isLoading={isSigningInWithGoogle}
          >
            Continue with Google
          </Button>

          <Stack
            direction="row"
            w="100%"
            alignItems="center"
            spacing="16px"
            fontSize="12px"
            color="blackAlpha.500"
          >
            <Flex w="100%" h="1px" bgColor="blackAlpha.100"></Flex>
            <Flex>OR</Flex>
            <Flex w="100%" h="1px" bgColor="blackAlpha.100"></Flex>
          </Stack>

          <Text
            mt="24px"
            fontSize="13px"
            fontWeight="semibold"
            color="blackAlpha.800"
          >
            Email
          </Text>
          <Input
            mt="4px"
            size="sm"
            borderRadius="4px"
            borderColor="blackAlpha.200"
            onChange={(e) => setEmail(e.target.value)}
            _focusWithin={{
              boxShadow: "none",
              borderColor: "brand.200",
            }}
            _placeholder={{
              color: "blackAlpha.500",
            }}
          />

          <Button
            color="white"
            size="sm"
            h="36px"
            bgColor="brand.400"
            w="100%"
            mt="24px"
            onClick={() => onEmailSignIn()}
            isLoading={isSigningInWithEmail}
            isDisabled={!isEmail.validate(email)}
            _hover={{
              bgColor: "brand.300",
            }}
            _active={{
              bgColor: "brand.200",
            }}
          >
            Log in
          </Button>

          <Text mt="16px" fontSize="13px" color="blackAlpha.600">
            Don&apos;t have an account?
            <Link href="/signup" ml="4px" color="brand.500">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
