"use server";

import prisma from "@/lib/prisma";
import GlitchHeading from "../glitch-heading";
import { Button } from "../ui/button";
import HomeSection from "./home-section";

import Link from "next/link";
import UpcomingEventsCarousel from "./upcoming-events-carousel";

export default async function UpcomingEvents() {
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

  return (
    <HomeSection>
      <GlitchHeading className="mt-5 flex justify-center text-4xl sm:text-5xl md:block">
        Upcoming Events
      </GlitchHeading>
      <UpcomingEventsCarousel events={upcomingEvents} />
      <div className="mt-10 flex flex-row-reverse">
        <Link href="/events">
          <Button variant="secondary">Read More</Button>
        </Link>
      </div>
    </HomeSection>
  );
}
