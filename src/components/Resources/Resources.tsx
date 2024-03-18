"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
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
import { Link } from "@chakra-ui/next-js";
import { Resource } from "./Resource";
import { getDiffInTime, extractDomainFromUrl } from "./resource.utils";
import { useUpvote } from "./useUpvote";

export const Resources = () => {
  const { isLogged } = useIsLogged();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["resources"],
    queryFn: () => axios.get<GetResourcesResponse>("/api/resources"),
  });

  const resources = data?.data.resources || [];
  const userUpvotes = data?.data.userUpvotes || [];
  const pageNumber = data?.data.page || 1;

  const { onUpvote, onDownvote, upvotingId } = useUpvote({
    isLogged,
    onUpvoteSuccess: refetch,
    onDownvoteSuccess: refetch,
  });

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
              <>
                <Resource
                  key={resource.id}
                  number={pageNumber * (index + 1)}
                  isUpvoted={isUpvoted}
                  onDownvote={() => onDownvote(resource.id)}
                  onUpvote={() => onUpvote(resource.id)}
                  isLoading={upvotingId === resource.id}
                  url={resource.url}
                  title={resource.title}
                  upvotes={resource.upvotes}
                  comments={resource.comments}
                  diffInTime={getDiffInTime(new Date(resource.createdAt))}
                  domain={extractDomainFromUrl(resource.url)}
                  username={resource.username || ""}
                  resourceId={resource.id}
                />
              </>
            );
          })}
        </VStack>
      )}
    </>
  );
};
