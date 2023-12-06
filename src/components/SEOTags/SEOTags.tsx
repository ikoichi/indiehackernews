import { Metadata } from "next";

/*
  See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  for the supported metadata
*/
export const getSEOTags = (metadata: Metadata): Metadata => {
  return {
    ...metadata,
  };
};
