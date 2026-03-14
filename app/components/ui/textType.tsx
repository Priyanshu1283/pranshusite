"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextTypeProps {
  phrases: string[];
  className?: string;
  cursor?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TextType({
  phrases,
  className,
  cursor = "|",
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TextTypeProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index] ?? "";
    const timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && subIndex === phrase.length) {
      const id = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(id);
    }
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const id = setTimeout(
      () => setSubIndex((s) => s + (isDeleting ? -1 : 1)),
      timeout
    );
    return () => clearTimeout(id);
  }, [index, subIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const text = (phrases[index] ?? "").slice(0, subIndex);

  return (
    <span className={cn("inline", className)}>
      {text}
      <span className="animate-pulse text-cyan-400">{cursor}</span>
    </span>
  );
}
