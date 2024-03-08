import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { GetProfileResponse } from "@/app/api/profile/route";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useProfile = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axios.get<GetProfileResponse>("/api/profile"),
  });

  useEffect(() => {
    axios.get<GetProfileResponse>("/api/profile");
  }, []);

  const profile = data?.data;

  const { mutate, ...mutation } = useMutation<
    AxiosResponse<GetProfileResponse, any>,
    Error,
    string
  >({
    mutationFn: (name: string) =>
      axios.post<GetProfileResponse>("/api/profile", {
        name,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  return {
    profile,
    onUpdateProfile: mutate,
    ...rest,
    updateProfile: mutation,
  };
};
