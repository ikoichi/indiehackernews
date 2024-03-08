import { prismaClient } from "@/prisma/db";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.RANKING_CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // get the records of the last 24 hours
  const resources = await prismaClient.resource.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  return Response.json({ success: true });
}
