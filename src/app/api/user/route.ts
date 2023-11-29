import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { HttpStatusCode } from "axios";
import { prismaClient } from "@/prisma/db";

export async function POST(req: NextRequest) {
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
        email: session?.user?.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    if (user) {
      return NextResponse.json({ user }, { status: HttpStatusCode.Ok });
    }
  }
}
