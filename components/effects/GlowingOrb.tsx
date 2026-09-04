"use client";

import { motion } from "framer-motion";

interface GlowingOrbProps {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
}

export function GlowingOrb({
  size = 400,
  color = "#D4AF37",
  className = "",
  delay = 0,
}: GlowingOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}10 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

