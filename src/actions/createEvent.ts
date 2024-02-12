"use server";

import { authOptions } from "@/lib/auth";
import { hasRole } from "@/lib/has-role";
import { getServerSession } from "next-auth";
import { uploadImage } from "./uploadImage";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function actionCreateEvent(schema: FormData) {
  const session = await getServerSession(authOptions);
  if (!hasRole(session, "admin")) {
    throw new Error("Unauthorized");
  }

  const poster = schema.get("poster") as File;
  const blogId = schema.get("blogId") as string;
  const title = schema.get("title") as string;
  const startDate = schema.get("startDate") as string;
  const endDate = schema.get("endDate") as string;

  const imageId = await uploadImage(poster);

  // now create the achievement entry;

  await prisma.event.create({
    data: {
      title: title,
      blogId: blogId,
      posterImageId: imageId,
      startDate: startDate,
      endDate: endDate,
    },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
}