import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { HttpStatusCode } from "axios";
import { prismaClient } from "@/prisma/db";
import { authOptions } from "@/config/auth";
import { ApiError } from "@/types/api.types";
import rawBody from "raw-body";
import { Readable } from "stream";

export type GetProfileResponse = {
  name: string;
  email: string;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiError> | NextResponse<GetProfileResponse | null>> {
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

    return NextResponse.json(
      { name: user?.name || "", email: user?.email || "" },
      { status: HttpStatusCode.Ok }
    );
  }

  return NextResponse.json(null, { status: HttpStatusCode.Ok });
}

export type PostOnboardingRequest = {
  name: string;
  role: string;
  source: string;
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  if (session && session?.user.email) {
    const body = await rawBody(Readable.from(Buffer.from(await req.text())));
    const payload = JSON.parse(body.toString()) as PostOnboardingRequest;

    if (!payload.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const alreadyExistingNickname = await prismaClient.user.findFirst({
      where: {
        name: payload.name,
      },
    });

    if (alreadyExistingNickname) {
      return NextResponse.json(
        { error: "Nickname already in use" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (user?.id && !user?.name) {
      const updatedUser = await prismaClient.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name: payload.name || "",
        },
      });

      return NextResponse.json(
        { name: updatedUser.name, email: updatedUser.email },
        { status: HttpStatusCode.Ok }
      );
    }
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: HttpStatusCode.InternalServerError }
  );
}
