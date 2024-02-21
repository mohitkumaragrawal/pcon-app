"use server";

import prisma from "@/lib/prisma";
import GlitchHeading from "../glitch-heading";
import { Button } from "../ui/button";
import HomeSection from "./home-section";
import EventCard from "../event/event-card";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
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
      <GlitchHeading className="text-4xl sm:text-5xl mt-5 justify-center flex md:block">
        Upcoming Events
      </GlitchHeading>
      <UpcomingEventsCarousel events={events} />
      <div className="flex flex-row-reverse mt-10">
        <Link href="/events">
          <Button variant="secondary">Read More</Button>
        </Link>
      </div>
    </HomeSection>
  );
}
