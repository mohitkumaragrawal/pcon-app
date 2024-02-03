import Container from "@/components/container";
import CreateBlogForm from "@/components/create-blog-form";
import GlitchHeading from "@/components/glitch-heading";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import type { Blog } from "@/components/create-blog-form";

export default async function CreateBlog() {
  const session = await getServerSession(authOptions);

  async function actionCreateBlog(blog: Blog): Promise<boolean> {
    "use server";
    console.log(blog, session.user);

    return true;
  }

  return (
    <Container>
      <GlitchHeading className="text-4xl">Create Blog</GlitchHeading>
      <CreateBlogForm action={actionCreateBlog} />
    </Container>
  );
}
