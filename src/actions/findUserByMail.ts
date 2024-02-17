"use server";

import prisma from "@/lib/prisma";

export default async function findUserByMail(mail: string) {
  const user = await prisma.user.findUnique({
    include: {
      UserRoles: {
        select: {
          role: true,
        },
      },
      SocialMediaHandle: {
        select: {
          type: true,
          handle: true,
        },
      },
    },
    where: {
      email: mail,
    },
  });

  return user;
}
