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

import checkBlogId from "@/actions/checkBlogId";
import actionCreateEvent from "@/actions/createEvent";
import DatePicker from "../date-picker";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const eventSchema = z.object({
  title: z.string().min(3, {
    message: "Title should be atleast 3 letters long",
  }),

  blogId: z.string().min(1, {
    message: "This field is required",
  }),

  poster: z
    .any()
    .refine((file) => file, "Image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

  startDate: z.date(),
  endDate: z.date(),
});

export type EventSchema = z.infer<typeof eventSchema>;
export default function EventForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EventSchema>({
    resolver: zodResolver(
      eventSchema.refine(
        (val) => {
          console.log("Form refine", val);
          return true;
        },
        {
          message: "Blog doesn't exist",
          path: ["blogId"],
        }
      )
    ),
    defaultValues: {
      title: "",
      blogId: "",
      poster: null,
    },
  });

  const handleSubmit = async (schema: EventSchema) => {
    setLoading(true);

    const isValid = await checkBlogId(schema.blogId);

    if (!isValid) {
      toast.error("Blog doesn't exist");
    }

    try {
      const data = new FormData();
      data.append("blogId", schema.blogId);
      data.append("poster", schema.poster);
      data.append("title", schema.title);
      const startDate = schema.startDate.toISOString();
      const endDate = schema.endDate.toISOString();
      data.append("startDate", startDate);
      data.append("endDate", endDate);

      const promise = actionCreateEvent(data);
      toast.promise(promise, {
        loading: "Creating Event..",
        success: "Successfully created event",
        error: "Something went wrong",
      });

      await promise;

      router.push("/admin/events");
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
          name="blogId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Where is the blog?</FormDescription>
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

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormDescription>When does the event starts?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormDescription>When does the event ends?</FormDescription>
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
          Create Event
        </Button>
      </form>
    </Form>
  );
}
