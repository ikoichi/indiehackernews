import { Flex, Text } from "@chakra-ui/react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { Section } from "../atoms/Section/Section";

export const ExplainerVideo = () => {
  return (
    <Section mt="200px">
      <Flex flexDir="column" alignItems="center">
        <Text
          textAlign="center"
          mb="24px"
          color="brand.400"
          fontWeight={600}
          px="48px"
        >
          Watch how to make money in ~2 minutes
        </Text>

        <Flex
          sx={{
            img: {
              maxW: "calc(70vw - 48px)",
              opacity: 0.9,
            },
          }}
          position="relative"
          borderRadius={["8px", "8px", "16px", "16px"]}
          bgColor="black"
          overflow="hidden"
        >
          <Flex
            position="absolute"
            top="calc(50% - 32px)"
            left="calc(50% - 32px)"
            color="white"
            bgColor="brand.400"
            alignItems="center"
            justifyContent="center"
            borderRadius="100px"
            p="12px"
            cursor="pointer"
            zIndex={2}
            transition="all .15s linear"
            _hover={{
              transform: "scale(1.1)",
            }}
          >
            <TbPlayerPlayFilled size="40px" />
          </Flex>
          <img src={`https://placehold.co/800x600`} />
          {/* <video src="" /> */}
        </Flex>
      </Flex>
    </Section>
  );
};
