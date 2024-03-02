"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cn } from "@/lib/utils";
import ImageInput from "./image-input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file, "Image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

type ImageSchema = z.infer<typeof imageSchema>;

interface ImageDialogProps {
  children?: React.ReactNode;

  purpose?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  buttonText?: React.ReactNode;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  onSubmit?: (image: File) => Promise<void>;
}

export default function ImageDialog(props: ImageDialogProps) {
  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ImageSchema) => {
    if (!props.onSubmit) return;

    setLoading(true);
    toast.promise(props.onSubmit?.(data.image), {
      loading: "Uploading image...",
      success: "Image uploaded successfully",
      error: "Failed to upload image",
      finally: () => setLoading(false),
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold">{props.purpose ?? "Pick Image"}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className={cn(loading ? "opacity-30" : "")}>
                  <FormLabel>{props.label ?? "Image *"}</FormLabel>
                  <FormControl>
                    <ImageInput
                      file={field.value}
                      onFileChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {props.description ?? "Max size: 5MB"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="secondary"
              type="button"
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {props.buttonText ?? "Upload"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
