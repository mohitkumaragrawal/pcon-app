import AchievementCard from "@/components/achievement/achievement-card";
import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import prisma from "@/lib/prisma";

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    include: {
      poster: true,
    },
    take: 20,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <Container>
      <GlitchHeading className="mb-6 text-2xl sm:mb-10 sm:mt-16 sm:text-5xl">
        Achievements
      </GlitchHeading>

      <div className="grid grid-cols-1 gap-10 pb-32 md:grid-cols-2 ">
        {achievements.map((ach) => (
          <AchievementCard achievement={ach} key={ach.id} />
        ))}
      </div>
    </Container>
  );
}
