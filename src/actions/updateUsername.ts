"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function updateUsername(username: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  if ((session.user.username ?? "").length > 0) {
    throw new Error("Cannot be changed now");
  }

  if (!username || username.length == 0) {
    throw new Error("Bad username");
  }

  // check if it is not duplicate
  const usersCount = await prisma.user.findMany({
    where: {
      username,
    },
  });

  console.log("user count: ", usersCount);

  if (usersCount.length > 0) {
    throw new Error("Username is already taken");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      username,
    },
  });
}
