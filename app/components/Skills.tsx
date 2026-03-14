"use client";

import React from "react";
import { motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegCopy } from "react-icons/fa";
import { TextType } from "@/app/components/ui/textType";
import { cn } from "@/lib/utils";

const codeString = `const profile = {
  name: "Priyanshu Kumar",
  title: "Full-Stack Developer | Problem Solver | Tech Explorer",
  skills: [
    "Java", "JavaScript", "TypeScript", "Node.js",
    "Express.js", "MongoDB", "React.js", "Redux", "Next.js",
    "SQL", "DSA", "GitHub", "TailwindCSS", "Postman"
  ],
  traits: {
    hardWorker: true,
    problemSolver: true,
    alwaysCurious: true,
  },
  hireable() {
    return (
      this.traits.hardWorker &&
      this.traits.problemSolver &&
      this.skills.length >= 5 &&
      this.traits.alwaysCurious
    );
  },
  funFact1: "Code so clean, even ChatGPT approves.",
  funFact2: "Debugs faster with coffee ☕.",
  speak() {
    console.log("Hi, I'm " + this.name + ", your next favorite developer");
  }
};

profile.speak();
console.log("Hireable? " + (profile.hireable() ? "Yes" : "Maybe try again later.."));`;

export function Skills() {
  const handleCopy = () => {
    void navigator.clipboard.writeText(codeString.trim());
    alert("Code copied!");
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 bg-[var(--bg-primary)] flex flex-col items-center justify-center min-h-0"
    >
      <div className="max-w-4xl w-full mx-auto">
        <h1
          className={cn(
            "text-center md:text-6xl text-3xl font-bold text-cyan-400 relative z-20 mb-12"
          )}
        >
          <TextType
            phrases={["SKILLS", "Weapons", "SuperPowers"]}
            typingSpeed={75}
            pauseDuration={1500}
            cursor="|"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative w-full rounded-2xl overflow-hidden",
            "border border-white/10 bg-[var(--bg-card)]",
            "shadow-[0_0_60px_rgba(34,211,238,0.08)]",
            "hover:shadow-[0_0_80px_rgba(34,211,238,0.12)] hover:border-cyan-500/20",
            "transition-all duration-300"
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-sm text-slate-500 font-mono">
                developer.js
              </span>
            </div>
            <button
              type="button"
              aria-label="Copy code"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              onClick={handleCopy}
              suppressHydrationWarning
            >
              <FaRegCopy size={16} />
            </button>
          </div>

          <div className="p-4 md:p-6">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
              codeTagProps={{
                style: {
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                },
              }}
              showLineNumbers
              lineNumberStyle={{
                minWidth: "2em",
                color: "rgba(148,163,184,0.45)",
              }}
            >
              {codeString.trim()}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
