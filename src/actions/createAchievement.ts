"use server";

import { authOptions } from "@/lib/auth";
import { hasRole } from "@/lib/has-role";
import { getServerSession } from "next-auth";
import { uploadImage } from "./uploadImage";
import prisma from "@/lib/prisma";

export default async function actionCreateAchievement(schema: FormData) {
  const session = await getServerSession(authOptions);
  if (!hasRole(session, "admin")) {
    throw new Error("Unauthorized");
  }

  const poster = schema.get("poster") as File;
  const blogId = schema.get("blogId") as string;
  const title = schema.get("title") as string;

  const image = await uploadImage(poster);

  // now create the achievement entry;

  await prisma.achievement.create({
    data: {
      title: title,
      blogId: blogId,
      posterImageId: image.id,
    },
  });
}
