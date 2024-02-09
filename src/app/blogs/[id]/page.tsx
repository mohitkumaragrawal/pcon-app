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
      <div className="fixed inset-0 backdrop-blur-md -z-10" />
      <Container>
        <Card className="text-center font-bold text-3xl mb-4 tracking-tight py-3">
          {blog.title}
        </Card>
        <div className="flex flex-wrap gap-3 justify-center">
          {blog.BlogTag.map(({ tag }) => (
            <div className="border-2 px-3 py-1 rounded-full" key={tag}>
              #{tag}
            </div>
          ))}
        </div>

        <MyMarkdown>{blog.content}</MyMarkdown>
      </Container>
    </>
  );
}
