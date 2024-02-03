"use client";

/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, Loader2, LogOut } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { Session } from "next-auth";
import { Spinner } from "@nextui-org/react";

interface Props {
  session: Session;
  status: string;
}

export default function Profile({ session, status }: Props) {
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <Link href="/auth/signin">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    signOut();
  };

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src={session?.user?.image ?? ""}
              alt="profile imge"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="p-5 flex gap-4">
            <img
              src={session?.user?.image ?? ""}
              alt="profile imge"
              className="w-10 h-10 rounded-full overflow-hidden"
            />
            <div>
              <p>{session.user.name}</p>
              <p className="opacity-60 font-normal">{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-3" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-3" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
