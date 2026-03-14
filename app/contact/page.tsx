"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/app/components/Nav";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Nav />
      <main className="max-w-xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden /> Back to home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Get in touch
          </h1>
          <p className="text-slate-400">
            Fill out the form below and I’ll get back to you as soon as I can.
          </p>
        </motion.div>

        <div className="mt-10">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
