import { cn } from "@/lib/utils";
import HomeSection from "./home/home-section";

import logo from "../assets/pcon-transparent.png";
import Image from "next/image";
import socialMedia from "@/lib/social-media";
import Link from "next/link";

import { Fragment } from "react";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";

export default function Footer() {
  return (
    <HomeSection
      className={cn(
        "mx-0 mt-20 flex flex-col items-center justify-between rounded-none bg-cyan-500/[0.1] lg:flex-row",
        "gap-5 py-8",
      )}
    >
      <Image src={logo} alt="PCon Logo" height={64} />
      <div>
        <p className="mt-2 text-center text-2xl font-semibold">
          Programming Club of NIT Jamshedpur
        </p>
        <div className="flex flex-row justify-center gap-6">
          <Link
            href="https://github.com/mohitkumaragrawal/pcon-app"
            className="flex items-center gap-2"
          >
            <FaGithub />
            <Button variant="link" className="m-0 p-0">
              Repository
            </Button>
          </Link>
          <Link
            href="https://github.com/mohitkumaragrawal/pcon-app/issues"
            className="flex items-center gap-2"
          >
            <VscReport />
            <Button variant="link" className="m-0 p-0">
              Report Issue
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 flex space-x-8">
        {socialMedia.map((social, index) => (
          <Fragment key={index}>
            {social.link ? (
              <Link href={social.link}>
                <div className="scale-150 space-x-4 rounded-full bg-black p-2">
                  {social.icon}
                </div>
              </Link>
            ) : (
              <></>
            )}
          </Fragment>
        ))}
      </div>
    </HomeSection>
  );
}
