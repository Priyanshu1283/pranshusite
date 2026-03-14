"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { galleryItems } from "@/data/portfolio";
import { HoverTiltCard } from "@/app/components/ui/hover-tilt-card";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxItem, setLightboxItem] =
    useState<(typeof galleryItems)[0] | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(lightboxRef, () => setLightboxItem(null));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector("[data-gallery-scroll]") ?? [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 px-0 relative overflow-hidden">
      <BackgroundBeams className="opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Gallery
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8 max-w-md mx-auto">
          Swipe or scroll horizontally to browse images
        </p>

        {/* Horizontal scroll row */}
        <div
          data-gallery-scroll
          className={cn(
            "relative w-full rounded-2xl border border-white/5 bg-[var(--bg-secondary)]/30 backdrop-blur-sm",
            "py-6 pl-4 pr-2 md:px-6 md:py-8"
          )}
        >
          <div
            ref={scrollRef}
            className={cn(
              "flex flex-row gap-5 md:gap-6 overflow-x-auto pb-3",
              "snap-x snap-mandatory scroll-smooth",
              "[scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.35)_transparent]",
              "hover:[scrollbar-color:rgba(34,211,238,0.5)_transparent]"
            )}
            style={{
              scrollPaddingLeft: "1rem",
              scrollPaddingRight: "1rem",
            }}
          >
            {galleryItems.map((item) => (
              <div
                key={item.id}
                data-gallery-item
                className={cn(
                  "flex-shrink-0 snap-center snap-always",
                  "w-[min(78vw,340px)] sm:w-[min(70vw,380px)] md:w-[380px]"
                )}
              >
                <HoverTiltCard className="h-full">
                  <button
                    type="button"
                    className="w-full text-left overflow-hidden rounded-2xl"
                    onClick={() => setLightboxItem(item)}
                    suppressHydrationWarning
                  >
                    <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden">
                      {/* Optional: real image when src exists */}
                      {item.src ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <div
                        className={cn(
                          "absolute inset-0 flex items-center justify-center",
                          item.src
                            ? "bg-gradient-to-t from-black/70 via-transparent to-transparent"
                            : "bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                        )}
                      >
                        {!item.src && (
                          <span className="text-slate-500 text-sm">{item.title}</span>
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <span className="text-white font-medium">{item.title}</span>
                      </div>
                    </div>
                  </button>
                </HoverTiltCard>
              </div>
            ))}
            {/* Spacer so last card isn’t flush with edge */}
            <div
              className="flex-shrink-0 w-2 md:w-4"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              ref={lightboxRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute -top-12 right-0 p-2 rounded-lg hover:bg-white/10 text-white z-10"
                onClick={() => setLightboxItem(null)}
                suppressHydrationWarning
              >
                <X className="w-8 h-8" />
              </button>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[var(--bg-card)]">
                <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
                  {lightboxItem.src ? (
                    <img
                      src={lightboxItem.src}
                      alt={lightboxItem.alt}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-slate-500">{lightboxItem.title}</span>
                  )}
                </div>
                <p className="p-4 text-center text-white font-medium">
                  {lightboxItem.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
