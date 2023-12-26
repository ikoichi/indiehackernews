"use client";

import { supabaseBrowserClient } from "@/libs/supabase";
import { useRouter } from "next/navigation";

type Props = {
  onMagicLinkSignInSuccess?: (data: any) => void;
  onMagicLinkSignInError?: (error: any) => void;
};

export const useSupabaseAuth = ({
  onMagicLinkSignInSuccess,
  onMagicLinkSignInError,
}: Props) => {
  const router = useRouter();

  const onSignWithMagicLink = async (email: string, redirectUrl: string) => {
    const { data, error } = await supabaseBrowserClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      onMagicLinkSignInError?.(error);
    }

    if (data) {
      onMagicLinkSignInSuccess?.(data);
    }
  };

  const onSignOut = async () => {
    await supabaseBrowserClient.auth.signOut();
    router.push("/");
  };

  return { onSignWithMagicLink, onSignOut };
};
