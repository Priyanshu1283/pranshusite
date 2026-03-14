"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  title: string;
  issuer: string;
  description: string;
  image?: string;
  className?: string;
}

export function AnimatedTestimonialCard({
  title,
  issuer,
  description,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl border border-white/10 bg-[var(--bg-card)] p-6 shadow-xl",
        "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300",
        className
      )}
    >
      {image && (
        <div className="mb-4 h-24 rounded-lg bg-slate-800 overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-cyan-400 mb-2">{issuer}</p>
      <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
  );
}
