import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { DeleteIcon, EditIcon, Filter, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { Button as NextButton, Card, CardBody } from "@nextui-org/react";

import prisma from "@/lib/prisma";
import ProfileImage from "@/components/profile-image";
import DeleteConfirm from "@/components/delete-confirm";
import BlogDeleteButton from "@/components/blog/blog-delete-buttont";
import { revalidatePath } from "next/cache";

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
          <Card
            className="bg-slate-800/30 backdrop-blur-lg min-w-80 flex-1 px-4 py-3"
            key={blog.id}
          >
            <CardBody>
              <div className="text-md font-bold text-cyan-300 mb-2 justify-between flex">
                <Link
                  href={`/blogs/${blog.id}`}
                  className=" hover:underline underline-offset-4 text-xl"
                >
                  {blog.title}
                </Link>
                <div className="gap-2 flex">
                  <BlogDeleteButton
                    blogId={blog.id}
                    deleteAction={actionDeleteBlog}
                  />
                  <Button variant="secondary">
                    <EditIcon size={16} />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {tags.map((tag) => (
                    <div
                      className="bg-cyan-200/60 px-2 py-1 rounded-full text-muted text-sm font-bold"
                      key={tag}
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
                <div className="text-muted-foreground flex gap-3 items-center justify-end">
                  <ProfileImage imageUrl={blog.author.image} />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
}
