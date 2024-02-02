import Image from "next/image";
import GlitchHeading from "../glitch-heading";

import img1 from "@/assets/galary/1.jpg";

export default function AboutSection() {
  return (
    <section className="min-h-[40rem] relative p-5 md:p-20 flex flex-col md:flex-row-reverse md:items-center gap-8 mt-20">
      <GlitchHeading className="text-4xl md:hidden">About Us</GlitchHeading>
      <div className="flex-1 order-2 md:order-none">
        <GlitchHeading className="text-4xl mb-6 hidden md:block">
          About PCON
        </GlitchHeading>
        <p>
          We, at Programming Club of NIT Jamshedpur, are a group of highly
          enthusiastic and dedicated individuals striving to spread algorithmic
          thinking to ignite the minds of the contemporary generation to Code
          for the Future. PCON consists of a diverse group which focuses on
          Competitive Coding, App and Web development, Cloud Computing, Machine
          Learning, Blockchain and many more. If you think that the bits are the
          alphabets of the future, you are One of Us, spreading the gene-o-code
          all the way!
        </p>
      </div>

      <div className="h-full flex-1 bg-grid-small-cyan-500/[0.6] relative flex items-center justify-center p-4 ">
        {/* Radial gradient for the container to give a faded look */}
        <Image
          src={img1}
          alt="landing image"
          className="w-full h-full object-cover rounded-xl shadow-lg shadow-cyan-400/20 opacity-90 hover:opacity-100 transition-all"
        />
      </div>
    </section>
  );
}
