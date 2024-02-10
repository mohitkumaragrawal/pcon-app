"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { hasRole } from "@/lib/has-role";
import { revalidatePath } from "next/cache";

export default async function actionDeleteBlog(blogId: string) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const blog = await prisma.blog.findUnique({
    select: {
      Event: {
        select: {
          id: true,
        },
      },
      Achievement: {
        select: {
          id: true,
        },
      },
      authorId: true,
    },
    where: {
      id: blogId,
    },
  });

  if (blog?.Event.length > 0) {
    throw new Error("Some events are linked to this blog!");
  }

  if (blog?.Achievement.length > 0) {
    throw new Error("Some achievements are linked to this blog!");
  }

  if (!hasRole(session, "admin") && blog.authorId !== session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.blogTag.deleteMany({
    where: {
      blogId: blogId,
    },
  });

  await prisma.blog.delete({
    where: {
      id: blogId,
      authorId: session?.user?.id,
    },
  });

  revalidatePath("/blogs");
}
