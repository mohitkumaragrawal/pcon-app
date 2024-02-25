import Container from "@/components/container";
import CreateBlogForm from "@/components/create-blog-form";
import GlitchHeading from "@/components/glitch-heading";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

import type { Blog } from "@/components/create-blog-form";
import { revalidatePath } from "next/cache";
import { hasRole } from "@/lib/has-role";

export default async function CreateBlog() {
  async function actionCreateBlog(blog: Blog): Promise<any> {
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

  return (
    <Container>
      <GlitchHeading className="text-4xl">Create Blog</GlitchHeading>
      <CreateBlogForm action={actionCreateBlog} redirect="/blogs" />
    </Container>
  );
}
