"use server";

import { Blog } from "@/components/create-blog-form";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function actionEditBlog(
  blog: Blog,
  blogId: string,
): Promise<any> {
  // blog data
  const thisBlog = await prisma.blog.findUnique({
    include: {
      BlogTag: true,
    },
    where: {
      id: blogId,
    },
  });

  const session = await getServerSession(authOptions);

  // only the author can now edit the his blog
  if (thisBlog.authorId !== session.user.id) {
    throw new Error("You are not authorized to edit this blog.");
  }

  try {
    await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: blog.title,
        content: blog.content,
        authorId: session.user.id,
        BlogTag: {
          deleteMany: {},
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
  } catch (error) {
    throw new Error("Error creating blog. Please try again.");
  }
}
