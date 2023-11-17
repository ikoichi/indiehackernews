import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";

export type FAQQuestionProps = {
  question: string;
  answer: ReactElement | string;
};

export const FAQquestion = ({ question, answer }: FAQQuestionProps) => {
  return (
    <AccordionItem maxW="auto" w="100%">
      <h2>
        <AccordionButton>
          <Box
            fontWeight="bold"
            color="blackAlpha.900"
            w="100%"
            textAlign="left"
            borderColor="blackAlpha.100"
            py="8px"
          >
            {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel py="16px">
          <Text textAlign="left" color="blackAlpha.800">
            {answer}
          </Text>
        </AccordionPanel>
      </h2>
    </AccordionItem>
  );
};
