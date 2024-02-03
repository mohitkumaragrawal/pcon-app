"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import { toast } from "sonner";

import MyMarkdown from "./my-markdown";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

const blogSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long",
  }),
  tags: z.string().optional(),
});

export type Blog = z.infer<typeof blogSchema>;

interface Props {
  action: (blog: Blog) => Promise<any>;
  redirect: string;
}

export default function CreateBlogForm({
  action,
  redirect: redirectURL,
}: Props) {
  const form = useForm<Blog>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const router = useRouter();

  const onSubmit = async (value: Blog) => {
    const promise = action(value);
    setLoading(true);

    toast.promise(promise, {
      loading: "Creating blog...",
      success: "Blog created successfully.",
      error: "Error creating blog. Please try again.",
    });

    const result = await promise;
    if (!result.error) {
      form.reset();
      router.push(redirectURL);
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Title"
                  className="text-lg py-4 px-4 bg-slate-900/30 backdrop-blur-sm"
                  rows={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg flex justify-between">
                Content
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPreview((p) => !p)}
                >
                  {preview ? "Hide Preview" : "Show Preview"}
                </Button>
              </FormLabel>
              {preview && (
                <MyMarkdown className="text-lg border-2 rounded-md p-3 backdrop-blur-sm">
                  {field.value}
                </MyMarkdown>
              )}
              {!preview && (
                <FormControl>
                  <Textarea
                    placeholder="Content goes here..."
                    className="text-lg py-4 px-4 bg-slate-900/30 backdrop-blur-sm"
                    rows={6}
                    {...field}
                  />
                </FormControl>
              )}
              <FormDescription>
                Write a blog post that is at least 10 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tag goes here..."
                  className="text-lg py-4 px-4 bg-slate-900/30 backdrop-blur-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add tags to your blog post. Separate tags with spaces.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary" disabled={loading}>
          {loading && <Spinner className="mr-3" />}
          Create Blog
        </Button>
      </form>
    </Form>
  );
}
