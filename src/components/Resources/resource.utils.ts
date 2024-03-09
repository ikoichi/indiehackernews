import { differenceInHours, differenceInMinutes } from "date-fns";

export const getDiffInTime = (date: Date) => {
  const diffInHours = differenceInHours(new Date(), date);

  if (diffInHours === 0) {
    const diffInMinutes = differenceInMinutes(new Date(), date);
    return `${diffInMinutes} minutes ago`;
  }

  return `${diffInHours} hours ago`;
};

export const extractDomainFromUrl = (url: string) => {
  if (!url) {
    return "";
  }
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return null;
  }
};
