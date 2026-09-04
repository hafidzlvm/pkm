"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { AnimatedSection } from "@/components/effects/AnimatedSection";

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/", color: "#06B6D4" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/", color: "#8B5CF6" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/", color: "#EC4899" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/", color: "#06B6D4" },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#work-experience" },
  { name: "Skills", href: "#skill-showcase" },
  { name: "Projects", href: "#project-showcase" },
];

export function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer ref={containerRef} id="contact" className="relative pt-32 pb-8 overflow-hidden">
      {/* Background Elements - Aurora */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-[rgba(6,182,212,0.08)] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-[rgba(139,92,246,0.08)] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(236,72,153,0.05)] to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-10" />
      </div>

      <div className="container relative">
        {/* CTA Section */}
        <AnimatedSection className="text-center mb-24">
          <motion.div
            style={{ y, opacity }}
            className="max-w-4xl mx-auto"
          >
            {/* Decorative Line - Aurora gradient */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-24 h-px mx-auto mb-12"
              style={{ background: "linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899)" }}
            />

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full border border-[rgba(139,92,246,0.3)] text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-8"
            >
              Let's Work Together
            </motion.span>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8">
              <span className="text-[#F9FAFB]">Have a project in</span>
              <br />
              <span className="text-gradient-aurora">mind?</span>
            </h2>

            <p className="text-lg md:text-xl text-[rgba(249,250,251,0.6)] max-w-2xl mx-auto mb-12 leading-relaxed">
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <MagneticButton
                onClick={() => window.open("mailto:muhammadh1904@gmail.com", "_blank")}
                className="btn-premium cursor-pointer group"
              >
                <span className="flex items-center gap-3 text-lg text-white">
                  <Mail className="w-5 h-5" />
                  Get In Touch
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </MagneticButton>

              <span className="text-[rgba(249,250,251,0.4)]">or</span>

              <a
                href="mailto:muhammadh1904@gmail.com"
                className="text-xl font-medium text-[#8B5CF6] hover:underline underline-offset-4 cursor-pointer"
              >
                muhammadh1904@gmail.com
              </a>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Main Footer Content */}
        <div className="border-t border-[rgba(139,92,246,0.1)] pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-3xl font-playfair font-bold text-gradient-aurora mb-4">
                  M.Hafidz
                </h3>
                <p className="text-[rgba(249,250,251,0.6)] leading-relaxed max-w-md">
                  Full-Stack Web Developer crafting exceptional digital experiences
                  with modern technologies and a passion for clean, scalable code.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-[rgba(249,250,251,0.5)]"
              >
                <MapPin className="w-4 h-4 text-[#EC4899]" />
                <span>Indonesia</span>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider mb-6"
              >
                Navigation
              </motion.h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-[rgba(249,250,251,0.6)] hover:text-[#8B5CF6] transition-colors duration-300 link-underline cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider mb-6"
              >
                Connect
              </motion.h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: `${social.color}20`,
                      borderColor: social.color
                    }}
                    className="w-12 h-12 rounded-full border border-[rgba(139,92,246,0.2)] flex items-center justify-center text-[rgba(249,250,251,0.6)] hover:text-[#8B5CF6] transition-all duration-300 cursor-pointer"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-[rgba(139,92,246,0.1)] flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-[rgba(249,250,251,0.4)] flex items-center gap-2">
              © 2025 Muhammad Hafidz. Crafted with{" "}
              <Heart className="w-4 h-4 text-[#EC4899] animate-pulse" />
            </p>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 text-sm text-[rgba(249,250,251,0.4)] hover:text-[#8B5CF6] transition-colors duration-300 cursor-pointer"
            >
              Back to top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Large Background Text - Aurora gradient */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[15vw] font-playfair font-bold whitespace-nowrap"
          style={{ 
            background: "linear-gradient(90deg, rgba(6,182,212,0.03), rgba(139,92,246,0.03), rgba(236,72,153,0.03))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          HAFIDZ • DEVELOPER • HAFIDZ • DEVELOPER •
        </motion.div>
      </div>
    </footer>
  );
}
