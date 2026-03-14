"use client";

import { useEffect } from "react";

/**
 * Invokes callback when a click occurs outside the ref element(s).
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | T[] | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const refs = Array.isArray(ref?.current) ? ref.current : ref?.current ? [ref.current] : [];
      const isOutside = refs.every((r) => r && !r.contains(target));
      if (isOutside) handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}
