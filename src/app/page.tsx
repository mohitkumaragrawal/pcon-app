"use client";
import GlitchHeading from "@/components/glitch-heading";
import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";
import HomeSection from "@/components/home/home-section";
import { TracingBeam } from "@/components/tracing-beam";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HomeSection>
        <GlitchHeading>Recent Events</GlitchHeading>
      </HomeSection>
    </>
  );
}
