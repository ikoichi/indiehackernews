import { useState, useEffect } from "react";
import axios from "axios";
import { GetOnboardingResponse } from "@/app/api/onboarding/route";

export const useOnboarding = () => {
  const [isLoadingOnboarding, setLoadingOnboarding] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);
  useEffect(() => {
    axios
      .get<GetOnboardingResponse>("/api/onboarding")
      .then((response) => {
        setOnboardingCompleted(response.data.isComplete);
      })
      .catch(() => {
        setOnboardingCompleted(false);
      })
      .finally(() => {
        setLoadingOnboarding(false);
      });
  }, []);

  return {
    isLoadingOnboarding,
    isOnboardingCompleted,
  };
};
