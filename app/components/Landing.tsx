"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { site } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ArrowRight, FileDown } from "lucide-react";

export function Landing() {
  return (
    <section
      id="landing"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#0a0a0f] px-6 pt-20 pb-36 sm:px-8 sm:pb-40"
    >
      {/* Editorial Organic Background Glows — Highly performant & natural */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 opacity-70 blur-[130px] sm:h-[450px] sm:w-[450px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[300px] w-[300px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/5 to-cyan-500/10 opacity-60 blur-[120px]"
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col items-center"
        >
          {/* Opportunities Pulse Badge — Human-crafted look */}
          <div className="mb-6 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-400 uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to opportunities
            </span>
          </div>

          {/* Premium Human-designed Heading */}
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-slate-400 text-xl sm:text-2xl font-medium tracking-widest uppercase mb-3">
              Hello, I'm
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-tight">
              {site.name}
            </span>
          </h1>

          {/* Subheading & Narrative Intro */}
          <p className="mb-3 text-lg font-bold text-cyan-400 tracking-wider uppercase sm:text-xl">
            {site.title}
          </p>
          
          <p className="mb-12 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I build highly responsive web applications and clean database backends using 
            <span className="text-white font-medium"> React</span>, 
            <span className="text-white font-medium"> Next.js</span>, 
            <span className="text-white font-medium"> Node.js</span>, and 
            <span className="text-white font-medium"> MongoDB</span>. 
            I focus on simple, solid engineering and clean design layouts that deliver outstanding user experiences.
          </p>

          {/* Action buttons */}
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <motion.a
              href={site.resumeUrl}
              download
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                "bg-cyan-500 font-semibold text-[#0a0a0f] shadow-lg shadow-cyan-500/20",
                "hover:bg-cyan-400 hover:shadow-cyan-500/30 transition-all",
                "sm:flex-initial sm:min-w-[180px]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileDown className="h-4 w-4" />
              Download Resume
            </motion.a>
            <Link
              href="#about"
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                "border border-white/10 bg-white/5 font-medium text-white",
                "hover:border-cyan-500/40 hover:bg-white/10 transition-all",
                "sm:flex-initial sm:min-w-[180px]"
              )}
            >
              Learn about me
              <ArrowRight className="h-4 w-4 opacity-90" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <a
        href="#about"
        className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition hover:text-cyan-400 sm:bottom-16"
        aria-label="About section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Explore</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/10 bg-white/5 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-cyan-400"
            animate={{ y: [0, 8, 0], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}
