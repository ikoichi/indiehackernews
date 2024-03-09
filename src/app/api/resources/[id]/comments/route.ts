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

    const comment = await prismaClient.resourceComments.create({
      data: {
        resourceId: resourceId,
        userId: session.user.id,
        text: payload.text,
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

    return NextResponse.json({ comment }, { status: HttpStatusCode.Ok });
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: HttpStatusCode.InternalServerError }
  );
}
