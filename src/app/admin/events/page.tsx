import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";

import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Events() {
  const events = await prisma.event.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <Container>
      <div className="flex justify-between items-center mb-6 sm:mb-10 sm:mt-16">
        <GlitchHeading className="text-2xl sm:text-5xl">Events</GlitchHeading>
        <div className="flex gap-3 self-start">
          <Link href="/admin/events/create">
            <Button variant="secondary">
              <Plus size={24} className="md:mr-3" />
              <span className="hidden md:inline">New Event</span>
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
