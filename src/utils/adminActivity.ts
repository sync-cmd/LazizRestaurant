import { prisma } from "@/utils/connect";

type ActivityData = {
  adminId: string;
  adminName?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  details?: string;
};

export const createAdminActivity = async ({
  adminId,
  adminName,
  action,
  entity,
  entityId,
  details,
}: ActivityData) => {
  try {
    await prisma.adminActivity.create({
      data: {
        adminId,
        adminName,
        action,
        entity,
        entityId,
        details,
      },
    });
  } catch (error) {
    console.error("Failed to create admin activity:", error);
  }
};
