"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextType } from "@/app/components/ui/textType";
import { about } from "@/data/portfolio";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <TextType phrases={[about.title]} className="text-white" />
        </h2>
        <motion.div
          ref={cardRef}
          initial={false}
          className="rounded-2xl border border-white/10 bg-[var(--bg-card)] p-8 md:p-12 shadow-xl"
        >
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{about.intro}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {about.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {t}
              </span>
            ))}
          </div>
          {/* Animated stats */}
          <div className="grid grid-cols-3 gap-4">
            {about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <p className="text-2xl md:text-3xl font-bold text-cyan-400">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-right text-slate-500 text-sm mt-8 font-mono">— Built with passion</p>
        </motion.div>
      </div>
    </section>
  );
}
