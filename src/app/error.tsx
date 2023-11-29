"use client"; // Error components must be Client Components

import { PageError, PageErrorProps } from "@/components/PageError/PageError";

export default function Error({ error, reset }: PageErrorProps) {
  return <PageError error={error} reset={reset} />;
}
