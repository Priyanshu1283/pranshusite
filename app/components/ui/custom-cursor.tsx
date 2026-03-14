"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const LERP = 0.14;
const TRAIL_LERP = 0.07;
const WAVE_LERP = 0.04;
const RIPPLE_DURATION = 650;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [render, setRender] = useState({
    x: -100,
    y: -100,
    trailX: -100,
    trailY: -100,
    waveX: -100,
    waveY: -100,
  });
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const wave = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = hasFinePointer && hasHover && !isTouch && !reducedMotion;
    setIsDesktop(desktop);

    if (!desktop) return;

    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleClick = (e: MouseEvent) => {
      setRipples((prev) => [...prev, { id: rippleId.current++, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, RIPPLE_DURATION);
    };

    const animate = () => {
      trail.current.x = lerp(trail.current.x, pos.current.x, LERP);
      trail.current.y = lerp(trail.current.y, pos.current.y, LERP);
      wave.current.x = lerp(wave.current.x, trail.current.x, WAVE_LERP);
      wave.current.y = lerp(wave.current.y, trail.current.y, WAVE_LERP);

      setRender({
        x: pos.current.x,
        y: pos.current.y,
        trailX: trail.current.x,
        trailY: trail.current.y,
        waveX: wave.current.x,
        waveY: wave.current.y,
      });

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mousedown", handleClick);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(raf.current);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [visible]);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.classList.add("custom-cursor-active");
    return () => document.body.classList.remove("custom-cursor-active");
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Main dot — cursor tip */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          transform: `translate(${render.x}px, ${render.y}px)`,
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <div
          className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.4), 0 0 16px rgba(34,211,238,0.5), 0 0 32px rgba(34,211,238,0.2)",
          }}
        />
      </div>

      {/* Trailing ring — first wave */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9998] transition-opacity duration-200"
        style={{
          transform: `translate(${render.trailX}px, ${render.trailY}px)`,
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <div
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/60 bg-cyan-400/10"
          style={{ boxShadow: "0 0 24px rgba(34,211,238,0.25)" }}
        />
      </div>

      {/* Outer wave — second wave, more lag */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9997] transition-opacity duration-200"
        style={{
          transform: `translate(${render.waveX}px, ${render.waveY}px)`,
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <div
          className="h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"
          style={{ boxShadow: "0 0 40px rgba(34,211,238,0.15)" }}
        />
      </div>

      {/* Click burst ripples */}
      {ripples.map((r) => (
        <Ripple key={r.id} x={r.x} y={r.y} />
      ))}
    </>
  );
}

function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <div
        className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400 bg-cyan-400/30 animate-cursor-ripple"
        style={{ boxShadow: "0 0 20px rgba(34,211,238,0.6)" }}
      />
    </div>
  );
}
