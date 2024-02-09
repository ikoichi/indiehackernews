"use client";

import { supabaseBrowserClient } from "@/libs/supabase.client";
import { Session, Subscription } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type AuthListener = { data: { subscription: Subscription } };

export const useSupabaseSession = () => {
  const [session, setSession] = useState<null | Session>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    const authListener: AuthListener =
      supabaseBrowserClient.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN") {
          setStatus("authenticated");
          setSession(session);
          return;
        }
        if (
          event === "INITIAL_SESSION" &&
          session?.user.aud === "authenticated"
        ) {
          setStatus("authenticated");
          setSession(session);
          return;
        }
        if (event === "INITIAL_SESSION" && session === null) {
          setStatus("unauthenticated");
          setSession(null);
          return;
        }
        if (event === "SIGNED_OUT") {
          setStatus("unauthenticated");
          setSession(null);
          return;
        }
      });

    return () => {
      authListener?.data.subscription?.unsubscribe();
    };
  }, [status]);

  return {
    status,
    session,
  };
};
