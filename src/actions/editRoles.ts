"use server";

import prisma from "@/lib/prisma";
import { assertRole } from "./assertRole";

export async function editRoles(
  userId: string,
  roles: string[],
): Promise<void> {
  await assertRole("pcon:Owner");

  await prisma.userRoles.deleteMany({
    where: {
      userId,
    },
  });

  // add the new userRoles
  await prisma.userRoles.createMany({
    data: roles.map((role) => ({
      userId,
      role,
    })),
  });
}
