import { CommentsWithUserAndReplies } from "@/app/api/resources/[id]/comments/route";
import { Comment } from "@/components/Comments/Comment";
import { getDiffInTime } from "../Resources/resource.utils";
import { VStack } from "@chakra-ui/react";

type Props = {
  comment: CommentsWithUserAndReplies;
  onCreateReply: (text: string, parentCommentId?: string) => Promise<void>;
  isLoading: boolean;
};

export const CommentWithReplies = ({
  comment,
  onCreateReply,
  isLoading,
}: Props) => {
  return (
    <>
      <Comment
        commentId={comment.id}
        resourceId={comment.resourceId}
        userName={comment.user.name || ""}
        diffInTime={getDiffInTime(new Date(comment.createdAt))}
        text={comment.text}
        onCreateReply={onCreateReply}
        isLoading={isLoading}
      />
      {comment.replies && comment.replies.length > 0 && (
        <VStack
          ml="16px"
          pl="16px"
          borderLeft="2px solid"
          borderColor="whiteAlpha.200"
          spacing="24px"
          alignItems="flex-start"
        >
          {comment.replies.map((reply) => (
            <CommentWithReplies
              key={reply.id}
              comment={reply}
              onCreateReply={onCreateReply}
              isLoading={isLoading}
            />
          ))}
        </VStack>
      )}
    </>
  );
};
