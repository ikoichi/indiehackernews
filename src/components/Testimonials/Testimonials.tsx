import { Heading, Stack } from "@chakra-ui/react";
import { Section } from "../atoms/Section/Section";
import { Testimonial, TestimonialProps } from "./Testimonial";
import { brandName } from "@/config";

export const testimonials: TestimonialProps[] = [
  {
    text: `I was looking for a way to make more money. And I found it with ${brandName}. Now I keep recommending this to all my friends.`,
    name: "John Doe",
    highlightSentences: ["Now I keep recommending this to all my friends"],
    job: "CEO at WP Elevation",
    pictureUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
  },
  {
    text: `After comparing multiple solutions, we could not think of a better platform to ${brandName}. 10/10 experience overall.`,
    name: "Jane Doe",
    highlightSentences: ["10/10 experience overall"],
    job: "Project Manager at WP Elevation",
    pictureUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
];

export const Testimonials = () => {
  return (
    <Section flexDir="column" mb="160px" mt="120px" px="40px">
      <Heading alignItems="center" textAlign="center" my="16px" px="40px">
        You&apos;re in a good company
      </Heading>

      <Stack mt="40px" spacing="80px">
        {testimonials.map((testimonial, index) => {
          return (
            <Testimonial
              key={index}
              text={testimonial.text}
              name={testimonial.name}
              highlightSentences={testimonial.highlightSentences}
              job={testimonial.job}
              pictureUrl={testimonial.pictureUrl}
            />
          );
        })}
      </Stack>
    </Section>
  );
};
