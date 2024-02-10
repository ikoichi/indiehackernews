import { brandName, emailFrom, websiteUrl } from "@/config";
import { authOptions } from "@/config/auth";
import { sendTransactionalEmail } from "@/libs/mailpace";
import { prismaClient } from "@/prisma/db";
import { WorkspaceRole } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";

type PostWorkspaceInviteRequest = {
  workspaceId: string;
  email: string;
  role: WorkspaceRole;
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
    const payload = JSON.parse(body.toString()) as PostWorkspaceInviteRequest;

    if (!payload.workspaceId || !payload.email || !payload.role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const invitedUser = await prismaClient.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (invitedUser) {
      // add user to the workspace
      await prismaClient.workspaceUsers.create({
        data: {
          workspaceId: payload.workspaceId,
          userId: invitedUser.id,
          role: payload.role.toUpperCase() as WorkspaceRole,
        },
      });
    } else {
      // invite user
      await prismaClient.workspacePendingInvitation.create({
        data: {
          workspaceId: payload.workspaceId,
          email: payload.email,
          role: payload.role.toUpperCase() as WorkspaceRole,
        },
      });

      const workspace = await prismaClient.workspace.findFirst({
        where: {
          id: payload.workspaceId,
        },
      });

      // send email
      sendTransactionalEmail({
        from: emailFrom,
        to: payload.email,
        subject: `You're invited to join ${workspace?.name}`,
        htmlbody: `
You've been invited to join the workspace ${workspace?.name} on ${brandName}.
<br/>
<br/>
<a href="${websiteUrl}/signup">Create an account to join</a>
        
`.trim(),
      });
    }
  }

  return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
}
