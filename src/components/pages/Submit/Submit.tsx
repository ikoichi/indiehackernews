"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { brandName } from "@/config";
import { useColorModeValues } from "@/hooks/useColorModeValues";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Brand } from "../../../../extension/src/components/atoms/Brand/Brand";
// @ts-ignore
import isUrl from "is-url";
import { Link } from "@chakra-ui/next-js";
import { Routes } from "@/data/routes";
import { ProtectedPage } from "../ProtectedPage/ProtectedPage";
import axios from "axios";
import toast from "react-hot-toast";
import { useProfile } from "@/hooks/useProfile";

type ResourcePayload = { title: string; url?: string; text?: string };

const Submit = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const { primaryTextColor, borderColor, baseTextColor } = useColorModeValues();
  const boxBgColor = useColorModeValue("white", "transparent");

  const [resourceType, setResourceType] = useState<"url" | "text">("url");

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = ({ title, url, text }: ResourcePayload) => {
    setSubmitting(true);
    axios
      .post("/api/resources", {
        title,
        url,
        text,
      })
      .then(() => {
        toast.success("Resource submitted");
      })
      .catch(() => {
        toast.error("Error submitting resource");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const isSubmitEnabled = () => {
    if (!profile?.name) {
      return false;
    }
    if (resourceType === "url") {
      return title && url && isUrl(url);
    } else {
      return title && text;
    }
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
            maxW="510px"
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
                Submit
              </Text>
              <Text textAlign="left" fontSize="14px" color="whiteAlpha.700">
                Stories, articles, videos, podcasts, tools, updates, and more.
              </Text>
            </VStack>

            {!profile?.name && (
              <Alert status="warning" borderRadius="8px" mt="24px">
                <AlertIcon />
                <AlertDescription>
                  <Link href={Routes.profile} textDecor="underline">
                    Set your nickname
                  </Link>{" "}
                  before submitting
                </AlertDescription>
              </Alert>
            )}

            <Text mt="24px" fontSize="13px" fontWeight="semibold">
              Title
            </Text>
            <Input
              mt="4px"
              size="sm"
              borderRadius="4px"
              borderColor={borderColor}
              onChange={(e) => setTitle(e.target.value)}
              _focusWithin={{
                boxShadow: "none",
                borderColor: "brand.200",
              }}
              _placeholder={{
                color: baseTextColor[500],
              }}
            />

            {/* <Flex mt="32px">
              <Tabs
                items={[
                  {
                    value: "url",
                    label: "URL",
                  },
                  {
                    value: "text",
                    label: "Text",
                  },
                ]}
                onChange={(value) => setResourceType(value as "url" | "text")}
              />
            </Flex> */}

            <Flex flexDir="column" mt="16px" w="100%">
              {resourceType === "url" && (
                <>
                  <Text mt="8px" fontSize="13px" fontWeight="semibold">
                    URL
                  </Text>
                  <Input
                    mt="4px"
                    size="sm"
                    borderRadius="4px"
                    borderColor={borderColor}
                    placeholder="https://example.com"
                    onChange={(e) => setUrl(e.target.value)}
                    _focusWithin={{
                      boxShadow: "none",
                      borderColor: "brand.200",
                    }}
                    _placeholder={{
                      color: baseTextColor[500],
                    }}
                  />
                </>
              )}

              {resourceType === "text" && (
                <>
                  <Text mt="8px" fontSize="13px" fontWeight="semibold">
                    Text
                  </Text>
                  <Text mt="2px" fontSize="13px" color="whiteAlpha.700">
                    Ask a question or start a discussion.
                  </Text>
                  <Textarea
                    mt="6px"
                    size="sm"
                    borderRadius="4px"
                    borderColor={borderColor}
                    onChange={(e) => setText(e.target.value)}
                    _focusWithin={{
                      boxShadow: "none",
                      borderColor: "brand.200",
                    }}
                    _placeholder={{
                      color: baseTextColor[500],
                    }}
                  />
                </>
              )}
            </Flex>

            <Button
              color="brand.900"
              size="sm"
              h="36px"
              bgColor="brand.400"
              w="100%"
              mt="24px"
              _hover={{
                bgColor: "brand.300",
              }}
              _active={{
                bgColor: "brand.200",
              }}
              isDisabled={!isSubmitEnabled()}
              isLoading={isSubmitting}
              onClick={() => onSubmit({ title, url, text })}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ProtectedPage>
  );
};

export default Submit;
