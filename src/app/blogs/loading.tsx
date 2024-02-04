"use client";

import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Card, CardBody } from "@nextui-org/react";

import ProfileImage from "@/components/profile-image";

export default function BlogsLoading() {
  const blogSkeleton = [1, 2];

  return (
    <Container>
      <div className="flex justify-between items-center pb-10">
        <GlitchHeading className="text-4xl">Blogs</GlitchHeading>
        <div className="flex gap-3"></div>
      </div>

      <div className="flex flex-col gap-3">
        {blogSkeleton.map((idx) => (
          <Card
            className="bg-slate-800/30 backdrop-blur-lg min-w-80 flex-1 px-4 py-3"
            key={idx}
          >
            <CardBody>Loading..</CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
}
