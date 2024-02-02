"use client";

import useMousePosition from "../hooks/useMousePosition";
import looperPattern from "@/assets/looper-pattern.svg";

export default function TorchBackground() {
  let { x, y } = useMousePosition();

  if (x == null || y == null) {
    x = 0;
    y = 0;
  }

  return (
    <>
      <div
        className="fixed inset-0 transition-all"
        style={{
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(18, 57, 61, 0.8) 0%, rgba(0,0,20,1) 46%)`,
          filter: "blur(10px)",
        }}
      ></div>
      <div
        className="fixed inset-0 "
        style={{
          backgroundImage: `url(${looperPattern.src})`,
          backgroundPosition: "center",
          filter: "grayscale(100) hue-rotate(70deg)",
        }}
      />
    </>
  );
}