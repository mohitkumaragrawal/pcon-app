import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
import { hasRole } from "@/lib/has-role";

export default async function GuardedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const header_url = headersList.get("x-url") || "/";

  if (!hasRole(session, "admin")) {
    return redirect(
      `/auth/signin?callbackUrl=${encodeURIComponent(header_url)}`,
    );
  }

  return <>{children}</>;
}
