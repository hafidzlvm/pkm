"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <span 
      className={`text-glitch ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let iteration = 0;
    const originalText = text;
    
    const interval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) return originalText[index];
          if (char === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1/3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span ref={ref} className={className}>{text}</span>;
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitTextReveal({ text, className = "", delay = 0 }: SplitTextRevealProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: "100%", rotate: 10 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: delay + wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.77, 0, 0.175, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

