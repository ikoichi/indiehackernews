// app/providers.tsx
"use client";

import { CrispChat } from "@/components/CustomerSupport/CrispChat";
import { UserdeskChat } from "@/components/CustomerSupport/UserdeskChat";
import { LemonSqueezyAffiliateScript } from "@/components/LemonSqueezyAffiliateScript/LemonSqueezyAffiliateScript";
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
      <LemonSqueezyAffiliateScript />
      <CacheProvider>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
