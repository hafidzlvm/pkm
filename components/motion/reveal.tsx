"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal on scroll — murni IntersectionObserver, tanpa library.
 * SSR/no-JS/reduced-motion: konten selalu terlihat (state tersembunyi
 * hanya diterapkan lewat html.js + prefers-reduced-motion gate di CSS).
 */
export function Reveal({
  as: Tag = "div",
  className,
  delay = 0,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  delay?: number;
}) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * WordStagger — narasi muncul kata demi kata saat masuk viewport.
 * Mengurai children string menjadi span per kata dengan delay bertingkat.
 */
export function WordStagger({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  highlight?: readonly string[];
}) {
  const ref = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("wstagger", className)}>
      {words.map((w, i) => {
        const clean = w.replace(/[.,;:"]+/g, "").toLowerCase();
        const isHi = highlight.some((h) => h.toLowerCase() === clean);
        return (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden">
            <span
              className={cn("wword", isHi && "shimmer-term")}
              style={{ "--i": i } as React.CSSProperties}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </p>
  );
}
