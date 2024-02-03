import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Filter, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Blogs() {
  const session = await getServerSession(authOptions);

  return (
    <Container>
      <div className="flex justify-between items-center pb-10">
        <GlitchHeading className="text-4xl">Blogs</GlitchHeading>
        <div className="flex gap-3">
          {session && (
            <Link href="/blogs/create">
              <Button variant="secondary">
                <Plus size={24} className="md:mr-3" />
                <span className="hidden md:inline">New Blog</span>
              </Button>
            </Link>
          )}
          <Button variant="secondary">
            <Filter size={24} className="md:mr-3" />
            <span className="hidden md:inline">Filter</span>
          </Button>
        </div>
      </div>
      <div>No blogs found</div>
    </Container>
  );
}
