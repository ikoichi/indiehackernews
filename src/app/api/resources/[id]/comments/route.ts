import { authOptions } from "@/config/auth";
import { logSnagClient } from "@/libs/logSnag";
import { prismaClient } from "@/prisma/db";
import { ApiError } from "@/types/api.types";
import { ResourceComments, User } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";
import sanitizeHtml from "sanitize-html";
import { sendTransactionalEmail } from "@/libs/mailpace";

type CommentsWithUser = ResourceComments & {
  user: { id: string; name: string | null };
};
export type CommentsWithUserAndReplies = CommentsWithUser & {
  replies: CommentsWithUserAndReplies[];
};

export type GetCommentsResponse = {
  comments: CommentsWithUserAndReplies[];
};

const buildCommentTree = (comments: CommentsWithUser[]) => {
  const commentMap: Record<string, CommentsWithUserAndReplies> = {};
  const commentTree: CommentsWithUserAndReplies[] = [];

  // First, map comments by their ids for quick access
  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  // Then, structure the comments in a tree
  comments.forEach((comment) => {
    if (comment.parentCommentId === null) {
      // If there's no parentId, it's a top-level comment
      commentTree.push(commentMap[comment.id]);
    } else {
      // If there is a parentId, find the parent comment in the map and push the current comment as a reply
      const parent = commentMap[comment.parentCommentId];
      if (parent) {
        parent.replies.push(commentMap[comment.id]);
      }
    }
  });

  return commentTree;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiError> | NextResponse<GetCommentsResponse>> {
  const comments = await prismaClient.resourceComments.findMany({
    where: {
      resourceId: params.id,
      isDeleted: false,
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

  const commentsTree = buildCommentTree(comments);

  return NextResponse.json(
    { comments: commentsTree },
    { status: HttpStatusCode.Ok }
  );
}

export type PostCommentRequest = {
  text: string;
  parentCommentId?: string;
};

type SendCommentEmailArgs = {
  toEmail: string;
  commentUserName: string;
  resourceTitle: string;
  resourceUrl: string;
  isReply: boolean;
};

const sendCommentEmail = async ({
  toEmail,
  commentUserName,
  resourceTitle,
  resourceUrl,
  isReply,
}: SendCommentEmailArgs) => {
  sendTransactionalEmail({
    from: "Indie Hacker News <hey@indiehackernews.com>",
    to: toEmail,
    subject: isReply ? "New reply to your message" : "New comment on your link",
    htmlbody: `
    ${commentUserName} ${
      isReply ? "replied to your comment on" : "commented on your link"
    } <b>${resourceTitle}</b>
    <br/>
    <br/>
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
          <td>
              <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td bgcolor="black" style="border-radius: 8px;">
                          <a
                            class=”link” href="${resourceUrl}" target="_blank"
                            style="padding: 8px 12px; border: 1px solid black; border-radius: 8px; font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: white;text-decoration: none;font-weight:bold;display: inline-block;"
                          >
                              See comment
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>
    `,
  });
};

export async function POST(
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
    const resourceId = params.id;
    const body = await rawBody(Readable.from(Buffer.from(await req.text())));
    const payload = JSON.parse(body.toString()) as PostCommentRequest;

    if (!payload.text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    await prismaClient.resource.update({
      where: {
        id: resourceId,
      },
      data: {
        comments: {
          increment: 1,
        },
      },
    });

    const sanitizedText = sanitizeHtml(payload.text);

    const comment = await prismaClient.resourceComments.create({
      data: {
        resourceId: resourceId,
        userId: session.user.id,
        text: sanitizedText,
        parentCommentId: payload.parentCommentId || null,
      },
    });

    try {
      await logSnagClient.track({
        channel: "product",
        event: "Comment",
        icon: "💬",
        notify: false,
      });

      await logSnagClient.insight.increment({
        title: "Comments",
        value: 1,
        icon: "💬",
      });
    } catch (err) {
      console.error("Error with Logsnag", err);
    }

    // send email to the resource owner
    const resource = await prismaClient.resource.findFirst({
      where: {
        id: resourceId,
      },
      include: {
        user: true,
      },
    });

    const resourceUrl = `${process.env.NEXTAUTH_URL}/comments/${resourceId}`;
    if (resource?.user.email && !payload.parentCommentId) {
      sendCommentEmail({
        toEmail: resource?.user?.email,
        commentUserName: session?.user?.name || "Someone",
        resourceTitle: resource?.title || "",
        resourceUrl,
        isReply: false,
      });
    }

    // send email to the parent comment owner
    if (payload.parentCommentId) {
      const parentComment = await prismaClient.resourceComments.findFirst({
        where: {
          id: payload.parentCommentId,
        },
        include: {
          user: true,
        },
      });

      if (parentComment && parentComment?.user.email) {
        sendCommentEmail({
          toEmail: parentComment?.user.email,
          commentUserName: session?.user?.name || "Someone",
          resourceTitle: resource?.title || "",
          resourceUrl,
          isReply: true,
        });
      }
    }

    return NextResponse.json({ comment }, { status: HttpStatusCode.Ok });
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: HttpStatusCode.InternalServerError }
  );
}
