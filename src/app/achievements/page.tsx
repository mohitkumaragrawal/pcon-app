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
      <GlitchHeading className="text-2xl sm:text-5xl mb-6 sm:mb-10 mt-16">
        Achievements
      </GlitchHeading>

      <div>
        {achievements.map((ach) => (
          <AchievementCard achievement={ach} key={ach.id} />
        ))}
      </div>
    </Container>
  );
}
