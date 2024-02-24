"use client";

import Link from "next/link";
import BlogDeleteButton from "./blog-delete-button";
import ProfileImage from "../profile-image";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";
import { Card } from "../ui/card";
import getProfileLink from "@/lib/get-profile-link";

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
    username?: string;
  };
}

interface BlogCardProps {
  blog: Blog;
  canChange: boolean;
}

export default function BlogCard({ blog, canChange }: BlogCardProps) {
  return (
    <Card className="px-5 py-5">
      <div className="text-md mb-2 flex flex-col justify-between font-bold text-cyan-300 md:flex-row">
        <Link
          href={`/blogs/${blog.id}`}
          className=" text-xl underline-offset-4 hover:underline"
        >
          {blog.title}
        </Link>
        {canChange && (
          <div className="-order-1 flex flex-row-reverse gap-2 md:order-1">
            <BlogDeleteButton blogId={blog.id} />
            <Link href={`/blogs/edit/${blog.id}`}>
              <Button variant="outline" className="h-12 w-12 rounded-full">
                <EditIcon size={16} />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {blog.BlogTag.map(({ tag }) => (
            <div
              className="rounded-full border-2 bg-cyan-200/60 px-2 py-1 text-sm font-semibold text-muted"
              key={tag}
            >
              #{tag}
            </div>
          ))}
        </div>
        <Link href={getProfileLink(blog.author.id, blog.author.username)}>
          <div className="flex items-center justify-end gap-3 text-muted-foreground">
            <ProfileImage imageUrl={blog.author.image} />
          </div>
        </Link>
      </div>
    </Card>
  );
}
