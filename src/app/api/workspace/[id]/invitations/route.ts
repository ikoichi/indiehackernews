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
      const invitations =
        await prismaClient.workspacePendingInvitation.findMany({
          where: {
            workspaceId,
          },
        });

      return NextResponse.json({ invitations }, { status: HttpStatusCode.Ok });
    }

    return NextResponse.json(
      { invitations: [] },
      { status: HttpStatusCode.Ok }
    );
  }
}

type DeleteWorkspaceInvitation = {
  email: string;
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
    const payload = JSON.parse(body.toString()) as DeleteWorkspaceInvitation;

    if (!payload.email) {
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
      const workspaceInvitation =
        await prismaClient.workspacePendingInvitation.findFirst({
          where: {
            workspaceId,
            email: payload.email,
          },
        });

      await prismaClient.workspacePendingInvitation.delete({
        where: {
          id: workspaceInvitation?.id,
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
