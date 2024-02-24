"use client";
import GlitchHeading from "../glitch-heading";

import img1 from "@/assets/galary/1.jpg";
import img2 from "@/assets/galary/hero-1.jpeg";
import img3 from "@/assets/galary/hero-2.jpeg";
import img4 from "@/assets/galary/hero-3.jpeg";
import img5 from "@/assets/galary/hero-4.jpeg";

import TextSwapper from "../text-swapper";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Autoplay from "embla-carousel-autoplay";

function AnimatedText({ children, className }) {
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: "-100%",
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: "100%",
      }}
      key={1}
      className={`text-2xl ${className}`}
      style={{
        textShadow: "0 0 3px #eeeeff",
      }}
    >
      {children}
    </motion.p>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex flex-col gap-8 p-5 md:flex-row md:items-center md:p-20">
      <GlitchHeading className="text-6xl md:mb-10 md:hidden">
        PCON
      </GlitchHeading>
      <div className="order-2 flex-1 md:order-none">
        <GlitchHeading className="mb-10 hidden text-6xl md:block">
          PCON
        </GlitchHeading>
        <div className="overflow-visible text-xl">
          Unleashing Code Wizards:{" "}
          <span className="font-bold text-cyan-500">
            Programming Club Of NIT Jamshedpur
          </span>{" "}
          - Pioneering excellence in <br />{" "}
          <TextSwapper
            delay={2000}
            components={[
              <AnimatedText key={1} className="text-cyan-300">
                Competitive Programming
              </AnimatedText>,
              <AnimatedText key={2} className="text-yellow-300">
                Web Development
              </AnimatedText>,
              <AnimatedText key={3} className="text-red-300">
                App Development
              </AnimatedText>,
              <AnimatedText key={4} className="text-violet-300">
                Machine Learning
              </AnimatedText>,
            ]}
          />
        </div>
      </div>

      <div className="relative flex h-full flex-1 items-center justify-center p-4 bg-grid-small-cyan-500/[0.6] ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2500,
              waitForTransition: true,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <Image
                src={img1}
                alt="landing image"
                className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-cyan-400/20 transition-all hover:opacity-100"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={img2}
                alt="landing image"
                className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-cyan-400/20 transition-all hover:opacity-100"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={img3}
                alt="landing image"
                className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-cyan-400/20 transition-all hover:opacity-100"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={img4}
                alt="landing image"
                className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-cyan-400/20 transition-all hover:opacity-100"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={img5}
                alt="landing image"
                className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-cyan-400/20 transition-all hover:opacity-100"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
