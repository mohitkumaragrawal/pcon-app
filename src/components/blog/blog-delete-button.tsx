"use client";

import { Trash } from "lucide-react";
import DeleteConfirm from "../delete-confirm";
import { Button } from "../ui/button";
import { toast } from "sonner";

import actionDeleteBlog from "@/actions/deleteBlog";

interface Props {
  blogId: string;
}

export default function BlogDeleteButton({ blogId }: Props) {
  const handleDelete = async () => {
    const result = actionDeleteBlog(blogId);
    toast.promise(result, {
      loading: "Deleting...",
      success: "Blog deleted successfully.",
      error: (err) => <p>{err.message}</p>,
    });

    try {
      await result;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DeleteConfirm onConfirm={handleDelete}>
      <Button variant="destructive">
        <Trash size={16} />
      </Button>
    </DeleteConfirm>
  );
}
