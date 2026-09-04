"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { TextReveal, CharReveal } from "@/components/effects/TextReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ParticleField } from "@/components/effects/ParticleField";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] mt-16"
    >
      {/* Aurora Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-[rgba(6,182,212,0.15)] to-transparent rounded-full blur-3xl aurora-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[rgba(139,92,246,0.15)] to-transparent rounded-full blur-3xl aurora-orb" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(236,72,153,0.08)] to-transparent rounded-full blur-3xl aurora-orb" style={{ animationDelay: "4s" }} />
      </div>

      {/* 3D Particle Field */}
      <ParticleField />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        />
      </svg>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-2 rounded-full border border-[rgba(139,92,246,0.3)] text-[#8B5CF6] text-sm font-medium tracking-widest uppercase backdrop-blur-sm bg-[rgba(139,92,246,0.05)]">
            Full-Stack Developer
          </span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 leading-tight">
          <span className="block text-[#F9FAFB]">
            <TextReveal delay={0.3}>I'm</TextReveal>{" "}
            <span className="text-shimmer">
              <CharReveal delay={0.5}>Muhammad Hafidz</CharReveal>
            </span>
          </span>
        </h1>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-8">
          <span className="text-[#9CA3AF] italic">
            <TextReveal delay={0.8}>Crafting Digital Experiences</TextReveal>
          </span>
        </h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl text-[rgba(249,250,251,0.6)] max-w-2xl mx-auto mb-12 font-manrope leading-relaxed"
        >
          Transforming ideas into exceptional digital products with{" "}
          <span className="text-[#06B6D4]">2+ years</span> of experience in
          building modern, scalable web applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton
            className="btn-premium cursor-pointer"
            onClick={() => {
              document.getElementById("project-showcase")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </MagneticButton>

          <MagneticButton
            className="px-10 py-4 rounded-full border-2 border-[rgba(139,92,246,0.5)] text-[#8B5CF6] font-semibold text-lg hover:bg-[rgba(139,92,246,0.1)] transition-all duration-300 cursor-pointer"
            onClick={() => window.open("mailto:muhammadh1904@gmail.com", "_blank")}
          >
            Let's Connect
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { number: "2+", label: "Years Experience", color: "#06B6D4" },
            { number: "15+", label: "Projects Completed", color: "#8B5CF6" },
            { number: "10+", label: "Technologies", color: "#EC4899" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
              className="text-center"
            >
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="text-sm text-[rgba(249,250,251,0.5)] font-manrope">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          document.getElementById("work-experience")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-xs text-[rgba(249,250,251,0.4)] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-[#8B5CF6]" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations with Aurora colors */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[rgba(6,182,212,0.3)]" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[rgba(139,92,246,0.3)]" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[rgba(236,72,153,0.3)]" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[rgba(139,92,246,0.3)]" />
    </section>
  );
}
