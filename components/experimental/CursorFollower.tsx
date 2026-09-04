"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      setCursorText(target.dataset.cursor || "");
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", handleMouseMove);

    const hoverElements = document.querySelectorAll("[data-cursor], a, button");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main cursor blob */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 120 : 20,
            height: isHovering ? 120 : 20,
          }}
          transition={{ duration: 0.3 }}
          className="bg-[#00ff88] rounded-full mix-blend-difference flex items-center justify-center"
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-black text-xs font-bold uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 bg-[#00ff88] rounded-full pointer-events-none z-[99998] hidden md:block opacity-20"
          style={{
            x: useSpring(mouseX, { damping: 30 + i * 5, stiffness: 200 }),
            y: useSpring(mouseY, { damping: 30 + i * 5, stiffness: 200 }),
            translateX: "-50%",
            translateY: "-50%",
            scale: 1 - i * 0.15,
          }}
        />
      ))}
    </>
  );
}

