import { ComponentWithAs, Flex, FlexProps } from "@chakra-ui/react";

export const Section: ComponentWithAs<"div", FlexProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex
      mt="120px"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  );
};
