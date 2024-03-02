"use server";

import { uploadImage } from "./uploadImage";

export async function uploadImageForm(form: FormData): Promise<{
  deleteUrl: string;
  height: number;
  width: number;
  imageUrl: string;
  mediumUrl: string;
  thumbUrl: string;
  title: string;
  id: string;
}> {
  const image = form.get("image") as File;
  return await uploadImage(image);
}
