"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { uploadImage } from "./uploadImage";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function updateProfilePicture(formData: FormData) {
  const session = await getServerSession(authOptions);

  const userId = formData.get("userId") as string;

  if (session?.user?.id !== userId) {
    throw new Error("Unauthorized");
  }

  const image = formData.get("image") as File;
  const imageRef = await uploadImage(image);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: imageRef.mediumUrl,
    },
  });

  revalidatePath(`/profile`);
}
