"use client";

import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import BlogDeleteButton from "./blog-delete-button";
import ProfileImage from "../profile-image";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";

interface Blog {
  id: string;
  title: string;
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
}

export default function BlogCard({ blog, actionDeleteBlog }: BlogCardProps) {
  const tags = ["event", "announcement", "news"];

  return (
    <Card className="bg-slate-800/30 backdrop-blur-lg min-w-80 flex-1 px-4 py-3">
      <CardBody>
        <div className="text-md font-bold text-cyan-300 mb-2 justify-between flex">
          <Link
            href={`/blogs/${blog.id}`}
            className=" hover:underline underline-offset-4 text-xl"
          >
            {blog.title}
          </Link>
          <div className="gap-2 flex">
            <BlogDeleteButton
              blogId={blog.id}
              deleteAction={actionDeleteBlog}
            />
            <Button variant="secondary">
              <EditIcon size={16} />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {tags.map((tag) => (
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
      </CardBody>
    </Card>
  );
}
