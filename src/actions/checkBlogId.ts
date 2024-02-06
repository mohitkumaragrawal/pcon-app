"use server";

import prisma from "@/lib/prisma";

export default async function checkBlogId(blogId: string): Promise<boolean> {
  try {
    const blog = await prisma.blog.findFirst({
      select: {
        id: true,
      },
      where: {
        id: blogId,
      },
    });

    if (blog) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}
