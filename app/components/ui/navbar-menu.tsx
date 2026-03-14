"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavbarMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function NavbarMenu({ children, className }: NavbarMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Toggle menu"
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        onClick={() => setOpen((o) => !o)}
        suppressHydrationWarning
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-56 py-2 rounded-xl bg-[var(--bg-card)] border border-white/10 shadow-xl z-50 md:hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
