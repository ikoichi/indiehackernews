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

  return NextResponse.json({ resource }, { status: HttpStatusCode.Ok });
}
