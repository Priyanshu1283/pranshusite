"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Coffee } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { NavbarMenu } from "@/app/components/ui/navbar-menu";
import { navMenu, navSocial } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Nav() {
  const [socialOpen, setSocialOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const socialRef = useRef<HTMLDivElement>(null);
  useOutsideClick(socialRef, () => setSocialOpen(false));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#landing" className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors">
          Portfolio
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {navMenu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {/* Social dropdown */}
          <div className="relative" ref={socialRef}>
            <button
              type="button"
              onClick={() => setSocialOpen((o) => !o)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              suppressHydrationWarning
            >
              Social <ChevronDown className={cn("w-4 h-4 transition-transform", socialOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-1 w-40 py-2 rounded-xl bg-[var(--bg-card)] border border-white/10 shadow-xl"
                >
                  {navSocial.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/routes"
            className="ml-2 relative h-12 overflow-hidden rounded-lg bg-[var(--bg-card)] p-[1px] text-sm text-white hover:border-cyan-500/40 transition-colors inline-flex items-center justify-center px-4"
          >
            <span className="relative z-10 flex items-center gap-1">
              <Coffee className="w-4 h-4" /> T☕a
            </span>
          </Link>
        </div>

        {/* Mobile menu */}
        <NavbarMenu>
          <div className="flex flex-col gap-1 px-2">
            {navMenu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-white/10 my-2 pt-2">
              <p className="px-4 py-1 text-xs text-slate-500">Social</p>
              {navSocial.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-slate-300 hover:text-cyan-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Link href="/routes" className="px-4 py-3 text-cyan-400 font-medium">
              T☕a — Support
            </Link>
          </div>
        </NavbarMenu>
      </nav>
    </header>
  );
}
