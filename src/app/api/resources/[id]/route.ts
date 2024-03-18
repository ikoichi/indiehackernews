import { authOptions } from "@/config/auth";
import { prismaClient } from "@/prisma/db";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiError> | NextResponse> {
  const session = await getServerSession(authOptions);

  const resource = await prismaClient.resource.findFirst({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  let isUpvoted = false;
  if (session?.user) {
    const userUpvotes = await prismaClient.userUpvotes.findFirst({
      where: {
        userId: session?.user?.id,
        resourceId: resource?.id,
      },
    });

    if (!!userUpvotes) {
      isUpvoted = true;
    }
  }

  return NextResponse.json(
    { resource, isUpvoted },
    { status: HttpStatusCode.Ok }
  );
}
