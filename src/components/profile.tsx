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
}

export default function Profile({ session }: Props) {
  // if (status === "loading") {
  //   return <Spinner />;
  // }

  if (!session?.user) {
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

  // if (status === "authenticated") {
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
        <DropdownMenuLabel className="flex gap-4 p-5">
          <img
            src={session?.user?.image ?? ""}
            alt="profile imge"
            className="h-10 w-10 overflow-hidden rounded-full object-cover"
          />
          <div>
            <p>{session.user.name}</p>
            <p className="font-normal opacity-60">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <LayoutDashboard className="mr-3" />
            Profile
          </DropdownMenuItem>
        </Link>
        {session?.user?.roles?.includes("admin") && (
          <Link href="/admin">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-3" />
              Admin
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-3" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // }
}
