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
      <div className="text-md font-bold text-cyan-300 mb-2 justify-between flex flex-col md:flex-row">
        <Link
          href={`/blogs/${blog.id}`}
          className=" hover:underline underline-offset-4 text-xl"
        >
          {blog.title}
        </Link>
        {canChange && (
          <div className="gap-2 flex flex-row-reverse -order-1 md:order-1">
            <BlogDeleteButton blogId={blog.id} />
            <Link href={`/blogs/edit/${blog.id}`}>
              <Button variant="outline" className="w-12 h-12 rounded-full">
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
              className="bg-cyan-200/60 border-2 px-2 py-1 rounded-full text-muted text-sm font-semibold"
              key={tag}
            >
              #{tag}
            </div>
          ))}
        </div>
        <Link href={getProfileLink(blog.author.id, blog.author.username)}>
          <div className="text-muted-foreground flex gap-3 items-center justify-end">
            <ProfileImage imageUrl={blog.author.image} />
          </div>
        </Link>
      </div>
    </Card>
  );
}
