// app/providers.tsx
"use client";

import { customTheme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
