import Container from "@/components/container";
import MyMarkdown from "@/components/my-markdown";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = params;

  const blog = await prisma.blog.findUnique({
    include: {
      BlogTag: true,
    },
    where: {
      id: id,
    },
  });

  return (
    <>
      <div className="fixed inset-0 -z-10 backdrop-blur-md" />
      <Container>
        <Card className="mb-4 py-3 text-center text-3xl font-bold tracking-tight">
          {blog.title}
        </Card>
        <div className="flex flex-wrap justify-center gap-3">
          {blog.BlogTag.map(({ tag }) => (
            <div className="rounded-full border-2 px-3 py-1" key={tag}>
              #{tag}
            </div>
          ))}
        </div>

        <MyMarkdown>{blog.content}</MyMarkdown>
      </Container>
    </>
  );
}
