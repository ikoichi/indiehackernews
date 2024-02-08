"use client";

import { Button, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

type TabItem = {
  value: string;
  label?: string | React.ReactNode;
  icon?: React.ReactElement;
  tabContent?: React.ReactNode;
};

type TabsProps = {
  label?: string;
  items: TabItem[];
  onChange?: (value: string) => void;
  w?: string;
};

const getComponent = (item: TabItem) => {
  if (item.label && item.icon) {
    return Button;
  }

  if (item.label) {
    return Button;
  }

  if (item.icon) {
    return IconButton;
  }

  return Flex;
};

export const Tabs = ({ label, items, onChange, w }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<TabItem["value"]>(
    items?.[0]?.value
  );

  return (
    <Stack alignItems="flex-start" direction="column" width={w || "auto"}>
      {label && (
        <Text fontWeight={500} color="blackAlpha.800" fontSize="14px">
          {label}
        </Text>
      )}
      <Stack
        borderRadius="8px"
        overflow="hidden"
        p="4px"
        bgColor="blackAlpha.100"
        direction="row"
        width={w || "auto"}
      >
        {items.map((item) => {
          const Component = getComponent(item);
          return (
            <Component
              key={item.value}
              variant="ghost"
              {...(item.icon ? { icon: item?.icon || undefined } : {})}
              {...(item.icon && item.label
                ? { leftIcon: item?.icon || undefined }
                : {})}
              _hover={{
                bgColor: "none",
              }}
              _active={{
                bgColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px",
              }}
              size="xs"
              px="20px"
              py="6px"
              h="28px"
              aria-label={item.value}
              bgColor={activeTab === item.value ? "white" : ""}
              boxShadow={
                activeTab === item.value
                  ? "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px"
                  : ""
              }
              onClick={() => {
                setActiveTab(item.value);
                onChange?.(item.value);
              }}
              flexGrow={1}
              color={activeTab === item.value ? "gray.700" : "gray.500"}
              sx={{
                svg: {
                  w: "16px",
                  h: "16px",
                },
              }}
            >
              {item.label}
            </Component>
          );
        })}
      </Stack>

      <Flex
        pl={["0", "16px", "16px", "0"]}
        transform={[
          "scale(0.59) translateX(0px)  translateY(-36px)",
          "scale(0.7) translateX(-146px) translateY(-20px)",
          "scale(0.7) translateX(-146px) translateY(-20px)",
          "scale(1)",
          "scale(1)",
        ]}
        w={w || "auto"}
      >
        {activeTab &&
          items.find((item) => item.value === activeTab)?.tabContent}
      </Flex>
    </Stack>
  );
};
