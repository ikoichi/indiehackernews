import { useRouter } from "next/navigation";
import { useIsLogged } from "./useIsLogged";
import { useState } from "react";
import { Routes } from "@/data/routes";

export const useGetStated = () => {
  const router = useRouter();

  const { user } = useIsLogged();
  const [isLoadingCta, setLoading] = useState(false);
  const onGetStartedClick = () => {
    setLoading(true);
    if (user) {
      router.push(Routes.home);
      return;
    }
    router.push(Routes.signUp);
  };

  return {
    isLoadingCta,
    onGetStartedClick,
  };
};
