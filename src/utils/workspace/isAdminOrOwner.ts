import { prismaClient } from "@/prisma/db";

type IsAdminOrOwnerArgs = {
  workspaceId: string;
  userId: string;
};

export const getIsAdminOrOwner = async ({
  workspaceId,
  userId,
}: IsAdminOrOwnerArgs) => {
  const currentUserRole = await prismaClient.workspaceUsers.findFirst({
    where: {
      userId,
      workspaceId,
    },
  });

  return currentUserRole?.role === "ADMIN" || currentUserRole?.role === "OWNER";
};
