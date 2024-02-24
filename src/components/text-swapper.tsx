"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function TextSwapper({ components, delay }) {
  const [selectedComponent, setSelectedComponent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedComponent((selComp) => (selComp + 1) % components.length);
    }, delay);

    return () => clearInterval(interval);
  }, [delay, components, setSelectedComponent]);

  return (
    <AnimatePresence mode="wait">
      {components[selectedComponent]}
    </AnimatePresence>
  );
}
