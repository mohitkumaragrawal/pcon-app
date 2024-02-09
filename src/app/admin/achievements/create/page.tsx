import { uploadImage } from "@/actions/uploadImage";
import AchievementForm from "@/components/admin/achievement-form";
import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { authOptions } from "@/lib/auth";
import { hasRole } from "@/lib/has-role";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default function AchievementsCreatePage() {
  async function actionCreateAchievement(schema: FormData) {
    "use server";

    const session = await getServerSession(authOptions);
    if (!hasRole(session, "admin")) {
      throw new Error("Unauthorized");
    }

    const poster = schema.get("poster") as File;
    const blogId = schema.get("blogId") as string;
    const title = schema.get("title") as string;

    const imageId = await uploadImage(poster);

    // now create the achievement entry;

    await prisma.achievement.create({
      data: {
        title: title,
        blogId: blogId,
        posterImageId: imageId,
      },
    });
  }

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
        action={actionCreateAchievement}
      />
    </Container>
  );
}
