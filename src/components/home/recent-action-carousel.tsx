"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import ProfileImage from "../profile-image";

import Autoscroll from "embla-carousel-auto-scroll";

export default function RecentActionCarousel({ blogs }) {
  return (
    <Carousel
      opts={{
        loop: true,
        dragFree: true,
      }}
      plugins={[
        Autoscroll({
          playOnInit: true,
        }),
      ]}
      className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
    >
      <CarouselContent>
        {blogs.map((item) => (
          <CarouselItem
            className="min-h-[10rem] sm:basis-1/2 lg:basis-[34%]"
            key={item.id}
          >
            <Link
              href={`/blogs/${item.id}`}
              key={item.title}
              className="h-full"
            >
              <li className="relative flex h-full max-w-full list-none flex-col justify-between gap-6 rounded-lg border-2 bg-gray-800/[0.5] px-8 py-6">
                <span className="relative z-20 font-bold leading-[1.6] text-gray-100 underline-offset-4 hover:underline md:text-xl">
                  {item.title}
                </span>
                <div className="relative z-20 mt-6 flex flex-row-reverse items-center">
                  <span className="flex flex-row items-center gap-2">
                    <ProfileImage
                      imageUrl={item.author.image}
                      className="h-6 w-6"
                    />
                    <span className="text-sm font-normal leading-[1.6] text-gray-400">
                      {item.author.name}
                    </span>
                  </span>
                </div>
              </li>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
