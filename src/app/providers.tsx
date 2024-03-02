"use client";

import { CrispChat } from "@/components/CustomerSupport/CrispChat";
import { UserdeskChat } from "@/components/CustomerSupport/UserdeskChat";
import { LemonSqueezyAffiliateScript } from "@/components/LemonSqueezyAffiliateScript/LemonSqueezyAffiliateScript";
import { customTheme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient();

export function Providers({
  children,
  uiColorMode,
}: {
  children: React.ReactNode;
  uiColorMode: "light" | "dark";
}) {
  const theme = {
    ...customTheme,
    config: {
      ...customTheme.config,
      initialColorMode: uiColorMode,
    },
  };

  return (
    <SessionProvider>
      <Toaster />
      <UserdeskChat />
      <CrispChat />
      <LemonSqueezyAffiliateScript />
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme={uiColorMode}
            enableSystem
            disableTransitionOnChange
          >
            <ColorModeScript initialColorMode={uiColorMode} />
            <ChakraProvider
              theme={theme}
              colorModeManager={cookieStorageManager}
            >
              {children}
            </ChakraProvider>
          </NextThemesProvider>
        </CacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
