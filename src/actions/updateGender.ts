"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function updateGender(gender: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  if ((session.user.gender ?? "").length > 0) {
    throw new Error("Cannot be changed now");
  }

  if (gender !== "Male" && gender !== "Female") {
    throw new Error("Invalid gender");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      gender,
    },
  });
}
