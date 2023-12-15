import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Center minH="100vh">
      <Stack alignItems="center" spacing="16px">
        <Heading color="brand.500">Ops, this page doesn&lsquo;t exist.</Heading>
        <Text>We could not find the page you were looking for.</Text>
        <Text
          sx={{
            a: {
              color: "brand.500",
            },
          }}
        >
          Go back to the <Link href="/">Home</Link>.
        </Text>
      </Stack>
    </Center>
  );
}
