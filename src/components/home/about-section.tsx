"use client";

import Image from "next/image";
import GlitchHeading from "../glitch-heading";

import img1 from "@/assets/galary/hero-2.jpeg";
import { TextGenerateEffect } from "../text-generate-effect";
import HomeSection from "./home-section";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  const words = `We, at Programming Club of NIT Jamshedpur, are a group of highly enthusiastic and dedicated individuals striving to spread algorithmic thinking to ignite the minds of the contemporary generation to Code for the Future. PCON consists of a diverse group which focuses on Competitive Coding, App and Web development, Cloud Computing, Machine Learning, Blockchain and many more. If you think that the bits are the alphabets of the future, you are One of Us, spreading the gene-o-code all the way!`;

  return (
    <HomeSection
      className={cn(
        "md:flex-row-reverse",
        "flex flex-col gap-8 md:items-center",
      )}
    >
      <GlitchHeading className="mt-10 flex justify-center text-4xl md:hidden">
        Who are we?
      </GlitchHeading>
      <div className="order-2 flex-1 md:order-none">
        <GlitchHeading className="mb-6 hidden text-5xl md:block">
          Who are we?
        </GlitchHeading>
        <TextGenerateEffect className="text-lg" words={words} />
      </div>
      <div className="relative flex h-full flex-1 items-center justify-center p-2 bg-grid-small-cyan-500/[0.6]">
        <Image
          src={img1}
          alt="landing image"
          className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-cyan-400/20 transition-all hover:opacity-100"
        />
      </div>
    </HomeSection>
  );
}
