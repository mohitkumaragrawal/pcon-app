import prisma from "@/lib/prisma";
import type { MetadataRoute } from "next";

const URL = "https://pconjsr.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogs = await prisma.blog.findMany();

  return [
    {
      url: `${URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/team`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/events`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/achievements`,
      lastModified: new Date(),
    },
    ...allBlogs.map((blog) => ({
      url: `${URL}/blogs/${blog.id}`,
      lastModified: new Date(blog.updatedAt),
    })),
  ];
}
