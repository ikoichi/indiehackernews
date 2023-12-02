"use client";

import { Button, Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [isSigningOut, setSigningOut] = useState(false);
  const onSignOut = () => {
    setSigningOut(true);
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Center minH="100vh">
      {status === "loading" && <Spinner color="brand.500" />}
      {status === "authenticated" && (
        <Stack direction="column" spacing="16px">
          <Flex className="text-slate-500 text-sm">
            You are logged in as {session?.user?.email}
          </Flex>
          <Button
            leftIcon={<TbLogout2 />}
            onClick={onSignOut}
            variant="outline"
            size="sm"
            isLoading={isSigningOut}
            className="rounded-lg text-slate-600"
          >
            Log out
          </Button>
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
