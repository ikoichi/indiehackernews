import { UserResponse } from "@/app/api/user/route";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = () => {
  const { data, isLoading, ...rest } = useQuery<{ data: UserResponse }>({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/user"),
  });

  return {
    user: data?.data?.user || {},
    isLoading,
    ...rest,
  };
};
