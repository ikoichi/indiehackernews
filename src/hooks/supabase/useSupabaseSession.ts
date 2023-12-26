"use client";

import { supabaseBrowserClient } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<null | Session>(null);

  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    supabaseBrowserClient.auth
      .getSession()
      .then((res) => {
        console.log(">>> res", res);
        setSession(res?.data?.session);
        if (res?.data?.session) {
          setStatus("authenticated");
          return;
        }
        setStatus("unauthenticated");
      })
      .catch((err) => {
        console.error(">>> err", err);
        setStatus("unauthenticated");
      });
  }, []);

  return {
    status,
    session,
  };
};
