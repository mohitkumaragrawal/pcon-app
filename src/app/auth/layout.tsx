import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/");
  }

  return children;
}
