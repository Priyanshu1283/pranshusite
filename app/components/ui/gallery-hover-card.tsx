"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GalleryHoverCardProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export function GalleryHoverCard({
  src,
  alt,
  title,
  className,
  onClick,
}: GalleryHoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-xl overflow-hidden border border-white/10",
        "shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/30",
        "cursor-pointer transition-shadow duration-300",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] bg-slate-800 relative">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        {title && (
          <p className="absolute bottom-2 left-2 right-2 text-sm font-medium text-white opacity-0 hover:opacity-100 transition-opacity">
            {title}
          </p>
        )}
      </div>
    </motion.div>
  );
}
