// "use client";

import EventCard from "../event/event-card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
// import Autoplay from "embla-carousel-autoplay";

export default function UpcomingEventsCarousel({ events }) {
  return (
    <>
      {events.length === 0 ? (
        <p className="text-center text-2xl text-muted-foreground mt-5">
          No upcoming events
        </p>
      ) : (
        <Carousel
          className="mt-10"
          plugins={
            [
              // Autoplay({
              //   delay: 1500,
              // }),
            ]
          }
        >
          <CarouselContent>
            {events.map((eve) => (
              <CarouselItem
                className="md:basis-1/2 h-[32rem] md:h-64"
                key={eve.id}
              >
                <EventCard event={eve} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
}
