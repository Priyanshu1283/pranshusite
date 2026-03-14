"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
}

export function Sparkles({
  className,
  particleColor = "rgb(34, 211, 238)",
  particleCount = 50,
}: SparklesProps) {
  const id = useId().replace(/:/g, "");

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={`sparkle-${id}`}>
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: particleCount }).map((_, i) => (
          <circle
            key={i}
            cx={`${(i * 17 + 13) % 100}%`}
            cy={`${(i * 23 + 31) % 100}%`}
            r={1.5}
            fill={particleColor}
            opacity={0.4 + (i % 3) * 0.2}
            filter={`url(#sparkle-${id})`}
            className="animate-sparkle"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
