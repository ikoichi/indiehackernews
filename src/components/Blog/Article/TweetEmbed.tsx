import { Flex } from "@chakra-ui/react";
import { TwitterTweetEmbed } from "react-twitter-embed";

type TweetEmbedProps = {
  tweetId: string;
};

export const TweetEmbed = ({ tweetId }: TweetEmbedProps) => (
  <Flex
    w="100%"
    alignItems="center"
    justifyContent="center"
    sx={{
      "> div": {
        display: "flex",
        justifyContent: "center",
        minW: ["100%", "100%", "100%", "600px"],
      },
    }}
  >
    <TwitterTweetEmbed tweetId={tweetId} />
  </Flex>
);
