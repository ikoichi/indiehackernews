import { prismaClient } from "@/prisma/db";

/* 
  When you add a workspace member via email,
  if that email is not already present in the User table (not signed up),
  that email is added to the WorkspacePendingInvitations table.
  When a user with that email signs up, this function removes the email form this table
  and adds the new user to the WorkspaceUsers table.
*/
export const onAddInvitedUserToWorkspace = async (email: string) => {
  const workspacePendingInvitations =
    await prismaClient.workspacePendingInvitation.findMany({
      where: {
        email,
      },
    });

  if (workspacePendingInvitations.length > 0) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      for (const workspacePendingInvitation of workspacePendingInvitations) {
        await prismaClient.workspaceUsers.create({
          data: {
            workspaceId: workspacePendingInvitation.workspaceId,
            userId: user.id,
            role: workspacePendingInvitation.role,
          },
        });
      }

      await prismaClient.workspacePendingInvitation.deleteMany({
        where: {
          id: {
            in: workspacePendingInvitations.map((i) => i.id),
          },
        },
      });
    }
  }
};
