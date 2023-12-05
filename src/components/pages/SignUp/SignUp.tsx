"use client";

import { Button, Flex, Input, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import * as isEmail from "isemail";
import { Testimonial } from "@/components/Testimonials/Testimonial";
import { testimonials } from "@/components/Testimonials/Testimonials";
import { signIn } from "next-auth/react";
import { brandName } from "@/config";
import Image from "next/image";

const SignUp = () => {
  const [isSigningUpWithGoogle, setSigningUpWithGoogle] = useState(false);
  const onGoogleSignUp = () => {
    setSigningUpWithGoogle(true);
    signIn("google", {
      callbackUrl: window?.location ? `${window.location.origin}/app` : "",
    });
  };

  const [isSigningUpWithEmail, setSigningUpWithEmail] = useState(false);
  const [email, setEmail] = useState("");
  const onEmailSignUp = () => {
    setSigningUpWithEmail(true);
    signIn("email", {
      email,
      callbackUrl: window?.location ? `${window.location.origin}/app` : "",
    });
  };

  return (
    <Flex
      w="100vw"
      minH="100vh"
      alignItems="center"
      justifyContent="flex-start"
      flexDir="row"
    >
      <Flex
        w={["100vw", "100vw", "100vw", "50vw"]}
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Flex
          flexDir="column"
          p="0 60px 40px"
          borderRadius="24px"
          boxShadow={["none", "lg", "lg", "none"]}
          borderColor={[
            "blackAlpha.50",
            "blackAlpha.50",
            "blackAlpha.50",
            "blackAlpha.50",
          ]}
          alignItems="flex-start"
          position="relative"
          bgColor="white"
          w={["100%", "400px", "400px", "496px"]}
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
            display={["block", null, null, "none"]}
          />
          <Flex
            alignItems="center"
            justifyContent="center"
            alignSelf="center"
            color="white"
            fontSize="18px"
            mb={["64px", null, null, "32px"]}
            mt="-60px"
          >
            <Flex w="30px" h="30px">
              <Image src="/logo.png" alt="logo" width={30} height={30} />
            </Flex>
          </Flex>
          <Text
            color="blackAlpha.800"
            textAlign={["left", "left", "left", "center"]}
            fontSize="18px"
            fontWeight="semibold"
            as="h1"
            w="100%"
            mb={[0, null, null, "16px"]}
          >
            Sign up to {brandName}
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
            onClick={onGoogleSignUp}
            isLoading={isSigningUpWithGoogle}
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
            size="sm"
            borderRadius="4px"
            borderColor="blackAlpha.200"
            mt="4px"
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
            onClick={() => onEmailSignUp()}
            isLoading={isSigningUpWithEmail}
            isDisabled={!isEmail.validate(email)}
            _hover={{
              bgColor: "brand.300",
            }}
            _active={{
              bgColor: "brand.200",
            }}
          >
            Create account
          </Button>

          <Text
            mt="16px"
            fontSize="14px"
            color="blackAlpha.700"
            alignSelf="center"
          >
            Have an account?
            <Link href="/login" ml="4px" color="brand.500">
              Sign in
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        w="50vw"
        h="100vh"
        display={["none", "none", "none", "flex"]}
        bgColor="brand.300"
        alignItems="center"
        justifyContent="center"
      >
        <Flex p="32px" bgColor="white" borderRadius="24px" mx="60px">
          <Testimonial
            text={testimonials[0].text}
            name={testimonials[0].name}
            highlightSentences={testimonials[0].highlightSentences}
            job={testimonials[0].job}
            pictureUrl={testimonials[0].pictureUrl}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
