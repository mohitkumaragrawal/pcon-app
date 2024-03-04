import Container from "@/components/container";
import EventCard from "@/components/event/event-card";
import GlitchHeading from "@/components/glitch-heading";
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
      <GlitchHeading className="mb-6 text-2xl sm:mb-10 sm:mt-16 sm:text-5xl">
        Events
      </GlitchHeading>

      <div className="grid grid-cols-1 gap-10 pb-8 md:grid-cols-2">
        {upcomingEvents.map((eve) => (
          <EventCard event={eve} key={eve.id} />
        ))}
      </div>
      {upcomingEvents.length === 0 && (
        <p className="text-xl text-gray-500">No more events</p>
      )}

      <GlitchHeading className="mb-6 text-2xl sm:mb-10 sm:mt-16 sm:text-5xl">
        Past Events
      </GlitchHeading>
      <div className="grid grid-cols-1 gap-10 pb-8 md:grid-cols-2">
        {pastEvents.map((eve) => (
          <EventCard event={eve} key={eve.id} />
        ))}
      </div>
      {pastEvents.length === 0 && (
        <p className="text-xl text-gray-500">No more events</p>
      )}
    </Container>
  );
}
