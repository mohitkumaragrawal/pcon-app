"use server";

import prisma from "@/lib/prisma";

// curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

export async function uploadImage(file: File): Promise<{
  deleteUrl: string;
  height: number;
  width: number;
  imageUrl: string;
  mediumUrl: string;
  thumbUrl: string;
  title: string;
  id: string;
}> {
  const formData = new FormData();
  formData.append("image", file);

  console.log("uploading image...");

  const response = await fetch(
    `https://api.imgbb.com/1/upload?&key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);

  if (data?.status !== 200) {
    throw new Error("Error uploading image");
  }

  const result = await prisma.image.create({
    data: {
      deleteUrl: data.data.delete_url as string,
      height: data.data.height as number,
      width: data.data.width as number,
      imageUrl: data.data.url as string,
      mediumUrl: data.data.medium.url as string,
      thumbUrl: data.data.thumb.url as string,
      title: data.data.title as string,
    },
  });

  return result;
}
