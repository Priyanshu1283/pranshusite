"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { TextType } from "@/app/components/ui/textType";
import { Button } from "@/app/components/ui/button_moving_border";
import { site, landingPhrases } from "@/data/portfolio";

const HeroScene = dynamic(
  () => import("@/app/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 z-0 bg-[var(--bg-primary)]" /> }
);

export function Landing() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        [nameRef.current, taglineRef.current].filter(Boolean),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, stagger: 0.05, ease: "power3.out" }
      );
      gsap.fromTo(
        ctaRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "power2.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="landing"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <HeroScene />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/60 via-transparent to-[var(--bg-primary)]/80 z-10 pointer-events-none" />
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          <TextType phrases={landingPhrases} className="text-cyan-400" />
        </h1>
        <h2 ref={nameRef} className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-2">
          {site.name}
        </h2>
        <p ref={taglineRef} className="text-slate-400 text-lg md:text-xl mb-8">
          {site.title} · {site.tagline}
        </p>
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <a href={site.resumeUrl} download>
            <Button borderRadius="0.5rem" className="bg-[var(--bg-card)]">
              Download Resume
            </Button>
          </a>
          <Link href="#projects">
            <motion.span
              className="inline-flex items-center px-6 py-3 rounded-lg border border-cyan-500/40 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Projects
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
