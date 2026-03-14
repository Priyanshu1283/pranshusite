"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface HoverTiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverTiltCard({ children, className }: HoverTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [rect, setRect] = useState({ width: 0, height: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (rect.width !== r.width) setRect({ width: r.width, height: r.height });
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    x.set(dy * -8);
    y.set(dx * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const transform = useMotionTemplate`perspective(800px) rotateX(${x}deg) rotateY(${y}deg)`;

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "rounded-2xl border border-white/10 bg-[var(--bg-card)] overflow-hidden",
        "hover:border-cyan-500/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]",
        "transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
