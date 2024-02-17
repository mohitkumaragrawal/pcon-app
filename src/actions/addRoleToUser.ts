"use server";

import { authOptions } from "@/lib/auth";
import { hasRole } from "@/lib/has-role";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function addRoleToUser(userId: string, role: string) {
  const session = await getServerSession(authOptions);

  if (!hasRole(session, "pcon:Owner")) {
    throw new Error("Unauthorized");
  }

  await prisma.userRoles.create({
    data: {
      role,
      userId,
    },
  });
}
