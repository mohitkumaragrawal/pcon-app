"use client";

import Link from "next/link";
import BlogDeleteButton from "./blog-delete-button";
import ProfileImage from "../profile-image";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";
import { Card } from "../ui/card";

interface Blog {
  id: string;
  title: string;
  BlogTag: {
    blogId: string;
    tag: string;
  }[];
  author: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
  };
}

interface BlogCardProps {
  blog: Blog;
  actionDeleteBlog: any;
  canChange: boolean;
}

export default function BlogCard({
  blog,
  actionDeleteBlog,
  canChange,
}: BlogCardProps) {
  const tags = ["event", "announcement", "news"];

  return (
    <Card className="px-5 py-5">
      <div className="text-md font-bold text-cyan-300 mb-2 justify-between flex">
        <Link
          href={`/blogs/${blog.id}`}
          className=" hover:underline underline-offset-4 text-xl"
        >
          {blog.title}
        </Link>
        {canChange && (
          <div className="gap-2 flex">
            <BlogDeleteButton
              blogId={blog.id}
              deleteAction={actionDeleteBlog}
            />
            <Link href={`/blogs/edit/${blog.id}`}>
              <Button variant="secondary">
                <EditIcon size={16} />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {blog.BlogTag.map(({ tag }) => (
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
    </Card>
  );
}
