import prisma from "@/lib/prisma";
import GlitchHeading from "../glitch-heading";
import HomeSection from "./home-section";
import Link from "next/link";
import { Button } from "../ui/button";
import RecentActionCarousel from "./recent-action-carousel";

export default async function RecentActions() {
  const blogs = await prisma.blog.findMany({
    include: {
      author: true,
    },
    take: 20,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <HomeSection>
      <GlitchHeading className="mt-5 flex justify-center text-4xl sm:text-5xl md:block">
        Recent Actions
      </GlitchHeading>

      <div className="mt-8">
        <RecentActionCarousel blogs={blogs} />

        <div className="mt-4 flex flex-row-reverse">
          <Link href="/blogs">
            <Button variant="secondary">Read More</Button>
          </Link>
        </div>
      </div>
    </HomeSection>
  );
}
