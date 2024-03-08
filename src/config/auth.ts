import { Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/prisma/db";
// import { createLoopsContact } from "@/libs/loops";
// import { addMailChimpListMember } from "@/libs/mailchimp";
import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import TwitterProvider from "next-auth/providers/twitter";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email";
import { AuthOptions } from "next-auth";
import { logSnagClient } from "@/libs/logSnag";
// more providers at https://next-auth.js.org/providers

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    EmailProvider({
      server: process.env.MAILPACE_EMAIL_SERVER || "", // any SMTP server will work
      from: process.env.EMAIL_FROM || "",
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    /* AppleProvider({
        clientId: process.env.APPLE_ID || "",
        clientSecret: process.env.APPLE_SECRET || "",
      }), */
    /* TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      }), */
    /* FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID || "",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      }), */
    /* EmailProvider({
        server: process.env.MAILPACE_EMAIL_SERVER || "",
        from: process.env.EMAIL_FROM || "",
        // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      }), */
    /* CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const res = await fetch("/your/endpoint", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
  
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        },
      }), */
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.id = user.id;
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async signIn(event) {
      if (event.isNewUser && event.user.email) {
        try {
          await logSnagClient.track({
            channel: "product",
            event: "New signup",
            icon: "🧑‍💼",
            notify: false,
          });

          await logSnagClient.insight.increment({
            title: "Signups",
            value: 1,
            icon: "🧑‍💼",
          });
        } catch (err) {
          console.error("Error with Logsnag", err);
        }
        /*
        await addMailChimpListMember({
          email: event.user.email,
          firstName: event.user.name || "",
          lastName: "",
          tags: ["new-user"],
        });
        */
        /*
        await createLoopsContact({
          email: event.user.email,
          firstName: event.user.name || "",
          lastName: "",
          userGroup: "new-user",
        });
        */
        /*
        // Uncomment this part if you are using workspaces
        await onAddInvitedUserToWorkspace(event.user.email);
        */
      }
    },
  },
};
