declare module "next-auth/providers";
declare module "next-auth/client";

import { Session, User, Account, Profile } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      address: string;
      name: string;
      image: string;
      email: string;
      id: string;
    };
    id: string;
  }

  /* export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean | null;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Account {
    provider: string;
    type: string;
    id: string; // provider account it
    accessToken: string;
    refreshToken: string;
  }

  export interface Profile {
    id_str: string;
    screen_name: string;
    name: string;
    email: string;
    profile_image_url_https: string;
  } */
}
