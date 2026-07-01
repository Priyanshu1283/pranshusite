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
      {/* Video Background Container */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 -z-30 h-full w-full overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover select-none pointer-events-none filter brightness-95 contrast-105 saturate-95"
        >
          <source src="/images/gallery/background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic Overlays */}
      {/* Dark tint overlay */}
      <div 
        className="pointer-events-none absolute inset-0 -z-20 bg-black/45" 
        aria-hidden 
      />
      {/* Radial vignette overlay */}
      <div 
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,10,15,0.75)_100%)]" 
        aria-hidden 
      />
      {/* Top fade (for seamless navbar integration) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 -z-20 h-40 bg-gradient-to-b from-[#0a0a0f] to-transparent"
        aria-hidden
      />
      {/* Bottom fade (for seamless transition to about section) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 -z-20 h-52 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"
        aria-hidden
      />

      {/* Editorial Organic Background Glows — Adds depth and subtle modern lighting */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 opacity-60 blur-[130px] sm:h-[450px] sm:w-[450px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/3 -z-10 h-[300px] w-[300px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/5 to-cyan-500/10 opacity-50 blur-[120px]"
        aria-hidden
      />

      <div className="relative z-20 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col items-center"
        >
          {/* Opportunities Pulse Badge — Human-crafted look */}
          <div className="mb-8 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-400 uppercase shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to opportunities
            </span>
          </div>

          {/* Premium Human-designed Heading */}
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span className="block text-slate-400 text-sm sm:text-base font-semibold tracking-[0.25em] uppercase mb-4 opacity-90">
              Hello, I'm
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400 leading-none">
              {site.name}
            </span>
          </h1>

          {/* Subheading & Narrative Intro */}
          <p className="mb-4 text-sm font-bold text-cyan-400 tracking-[0.2em] uppercase sm:text-base opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {site.title}
          </p>
          
          <p className="mb-12 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            I build highly responsive web applications and clean database backends using 
            <span className="text-white font-medium"> React</span>, 
            <span className="text-white font-medium"> Next.js</span>, 
            <span className="text-white font-medium"> Node.js</span>, and 
            <span className="text-white font-medium"> MongoDB</span>. 
            I focus on simple, solid engineering and clean design layouts that deliver outstanding user experiences.
          </p>

          {/* Action buttons - Sleek Apple/Vercel/Linear dark luxury aesthetic */}
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <motion.a
              href={site.resumeUrl}
              download
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                "bg-white font-semibold text-[#0a0a0f] shadow-lg shadow-white/5",
                "hover:bg-slate-100 transition-colors",
                "sm:flex-initial sm:min-w-[180px]"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <FileDown className="h-4 w-4" />
              Download Resume
            </motion.a>
            <Link
              href="#about"
              className={cn(
                "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                "border border-white/15 bg-white/5 font-medium text-white backdrop-blur-sm",
                "hover:border-white/30 hover:bg-white/10 transition-all",
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
        className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition hover:text-white sm:bottom-16"
        aria-label="About section"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] opacity-80">Explore</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/10 bg-white/5 pt-1.5 backdrop-blur-[2px]">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white"
            animate={{ y: [0, 8, 0], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}
