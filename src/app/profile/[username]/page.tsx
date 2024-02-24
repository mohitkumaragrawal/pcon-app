import Container from "@/components/container";
import ProfileCard from "@/components/profile/profile-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({
  params: { username },
}: ProfilePageProps) {
  const user = await prisma.user.findMany({
    include: {
      SocialMediaHandle: true,
      Blog: {
        select: {
          title: true,
          id: true,
        },
      },
      UserRoles: true,
    },
    where: username.startsWith("_")
      ? {
          id: username.slice(1),
        }
      : {
          username: username,
        },
  });

  if (user?.length !== 1) {
    return (
      <Container>
        <Card>
          <CardHeader className="text-center text-3xl font-bold">
            User not found
          </CardHeader>
        </Card>
      </Container>
    );
  }

  let thisUser = user[0];

  return (
    <Container className="flex max-w-[50rem] flex-col gap-8 p-3">
      <ProfileCard
        id={thisUser?.id}
        accounts={thisUser.SocialMediaHandle}
        name={thisUser?.name}
        email={thisUser?.email}
        roles={thisUser?.UserRoles.map((role) => role.role)}
        image={thisUser?.image}
      />

      <Tabs defaultValue="blogs" className="mx-auto w-full max-w-[50rem]">
        <TabsList>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
        </TabsList>
        <TabsContent value="blogs">
          <Card>
            <CardHeader className="text-xl font-bold">Blogs</CardHeader>
            <CardContent className="mt-3">
              {thisUser?.Blog.map((blog) => (
                <div
                  className="my-2 flex flex-col gap-2 rounded border-2 px-3 py-3"
                  key={blog.id}
                >
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-lg text-cyan-300 underline underline-offset-4"
                  >
                    {blog.title}
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
