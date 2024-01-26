import { PostOnboardingRequest } from "@/app/api/onboarding/route";
import { brandName } from "@/config";

type TextQuestion = {
  type: "text";
};

type SelectQuestion = {
  type: "select";
  options: string[];
};

type Question = {
  question: string;
  name: keyof PostOnboardingRequest;
} & (TextQuestion | SelectQuestion);

export const questions: Question[] = [
  {
    question: "What's your name?",
    name: "name",
    type: "text",
  },
  {
    question: "What's your role?",
    type: "select",
    name: "role",
    options: ["Founder", "Product Manager", "Engineer", "Designer"],
  },
  {
    question: `Where did you find ${brandName}?`,
    type: "select",
    name: "source",
    options: [
      "Twitter / X",
      "Facebook",
      "LinkedIn",
      "Instagram",
      "Google",
      "Newsletter",
      "Other",
    ],
  },
];
