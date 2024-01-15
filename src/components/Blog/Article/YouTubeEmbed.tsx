import { Flex } from "@chakra-ui/react";

type YouTubeEmbedProps = {
  id: string;
  width: string;
  height: string;
};

export const YouTubeEmbed = ({ id, width, height }: YouTubeEmbedProps) => (
  <Flex position="relative" pb="56.24%">
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
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
