"use client";

import Link from "next/link";
import { socialLinks } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Portfolio. Built with Next.js & React.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.slice(1, 5).map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link href="/routes" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
            Support ☕
          </Link>
        </div>
      </div>
    </footer>
  );
}
