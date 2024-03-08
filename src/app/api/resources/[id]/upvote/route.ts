import { authOptions } from "@/config/auth";
import { logSnagClient } from "@/libs/logSnag";
import { prismaClient } from "@/prisma/db";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  if (session && session?.user.email) {
    const resourceId = params.id;

    const resource = await prismaClient.resource.update({
      where: {
        id: resourceId,
      },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });

    await prismaClient.userUpvotes.create({
      data: {
        resourceId: resourceId,
        userId: session.user.id,
      },
    });

    try {
      await logSnagClient.track({
        channel: "product",
        event: "Upvote",
        icon: "🔺",
        notify: false,
      });

      await logSnagClient.insight.increment({
        title: "Upvotes counter",
        value: 1,
        icon: "🔺",
      });
    } catch (err) {
      console.error("Error with Logsnag", err);
    }

    return NextResponse.json({ resource }, { status: HttpStatusCode.Ok });
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: HttpStatusCode.InternalServerError }
  );
}
