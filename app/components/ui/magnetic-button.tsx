"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as: Comp = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      style={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Comp
        ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
        className={cn(
          "relative px-6 py-3 rounded-lg font-medium",
          "bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10",
          "transition-colors duration-200",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
