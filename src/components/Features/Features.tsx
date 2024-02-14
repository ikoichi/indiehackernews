import { Feature, FeatureProps } from "./Feature";
import { Section } from "../atoms/Section/Section";

const featuresList: Omit<FeatureProps, "showCta">[] = [
  {
    category: "Productivity",
    title: "Feature 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultrices, nunc magna ullamcorper elit, vitae tincidunt nisl nunc sit amet nunc. ",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    category: "Leads generation",
    title: "Feature 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultrices, nunc magna ullamcorper elit, vitae tincidunt nisl nunc sit amet nunc. ",
    imageUrl: "https://placehold.co/600x400",
  },
];

type FeaturesProps = {
  showCta?: boolean;
};

export const Features = ({ showCta = true }: FeaturesProps) => {
  return (
    <Section flexDir="column">
      {featuresList.map((feature, index) => {
        return (
          <Feature
            key={index}
            category={feature.category}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            showCta={showCta}
          />
        );
      })}
    </Section>
  );
};
