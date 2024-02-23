import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AdminAchievement() {
  return (
    <Container>
      <GlitchHeading className="text-xl sm:text-4xl">
        Manage Achievements
      </GlitchHeading>
      <div className="flex flex-row-reverse mb-3">
        <Link href="/admin/achievements/create">
          <Button variant="secondary">
            <PlusIcon className="mr-3" />
            New Achievement
          </Button>
        </Link>
      </div>
    </Container>
  );
}
