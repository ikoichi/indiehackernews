"use client";

import { AccountMenu } from "@/components/AccountMenu/AccountMenu";
import { Button, Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  return (
    <Center minH="100vh">
      {status === "loading" && <Spinner color="brand.500" />}
      {status === "authenticated" && (
        <Stack direction="column" spacing="16px">
          <Flex className="text-sm">
            You are logged in as {session?.user?.email}
          </Flex>
          <AccountMenu
            userEmail={session?.user?.email || ""}
            userName={session?.user?.name || ""}
            userPictureUrl={session?.user?.image || ""}
          />
        </Stack>
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
