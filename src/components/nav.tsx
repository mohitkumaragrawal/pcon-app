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

import { useState } from "react";

function NavLink({ children, link }) {
  return (
    <p className="text-lg uppercase font-bold cursor-pointer transition-all nav-link">
      {children}
    </p>
  );
}

const menuItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about",
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrolledGradient =
    "linear-gradient(180deg, black 0%, rgba(0,0,10, 0.8) 60%, rgba(0,0,0,0) 100%)";

  const unscrolledGradient =
    "linear-gradient(180deg, rgba(0,0,10, 0.5) 0%, rgba(0,0,0,0) 100%)";

  return (
    <Navbar
      style={{
        background:
          scrolled || isMenuOpen ? scrolledGradient : unscrolledGradient,
        backdropFilter: "none",
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
      </NavbarContent>
      <NavbarMenu className="backdrop-filter-none py-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink link={item.link}>{item.name}</NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
