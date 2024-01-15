import { Flex } from "@chakra-ui/react";

type LoomEmbedProps = {
  id: string;
};

export const LoomEmbed = ({ id }: LoomEmbedProps) => (
  <Flex position="relative" pb="56.24%">
    <iframe
      src={`https://loom.com/embed/${id}`}
      width="100%"
      height="100%"
      title="Loom video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: "absolute",
        left: 0,
        top: 0,
      }}
    />
  </Flex>
);
