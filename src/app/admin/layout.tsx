import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.roles?.includes("admin")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return <p>Welcome to Admin Portal</p>;
}
