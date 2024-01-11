import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { HttpStatusCode } from "axios";
import { prismaClient } from "@/prisma/db";
import { authOptions } from "@/config/auth";
import { User } from "@prisma/client";
import { ApiError } from "@/types/api.types";

export type UserResponse = {
  user: User;
};

export async function GET(): Promise<NextResponse<UserResponse | ApiError>> {
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

  return NextResponse.json(
    { error: "Unauthorized" },
    { status: HttpStatusCode.Unauthorized }
  );
}
