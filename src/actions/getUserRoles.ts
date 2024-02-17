import prisma from "@/lib/prisma";

export default async function getUserRoles(userId: string) {
  const userRoles = await prisma.userRoles.findMany({
    select: {
      role: true,
    },
    where: {
      userId,
    },
  });

  return userRoles.map((role) => role.role);
}
