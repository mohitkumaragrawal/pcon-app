"use server";

import prisma from "@/lib/prisma";
import { assertRole } from "./assertRole";

export type UserWithRoles = {
  image: string;
  roles: string[];
  id: string;
  name: string;
  email: string;
  username?: string;
};

export async function fetchUsers(): Promise<UserWithRoles[]> {
  await assertRole("admin");

  return await prisma.user
    .findMany({
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        UserRoles: {
          select: {
            role: true,
          },
        },
        image: true,
      },
    })
    .then((users) =>
      users.map((u) => ({ ...u, roles: u.UserRoles.map((ur) => ur.role) })),
    );
}
