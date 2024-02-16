"use client";

import {
  Button,
  Flex,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import * as isEmail from "isemail";
import { brandName, signInCallbackUrl } from "@/config";
import Image from "next/image";
import { useColorModeValues } from "@/hooks/useColorModeValues";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/supabase/useSupabaseAuth";
import toast from "react-hot-toast";

const LoginWithEmailPassword = () => {
  const router = useRouter();

  const [isSigningInWithEmail, setSigningInWithEmail] = useState(false);

  const { onSignInWithEmailAndPassword } = useSupabaseAuth({
    onEmailAndPasswordSignInSuccess: () => {
      router.push(signInCallbackUrl);
    },
    onEmailAndPasswordSignInError: (err) => {
      console.error(err);
      toast.error(err?.message || "An error occurred");
      setSigningInWithEmail(false);
    },
  });
  const { primaryTextColor, borderColor, baseTextColor } = useColorModeValues();
  const boxBgColor = useColorModeValue("white", "transparent");

  const [isSigningInWithGoogle, setSigningInWithGoogle] = useState(false);
  const onGoogleSignIn = () => {
    setSigningInWithGoogle(true);
    signIn("google", {
      callbackUrl: signInCallbackUrl,
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailSignIn = async () => {
    setSigningInWithEmail(true);
    onSignInWithEmailAndPassword(email, password);
  };

  return (
    <Flex
      w="100vw"
      minH="100vh"
      alignItems="center"
      justifyContent="flex-start"
      flexDir="column"
    >
      <Button
        position="absolute"
        top="8px"
        left="8px"
        variant="ghost"
        leftIcon={<TbArrowNarrowLeft />}
        onClick={() => router.push("/")}
        _hover={{
          bgColor: "transparent",
        }}
      >
        Back
      </Button>
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
          border={["0", "1px solid"]}
          borderColor={[borderColor, borderColor]}
          alignItems="flex-start"
          position="relative"
          bgColor={boxBgColor}
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
            <Flex w="32px" h="32px" as="a" href="/">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
            </Flex>
            <Text color={primaryTextColor} fontWeight="extrabold" ml="8px">
              {brandName}
            </Text>
          </Flex>
          <Text textAlign="left" fontSize="18px" fontWeight="semibold" as="h1">
            Sign in to your account
          </Text>

          <Button
            my="24px"
            h="36px"
            variant="solid"
            size="sm"
            w="100%"
            leftIcon={<FcGoogle />}
            bgColor="transparent"
            border="1px solid"
            borderColor="brand.400"
            _hover={{
              bgColor: "transparent",
              borderColor: "brand.300",
            }}
            onClick={onGoogleSignIn}
            isLoading={isSigningInWithGoogle}
            color={primaryTextColor}
          >
            Continue with Google
          </Button>

          <Stack
            direction="row"
            w="100%"
            alignItems="center"
            spacing="16px"
            fontSize="12px"
            color={baseTextColor[500]}
          >
            <Flex w="100%" h="1px" bgColor={baseTextColor[100]}></Flex>
            <Flex>OR</Flex>
            <Flex w="100%" h="1px" bgColor={baseTextColor[100]}></Flex>
          </Stack>

          <Text mt="24px" fontSize="13px" fontWeight="semibold">
            Email
          </Text>
          <Input
            mt="4px"
            size="sm"
            borderRadius="4px"
            borderColor={borderColor}
            onChange={(e) => setEmail(e.target.value)}
            _focusWithin={{
              boxShadow: "none",
              borderColor: "brand.200",
            }}
            _placeholder={{
              color: baseTextColor[500],
            }}
            placeholder="john@doe.com"
          />

          <Text mt="24px" fontSize="13px" fontWeight="semibold">
            Password
          </Text>
          <Input
            mt="4px"
            size="sm"
            borderRadius="4px"
            borderColor={borderColor}
            onChange={(e) => setPassword(e.target.value)}
            _focusWithin={{
              boxShadow: "none",
              borderColor: "brand.200",
            }}
            _placeholder={{
              color: baseTextColor[500],
            }}
            placeholder="********"
            type="password"
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
            isDisabled={!isEmail.validate(email) || password.length < 6}
            _hover={{
              bgColor: "brand.300",
            }}
            _active={{
              bgColor: "brand.200",
            }}
          >
            Log in
          </Button>

          <Text mt="16px" fontSize="13px" color={baseTextColor[600]}>
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

export default LoginWithEmailPassword;
