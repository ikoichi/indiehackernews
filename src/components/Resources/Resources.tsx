"use client";

import {
  Box,
  HStack,
  IconButton,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbTriangleFilled } from "react-icons/tb";
import { differenceInHours, differenceInMinutes } from "date-fns";
import { GetResourcesResponse } from "@/app/api/resources/route";
import { useIsLogged } from "@/hooks/useIsLogged";

const queryClient = new QueryClient();

const getDiffInTime = (date: Date) => {
  const diffInHours = differenceInHours(new Date(), date);

  if (diffInHours === 0) {
    const diffInMinutes = differenceInMinutes(new Date(), date);
    return `${diffInMinutes} minutes ago`;
  }

  return `${diffInHours} hours ago`;
};

const extractDomainFromUrl = (url: string) => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return null;
  }
};

export const Resources = () => {
  const { isLogged } = useIsLogged();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["resources"],
    queryFn: () => axios.get<GetResourcesResponse>("/api/resources"),
  });

  const resources = data?.data.resources || [];
  const userUpvotes = data?.data.userUpvotes || [];
  const pageNumber = data?.data.page || 1;

  const { mutate: upvoteMutation } = useMutation({
    mutationFn: (id: string) =>
      axios.post<GetResourcesResponse>(`/api/resources/${id}/upvote`),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: downvoteMutation } = useMutation({
    mutationFn: (id: string) =>
      axios.post<GetResourcesResponse>(`/api/resources/${id}/downvote`),
    onSuccess: () => {
      refetch();
    },
  });

  const [upvotingId, setUpvotingId] = useState<string | null>(null);
  const onUpvote = (id: string) => {
    if (!isLogged) {
      toast.error("You need to be logged in to upvote");
      return;
    }

    setUpvotingId(id);
    upvoteMutation(id, {
      onSuccess: () => {
        toast.success("Upvoted!");
      },
      onError: () => {
        toast.error("Error upvoting");
      },
      onSettled: () => {
        setUpvotingId(null);
      },
    });
  };

  const onDownvote = (id: string) => {
    if (!isLogged) {
      toast.error("You need to be logged in to upvote");
      return;
    }

    setUpvotingId(id);
    downvoteMutation(id, {
      onSuccess: () => {
        toast.success("Downvoted");
        queryClient.invalidateQueries({
          queryKey: ["resources"],
        });
      },
      onError: () => {
        toast.error("Error downvoting");
      },
      onSettled: () => {
        setUpvotingId(null);
      },
    });
  };

  return (
    <>
      {isLoading && (
        <VStack alignItems="flex-start" spacing="16px">
          <Skeleton height="20px" w="320px" />
          <Skeleton height="20px" w="340px" />
          <Skeleton height="20px" w="300px" />
          <Skeleton height="20px" w="340px" />
          <Skeleton height="20px" w="320px" />
        </VStack>
      )}
      {!isLoading && (
        <VStack alignItems="flex-start">
          {resources.map((resource, index) => {
            const isUpvoted = !!userUpvotes.find(
              (upvote) => upvote.resourceId === resource.id
            );

            return (
              <Box key={resource.id}>
                <HStack alignItems="baseline">
                  <Text w="34px" textAlign="right">
                    {pageNumber * (index + 1)}.
                  </Text>
                  <IconButton
                    icon={<TbTriangleFilled />}
                    aria-label={""}
                    size="xs"
                    variant="ghost"
                    color={isUpvoted ? "brand.500" : "whiteAlpha.600"}
                    onClick={() => {
                      if (isUpvoted) {
                        onDownvote(resource.id);
                        return;
                      }
                      onUpvote(resource.id);
                    }}
                    isLoading={upvotingId === resource.id}
                  />
                  <Link href={resource.url} target="_blank">
                    {resource.title}
                  </Link>
                  {resource.url && (
                    <Text fontSize="13px" color="whiteAlpha.600">
                      ({extractDomainFromUrl(resource.url)})
                    </Text>
                  )}
                </HStack>
                <HStack ml="74px">
                  <Text fontSize="13px" color="whiteAlpha.600">
                    {resource.upvotes} upvotes by {resource.userName || ""}{" "}
                    {getDiffInTime(new Date(resource.createdAt))}
                  </Text>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      )}
    </>
  );
};
