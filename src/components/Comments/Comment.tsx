import { Flex, VStack, Text, Button, Textarea, HStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type CommentProps = {
  resourceId: string;
  commentId: string;
  userName: string;
  diffInTime: string;
  text: string;
  onCreateReply: (text: string, parentCommentId?: string) => void;
};

export const Comment = ({
  resourceId,
  commentId,
  userName,
  diffInTime,
  text,
  onCreateReply,
}: CommentProps) => {
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [parentCommentId, setParentCommentId] = useState<string | undefined>(
    undefined
  );
  const [replyText, setReplyText] = useState("");

  return (
    <VStack alignItems="flex-start" spacing="2px">
      <HStack fontSize="13px" color="whiteAlpha.600" alignItems="baseline">
        <Text>{userName}</Text>
        <Flex>•</Flex>
        <Text>{diffInTime}</Text>
      </HStack>
      <Text>{text}</Text>
      <Button
        size="sm"
        variant="link"
        textDecor="underline"
        onClick={() => {
          setReplyOpen(!isReplyOpen);
          setParentCommentId(commentId);
        }}
        color="whiteAlpha.700"
        _hover={{
          color: "whiteAlpha.900",
        }}
      >
        reply
      </Button>

      {isReplyOpen && (
        <VStack alignItems="flex-start" mt="8px">
          <Textarea
            w="640px"
            borderColor="whiteAlpha.300"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button
            alignSelf="flex-start"
            size="sm"
            colorScheme="brand"
            isDisabled={!replyText}
            onClick={() => onCreateReply(replyText, parentCommentId)}
          >
            Add reply
          </Button>
        </VStack>
      )}
    </VStack>
  );
};
