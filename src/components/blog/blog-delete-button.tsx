"use client";

import { DeleteIcon, Trash } from "lucide-react";
import DeleteConfirm from "../delete-confirm";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

interface Props {
  deleteAction?: any;
  blogId: string;
}

export default function BlogDeleteButton({ deleteAction, blogId }: Props) {
  const handleDelete = async () => {
    const result = deleteAction(blogId);
    toast.promise(result, {
      loading: "Deleting...",
      success: "Blog deleted successfully.",
      error: "Error deleting blog. Please try again.",
    });

    try {
      await result;
    } catch (e) {}
  };

  return (
    <DeleteConfirm onConfirm={handleDelete}>
      <Button variant="destructive">
        <Trash size={16} />
      </Button>
    </DeleteConfirm>
  );
}
