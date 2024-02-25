import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Filter, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import prisma from "@/lib/prisma";
import BlogCard from "@/components/blog/blog-card";
import { hasRole } from "@/lib/has-role";

export default async function Blogs() {
  const session = await getServerSession(authOptions);

  const blogs = await prisma.blog.findMany({
    select: {
      author: true,
      id: true,
      title: true,
      BlogTag: true,
    },
    take: 20,
  });

  const isAdmin = hasRole(session, "admin");

  return (
    <Container>
      <div className="mb-6 flex items-center justify-between sm:mb-10 sm:mt-16">
        <GlitchHeading className="text-2xl sm:text-5xl">Blogs</GlitchHeading>
        <div className="flex gap-3 self-start">
          {isAdmin && (
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
        {blogs.map((blog) => {
          const isOwner = session?.user?.id === blog.author.id;

          return (
            <BlogCard
              blog={blog}
              key={blog.id}
              canChange={isOwner || isAdmin}
            />
          );
        })}
      </div>
    </Container>
  );
}
