import Container from "@/components/container";
import CreateBlogForm from "@/components/create-blog-form";
import GlitchHeading from "@/components/glitch-heading";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

import type { Blog } from "@/components/create-blog-form";

export default async function CreateBlog() {
  const session = await getServerSession(authOptions);

  async function actionCreateBlog(blog: Blog): Promise<any> {
    "use server";
    try {
      await prisma.blog.create({
        data: {
          title: blog.title,
          content: blog.content,
          authorId: session.user.id,
        },
      });

      return {
        info: "Blog created successfully.",
      };
    } catch (error) {
      return {
        error: "Error creating blog. Please try again.",
      };
    }
  }

  return (
    <Container>
      <GlitchHeading className="text-4xl">Create Blog</GlitchHeading>
      <CreateBlogForm action={actionCreateBlog} redirect="/blogs" />
    </Container>
  );
}
