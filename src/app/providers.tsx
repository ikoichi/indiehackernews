// app/providers.tsx
"use client";

import { CrispChat } from "@/components/CustomerSupport/CrispChat";
import { UserdeskChat } from "@/components/CustomerSupport/UserdeskChat";
import { customTheme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster />
      <UserdeskChat />
      <CrispChat />
      <CacheProvider>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
