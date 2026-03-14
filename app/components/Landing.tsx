"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextType } from "@/app/components/ui/textType";
import { site, landingPhrases } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ArrowRight, FileDown } from "lucide-react";
import { Boxes } from "@/app/components/ui/background-boxes";

export function Landing() {
  return (
    <section
      id="landing"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[var(--bg-primary)] px-5 pt-20 pb-36 sm:px-8 sm:pb-40"
    >
      <Boxes />

      {/* Halka overlay — grid + colored squares dikhen, text readable; bg apna --bg-primary */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[var(--bg-primary)]/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg-primary)]/15 via-transparent to-[var(--bg-primary)]/60"
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center"
        >
          <div className="mb-5 min-h-[2.5rem] sm:min-h-[2.75rem] flex items-center justify-center px-2">
            <span className="inline-block max-w-[95vw] rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-sm sm:text-base">
              <TextType
                phrases={landingPhrases}
                className="text-cyan-300"
                typingSpeed={55}
                pauseDuration={2200}
              />
            </span>
          </div>

          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {site.name}
          </h1>

          <p className="mb-2 text-base font-medium text-slate-200 sm:text-lg md:text-xl">
            {site.title}
          </p>
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
            {site.tagline}
          </p>

          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <motion.a
              href={site.resumeUrl}
              download
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                "bg-cyan-500 font-semibold text-[#0a0a0f] shadow-lg shadow-cyan-500/25",
                "hover:bg-cyan-400",
                "sm:flex-initial sm:min-w-[180px]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileDown className="h-4 w-4" />
              Resume
            </motion.a>
            <Link
              href="#projects"
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                "border border-white/20 bg-white/5 font-medium text-white",
                "hover:border-cyan-500/40 hover:bg-white/10",
                "sm:flex-initial sm:min-w-[180px]"
              )}
            >
              View work
              <ArrowRight className="h-4 w-4 opacity-90" />
            </Link>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition hover:text-cyan-400 sm:bottom-20 md:bottom-24"
        aria-label="About section"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">About</span>
        <span className="relative flex h-11 w-7 justify-center rounded-full border border-white/20 bg-white/5 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-cyan-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}
