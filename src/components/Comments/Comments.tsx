"use client";

import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Textarea,
  VStack,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Resource } from "../Resources/Resource";
import {
  getDiffInTime,
  extractDomainFromUrl,
} from "../Resources/resource.utils";
import { useIsLogged } from "@/hooks/useIsLogged";
import { useState } from "react";
import { GetCommentsResponse } from "@/app/api/resources/[id]/comments/route";
import { CommentWithReplies } from "./CommentWithReplies";
import { Routes } from "@/data/routes";
import { Link } from "@chakra-ui/next-js";

type CommentsProps = {
  resourceId: string;
};

export const Comments = ({ resourceId }: CommentsProps) => {
  const queryKey = ["comments", resourceId];

  const { isLogged, isLoading: isLoadingUser } = useIsLogged();

  const {
    data: resourceData,
    isLoading: isLoadingResource,
    refetch: refetchResource,
  } = useQuery({
    queryKey: ["resource", resourceId],
    queryFn: () =>
      fetch(`/api/resources/${resourceId}`).then((res) => res.json()),
  });

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useQuery<GetCommentsResponse>({
    queryKey: queryKey,
    queryFn: () =>
      fetch(`/api/resources/${resourceId}/comments`).then((res) => res.json()),
  });

  const { mutate: createComment, isPending: isPendingCreateComment } =
    useMutation({
      mutationKey: queryKey,
      mutationFn: ({
        comment,
        parentCommentId,
      }: {
        comment: string;
        parentCommentId?: string;
      }) =>
        fetch(`/api/resources/${resourceId}/comments`, {
          method: "POST",
          body: JSON.stringify({ text: comment, parentCommentId }),
        }).then((res) => res.json()),
      onSuccess: () => {
        refetchResource();
        refetchComments();

        toast.success("Comment added");
      },
      onError: (err, variables, context) => {
        toast.error("Error adding comment");
      },
    });

  const resource = resourceData?.resource || {};
  const comments = commentsData?.comments || [];
  console.log(">>> comments", comments);

  const [commentText, setCommentText] = useState("");

  const onCreateComment = (text: string, parentCommentId?: string) => {
    createComment({ comment: text, parentCommentId });
  };

  return (
    <VStack alignItems="flex-start">
      {isLoadingResource && (
        <Stack pl="27px">
          <Skeleton height="20px" w="320px" />
        </Stack>
      )}
      {!isLoadingResource && (
        <Flex ml="-46px">
          <Resource
            isUpvoted={false}
            onDownvote={function (): void {
              throw new Error("Function not implemented.");
            }}
            onUpvote={function (): void {
              throw new Error("Function not implemented.");
            }}
            isLoading={false}
            url={resource.url}
            title={resource.title}
            upvotes={resource.upvotes}
            comments={resource.comments}
            diffInTime={getDiffInTime(new Date(resource.createdAt))}
            domain={extractDomainFromUrl(resource.url)}
            username={resource?.user?.name || ""}
            resourceId={resource.id}
          />
        </Flex>
      )}

      {isLoadingUser && (
        <Stack pl="27px">
          <Skeleton height="20px" w="320px" />
        </Stack>
      )}

      <VStack pl="27px" alignItems="flex-start">
        {!isLoadingUser && !isLogged && (
          <Alert status="warning" borderRadius="8px" mt="24px">
            <AlertIcon />
            <AlertDescription>
              <Link href={Routes.login} textDecor="underline">
                Log in
              </Link>{" "}
              to comment
            </AlertDescription>
          </Alert>
        )}
        {!isLoadingUser && isLogged && (
          <Stack mt="8px">
            <Textarea
              w="640px"
              borderColor="whiteAlpha.300"
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              alignSelf="flex-start"
              size="sm"
              colorScheme="brand"
              isDisabled={!commentText}
              onClick={() => onCreateComment(commentText)}
              isLoading={isPendingCreateComment}
            >
              Add comment
            </Button>
          </Stack>
        )}

        {isLoadingComments && (
          <Stack>
            <Skeleton height="20px" w="320px" />
            <Skeleton height="20px" w="320px" />
            <Skeleton height="20px" w="320px" />
            <Skeleton height="20px" w="320px" />
          </Stack>
        )}

        {!isLoadingComments && (
          <Stack mt="24px" spacing="24px">
            {comments.map((comment) => {
              return (
                <CommentWithReplies
                  key={comment.id}
                  comment={comment}
                  onCreateReply={(text, parentCommentId) =>
                    onCreateComment(text, parentCommentId)
                  }
                />
              );
            })}
          </Stack>
        )}
      </VStack>
    </VStack>
  );
};
