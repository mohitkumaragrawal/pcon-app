"use client";

import looperPattern from "@/assets/looper-pattern.svg";

export default function TorchBackground() {
  return (
    <>
      <div
        className="fixed inset-0 -z-40 transition-all"
        style={{
          background: `radial-gradient(circle at 100% 0, #1d173eaf 0%, rgba(0,0,20,1) 46%),
                      radial-gradient(circle at 0 0, rgba(18, 57, 61, 0.8) 0%, rgba(0,0,20,1) 46%)`,
          backgroundBlendMode: "lighten",
          filter: "blur(10px)",
        }}
      ></div>
      <div
        className="fixed inset-0 -z-30"
        style={{
          backgroundImage: `url(${looperPattern.src})`,
          backgroundPosition: "center",

          filter: "grayscale(0.5) hue-rotate(-40deg)",
          opacity: "0.6",
        }}
      />
    </>
  );
}
