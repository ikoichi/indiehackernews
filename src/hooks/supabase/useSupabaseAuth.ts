"use client";

import { supabaseBrowserClient } from "@/libs/supabase.client";
import { Provider } from "@supabase/supabase-js";
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

type SocialProps = {
  onSocialSignInSuccess?: (data: any) => void;
  onSocialSignInError?: (error: any) => void;
};

type SignOutProps = {
  onSignOutSuccess?: () => void;
  onSignOutError?: (error: any) => void;
};

type Props = MagicLinkProps &
  EmailAndPasswordProps &
  SocialProps &
  SignOutProps;

export const useSupabaseAuth = ({
  onMagicLinkSignInSuccess,
  onMagicLinkSignInError,
  onEmailAndPasswordSignUpSuccess,
  onEmailAndPasswordSignInSuccess,
  onEmailAndPasswordSignUpError,
  onEmailAndPasswordSignInError,
  onSocialSignInSuccess,
  onSocialSignInError,
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

    if (!error && data) {
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
      onEmailAndPasswordSignUpError?.(error);
    }

    if (!error && data) {
      onEmailAndPasswordSignUpSuccess?.(data);
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

    if (!error && data) {
      onEmailAndPasswordSignInSuccess?.(data);
    }
  };

  const onSignInWithSocial = async (provider: Provider) => {
    const { data, error } = await supabaseBrowserClient.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      onSocialSignInError?.(error);
    }

    if (!error && data) {
      onSocialSignInSuccess?.(data);
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
    onSignInWithSocial,
    onSignOut,
  };
};
