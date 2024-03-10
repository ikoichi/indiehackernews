import { Link } from "@chakra-ui/next-js";
import {
  Box,
  HStack,
  IconButton,
  Flex,
  Text,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { TbTriangleFilled } from "react-icons/tb";

type ResourceProps = {
  number?: number;
  isUpvoted: boolean;
  onDownvote: () => void;
  onUpvote: () => void;
  isLoading: boolean;
  url: string;
  title: string;
  upvotes: number;
  comments: number;
  diffInTime: string;
  domain: string | null;
  username: string;
  resourceId: string;
};

export const Resource = ({
  number,
  isUpvoted,
  onDownvote,
  onUpvote,
  isLoading,
  url,
  title,
  upvotes,
  comments,
  diffInTime,
  domain,
  username,
  resourceId,
}: ResourceProps) => {
  return (
    <VStack alignItems="flex-start" spacing="0">
      <HStack alignItems="baseline">
        <Text w="24px" minW="24px" maxW="24px" textAlign="right">
          {!!number ? `${number}.` : ""}
        </Text>
        <IconButton
          icon={<TbTriangleFilled />}
          aria-label={""}
          size="xs"
          variant="ghost"
          color={isUpvoted ? "brand.500" : "whiteAlpha.600"}
          onClick={() => {
            if (isUpvoted) {
              onDownvote();
              return;
            }
            onUpvote();
          }}
          isLoading={isLoading}
        />
        <Stack direction={["column", null, "row"]} spacing="4px">
          <Link href={url} target="_blank" lineHeight="20px">
            {title}
          </Link>
          {url && (
            <Text fontSize="13px" color="whiteAlpha.600">
              ({domain})
            </Text>
          )}
        </Stack>
      </HStack>
      <Box
        display="inline-block"
        ml="64px"
        fontSize="13px"
        color="whiteAlpha.600"
        alignItems="baseline"
        sx={{
          "> *": {
            mr: "4px",
          },
        }}
      >
        <Text display="inline-block">
          {upvotes} upvotes by {username || ""}
        </Text>
        <Flex display="inline-block">•</Flex>
        <Text display="inline-block">{diffInTime}</Text>
        <Flex display="inline-block">•</Flex>
        <Link display="inline-block" href={`/comments/${resourceId}`}>
          {comments} comments
        </Link>
      </Box>
    </VStack>
  );
};
