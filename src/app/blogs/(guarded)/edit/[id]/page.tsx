import Container from "@/components/container";
import CreateBlogForm from "@/components/create-blog-form";
import GlitchHeading from "@/components/glitch-heading";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

import type { Blog } from "@/components/create-blog-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlog({ params }: BlogPageProps) {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.roles?.includes("admin");

  const blogId = params.id;

  // blog data
  const thisBlog = await prisma.blog.findUnique({
    include: {
      BlogTag: true,
    },
    where: {
      id: blogId,
    },
  });

  if (thisBlog.authorId !== session.user.id && !isAdmin) {
    return redirect("/blogs");
  }

  async function actionEditBlog(blog: Blog): Promise<any> {
    "use server";

    // const admin = session?.user?.roles?.includes("admin"); for some reason this doesn't compile
    const roles: string[] = session?.user?.roles || [];
    const isAdmin = roles.includes("admin");

    if (!isAdmin && thisBlog.authorId !== session.user.id) {
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

  return (
    <Container>
      <GlitchHeading className="text-4xl">Edit Blog</GlitchHeading>
      <CreateBlogForm
        action={actionEditBlog}
        redirect="/blogs"
        actionName="Edit Blog"
        defaultValue={{
          title: thisBlog.title,
          content: thisBlog.content,
          tags: thisBlog.BlogTag.map((tag) => tag.tag),
        }}
        toastData={{
          loading: "Updating blog...",
          success: "Blog updated successfully.",
          error: "Error updating blog. Please try again.",
        }}
      />
    </Container>
  );
}
