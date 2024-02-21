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
        "rounded-none mx-0 mt-20 bg-cyan-500/[0.1] flex flex-col lg:flex-row justify-between items-center",
        "py-8 gap-5"
      )}
    >
      <Image src={logo} alt="PCon Logo" height={64} />
      <p className="mt-2 text-2xl text-center font-semibold">
        Programming Club of NIT Jamshedpur
      </p>
      <div className="flex space-x-8 mt-4">
        {socialMedia.map((social, index) => (
          <>
            {social.link ? (
              <Link href={social.link}>
                <div className="scale-150 space-x-4 bg-black p-2 rounded-full">
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
