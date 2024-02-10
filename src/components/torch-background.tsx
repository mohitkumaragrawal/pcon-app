"use client";

import useMousePosition from "../hooks/useMousePosition";
import looperPattern from "@/assets/looper-pattern.svg";

export default function TorchBackground() {
  // let { x, y } = useMousePosition();
  let x: number = 0,
    y: number = 0;

  if (x == null || y == null) {
    x = 0;
    y = 0;
  }

  return (
    <>
      <div
        className="fixed inset-0 transition-all -z-40"
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
          filter: "grayscale(100) hue-rotate(70deg)",
        }}
      />
    </>
  );
}
