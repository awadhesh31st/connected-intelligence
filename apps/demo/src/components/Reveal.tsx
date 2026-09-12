"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, e.g. index * 80, for a cascading group reveal. */
  delay?: number;
}

/**
 * Fades + slides content in once it scrolls into view. Only ever applied to
 * below-the-fold content (never the hero) so there's no flash of invisible
 * content while JS loads on a slow connection.
 *
 * Uses Tailwind's `motion-safe:` variant for the hidden/animated state only —
 * under `prefers-reduced-motion: reduce` those classes never apply, so the
 * element just renders in its final, fully visible position with no motion
 * at all, no JS feature-detection required.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={[
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
        visible ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
