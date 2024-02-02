"use client";
import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";
import Image from "next/image";

import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
}
