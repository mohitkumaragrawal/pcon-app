"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function assertRole(role: string = ""): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (!role || role === "") return;
  const roles = [...session.user.roles];
  if (roles.includes("owner")) return;

  if (!roles.includes(role)) {
    throw new Error("Role not allowed");
  }
}
