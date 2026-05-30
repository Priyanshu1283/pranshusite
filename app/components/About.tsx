"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, BookOpen, Layout, Database, Code2, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const notebookRef = useRef<HTMLDivElement>(null);
  
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle entrance animation for the notebook
      gsap.fromTo(
        notebookRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (isFlipping || page === 3) return;
    setIsFlipping(true);
    setDirection(1);
    setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (isFlipping || page === 1) return;
    setIsFlipping(true);
    setDirection(-1);
    setPage((p) => p - 1);
  };

  // 3D Top-Bound Diary Page-Turning Animation Physics
  const flipVariants = {
    enter: (dir: number) => ({
      // Next: new page starts underneath, scaled down slightly
      // Prev: new page swings down from the top spiral rings (around X-axis)
      rotateX: dir < 0 ? -105 : 0,
      scale: dir > 0 ? 0.95 : 1,
      opacity: 0,
      y: dir < 0 ? -40 : 10,
    }),
    center: {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Soft, premium spring-like deceleration
      },
    },
    exit: (dir: number) => ({
      // Next: old page flips upwards and backwards over the top rings
      // Prev: old page scales down, sinking into the background stack
      rotateX: dir > 0 ? -105 : 0,
      scale: dir < 0 ? 0.95 : 1,
      opacity: 0,
      y: dir > 0 ? -40 : 10,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // 10 metallic spiral rings loops
  const rings = Array.from({ length: 10 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[550px] w-[550px] rounded-full bg-cyan-500/5 blur-[140px]"
        aria-hidden
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/15 bg-cyan-500/5 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Interactive Diary
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Priyanshu's Logbook
          </h2>
          <p className="text-slate-500 text-xs mt-2 font-medium tracking-wide">
            Click the navigation arrows to flip pages upwards over the spirals
          </p>
        </div>

        {/* 3D Notebook Container Stack */}
        <div
          ref={notebookRef}
          className="relative mx-auto max-w-2xl"
          style={{ perspective: "1500px" }}
        >
          {/* Underlapping paper layer (Bottom Sheet) */}
          <div
            className={cn(
              "absolute inset-0 rounded-[2rem] bg-slate-800/40 border border-white/5",
              "transform -rotate-2 scale-[0.985] origin-bottom shadow-lg shadow-black/40"
            )}
            aria-hidden
          />

          {/* Underlapping paper layer (Middle Sheet) */}
          <div
            className={cn(
              "absolute inset-0 rounded-[2rem] bg-slate-700/20 border border-white/5",
              "transform rotate-1 scale-[0.99] origin-bottom shadow-xl shadow-black/50"
            )}
            aria-hidden
          />

          {/* Main Interactive Diary Sheet */}
          <div
            className={cn(
              "relative rounded-[2rem] overflow-hidden",
              "bg-gradient-to-br from-sky-400/90 via-slate-500/85 to-[#0d0d15]/95",
              "border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]",
              "px-6 pt-12 pb-16 sm:px-12 sm:pt-14 sm:pb-16"
            )}
          >
            {/* Top Row: Punched Holes & Metallic Spiral Rings */}
            <div className="absolute top-0 left-0 right-0 px-8 sm:px-12 flex justify-between">
              {rings.map((_, i) => (
                <div key={i} className="relative flex flex-col items-center w-4">
                  {/* Metallic ring loop going out of the hole */}
                  <div
                    className={cn(
                      "absolute -top-3 w-1.5 h-6 rounded-full",
                      "bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-700",
                      "shadow-[0_2px_4px_rgba(0,0,0,0.4)] border-r border-black/10"
                    )}
                  />
                  {/* Punched hole in paper */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0f] shadow-[inset_0_2px_3px_rgba(0,0,0,0.9)] mt-3" />
                </div>
              ))}
            </div>

            {/* Dynamic Pages Area with 3D Flip Anim */}
            <div className="min-h-[350px] sm:min-h-[310px] mt-6 flex flex-col justify-between">
              <AnimatePresence
                mode="wait"
                initial={false}
                custom={direction}
                onExitComplete={() => setIsFlipping(false)}
              >
                <motion.div
                  key={page}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                  className="space-y-6 flex-1"
                >
                  {page === 1 && (
                    <div className="space-y-5">
                      {/* Slanted Page Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold italic tracking-wide text-cyan-300 select-none">
                        About Me | Page 1
                        <span className="text-cyan-300/80 animate-pulse font-normal">|</span>
                      </h3>

                      {/* Content */}
                      <div className="space-y-5 text-slate-100 text-base sm:text-lg leading-relaxed font-sans">
                        <p>
                          Hello 👋 I’m{" "}
                          <span className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                            Priyanshu Kumar
                          </span>
                          , a passionate Full Stack Developer who loves building modern, meaningful web experiences.
                        </p>
                        <p>
                          My journey began with front-end design and evolved into a deep love for backend architecture, where I combine creativity with clean, efficient logic.
                        </p>
                        <p>
                          I focus on writing clean code, building responsive interfaces, and architecting database schemas that perform smoothly under scale.
                        </p>
                      </div>
                    </div>
                  )}

                  {page === 2 && (
                    <div className="space-y-5">
                      {/* Slanted Page Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold italic tracking-wide text-cyan-300 select-none">
                        My Weapons | Page 2
                        <span className="text-cyan-300/80 animate-pulse font-normal">|</span>
                      </h3>

                      {/* Content */}
                      <div className="space-y-4">
                        <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                          Here is the technical stack I use to build robust digital products:
                        </p>

                        <div className="grid gap-3.5">
                          {/* Frontend */}
                          <div className="flex gap-3 items-start bg-black/20 p-3 rounded-xl border border-white/5">
                            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 shrink-0">
                              <Layout className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-200">Frontend Stack</h4>
                              <p className="text-xs text-slate-400 mt-0.5">
                                React.js, Next.js (App Router), TypeScript, Tailwind CSS, GSAP, Framer Motion
                              </p>
                            </div>
                          </div>

                          {/* Backend */}
                          <div className="flex gap-3 items-start bg-black/20 p-3 rounded-xl border border-white/5">
                            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 shrink-0">
                              <Database className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-200">Backend & Databases</h4>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Node.js, Express.js, MongoDB, Mongoose, RESTful APIs
                              </p>
                            </div>
                          </div>

                          {/* Tools */}
                          <div className="flex gap-3 items-start bg-black/20 p-3 rounded-xl border border-white/5">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 shrink-0">
                              <Code2 className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-200">Engineering Essentials</h4>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Git, GitHub, DSA, API Rate Limiting, secure nodemailer integrations
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {page === 3 && (
                    <div className="space-y-5">
                      {/* Slanted Page Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold italic tracking-wide text-cyan-300 select-none">
                        Achievements | Page 3
                        <span className="text-cyan-300/80 animate-pulse font-normal">|</span>
                      </h3>

                      {/* Content */}
                      <div className="space-y-4">
                        <p className="text-slate-200 text-sm sm:text-base font-medium">
                          Milestones I've achieved on my software development path:
                        </p>

                        <div className="space-y-3">
                          {/* Mile 1 */}
                          <div className="flex gap-3 items-center bg-black/20 px-4 py-2.5 rounded-xl border border-white/5">
                            <Award className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                            <div className="text-xs text-slate-300">
                              <span className="font-bold text-white">FrontEnd Domination Certificate</span> — Mastered Advanced React/Next.js at Sheryians School
                            </div>
                          </div>

                          {/* Mile 2 */}
                          <div className="flex gap-3 items-center bg-black/20 px-4 py-2.5 rounded-xl border border-white/5">
                            <Award className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                            <div className="text-xs text-slate-300">
                              <span className="font-bold text-white">Salesforce Certifications</span> — Earned platform developer awards, including PD1 and AgentForce
                            </div>
                          </div>

                          {/* Mile 3 */}
                          <div className="flex gap-3 items-center bg-black/20 px-4 py-2.5 rounded-xl border border-white/5">
                            <Award className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                            <div className="text-xs text-slate-300">
                              <span className="font-bold text-white">AWS & PMKVY IoT Milestones</span> — Certified cloud deployment developer and IoT foundations
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                          I believe in constant learning. Let’s collaborate and build something remarkable!
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Navigation & Controls */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={page === 1 || isFlipping}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border border-white/10",
                    page === 1
                      ? "opacity-30 cursor-not-allowed text-slate-500"
                      : "text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 cursor-pointer"
                  )}
                  suppressHydrationWarning
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                {/* Page Indicator */}
                <span className="text-[11px] font-mono tracking-widest text-cyan-300/80">
                  {page} / 3
                </span>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={page === 3 || isFlipping}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border border-white/10",
                    page === 3
                      ? "opacity-30 cursor-not-allowed text-slate-500"
                      : "text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 cursor-pointer"
                  )}
                  suppressHydrationWarning
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
