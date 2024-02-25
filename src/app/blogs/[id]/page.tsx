import Container from "@/components/container";
import MyMarkdown from "@/components/my-markdown";
import ProfileImage from "@/components/profile-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getProfileLink from "@/lib/get-profile-link";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface BlogPageProps {
  params: {
    id: string;
  };
}

function formatDuration(duration: number): string {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = params;

  const blog = await prisma.blog.findUnique({
    include: {
      BlogTag: true,
      author: true,
    },
    where: {
      id: id,
    },
  });

  const duration = new Date().getTime() - blog.createdAt.getTime();

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

        <div className="flex flex-row-reverse items-center">
          <div className="my-4 flex items-center gap-3 border-2 px-4 py-2 rounded-lg">
            <ProfileImage imageUrl={blog.author.image} />
            <div>
              <Link href={getProfileLink(blog.author.id, blog.author.username)}>
                <Button variant="link" className="m-0 p-0 text-[1rem]">
                  {blog.author.name}
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                {formatDuration(duration)}
              </p>
            </div>
          </div>
        </div>

        <MyMarkdown>{blog.content}</MyMarkdown>
      </Container>
    </>
  );
}
