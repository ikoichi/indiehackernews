import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { HttpStatusCode } from "axios";
import { prismaClient } from "@/prisma/db";
import { authOptions } from "@/config/auth";
import { ApiError } from "@/types/api.types";
import rawBody from "raw-body";
import { Readable } from "stream";
import { Prisma, Resource, UserUpvotes } from "@prisma/client";
import { logSnagClient } from "@/libs/logSnag";

type ResourceResponse = Resource & {
  rank: number;
  userName: string | null;
  userId: string | null;
};

export type GetResourcesResponse = {
  resources: ResourceResponse[];
  userUpvotes: UserUpvotes[];
  page: number;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiError> | NextResponse<GetResourcesResponse | null>> {
  const session = await getServerSession(authOptions);
  console.log(">>> session", session);

  const take = parseInt(
    req.nextUrl.searchParams.get("take") || ("30" as string),
    10
  );

  const skip = parseInt(
    req.nextUrl.searchParams.get("skip") || ("0" as string),
    10
  );

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  /*
  id: string;
    title: string;
    url: string;
    text: string;
    ranking: number;
    createdBy: string;
    upvotes: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  */
  const resourcesRows: ResourceResponse[] =
    await prismaClient.$queryRaw(Prisma.sql`
    with rank as (
      select id, (upvotes - 1) / (pow( (EXTRACT(EPOCH FROM (NOW() - "createdAt")) / 3600) + 2, 1.8)) as rank
      from "public"."Resource"
      group by id
    )
    SELECT
      "Resource".id,
      "Resource".title,
      "Resource".upvotes,
      "Resource".url,
      "Resource".text,
      "Resource"."createdBy",
      "Resource"."createdAt",
      "Resource"."updatedAt",
      "Resource"."isDeleted",
      "User"."name" userName,
      "User"."id" userId,
      RANK () OVER ( 
            ORDER BY rank DESC
      ) rank 
    FROM "public"."Resource"
    INNER JOIN rank n on n.id = "public"."Resource"."id"
    JOIN "public"."User" ON "Resource"."createdBy" = "User"."id"
    WHERE "public"."Resource"."createdAt" > NOW() - INTERVAL '30 day'
    LIMIT ${take}
    OFFSET ${skip};
  `);

  const resources = resourcesRows.map((res) => {
    return {
      ...res,
      rank: Number(res.rank),
    };
  });

  console.log(">>> resources", resources);

  let userUpvotes: UserUpvotes[] = [];
  if (session?.user) {
    userUpvotes = await prismaClient.userUpvotes.findMany({
      where: {
        userId: session?.user?.id,
        resourceId: {
          in: resources.map((r) => r.id),
        },
      },
    });
  }

  const pageNumber = skip / 30 + 1;
  return NextResponse.json(
    { resources, userUpvotes, page: pageNumber },
    { status: HttpStatusCode.Ok }
  );
}

export type PostResourceRequest = {
  title: string;
  url?: string;
  text?: string;
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
    const payload = JSON.parse(body.toString()) as PostResourceRequest;

    if (!payload.title || (!payload.url && !payload.text)) {
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
      const createdResource = await prismaClient.resource.create({
        data: {
          title: payload.title,
          url: payload?.url || "",
          text: payload?.text || "",
          createdBy: user.id,
        },
      });

      try {
        await logSnagClient.track({
          channel: "product",
          event: "New Submission",
          icon: "🔥",
          notify: false,
        });

        await logSnagClient.insight.increment({
          title: "Submissions",
          value: 1,
          icon: "🔥",
        });
      } catch (err) {
        console.error("Error with Logsnag", err);
      }

      return NextResponse.json(createdResource, { status: HttpStatusCode.Ok });
    }
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: HttpStatusCode.InternalServerError }
  );
}
