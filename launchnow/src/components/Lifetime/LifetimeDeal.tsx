import {
  Button,
  Flex,
  FlexProps,
  Heading,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { TbCheck } from "react-icons/tb";

const FeatureLine = ({ children }: { children: string | ReactElement }) => {
  return (
    <Flex alignItems="center">
      <Flex color="brand.400" mr="8px">
        <TbCheck />
      </Flex>
      <Text fontSize="14px" color="blackAlpha.700">
        {children}
      </Text>
    </Flex>
  );
};

export type LifetimeDealProps = {
  title: string;
  price?: number;
  isMostPopular?: boolean;
  isSuggested?: boolean;
  isLoading?: boolean;
  ctaText?: string;
  onClick?: () => void;
  features: string[];
} & Omit<FlexProps, "onClick">;

export const LifetimeDeal = ({
  title,
  price,
  onClick,
  isMostPopular = false,
  isSuggested = false,
  isLoading,
  features,
  ctaText,
  ...props
}: LifetimeDealProps) => {
  return (
    <Flex
      flexDir="column"
      p="32px"
      color="blackAlpha.800"
      border="1px solid gray"
      borderRadius={["24px", "24px", "24px", "24px", "0"]}
      mb={["16px", "16px", "16px", "16px", "0"]}
      minW={["340px", "375px", "400px", "400px", "100%"]}
      maxW="90%"
      borderRightWidth={["1px", "1px", "1px", "1px", "0"]}
      {...props}
      borderColor={isSuggested ? "brand.100" : "blackAlpha.100"}
    >
      {title && (
        <Heading
          fontSize="18px"
          mb="24px"
          fontWeight={700}
          flexDir="row"
          display="flex"
          color={isMostPopular ? "brand.500" : "blackAlpha.800"}
        >
          {title}
          <Spacer />
          {isMostPopular && (
            <Tag
              size="sm"
              h="24px"
              lineHeight="24px"
              bgColor="brand.50"
              color="brand.500"
              borderRadius="24px"
              fontSize="11px"
              fontWeight="semibold"
              p="6px 8px"
              ml="16px"
            >
              Most popular
            </Tag>
          )}
        </Heading>
      )}

      <Flex alignItems="end">
        {price && (
          <Text fontSize="36px" fontWeight="extrabold">
            ${price}
          </Text>
        )}
      </Flex>

      <VStack mt="24px" alignItems="flex-start" spacing="12px">
        {features.map((feature, index) => {
          return (
            <FeatureLine key={index}>
              <>{feature}</>
            </FeatureLine>
          );
        })}
      </VStack>

      <Spacer />

      <Button
        onClick={() => {
          if (onClick) {
            // @ts-ignore
            onClick();
          }
        }}
        variant="outline"
        justifySelf="flex-end"
        size="sm"
        lineHeight="40px"
        h="40px"
        mt="24px"
        borderRadius="8px"
        fontWeight={600}
        fontSize="13px"
        _hover={{
          bgColor: isMostPopular ? "brand.500" : "brand.50",
        }}
        bgColor={isMostPopular ? "brand.400" : "white"}
        color={isMostPopular ? "white" : "brand.500"}
        borderColor={isMostPopular ? "brand.400" : "brand.400"}
        isLoading={isLoading}
      >
        {ctaText || "Get lifetime deal"}
      </Button>
    </Flex>
  );
};
