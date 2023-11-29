"use client";

import { Button, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  throw Error("Blah");

  return (
    <Center minH="100vh">
      {status === "loading" && <Spinner color="brand.500" />}
      {status === "authenticated" && (
        <p>You are logged in as {session?.user?.email}</p>
      )}
      {status === "unauthenticated" && (
        <Stack>
          <Text>Sign in to access</Text>
          <Button as="a" href="/login" colorScheme="brand">
            Sign in
          </Button>
        </Stack>
      )}
    </Center>
  );
};

export default Dashboard;
