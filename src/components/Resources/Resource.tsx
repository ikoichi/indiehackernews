import { Link } from "@chakra-ui/next-js";
import { Box, HStack, IconButton, Flex, Text } from "@chakra-ui/react";
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
    <Box>
      <HStack alignItems="baseline">
        <Text w="34px" textAlign="right">
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
        <Link href={url} target="_blank">
          {title}
        </Link>
        {url && (
          <Text fontSize="13px" color="whiteAlpha.600">
            ({domain})
          </Text>
        )}
      </HStack>
      <HStack
        ml="74px"
        fontSize="13px"
        color="whiteAlpha.600"
        alignItems="baseline"
      >
        <Text>
          {upvotes} upvotes by {username || ""}
        </Text>
        <Flex>•</Flex>
        <Text>{diffInTime}</Text>
        <Flex>•</Flex>
        <Link href={`/comments/${resourceId}`}>{comments} comments</Link>
      </HStack>
    </Box>
  );
};
