import Container from "@/components/container";
import ProfileCard from "@/components/profile/profile-card";
import { authOptions } from "@/lib/auth";
import { Spinner } from "@nextui-org/react";
import { getServerSession } from "next-auth";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <Container className="flex gap-8 flex-col md:flex-row p-3">
      <ProfileCard session={session} />

      <Card className="bg-slate-800/30 backdrop-blur-lg min-w-80 flex-1">
        <CardBody>Profile body</CardBody>
      </Card>
    </Container>
  );
}
