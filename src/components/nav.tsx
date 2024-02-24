"use client";

import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import logo from "../assets/pcon-transparent.png";
import useOffsetTop from "../hooks/useOffsetTop";

import React, { useState } from "react";
import Link from "next/link";
import Profile from "./profile";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";

function NavLink({
  children,
  link,
  onClick,
}: {
  children: React.ReactNode;
  link: string;
  onClick?: () => void;
}) {
  return (
    <Link
      className="nav-link cursor-pointer text-lg font-bold uppercase transition-all"
      onClick={onClick}
      href={link}
    >
      {children}
    </Link>
  );
}

const menuItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Our Team",
    link: "/team",
  },
  {
    name: "Events",
    link: "/events",
  },
  {
    name: "Achievements",
    link: "/achievements",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
];

const adminMenuItems = [
  {
    name: "Home",
    link: "/admin",
  },
  {
    name: "Roles",
    link: "/admin/roles",
  },
  {
    name: "Manage Achievements",
    link: "/admin/achievements",
  },
  {
    name: "Manage Events",
    link: "/admin/events",
  },
];

interface NavProps {
  session?: Session;
}

export default function Nav(props: NavProps) {
  const scrolled = useOffsetTop(50);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrolledGradient =
    "linear-gradient(180deg, black 0%, rgba(0,0,10, 0.8) 60%, rgba(0,0,0,0) 100%)";

  const unscrolledGradient =
    "linear-gradient(180deg, rgba(0,0,10, 0.5) 0%, rgba(0,0,0,0) 100%)";

  // console.log(window.location.href);

  const path = usePathname();
  const isAdmin = path.startsWith("/admin");

  let navItems: { name: string; link: string }[];

  if (isAdmin) {
    navItems = adminMenuItems;
  } else {
    navItems = menuItems;
  }

  return (
    <Navbar
      style={{
        background:
          scrolled || isMenuOpen ? scrolledGradient : unscrolledGradient,
        backdropFilter: isMenuOpen ? "blur(10px)" : "none",
      }}
      className="h-24 transition-all"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="pr-3 md:hidden" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Image
              src={logo.src}
              width={80}
              className="brightness-150"
              alt="PCON"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="end">
        <Profile session={props.session} />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="ml-3"
        />
      </NavbarContent>

      <NavbarContent className="hidden gap-10 md:flex">
        <NavbarBrand>
          <Link href="/">
            <Image
              src={logo.src}
              alt="PCON"
              width={80}
              className="brightness-150"
            />
          </Link>
        </NavbarBrand>

        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <NavLink link={item.link}>{item.name}</NavLink>
          </NavbarItem>
        ))}
        <NavbarItem className="hidden gap-10 md:flex">
          <Profile session={props.session} />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="overflow-hidden py-10">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink link={item.link} onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
