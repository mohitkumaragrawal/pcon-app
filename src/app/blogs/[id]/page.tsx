import Container from "@/components/container";
import MyMarkdown from "@/components/my-markdown";
import prisma from "@/lib/prisma";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = params;

  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm -z-20" />
      <Container>
        <p className="text-center font-bold text-lg mb-8">{blog.title}</p>

        <MyMarkdown>{blog.content}</MyMarkdown>
      </Container>
    </>
  );
}
