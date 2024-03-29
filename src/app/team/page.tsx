import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import ProfileCard from "@/components/profile/profile-card";
import getProfileLink from "@/lib/get-profile-link";
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

  let grouped: {
    [category: string]: ((typeof team)[0] & { post: string; order: number })[];
  } = {};

  for (let x of team) {
    let pcon = false,
      president = false,
      alumni = false,
      member = false;

    let post = "";
    let order = 0;

    for (let role of x.UserRoles) {
      if (role?.role?.startsWith("order:")) {
        order = parseInt(role?.role.split(":")[1]);
      } else if (role?.role?.startsWith("pcon:")) pcon = true;
      else continue;

      if (role?.role === "pcon:President") president = true;
      else if (role?.role === "pcon:Alumni") alumni = true;
      else if (role?.role === "pcon:Member") member = true;
      else post = role?.role.split(":")[1];
    }
    if (!pcon) continue;
    if (alumni) {
      grouped["Alumni"] = grouped["Alumni"] || [];
      grouped["Alumni"].push({ ...x, post: "Alumni", order });
    } else if (president) {
      grouped["Core Members"] = grouped["Core Members"] || [];
      grouped["Core Members"].push({ ...x, post: "Presient", order });
    } else if (!member) {
      grouped["Core Members"] = grouped["Core Members"] || [];
      grouped["Core Members"].push({ ...x, post, order });
    } else {
      grouped["Members"] = grouped["Members"] || [];
      grouped["Members"].push({ ...x, post: "Member", order });
    }
  }
  const order = ["Core Members", "Members", "Alumni"];

  for (let category in grouped) {
    grouped[category].sort((a, b) => a.order - b.order);
  }

  return (
    <Container>
      <GlitchHeading className="mb-6 text-4xl sm:mb-10 sm:mt-16 sm:text-5xl">
        Our Team
      </GlitchHeading>

      {order.map((category) => (
        <div key={category} className="my-8">
          <div className="flex gap-3">
            <div
              className="glitch ml-3 text-2xl font-bold"
              style={{
                fontFamily: "monospace",
              }}
            >
              {category}
            </div>
            <div
              className="glitch ml-3 scale-80 text-2xl opacity-60"
              style={{ fontFamily: "monospace" }}
            >
              {grouped[category]?.length}
            </div>
          </div>

          <div className="mb-10 mt-3 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grouped[category]?.map((user) => (
              <ProfileCard
                key={user.id}
                id={user.id}
                accounts={user.SocialMediaHandle}
                email={user.email}
                image={user.image}
                name={user.name}
                profileLink={getProfileLink(user.id, user.username)}
                roles={user.UserRoles.map((x) => x.role)}
              />
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}
