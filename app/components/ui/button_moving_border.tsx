"use client";

import { cn } from "@/lib/utils";

interface ButtonMovingBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export function Button({
  borderRadius = "0.5rem",
  className,
  children,
  asChild,
  ...props
}: ButtonMovingBorderProps) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={cn(
        "relative h-12 overflow-hidden bg-transparent p-[1px] text-white",
        "transition-all duration-300 hover:scale-[1.02]",
        className
      )}
      style={{ borderRadius }}
      suppressHydrationWarning
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <div
        className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(var(--bg-card),var(--bg-card))]"
        style={{ padding: "1px", borderRadius: "inherit" }}
      />
      <div
        className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--accent-cyan) 10%, transparent 20%, var(--accent-blue) 30%, transparent 40%)",
          borderRadius: "inherit",
        }}
      />
      <span
        className="relative z-10 flex h-full w-full items-center justify-center rounded-[calc(inherit-1px)] bg-[var(--bg-primary)] px-6 font-medium"
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </span>
    </Comp>
  );
}
