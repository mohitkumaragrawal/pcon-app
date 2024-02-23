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
  const blog = schema.get("blog") as string;
  const title = schema.get("title") as string;
  const startDate = schema.get("startDate") as string;
  const endDate = schema.get("endDate") as string;

  const image = await uploadImage(poster);

  // now create the achievement entry;
  const createdBlog = await prisma.blog.create({
    data: {
      title: title,
      content: blog,
      authorId: session.user.id,

      BlogTag: {
        createMany: {
          data: [{ tag: "event" }],
        },
      },
    },
  });

  await prisma.event.create({
    data: {
      title: title,
      blogId: createdBlog.id,
      posterImageId: image.id,
      startDate: startDate,
      endDate: endDate,
    },
  });

  revalidatePath("/blogs", "page");
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
