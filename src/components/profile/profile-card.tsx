"use client";

import { Card } from "../ui/card";
import { hasRoleInArray } from "@/lib/has-role";

import socialMedia from "@/lib/social-media";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageInput from "../image-input";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import updateProfilePicture from "@/actions/updateProfilePicture";
import { toast } from "sonner";
import { Pen } from "lucide-react";

interface SocialMediaHandleProps {
  platform: {
    name: string;
    icon?: React.ReactNode;
  };
  handle: string;
}
function SocialMediaHandle(props: SocialMediaHandleProps) {
  return (
    <Link
      href={props.handle}
      target="_blank"
      className="flex cursor-pointer items-center gap-3 rounded-full border-2 px-4 py-4 transition-all hover:bg-slate-900"
    >
      <span className="">{props.platform.icon}</span>
    </Link>
  );
}

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

interface ProfilePictureDialogProps {
  image: string;
  userId: string;
}
function ProfilePictureDialog({ image, userId }: ProfilePictureDialogProps) {
  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ImageSchema) => {
    const formData = new FormData();
    setLoading(true);

    formData.append("image", data.image);
    formData.append("userId", userId);

    toast.promise(updateProfilePicture(formData), {
      loading: "Updating profile picture...",
      success: () => {
        setLoading(false);
        return "Profile picture updated successfully.";
      },
      error: "Failed to update profile picture",
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative flex justify-center text-center transition-all hover:brightness-125">
          <img
            src={image}
            alt="Profile picture"
            className="h-40 w-40 rounded-full border-2 border-cyan-500/40 object-cover"
            referrerPolicy="no-referrer"
          />
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
            <Pen />
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold">Edit Profile Picture</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className={cn(loading ? "opacity-30" : "")}>
                  <FormLabel>Poster *</FormLabel>
                  <FormControl>
                    <ImageInput
                      file={field.value}
                      onFileChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a poster of the achivement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="secondary" type="submit" disabled={loading}>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfileCard({
  name,
  image,
  roles,
  email,
  accounts: otherAccounts,
  profileLink,
  canEdit,
  id,
}: {
  id: string;
  name: string;
  image: string;
  email: string;
  roles: string[];
  accounts: { type: string; handle: string }[];
  profileLink?: string;
  canEdit?: boolean;
}) {
  // const isAdmin = hasRoleInArray(roles, "admin");

  let chips = [];
  roles.forEach((r) => {
    if (r.startsWith("chip:")) {
      chips.push(r.split(":")[1]);
    }
  });

  const accounts = profileLink
    ? [...otherAccounts, { type: "pcon", handle: profileLink }]
    : otherAccounts;

  return (
    <Card className="w-full">
      <div className="relative flex flex-col items-center py-8">
        <div className="absolute right-3 top-2 flex gap-2 text-sm">
          {chips.map((chip) => (
            <div key={chip} className="rounded-full border-2 px-2 py-0">
              {chip}
            </div>
          ))}
        </div>

        {canEdit ? (
          <ProfilePictureDialog image={image} userId={id} />
        ) : (
          <div className="flex justify-center text-center">
            <img
              src={image}
              alt="Profile picture"
              className="h-40 w-40 rounded-full border-2 border-cyan-300/40 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <p className="mt-4 text-2xl font-bold">{name}</p>
        <p className="opacity-80">{email}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2 px-3">
          {accounts.map((acc) => {
            const p = socialMedia.find((x) => x.name === acc.type);
            return (
              <SocialMediaHandle
                platform={p}
                key={p.name}
                handle={acc.handle}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
}
