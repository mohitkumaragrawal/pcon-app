import Container from "@/components/container";
import CreateBlogForm from "@/components/create-blog-form";
import GlitchHeading from "@/components/glitch-heading";

import actionCreateBlog from "@/actions/createBlog";

export default async function CreateBlog() {
  return (
    <Container>
      <GlitchHeading className="text-4xl">Create Blog</GlitchHeading>
      <CreateBlogForm action={actionCreateBlog} redirect="/blogs" />
    </Container>
  );
}
