import AchievementForm from "@/components/admin/achievement-form";
import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";

export default function AchievementsCreatePage() {
  return (
    <Container>
      <GlitchHeading className="text-xl sm:text-4xl mb-6 sm:mb-10">
        Create Achievement
      </GlitchHeading>

      <AchievementForm
        toastData={{
          loading: "Creating Achievement",
          error: "Something went wrong",
          success: "Successfully created achievement",
        }}
      />
    </Container>
  );
}