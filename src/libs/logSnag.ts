import { LogSnag } from "@logsnag/node";

export const logSnagClient = new LogSnag({
  token: process.env.LOGSNAG_TOKEN || "",
  project: "indiehackernews",
});
