import { cn } from "@/lib/utils";
import HomeSection from "./home/home-section";

import logo from "../assets/pcon-transparent.png";
import Image from "next/image";
import socialMedia from "@/lib/social-media";
import Link from "next/link";

export default function Footer() {
  return (
    <HomeSection
      className={cn(
        "mx-0 mt-20 flex flex-col items-center justify-between rounded-none bg-cyan-500/[0.1] lg:flex-row",
        "gap-5 py-8",
      )}
    >
      <Image src={logo} alt="PCon Logo" height={64} />
      <p className="mt-2 text-center text-2xl font-semibold">
        Programming Club of NIT Jamshedpur
      </p>
      <div className="mt-4 flex space-x-8">
        {socialMedia.map((social, index) => (
          <>
            {social.link ? (
              <Link href={social.link}>
                <div className="scale-150 space-x-4 rounded-full bg-black p-2">
                  {social.icon}
                </div>
              </Link>
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </HomeSection>
  );
}
