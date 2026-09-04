"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.05,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: delay + wordIndex * duration,
                  ease: [0.23, 1, 0.32, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function CharReveal({
  children,
  className = "",
  delay = 0,
}: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const chars = children.split("");

  return (
    <span ref={ref} className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

