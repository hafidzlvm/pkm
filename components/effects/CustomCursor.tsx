"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnterLink = () => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          scale: 2,
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
          borderColor: "rgba(139, 92, 246, 0.8)",
          duration: 0.3,
        });
        gsap.to(cursorDotRef.current, {
          scale: 0,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeaveLink = () => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          background: "transparent",
          borderColor: "rgba(139, 92, 246, 0.5)",
          duration: 0.3,
        });
        gsap.to(cursorDotRef.current, {
          scale: 1,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const links = document.querySelectorAll("a, button, .cursor-pointer");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink);
      link.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main cursor ring with aurora gradient border */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[rgba(139,92,246,0.5)] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Cursor dot with gradient */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #06B6D4, #8B5CF6, #EC4899)",
        }}
      />
    </>
  );
}
