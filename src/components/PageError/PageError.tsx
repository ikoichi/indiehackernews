"use client"; // Error components must be Client Components

import { supportEmail } from "@/config";
import { Link } from "@chakra-ui/next-js";
import { Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function PageError({ error, reset }: PageErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Center minH="100vh">
      <Stack alignItems="center" spacing="16px">
        <Heading>Ops, an error occurred.</Heading>
        <Button
          variant="solid"
          colorScheme="brand"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        <Text>
          If the problem persists, contact the{" "}
          <Link href={`mailto:${supportEmail}`} color="brand.500">
            support
          </Link>
          .
        </Text>
      </Stack>
    </Center>
  );
}
