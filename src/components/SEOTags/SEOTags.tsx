type SEOTagsProps = {
  title: string;
  description: string;
};

export const getSEOTags = ({ title, description }: SEOTagsProps) => {
  return {
    title,
    description,
  };
};
