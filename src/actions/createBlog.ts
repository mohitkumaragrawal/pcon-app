"use server";

import { authOptions } from "@/lib/auth";
import { hasRole } from "@/lib/has-role";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import type { Blog } from "@/components/create-blog-form";

export default async function actionCreateBlog(blog: Blog): Promise<any> {
  "use server";

  // Only admin can create blog
  const session = await getServerSession(authOptions);
  if (!hasRole(session, "admin")) {
    throw new Error("You are not authorized to create blog");
  }

  await prisma.blog.create({
    data: {
      title: blog.title,
      content: blog.content,
      authorId: session.user.id,

      BlogTag: {
        createMany: {
          data: blog.tags.map((tag) => {
            return {
              tag,
            };
          }),
        },
      },
    },
  });
  revalidatePath("/blogs", "page");
  return null;
}
