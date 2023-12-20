import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { HttpStatusCode } from "axios";
// @ts-ignore
import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";
import { prismaClient } from "@/prisma/db";
import { authOptions } from "@/config/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  if (session && session?.user?.email) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const userPlan = await prismaClient.userPlan.findFirst({
      where: {
        userId: user?.id,
      },
    });

    if (!userPlan) {
      return NextResponse.json(
        { customerPortalUrl: "" },
        { status: HttpStatusCode.Ok }
      );
    }

    if (userPlan) {
      const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY);
      const response = await ls.getSubscription({
        id: userPlan.lemonSubscriptionId,
      });
      const customerPortalUrl = response.data.attributes.urls.customer_portal;
      return NextResponse.json(
        { customerPortalUrl: customerPortalUrl },
        { status: HttpStatusCode.Ok }
      );
    }

    return NextResponse.json(
      { error: "NotFound" },
      { status: HttpStatusCode.NotFound }
    );
  }
}
