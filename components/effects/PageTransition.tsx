"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {children}
      
      {/* Page Transition Overlays */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-[#0A0A0A] origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.div
        className="fixed inset-0 z-[9997] bg-[#D4AF37] origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      />
    </>
  );
}

