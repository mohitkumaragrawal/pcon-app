"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  type: z.enum([
    "github",
    "codeforces",
    "codechef",
    "linkedin",
    "twitter",
    "instagram",
    "discord",
  ]),
});

export default async function removeAccount(type: string) {
  schema.parse({ type });

  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    await prisma.socialMediaHandle.deleteMany({
      where: {
        userId: session?.user?.id,
        type,
      },
    });

    revalidatePath("/profile");
  } else {
    throw new Error("Unauthorized");
  }
}
