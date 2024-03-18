import { GetResourcesResponse } from "@/app/api/resources/route";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const queryClient = new QueryClient();

type UseUpvoteProps = {
  isLogged: boolean;
  onUpvoteSuccess: () => void;
  onDownvoteSuccess: () => void;
};

export const useUpvote = ({
  isLogged,
  onUpvoteSuccess,
  onDownvoteSuccess,
}: UseUpvoteProps) => {
  const { mutate: upvoteMutation } = useMutation({
    mutationFn: (id: string) =>
      axios.post<GetResourcesResponse>(`/api/resources/${id}/upvote`),
    onSuccess: () => {
      onUpvoteSuccess();
    },
  });

  const { mutate: downvoteMutation } = useMutation({
    mutationFn: (id: string) =>
      axios.post<GetResourcesResponse>(`/api/resources/${id}/downvote`),
    onSuccess: () => {
      onDownvoteSuccess();
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

  return {
    onUpvote,
    onDownvote,
    upvotingId,
  };
};
