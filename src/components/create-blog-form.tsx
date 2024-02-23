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
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import BlogChipsEdit from "./blog/blog-chips-edit";
import MarkdownEditor from "./editor/markdown-editor";

const blogSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long",
  }),
  tags: z.array(z.string()),
});

export type Blog = z.infer<typeof blogSchema>;

interface Props {
  action: (blog: Blog) => Promise<any>;
  redirect: string;
  defaultValue?: Blog;
  toastData?: { loading: string; success: string; error: string };
  actionName?: string;
}

const allowedChips = [
  "event",
  "annoucement",
  "news",
  "cp",
  "web",
  "android",
  "ios",
  "ml",
  "tutorial",
];

export default function CreateBlogForm({
  action,
  redirect: redirectURL,
  defaultValue,
  toastData,
  actionName,
}: Props) {
  const form = useForm<Blog>({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultValue ?? {
      title: "",
      content: "",
      tags: [],
    },
  });

  useEffect(() => {
    form.setValue("content", defaultValue?.content || "");
    form.setValue("title", defaultValue?.title || "");
  }, [defaultValue, form]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (value: Blog) => {
    const promise = action(value);
    setLoading(true);

    toast.promise(
      promise,
      toastData ?? {
        loading: "Creating blog...",
        success: "Blog created successfully.",
        error: "Error creating blog. Please try again.",
      }
    );

    try {
      const result = await promise;
    } catch (error) {}
    setLoading(false);
    router.push(redirectURL);
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
              </FormLabel>
              <FormControl>
                <MarkdownEditor {...field} />
              </FormControl>
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
              <FormLabel className="text-lg flex justify-between">
                Tags
              </FormLabel>
              <BlogChipsEdit
                chips={field.value}
                onChipsChange={(chips) => field.onChange(chips)}
                allowedChips={allowedChips}
              />
              <FormDescription>
                Add tags to your blog post to make it easier to find.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <BlogChipsEdit allowedChips={["react", "nextjs", "javascript"]} /> */}

        <Button type="submit" variant="secondary" disabled={loading}>
          {loading && <Spinner className="mr-3" />}
          {actionName ?? "Create Blog"}
        </Button>
      </form>
    </Form>
  );
}
