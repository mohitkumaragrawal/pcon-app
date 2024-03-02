import Container from "@/components/container";
import CreateBlogForm, { Blog } from "@/components/create-blog-form";
import GlitchHeading from "@/components/glitch-heading";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import actionEditBlog from "@/actions/editBlog";

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

  async function editAction(blog: Blog) {
    "use server";
    await actionEditBlog(blog, blogId);
  }

  return (
    <Container>
      <GlitchHeading className="text-4xl">Edit Blog</GlitchHeading>
      <CreateBlogForm
        action={editAction}
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
          error:
            "Error updating blog. Only the original author can edit the blog",
        }}
      />
    </Container>
  );
}
