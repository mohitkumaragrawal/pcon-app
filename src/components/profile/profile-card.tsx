import { Session } from "next-auth";
import { Card } from "../ui/card";
import { hasRole } from "@/lib/has-role";

import socialMediaIcons from "./social-media-icons";

export default function ProfileCard({ session }: { session: Session }) {
  const isAdmin = hasRole(session, "admin");

  return (
    <Card className="w-full">
      <div className="flex flex-col items-center py-8 relative">
        {isAdmin && (
          <div className="absolute top-3 right-3 px-4 py-1 rounded border-2">
            admin
          </div>
        )}

        <div className="text-center flex justify-center">
          <img
            src={session.user.image}
            alt="Profile picture"
            className="w-40 h-40 rounded-full border-2 border-cyan-300/40"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-2xl font-bold mt-4">{session.user.name}</p>
        <p className="opacity-80">{session.user.email}</p>

        <div className="mt-3 flex gap-2">
          {socialMediaIcons["instagram"]}

          <p>Codeforces</p>
          <p>Codechef</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Twitter</p>
          <p>Discord</p>
          <p>Instagram</p>
        </div>
      </div>
    </Card>
  );
}
