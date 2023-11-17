import { useSession } from "next-auth/react";

export const useIsLogged = () => {
  const session = useSession();

  const isLoading = session.status === "loading";
  const isLogged = session?.status === "authenticated";

  return {
    isLoading,
    isLogged,
    user: session?.data?.user || null,
  };
};
