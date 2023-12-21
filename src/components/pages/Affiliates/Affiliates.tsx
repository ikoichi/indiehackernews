"use client";

import React, { useState } from "react";
import {
  Text,
  Box,
  Container,
  Center,
  Button,
  HStack,
  Flex,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ListItem,
  UnorderedList,
  Heading,
} from "@chakra-ui/react";
import { TbCoin, TbPointer, TbShare } from "react-icons/tb";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { affiliateProgramLink, pricingPlans } from "@/config";
import { useColorModeValues } from "@/hooks/useColorModeValues";

// format currency value in the US format
const formatAmount = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export function Affiliates() {
  const { primaryTextColor } = useColorModeValues();

  const [hobbyValue, setHobbyValue] = useState(200);
  const [growthValue, setGrowthValue] = useState(120);
  const [proValue, setProValue] = useState(5);

  const totalEarn =
    (pricingPlans[0].monthlyPrice * growthValue +
      pricingPlans[0].monthlyPrice * hobbyValue +
      pricingPlans[0].monthlyPrice * proValue) *
    0.3;

  const onOpenAffiliate = () => window.open(affiliateProgramLink);

  const potentialEarnedMoney = formatAmount(totalEarn);

  return (
    <div>
      <Box minW="100vw" minH="100vh" position="relative">
        <Flex
          position="absolute"
          w="100vw"
          h="100%"
          top="0"
          left="0"
          bgGradient="radial-gradient(circle at 50% -140%, brand.100, transparent);"
          opacity={0.5}
          zIndex={-1}
        />
        <Flex
          w="100vw"
          h="800px"
          bgGradient="linear-gradient(267.2deg,brand.400,brand.50)"
          position="absolute"
          top="-500px"
          left="0"
          filter="blur(200px)"
          opacity="0.1"
          zIndex="-1"
          className="aaa"
        />
        <Header />
        <Container maxW="container.lg" flexDirection="column">
          <Center flexDirection="column">
            <Heading
              textAlign="center"
              mt="120px"
              mb="24px"
              fontSize={["36px", "40px", "40px", "52px"]}
              fontWeight={800}
              lineHeight={["40px", "40px", "40px", "60px"]}
              as="h1"
            >
              Be our affiliate
              <br />
              <Text
                bgGradient="linear(to-r, brand.500, brand.400)"
                backgroundClip="text"
              >
                Earn 30% commission.
              </Text>
            </Heading>
            <Text textAlign="center" sx={{ b: { color: "brand.500" } }} as="h2">
              Partner with us to earn a <b>recurring 30% commission</b> every
              month — <b>forever</b>!
            </Text>
            <Flex
              my="32px"
              gap="16px"
              flexDir={["column", "column", "column", "row"]}
            >
              <Button
                p="24px 32px"
                fontWeight={700}
                borderRadius="8px"
                variant="solid"
                colorScheme="brand"
                _hover={{
                  bgColor: "brand.400",
                }}
                _active={{
                  bgColor: "brand.500",
                }}
                size="lg"
                onClick={() => onOpenAffiliate()}
              >
                Join our affiliate program
              </Button>
            </Flex>

            <VStack mt="120px" gap="16px" mb="24px">
              <Heading
                fontSize="40px"
                fontWeight={800}
                flexDir={["column", "column", "column", "row"]}
                display="flex"
                alignItems="center"
                gap="8px"
              >
                You can earn{" "}
                <Box mx="8px" color="brandColor" fontWeight={800}>
                  {potentialEarnedMoney}
                </Box>{" "}
                every month
              </Heading>
              <Text textAlign="center">
                The calculation is based on monthly price
              </Text>
            </VStack>

            <VStack gap="24px" mt="24px">
              <Flex
                w="100%"
                gap="24px"
                flexDir={["column", "column", "column", "row"]}
              >
                <Text w="220px">
                  Hobby plan (${pricingPlans[0].monthlyPrice}/month)
                </Text>
                <Slider
                  aria-label="slider-personal"
                  defaultValue={hobbyValue}
                  max={500}
                  min={1}
                  minW={["200px", "300px", "300px", "300px"]}
                  w={["200px", "300px", "300px", "300px"]}
                  onChange={(val) => setHobbyValue(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack bgColor="brand.500" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text>{hobbyValue} referrals</Text>
              </Flex>
              <Flex
                w="100%"
                gap="24px"
                flexDir={["column", "column", "column", "row"]}
              >
                <Text w="220px">
                  Growth plan (${pricingPlans[1].monthlyPrice}
                  /month)
                </Text>
                <Slider
                  aria-label="slider-personal"
                  defaultValue={growthValue}
                  max={500}
                  min={1}
                  minW={["200px", "100%", "100%", "300px"]}
                  w={["200px", "100%", "100%", "300px"]}
                  onChange={(val) => setGrowthValue(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack bgColor="brand.500" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text>{growthValue} referrals</Text>
              </Flex>
              <Flex
                w="100%"
                gap="24px"
                flexDir={["column", "column", "column", "row"]}
              >
                <Text w="220px">
                  Pro plan (${pricingPlans[2].monthlyPrice}/month)
                </Text>
                <Slider
                  aria-label="slider-personal"
                  defaultValue={proValue}
                  max={100}
                  min={1}
                  minW={["200px", "300px", "300px", "300px"]}
                  w={["200px", "300px", "300px", "300px"]}
                  onChange={(val) => setProValue(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack bgColor="brand.500" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text>{growthValue} referrals</Text>
              </Flex>
            </VStack>

            <Heading
              textAlign="center"
              mt="80px"
              mb="16px"
              fontSize="40px"
              fontWeight={800}
            >
              How it works
            </Heading>
            <VStack alignItems="flex-start" gap="16px" mt="16px">
              <HStack>
                <Flex
                  p="8px"
                  borderRadius="14px"
                  bgColor="brand.300"
                  sx={{
                    svg: { stroke: "white" },
                  }}
                >
                  <TbPointer size="20px" />
                </Flex>
                <Text>
                  Sign up our affiliate program and get a unique link that can
                  be shared
                </Text>
              </HStack>
              <HStack>
                <Flex
                  p="8px"
                  borderRadius="14px"
                  bgColor="brand.300"
                  sx={{
                    svg: { stroke: "white" },
                  }}
                >
                  <TbShare size="20px" />
                </Flex>
                <Text>
                  Share your link with your friends, customers, clients...
                </Text>
              </HStack>
              <HStack>
                <Flex
                  p="8px"
                  borderRadius="14px"
                  bgColor="brand.300"
                  sx={{
                    svg: { stroke: "white" },
                  }}
                >
                  <TbCoin size="20px" />
                </Flex>
                <Text>
                  You&apos;ll get 30% recurring commission for every successful
                  referral
                </Text>
              </HStack>
            </VStack>

            <Heading
              textAlign="center"
              mt="80px"
              mb="16px"
              fontSize="40px"
              fontWeight={800}
            >
              Affiliate terms
            </Heading>
            <Text maxW="680px" textAlign="center">
              There are a few rules about our affiliate program you should know
              about.
              <br />
              No “gotchas” here, just some terms to keep everyone happy.
            </Text>
            <Flex maxW="680px">
              <UnorderedList
                color={primaryTextColor}
                mt="24px"
                px="32px"
                gap="16px"
                sx={{
                  li: {
                    mt: "12px",
                  },
                }}
              >
                <ListItem>
                  Self-referrals are not allowed (i.e. signing up for Userdesk
                  through your own affiliate link)
                </ListItem>
                <ListItem>
                  Abuse, gaming, or attempting to mislead (i.e. posting fake
                  discounts to coupon-sharing websites) will result in your
                  account being permanently banned.
                </ListItem>
                <ListItem>
                  In some cases, we can give credit to an affiliate even if the
                  customer didn&apos;t sign up through an affiliate link or
                  coupon code. If you have a case like this, please contact us
                  and we&apos;ll do our best to help.
                </ListItem>
                <ListItem>
                  No search engine ads (especially on branded terms or domain
                  names), Facebook ads or other ads that would compete with our
                  own marketing and cause potential confusion for customers.
                </ListItem>
                <ListItem>
                  No Facebook ads that link to our website or anything similar
                  that would compete with our own paid marketing and drive up
                  our costs and potentially cause confusion.
                </ListItem>
                <ListItem>
                  No pretending to be acting on behalf of us (ie. as an
                  employee).
                </ListItem>
                <ListItem>
                  We reserve the right to change the Terms of Service for our
                  affiliate program at any time.
                </ListItem>
              </UnorderedList>
            </Flex>

            <Heading
              textAlign="center"
              mt="140px"
              mb="16px"
              fontSize="40px"
              fontWeight={800}
              lineHeight="46px"
            >
              Ready to partner with us?
            </Heading>
            <Button
              p="24px 32px"
              fontWeight={700}
              borderRadius="8px"
              variant="solid"
              colorScheme="brand"
              _hover={{
                bgColor: "brand.400",
              }}
              _active={{
                bgColor: "brand.500",
              }}
              size="lg"
              mb="120px"
              mt="16px"
              onClick={() => onOpenAffiliate()}
            >
              Join our affiliate program
            </Button>
          </Center>
        </Container>
        <Footer />
      </Box>
    </div>
  );
}
