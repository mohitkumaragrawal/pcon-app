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
  Button,
} from "@nextui-org/react";

import logo from "../assets/pcon-transparent.png";
import useOffsetTop from "../hooks/useOffsetTop";

import { useState } from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import Profile from "./profile";

function NavLink({ children, link }) {
  return (
    <Link
      className="text-lg uppercase font-bold cursor-pointer transition-all nav-link"
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

export default function Nav() {
  const scrolled = useOffsetTop(50);

  const [loading, setLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrolledGradient =
    "linear-gradient(180deg, black 0%, rgba(0,0,10, 0.8) 60%, rgba(0,0,0,0) 100%)";

  const unscrolledGradient =
    "linear-gradient(180deg, rgba(0,0,10, 0.5) 0%, rgba(0,0,0,0) 100%)";

  const session = useSession();

  // const status = session && session.user ? "authenticated" : "unauthenticated";

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
        <Profile session={session.data} status={session.status} />
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

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <NavLink link={item.link}>{item.name}</NavLink>
          </NavbarItem>
        ))}
        <NavbarItem className="gap-10 hidden md:flex">
          <Profile session={session.data} status={session.status} />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="py-10 overflow-hidden">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink link={item.link}>{item.name}</NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
