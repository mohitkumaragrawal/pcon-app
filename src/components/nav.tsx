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
      className="text-lg uppercase font-bold cursor-pointer transition-all nav-link"
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
    link: "/",
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
      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image
            src={logo.src}
            width={80}
            className="brightness-150"
            alt="PCON"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="end">
        <Profile session={props.session} />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="ml-3"
        />
      </NavbarContent>

      <NavbarContent className="gap-10 hidden md:flex">
        <NavbarBrand>
          <Image
            src={logo.src}
            alt="PCON"
            width={80}
            className="brightness-150"
          />
        </NavbarBrand>

        {navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <NavLink link={item.link}>{item.name}</NavLink>
          </NavbarItem>
        ))}
        <NavbarItem className="gap-10 hidden md:flex">
          <Profile session={props.session} />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="py-10 overflow-hidden">
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
