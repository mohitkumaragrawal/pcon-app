import BlogDeleteButton from "@/components/blog/blog-delete-button";
import Container from "@/components/container";
import AccountSettings from "@/components/profile/account-settings";
import ProfileCard from "@/components/profile/profile-card";
import SocialMedia from "@/components/profile/social-media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import getProfileLink from "@/lib/get-profile-link";
import prisma from "@/lib/prisma";
import { EditIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const blogs = await prisma.blog.findMany({
    where: {
      authorId: session?.user?.id,
    },
  });

  // fetch all the user accounts;
  const accounts = await prisma.socialMediaHandle.findMany({
    select: {
      type: true,
      handle: true,
    },
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <Container className="gap-8 flex flex-col p-3 max-w-[50rem]">
      <ProfileCard
        id={session?.user?.id}
        accounts={accounts}
        name={session?.user?.name}
        email={session?.user?.email}
        roles={session?.user?.roles}
        image={session?.user?.image}
        profileLink={getProfileLink(session?.user?.id, session?.user?.username)}
        canEdit={true}
      />

      <Tabs defaultValue="blogs" className="max-w-[50rem] w-full mx-auto">
        <TabsList>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
        </TabsList>
        <TabsContent value="blogs">
          <Card>
            <CardHeader className="font-bold text-xl">Blogs</CardHeader>
            <CardContent className="mt-3">
              {blogs.map((blog) => (
                <div
                  className="px-3 py-3 border-2 rounded my-2 flex flex-col gap-2"
                  key={blog.id}
                >
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-cyan-300 underline underline-offset-4 text-lg"
                  >
                    {blog.title}
                  </Link>

                  <div className="flex flex-row-reverse gap-3">
                    <Link href={`/blogs/edit/${blog.id}`}>
                      <Button variant="secondary">
                        <EditIcon size={16} />
                      </Button>
                    </Link>
                    <BlogDeleteButton blogId={blog.id} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <AccountSettings session={session} />
        </TabsContent>
        <TabsContent value="social-media">
          <SocialMedia accounts={accounts} />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
