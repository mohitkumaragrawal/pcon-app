import { Card } from "../ui/card";
import { hasRoleInArray } from "@/lib/has-role";

import socialMedia from "@/lib/social-media";
import Link from "next/link";

interface SocialMediaHandleProps {
  platform: {
    name: string;
    icon: React.ReactNode;
  };
  handle: string;
}
function SocialMediaHandle(props: SocialMediaHandleProps) {
  return (
    <Link
      href={props.handle}
      target="_blank"
      className="flex gap-3 items-center py-4 px-4 rounded-full border-2 transition-all hover:bg-slate-900 cursor-pointer"
    >
      <span className="">{props.platform.icon}</span>
    </Link>
  );
}

export default function ProfileCard({
  name,
  image,
  roles,
  email,
  accounts: otherAccounts,
  profileLink,
}: {
  name: string;
  image: string;
  email: string;
  roles: string[];
  accounts: { type: string; handle: string }[];
  profileLink?: string;
}) {
  // const isAdmin = hasRole(session, "admin");
  const isAdmin = hasRoleInArray(roles, "admin");
  const accounts = profileLink
    ? [...otherAccounts, { type: "pcon", handle: profileLink }]
    : otherAccounts;

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
            src={image}
            alt="Profile picture"
            className="w-40 h-40 rounded-full border-2 border-cyan-300/40"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-2xl font-bold mt-4">{name}</p>
        <p className="opacity-80">{email}</p>

        <div className="mt-4 flex gap-2 px-3 flex-wrap justify-center">
          {accounts.map((acc) => {
            const p = socialMedia.find((x) => x.name === acc.type);
            return (
              <SocialMediaHandle
                platform={p}
                key={p.name}
                handle={acc.handle}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
}
