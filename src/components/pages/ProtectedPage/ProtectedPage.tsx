import { Routes } from "@/data/routes";
import { useIsLogged } from "@/hooks/useIsLogged";
import { Link } from "@chakra-ui/next-js";
import { Flex, Spinner } from "@chakra-ui/react";

export const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLogged, isLoading } = useIsLogged();

  if (isLoading) {
    return (
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Spinner colorScheme="brand" />
      </Flex>
    );
  }

  if (!isLogged) {
    return (
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        You need to be&nbsp;
        <Link href={Routes.login} textDecor="underline">
          logged in
        </Link>
        &nbsp; to access this page
      </Flex>
    );
  }

  return <>{children}</>;
};
