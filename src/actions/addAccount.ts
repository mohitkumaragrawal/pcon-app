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
  account: z.string().url(),
});

export default async function addAccount(type: string, account: string) {
  schema.parse({ type, account });

  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    await prisma.socialMediaHandle.create({
      data: {
        handle: account,
        type: type,
        userId: session?.user?.id,
      },
    });

    revalidatePath("/profile");
  } else {
    throw new Error("Unauthorized");
  }
}
