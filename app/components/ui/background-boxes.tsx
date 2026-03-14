"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Colored squares — top-left corner, scattered (demo jaisa) */
const COLORS = [
  "rgba(30, 58, 138, 0.9)",
  "rgba(6, 78, 59, 0.9)",
  "rgba(120, 53, 15, 0.85)",
  "rgba(91, 33, 182, 0.8)",
  "rgba(127, 29, 29, 0.8)",
  "rgba(30, 64, 175, 0.7)",
  "rgba(109, 40, 217, 0.75)",
];

const coloredSquares = COLORS.map((color, i) => ({
  color,
  size: 22 + (i % 3) * 14,
  top: 6 + (i * 11) % 26,
  left: 5 + (i * 13) % 30,
  rotate: (i * 17) % 22 - 10,
  delay: i * 0.1,
}));

export function Boxes({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {/* Grid — thin light lines (demo jaisa) */}
      <div
        className={cn(
          "absolute inset-0 z-0 size-full overflow-hidden opacity-90",
          className
        )}
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
        {...rest}
      />

      {/* Colored scattered squares — top-left corner */}
      <div className="absolute left-0 top-0 z-0 h-[42%] w-[48%] overflow-hidden pointer-events-none">
        {coloredSquares.map((sq, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              width: sq.size,
              height: sq.size,
              top: `${sq.top}%`,
              left: `${sq.left}%`,
              backgroundColor: sq.color,
              rotate: sq.rotate,
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ opacity: { duration: 2.5, repeat: Infinity, delay: sq.delay } }}
          />
        ))}
      </div>
    </>
  );
}
