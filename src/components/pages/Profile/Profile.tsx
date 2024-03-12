"use client";

import {
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { brandName } from "@/config";
import { useColorModeValues } from "@/hooks/useColorModeValues";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Brand } from "../../../../extension/src/components/atoms/Brand/Brand";
// @ts-ignore
import { ProtectedPage } from "../ProtectedPage/ProtectedPage";
import { useProfile } from "@/hooks/useProfile";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";

const Submit = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { primaryTextColor, borderColor, baseTextColor } = useColorModeValues();
  const boxBgColor = useColorModeValue("white", "transparent");

  const [resourceType, setResourceType] = useState<"url" | "text">("url");

  const [nickname, setNickname] = useState("");

  const { profile, onUpdateProfile, updateProfile } = useProfile();

  const onUpdate = () => {
    onUpdateProfile(nickname, {
      onError: (err: unknown) => {
        // @ts-ignore
        toast.error(err?.response?.data?.error || "Error updating profile");
      },
      onSuccess: () => {
        toast.success("Profile updated");
      },
    });
  };

  return (
    <ProtectedPage>
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
            w="90%"
            maxW="400px"
          >
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
              <Flex w="auto" h="32px" as="a" href="/" alignItems="center">
                <Brand />
              </Flex>
              <Text color={primaryTextColor} fontWeight="extrabold" ml="8px">
                {brandName}
              </Text>
            </Flex>
            <VStack alignItems="flex-start" spacing="4px">
              <Text
                textAlign="left"
                fontSize="18px"
                fontWeight="semibold"
                as="h1"
              >
                Profile
              </Text>
              <Text textAlign="left" fontSize="14px" color="whiteAlpha.700">
                Your settings
              </Text>
              <Text mt="24px" fontSize="13px" fontWeight="semibold">
                Email
              </Text>
              <Text textAlign="left" fontSize="14px" color="whiteAlpha.700">
                {session?.user?.email}
              </Text>
            </VStack>

            <Text mt="24px" fontSize="13px" fontWeight="semibold">
              Nickname
            </Text>
            <Input
              mt="4px"
              size="sm"
              borderRadius="4px"
              defaultValue={profile?.name || ""}
              borderColor={borderColor}
              onChange={(e) => setNickname(e.target.value)}
              _focusWithin={{
                boxShadow: "none",
                borderColor: "brand.200",
              }}
              _placeholder={{
                color: baseTextColor[500],
              }}
            />

            <VStack w="100%" spacing="12px" mt="24px">
              <Button
                color="brand.900"
                size="sm"
                h="36px"
                bgColor="brand.400"
                w="100%"
                _hover={{
                  bgColor: "brand.300",
                }}
                _active={{
                  bgColor: "brand.200",
                }}
                onClick={onUpdate}
                isLoading={updateProfile.isPending}
                isDisabled={!nickname}
              >
                Update
              </Button>

              <Button
                variant="outline"
                size="sm"
                h="36px"
                w="100%"
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: "/",
                  })
                }
              >
                Log out
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </ProtectedPage>
  );
};

export default Submit;
