import AchievementForm from "@/components/admin/achievement-form";
import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";

import { z } from "zod";

export default function AchievementsCreatePage() {
  return (
    <Container>
      <GlitchHeading className="text-xl sm:text-4xl mb-6 sm:mb-10">
        Create Achievement
      </GlitchHeading>

      <AchievementForm />
    </Container>
  );
}
