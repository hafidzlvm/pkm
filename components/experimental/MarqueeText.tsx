"use client";

import { motion } from "framer-motion";

interface MarqueeTextProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function MarqueeText({ 
  text, 
  speed = 30, 
  reverse = false, 
  className = "" 
}: MarqueeTextProps) {
  const duplicatedText = `${text} • ${text} • ${text} • ${text} • `;

  return (
    <div className="marquee-container overflow-hidden whitespace-nowrap">
      <motion.div
        className={`inline-flex ${className}`}
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="inline-block pr-8">{duplicatedText}</span>
        <span className="inline-block pr-8">{duplicatedText}</span>
      </motion.div>
    </div>
  );
}

interface VerticalMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export function VerticalMarquee({ 
  items, 
  speed = 20, 
  className = "" 
}: VerticalMarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="h-full overflow-hidden">
      <motion.div
        className={`flex flex-col ${className}`}
        animate={{ y: ["-33.33%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="py-4 border-b border-[#2a2a2a]">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

