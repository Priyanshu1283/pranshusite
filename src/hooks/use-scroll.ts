"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  y: number;
  direction: "up" | "down" | null;
  progress: number; // 0-1 based on document height
}

/**
 * Tracks scroll position, direction, and normalized progress.
 */
export function useScroll() {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    direction: null,
    progress: 0,
  });

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;
      const direction = y > lastY ? "down" : y < lastY ? "up" : null;
      lastY = y;
      setState({ y, direction, progress });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
}
