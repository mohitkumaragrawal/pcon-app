import Container from "@/components/container";
import ProfileCard from "@/components/profile/profile-card";
import { Card, CardHeader } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <Container className="gap-8 flex flex-col p-3">
      <ProfileCard session={session} />

      <Card>
        <CardHeader>Profile</CardHeader>
      </Card>
    </Container>
  );
}
