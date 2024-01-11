import { signInCallbackUrl } from "@/config";
// import { createLoopsContact } from "@/libs/loops";
import { prismaClient } from "@/prisma/db";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const sessionResponse = await supabase.auth.getSession();

  if (code && sessionResponse?.data.session?.user?.email) {
    const session = sessionResponse?.data.session;

    const user = await prismaClient.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      try {
        await prismaClient.user.create({
          data: {
            id: session.user.id,
            name: session?.user?.user_metadata?.full_name || "",
            email: session.user.email,
            emailVerified: new Date(),
            image: "",
          },
        });
      } catch (err) {
        console.log("Error while creating the user", session.user);
      }

      /* add user to email service MailChimp, Loops, or others */
      /* await createLoopsContact({
        email: session.user.email || "",
        firstName: session?.user?.user_metadata?.full_name || "",
        lastName: "",
        userGroup: "",
      }); */
    }
  }

  return NextResponse.redirect(new URL(signInCallbackUrl, req.url));
}
