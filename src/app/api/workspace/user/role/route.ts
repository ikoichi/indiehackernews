import { authOptions } from "@/config/auth";
import { prismaClient } from "@/prisma/db";
import { getIsAdminOrOwner } from "@/utils/workspace/isAdminOrOwner";
import { WorkspaceRole } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";

type PutWorkspaceMemberRequest = {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
};

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  if (session && session?.user.email) {
    const body = await rawBody(Readable.from(Buffer.from(await req.text())));
    const payload = JSON.parse(body.toString()) as PutWorkspaceMemberRequest;

    if (!payload.workspaceId || !payload.userId || !payload.role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const currentUser = await prismaClient.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const isAdminOrOwner = await getIsAdminOrOwner({
      workspaceId: payload.workspaceId,
      userId: currentUser?.id,
    });

    if (isAdminOrOwner) {
      const userToUpdate = await prismaClient.workspaceUsers.findFirst({
        where: {
          userId: payload.userId,
          workspaceId: payload.workspaceId,
        },
      });

      if (userToUpdate) {
        await prismaClient.workspaceUsers.update({
          where: {
            id: userToUpdate.id,
          },
          data: {
            role: payload.role.toUpperCase() as WorkspaceRole,
          },
        });
      }
      return NextResponse.json(
        { success: true },
        { status: HttpStatusCode.Ok }
      );
    }

    return NextResponse.json(
      { success: false },
      { status: HttpStatusCode.Forbidden }
    );
  }

  return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
}
