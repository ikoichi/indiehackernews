"use client";

import { useRouter } from "next/navigation";
import { useIsLogged } from "./useIsLogged";
import { useState } from "react";
import { Routes } from "@/data/routes";

export const useGetStarted = () => {
  const router = useRouter();

  const { user, isLogged } = useIsLogged();
  const [isLoadingCta, setLoading] = useState(false);
  const onGetStartedClick = () => {
    setLoading(true);
    if (user) {
      router.push(Routes.dashboard);
      return;
    }
    router.push(Routes.signUp);
  };

  return {
    isLogged,
    isLoadingCta,
    onGetStartedClick,
  };
};
