"use client";

import { supabaseBrowserClient } from "@/libs/supabase.client";
import { useRouter } from "next/navigation";

type MagicLinkProps = {
  onMagicLinkSignInSuccess?: (data: any) => void;
  onMagicLinkSignInError?: (error: any) => void;
};

type EmailAndPasswordProps = {
  onEmailAndPasswordSignUpSuccess?: (data: any) => void;
  onEmailAndPasswordSignUpError?: (error: any) => void;
  onEmailAndPasswordSignInSuccess?: (data: any) => void;
  onEmailAndPasswordSignInError?: (error: any) => void;
};

type SignOutProps = {
  onSignOutSuccess?: () => void;
  onSignOutError?: (error: any) => void;
};

type Props = MagicLinkProps & EmailAndPasswordProps & SignOutProps;

export const useSupabaseAuth = ({
  onMagicLinkSignInSuccess,
  onMagicLinkSignInError,
  onEmailAndPasswordSignUpSuccess,
  onEmailAndPasswordSignInSuccess,
  onEmailAndPasswordSignUpError,
  onEmailAndPasswordSignInError,
  onSignOutError,
  onSignOutSuccess,
}: Props) => {
  const router = useRouter();

  const onSignWithMagicLink = async (email: string) => {
    const { data, error } = await supabaseBrowserClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin + "/supabase/auth/callback",
      },
    });

    if (error) {
      onMagicLinkSignInError?.(error);
    }

    if (data) {
      onMagicLinkSignInSuccess?.(data);
    }
  };

  const onSignUpWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string,
    redirectUrl: string
  ) => {
    const { data, error } = await supabaseBrowserClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name },
      },
    });

    if (error) {
      onEmailAndPasswordSignUpSuccess?.(error);
    }

    if (data) {
      onEmailAndPasswordSignUpError?.(data);
    }
  };

  const onSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    const { data, error } = await supabaseBrowserClient.auth.signInWithPassword(
      {
        email,
        password,
      }
    );

    if (error) {
      onEmailAndPasswordSignInError?.(error);
    }

    if (data) {
      onEmailAndPasswordSignInSuccess?.(data);
    }
  };

  const onSignOut = async () => {
    const { error } = await supabaseBrowserClient.auth.signOut();
    router.push("/");

    if (error) {
      onSignOutError?.(error);
    }

    onSignOutSuccess?.();
  };

  return {
    onSignWithMagicLink,
    onSignInWithEmailAndPassword,
    onSignUpWithEmailAndPassword,
    onSignOut,
  };
};
