"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, X } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { projects } from "@/data/portfolio";
import { HoverTiltCard } from "@/app/components/ui/hover-tilt-card";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalProject, setModalProject] = useState<(typeof projects)[0] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setModalProject(null));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-reveal]") ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} data-reveal>
              <HoverTiltCard>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setModalProject(project)}
                  suppressHydrationWarning
                >
                  <div className="aspect-video bg-slate-800 rounded-t-2xl overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">Project image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{project.shortDescription}</p>
                  </div>
                </button>
              </HoverTiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="max-w-lg w-full rounded-2xl border border-white/10 bg-[var(--bg-card)] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {modalProject.image && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-slate-800">
                    <img
                      src={modalProject.image}
                      alt={modalProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-white">{modalProject.title}</h3>
                  <button
                    type="button"
                    aria-label="Close"
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400"
                    onClick={() => setModalProject(null)}
                    suppressHydrationWarning
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-400 text-sm mb-4">{modalProject.fullDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {modalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={modalProject.visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit
                  </a>
                  <a
                    href={modalProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/15 transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
