import Container from "@/components/container";
import { Card, CardHeader } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { hasRole } from "@/lib/has-role";
import { getServerSession } from "next-auth";

export default async function RolesLayout({ children }) {
  const session = await getServerSession(authOptions);

  const isOwner = hasRole(session, "pcon:Owner");
  if (!isOwner) {
    return (
      <Container>
        <Card>
          <CardHeader className="text-4xl text-center">Unauthorized</CardHeader>
        </Card>
      </Container>
    );
  }

  return <>{children}</>;
}
