import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Filter, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import BlogCard from "@/components/blog/blog-card";

export default async function Blogs() {
  const session = await getServerSession(authOptions);

  const blogs = await prisma.blog.findMany({
    select: {
      author: true,
      id: true,
      title: true,
    },
    take: 20,
  });

  const tags = ["event", "announcement", "news"];

  async function actionDeleteBlog(blogId: string) {
    "use server";

    if (!session) {
      return null;
    }

    try {
      await prisma.blog.delete({
        where: {
          id: blogId,
          authorId: session?.user?.id,
        },
      });

      revalidatePath("/blogs");

      return {
        info: "Blog deleted successfully.",
      };
    } catch (error) {
      return {
        error: "Error deleting blog. Please try again.",
      };
    }
  }

  return (
    <Container>
      <div className="flex justify-between items-center pb-10">
        <GlitchHeading className="text-4xl">Blogs</GlitchHeading>
        <div className="flex gap-3">
          {session && (
            <Link href="/blogs/create">
              <Button variant="secondary">
                <Plus size={24} className="md:mr-3" />
                <span className="hidden md:inline">New Blog</span>
              </Button>
            </Link>
          )}
          <Button variant="secondary">
            <Filter size={24} className="md:mr-3" />
            <span className="hidden md:inline">Filter</span>
          </Button>
        </div>
      </div>
      {blogs.length === 0 && (
        <p className="text-muted-foreground">No blogs found</p>
      )}

      <div className="flex flex-col gap-3">
        {blogs.map((blog) => (
          <BlogCard
            blog={blog}
            actionDeleteBlog={actionDeleteBlog}
            key={blog.id}
          />
        ))}
      </div>
    </Container>
  );
}
