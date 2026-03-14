"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavbarMenuProps {
  children: React.ReactNode;
  className?: string;
  /** Controlled: parent owns open state. Pass onOpenChange so links/backdrop can close. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NavbarMenu({ children, className, open: controlledOpen, onOpenChange }: NavbarMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const close = () => setOpen(false);
  const toggle = () => setOpen(!open);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Toggle menu"
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        onClick={toggle}
        suppressHydrationWarning
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop: tap outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              aria-hidden
              onClick={close}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-56 py-2 rounded-xl bg-[var(--bg-card)] border border-white/10 shadow-xl z-50 md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
