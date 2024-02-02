import { useEffect, useState } from "react";

export default function useOffsetTop(top: number): boolean {
  const [offsetTop, setOffsetTop] = useState(false);
  const isTop = top || 100;

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > isTop) {
        setOffsetTop(true);
      } else {
        setOffsetTop(false);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTop]);

  return offsetTop;
}
