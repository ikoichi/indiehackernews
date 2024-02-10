import { authOptions } from "@/config/auth";
import { prismaClient } from "@/prisma/db";
import { WorkspaceRole } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";

type PostWorkspaceRequest = {
  name: string;
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
    const payload = JSON.parse(body.toString()) as PostWorkspaceRequest;

    if (!payload.name) {
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

    const workspace = await prismaClient.workspace.create({
      data: {
        name: payload.name || "",
        createdBy: currentUser?.id || "",
      },
    });

    await prismaClient.workspaceUsers.create({
      data: {
        userId: currentUser?.id || "",
        workspaceId: workspace.id,
        role: WorkspaceRole.OWNER,
      },
    });

    return NextResponse.json({ workspace }, { status: HttpStatusCode.Ok });
  }

  return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
}
