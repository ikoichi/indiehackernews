import { authOptions } from "@/config/auth";
import { prismaClient } from "@/prisma/db";
import { getIsAdminOrOwner } from "@/utils/workspace/isAdminOrOwner";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";

export async function GET(
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
    const workspaceId = params.id;

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
      workspaceId: workspaceId,
      userId: currentUser?.id,
    });

    if (isAdminOrOwner) {
      const members = await prismaClient.workspaceUsers.findMany({
        where: {
          workspaceId,
        },
      });

      return NextResponse.json({ members }, { status: HttpStatusCode.Ok });
    }

    return NextResponse.json(
      { invitations: [] },
      { status: HttpStatusCode.Ok }
    );
  }
}

type DeleteWorkspaceMember = {
  userId: string;
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const workspaceId = params.id;

  if (!session || !session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  if (session && session?.user.email) {
    const body = await rawBody(Readable.from(Buffer.from(await req.text())));
    const payload = JSON.parse(body.toString()) as DeleteWorkspaceMember;

    if (!payload.userId) {
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
      workspaceId: workspaceId,
      userId: currentUser?.id,
    });

    if (isAdminOrOwner) {
      const workspaceUser = await prismaClient.workspaceUsers.findFirst({
        where: {
          workspaceId,
          userId: payload.userId,
        },
      });

      await prismaClient.workspaceUsers.delete({
        where: {
          id: workspaceUser?.id,
        },
      });
      return NextResponse.json(
        { success: true },
        { status: HttpStatusCode.Ok }
      );
    }

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
}
