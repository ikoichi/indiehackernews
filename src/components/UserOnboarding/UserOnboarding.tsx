"use client";

import { useIsLogged } from "@/hooks/useIsLogged";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Input } from "../atoms/Input/Input";
import { Select } from "../atoms/Select/Select";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  GetOnboardingResponse,
  PostOnboardingRequest,
} from "@/app/api/onboarding/route";
import { useRouter } from "next/navigation";
import { Routes } from "@/data/routes";
import { questions } from "./onboarding.questions";
import { useOnboarding } from "@/hooks/useOnboarding";

const initialDataObj: PostOnboardingRequest = {
  name: "",
  role: "",
  source: "",
};

export const UserOnboarding = () => {
  const router = useRouter();
  const { isLoading, isLogged } = useIsLogged();
  const { isLoadingOnboarding, isOnboardingCompleted } = useOnboarding();

  const [onboardingData, setOnboardingData] = useState(initialDataObj);

  const [isFormFilled, setFormFilled] = useState(false);
  const onFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOnboardingData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onboardingValues = Object.values(onboardingData).join("-");
  useEffect(() => {
    const isFilled = Object.values(onboardingData).every((value) => value);
    setFormFilled(isFilled);
  }, [onboardingValues]);

  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = () => {
    setSubmitting(true);
    axios.post("/api/onboarding", onboardingData).finally(() => {
      setSubmitting(false);
      router.push(Routes.dashboard);
    });
  };

  if (!isLoading && !isLogged) {
    router.push(Routes.login);
    return;
  }

  if (isOnboardingCompleted) {
    router.push(Routes.dashboard);
    return;
  }

  return (
    <Flex minH="100vh" w="100vw" maxW="100vw">
      <Center alignItems="center" justifyContent="center" w="100vw">
        {isLoading && isLoadingOnboarding && <Spinner color="brand.500" />}
        {!isLoading &&
          !isLoadingOnboarding &&
          !isOnboardingCompleted &&
          isLogged && (
            <>
              <Stack spacing="24px" w="300px">
                <Heading as="h3" fontSize="22px">
                  Tell us about you
                </Heading>
                {questions.map((question, index) => {
                  return (
                    <Flex key={index}>
                      <FormControl>
                        <FormLabel>{question.question}</FormLabel>
                        {question.type === "text" && (
                          <Input
                            size="sm"
                            borderRadius="6px"
                            name={question.name}
                            onChange={onFormChange}
                          />
                        )}
                        {question.type === "select" && (
                          <Select
                            size="sm"
                            borderRadius="6px"
                            name={question.name}
                            onChange={onFormChange}
                          >
                            <option></option>
                            {question.options.map((option, index) => (
                              <option key={"option" + index}>{option}</option>
                            ))}
                          </Select>
                        )}
                      </FormControl>
                    </Flex>
                  );
                })}
                <Button
                  colorScheme="brand"
                  size="sm"
                  onClick={onSubmit}
                  isLoading={isSubmitting}
                  isDisabled={!isFormFilled}
                >
                  Next
                </Button>
              </Stack>
            </>
          )}
      </Center>
    </Flex>
  );
};
