import { useColorModeValues } from "@/hooks/useColorModeValues";
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
  const { borderColor } = useColorModeValues();
  return (
    <AccordionItem maxW="auto" w="100%" borderColor={borderColor}>
      <h2>
        <AccordionButton>
          <Box
            fontWeight="bold"
            w="100%"
            textAlign="left"
            borderColor={borderColor}
            py="8px"
          >
            {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel py="16px">
          <Text textAlign="left">{answer}</Text>
        </AccordionPanel>
      </h2>
    </AccordionItem>
  );
};
