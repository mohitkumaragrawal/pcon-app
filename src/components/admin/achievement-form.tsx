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
} from "../ui/form";
import { Input } from "../ui/input";
import ImageInput from "../image-input";
import { Button } from "../ui/button";

import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";

import actionCreateAchievement from "@/actions/createAchievement";
import MarkdownEditor from "../editor/markdown-editor";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const achievementSchema = z.object({
  title: z.string().min(3, {
    message: "Title should be atleast 3 letters long",
  }),

  blog: z.string().min(1, "Blog is required"),

  poster: z
    .any()
    .refine((file) => file, "Image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type AchievementSchema = z.infer<typeof achievementSchema>;

interface AchivementFormProps {
  toastData?: { loading: string; success: string; error: string };
}

export default function AchievementForm(props: AchivementFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<AchievementSchema>({
    resolver: zodResolver(
      achievementSchema.refine(
        (val) => {
          console.log("Form refine", val);
          return true;
        },
        {
          message: "Blog doesn't exist",
          path: ["blogId"],
        },
      ),
    ),
    defaultValues: {
      title: "",
      blog: "",
      poster: null,
    },
  });

  const handleSubmit = async (schema: AchievementSchema) => {
    setLoading(true);

    try {
      const data = new FormData();
      data.append("blog", schema.blog);
      data.append("poster", schema.poster);
      data.append("title", schema.title);

      const promise = actionCreateAchievement(data);
      toast.promise(promise, props.toastData);

      await promise;
    } catch (e) {}

    form.reset();
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                What is the title of your achievement?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blog"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog</FormLabel>
              <FormControl>
                <MarkdownEditor {...field} />
                {/* <Input {...field} /> */}
              </FormControl>
              <FormDescription>Describe your achievement</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poster"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poster *</FormLabel>
              <FormControl>
                <ImageInput file={field.value} onFileChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Choose a poster of the achivement
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={loading}
        >
          {loading && <Spinner className="mr-3" />}
          Create Achivement
        </Button>
      </form>
    </Form>
  );
}
