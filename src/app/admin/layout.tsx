import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.roles?.includes("admin")) {
    return redirect("/");
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-black/30"></div>
      {children}
    </>
  );
}
