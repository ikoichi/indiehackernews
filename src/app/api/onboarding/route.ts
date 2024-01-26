import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { HttpStatusCode } from "axios";
import { prismaClient } from "@/prisma/db";
import { authOptions } from "@/config/auth";
import { ApiError } from "@/types/api.types";
import rawBody from "raw-body";
import { Readable } from "stream";

export type GetOnboardingResponse = {
  isComplete: boolean;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiError> | NextResponse<GetOnboardingResponse>> {
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

    const onboarding = await prismaClient.userOnboarding.findFirst({
      where: {
        userId: user?.id,
      },
    });

    const isOnboardingComplete = !!onboarding?.isComplete;

    return NextResponse.json(
      { isComplete: isOnboardingComplete },
      { status: HttpStatusCode.Ok }
    );
  }

  return NextResponse.json(
    { isComplete: false },
    { status: HttpStatusCode.Ok }
  );
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

    if (!payload.name || !payload.role || !payload.source) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (user?.id) {
      await prismaClient.userOnboarding.create({
        data: {
          isComplete: true,
          role: payload.role || "",
          source: payload.source || "",
          userId: user?.id,
        },
      });
    }

    if (!user?.name) {
      await prismaClient.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name: payload.name || "",
        },
      });
    }
  }

  return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
}
