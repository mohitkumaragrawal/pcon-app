import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import prisma from "@/lib/prisma";

export default async function TeamPage() {
  const team = await prisma.user.findMany({
    include: {
      UserRoles: true,
      SocialMediaHandle: true,
    },
    where: {
      UserRoles: {
        some: {
          role: "admin",
        },
      },
    },
  });

  let grouped: { [category: string]: ((typeof team)[0] & { post: string })[] } =
    {};

  for (let x of team) {
    let pcon = false,
      president = false,
      alumni = false,
      member = false;

    let post = "";

    for (let role of x.UserRoles) {
      if (role?.role?.startsWith("pcon:")) pcon = true;
      else continue;

      if (role?.role === "pcon:President") president = true;
      else if (role?.role === "pcon:Alumni") alumni = true;
      else if (role?.role === "pcon:Member") member = true;
      else post = role?.role.split(":")[1];
    }

    if (!pcon) continue;
    if (alumni) {
      grouped["Alumni"] = grouped["Alumni"] || [];
      grouped["Alumni"].push({ ...x, post: "Alumni" });
    } else if (president) {
      grouped["President"] = grouped["President"] || [];
      grouped["President"].push({ ...x, post: "Presient" });
    } else if (!member) {
      grouped["Core Members"] = grouped["Core Members"] || [];
      grouped["Core Members"].push({ ...x, post });
    } else {
      grouped["Members"] = grouped["Members"] || [];
      grouped["Members"].push({ ...x, post: "Member" });
    }
  }

  return (
    <Container>
      <GlitchHeading className="text-2xl sm:text-5xl mb-6 sm:mb-10 sm:mt-16">
        Our Team
      </GlitchHeading>
    </Container>
  );
}
