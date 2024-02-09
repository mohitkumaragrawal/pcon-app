import { Session } from "next-auth";
import { Card } from "../ui/card";
import { hasRole } from "@/lib/has-role";

import socialMedia from "@/lib/social-media";

interface SocialMediaHandleProps {
  platform: {
    name: string;
    icon: React.ReactNode;
  };
}
function SocialMediaHandle(props: SocialMediaHandleProps) {
  return (
    <div className="flex gap-3 items-center py-4 px-4 rounded-full border-2 transition-all hover:bg-slate-900 cursor-pointer">
      <span className="">{props.platform.icon}</span>
    </div>
  );
}

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

        <div className="mt-4 flex gap-2 px-3 flex-wrap justify-center">
          {socialMedia.map((p) => (
            <SocialMediaHandle platform={p} key={p.name} />
          ))}
        </div>
      </div>
    </Card>
  );
}
