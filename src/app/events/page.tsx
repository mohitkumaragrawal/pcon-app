import Container from "@/components/container";
import EventCard from "@/components/event/event-card";
import GlitchHeading from "@/components/glitch-heading";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function Events() {
  const events = await prisma.event.findMany({
    include: {
      poster: true,
    },
    take: 20,
    orderBy: {
      updatedAt: "desc",
    },
  });

  const upcomingEvents = events.filter((event) => {
    return new Date(event.endDate) >= new Date();
  });
  const pastEvents = events.filter((event) => {
    return new Date(event.endDate) < new Date();
  });

  return (
    <Container>
      <GlitchHeading className="text-2xl sm:text-5xl mb-6 sm:mb-10 sm:mt-16">
        Events
      </GlitchHeading>

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 pb-8">
        {upcomingEvents.map((eve) => (
          <EventCard event={eve} key={eve.id} />
        ))}
      </div>
      {upcomingEvents.length === 0 && (
        <p className="text-gray-500 text-xl">No more events</p>
      )}

      <GlitchHeading className="text-2xl sm:text-5xl mb-6 sm:mb-10 sm:mt-16">
        Past Events
      </GlitchHeading>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 pb-8">
        {pastEvents.map((eve) => (
          <EventCard event={eve} key={eve.id} />
        ))}
      </div>
      {pastEvents.length === 0 && (
        <p className="text-gray-500 text-xl">No more events</p>
      )}
    </Container>
  );
}
