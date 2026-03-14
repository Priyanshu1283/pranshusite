"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cert = certifications[currentIndex];

  const goPrev = () => {
    setCurrentIndex((i) => (i === 0 ? certifications.length - 1 : i - 1));
  };
  const goNext = () => {
    setCurrentIndex((i) => (i === certifications.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-cert-reveal]") ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
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

  return (
    <section id="certifications" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          data-cert-reveal
          className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-16"
        >
          Certifications
        </h2>

        <div
          data-cert-reveal
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-start"
        >
          {/* Left: Certificate image with flip */}
          <div className="relative min-h-[280px] md:min-h-[320px] flex justify-center md:justify-end">
            <div
              className="w-full max-w-md"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cert.id}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <div
                    className={cn(
                      "relative rounded-xl overflow-hidden border border-white/10",
                      "bg-[var(--bg-card)] shadow-xl",
                      "ring-1 ring-white/5"
                    )}
                  >
                    {cert.image ? (
                      <div className="aspect-[4/3] relative bg-slate-800/50">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain object-center"
                        />
                        {/* Subtle stack shadow behind */}
                        <div
                          className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-xl bg-cyan-500/10 border border-white/5"
                          aria-hidden
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-b border-white/5">
                        <span className="text-slate-500 text-xs uppercase tracking-widest mb-2">
                          Certificate
                        </span>
                        <span className="text-white font-semibold text-center text-lg">
                          {cert.title}
                        </span>
                        <span className="text-slate-500 text-sm mt-1">
                          {cert.issuer}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Name, provider, description + arrows */}
          <div className="flex flex-col justify-between min-h-[280px] md:min-h-[320px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {cert.title}
                </h1>
                <p className="text-slate-400 text-sm md:text-base">
                  By — {cert.issuer}
                </p>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Arrow navigation */}
            <div className="flex items-center gap-3 mt-8">
              <button
                type="button"
                aria-label="Previous certificate"
                onClick={goPrev}
                className="p-2.5 rounded-full border border-white/10 bg-[var(--bg-card)] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
                suppressHydrationWarning
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next certificate"
                onClick={goNext}
                className="p-2.5 rounded-full border border-white/10 bg-[var(--bg-card)] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
                suppressHydrationWarning
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-slate-500 text-sm ml-2">
                {currentIndex + 1} / {certifications.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
