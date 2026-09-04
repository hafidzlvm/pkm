"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, Briefcase } from "lucide-react";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { TextReveal } from "@/components/effects/TextReveal";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

const experiences: Experience[] = [
  {
    title: "Full-Stack Developer",
    company: "PT. Pintar Inovasi Mandiri",
    location: "Indonesia",
    period: "2024 - Present",
    description:
      "Leading development of enterprise-grade Geographic Information Systems (GIS) and Management Information Systems (MIS). Building scalable web applications that handle complex geospatial data processing and IoT integrations.",
    technologies: ["Vue.js", "Express.js", "PostgreSQL", "GeoServer", "Docker", "ArcGIS"],
    highlights: [
      "Developed real-time geospatial dashboards serving 1000+ daily users",
      "Implemented IoT data pipelines for environmental monitoring",
      "Led migration of legacy systems to modern microservices architecture",
    ],
  },
];

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className="relative"
    >
      {/* Timeline Connector - Aurora gradient */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
        style={{ background: "linear-gradient(180deg, #06B6D4, #8B5CF6, #EC4899, transparent)" }}
      />
      
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-0 top-8 w-4 h-4 -translate-x-1/2 rounded-full border-4 border-[#030712] hidden md:block"
        style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#8B5CF6]"
        />
      </motion.div>

      {/* Card */}
      <div className="md:ml-12 glass-card rounded-2xl overflow-hidden group hover:border-[rgba(139,92,246,0.4)] transition-all duration-500">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[rgba(139,92,246,0.1)]">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(6,182,212,0.1)] text-[#06B6D4] text-xs font-medium mb-3"
              >
                <Briefcase className="w-3 h-3" />
                Current Position
              </motion.span>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#F9FAFB] mb-2 group-hover:text-gradient-aurora transition-all duration-300">
                {experience.title}
              </h3>
              <p className="text-xl text-[#8B5CF6] font-medium">{experience.company}</p>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-[rgba(249,250,251,0.5)]">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#06B6D4]" />
                {experience.period}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EC4899]" />
                {experience.location}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <p className="text-[rgba(249,250,251,0.7)] leading-relaxed mb-6 text-lg">
            {experience.description}
          </p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider mb-4">
              Key Achievements
            </h4>
            <ul className="space-y-3">
              {experience.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-[rgba(249,250,251,0.6)]"
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: ["#06B6D4", "#8B5CF6", "#EC4899"][i % 3] }}
                  />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider mb-4">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                  className="px-4 py-2 rounded-full border border-[rgba(139,92,246,0.2)] text-sm text-[rgba(249,250,251,0.7)] hover:text-[#8B5CF6] transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-8 py-4 bg-[rgba(139,92,246,0.03)] border-t border-[rgba(139,92,246,0.1)] flex justify-end">
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-[#8B5CF6] text-sm font-medium cursor-pointer"
          >
            Learn More <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkExperienceSection() {
  return (
    <section id="work-experience" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[rgba(139,92,246,0.02)] to-transparent" />
      
      <div className="container relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full border border-[rgba(139,92,246,0.3)] text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-6"
          >
            Career Journey
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-[#F9FAFB]">
              <TextReveal>Work</TextReveal>{" "}
            </span>
            <span className="text-gradient-aurora">
              <TextReveal delay={0.2}>Experience</TextReveal>
            </span>
          </h2>
          
          <p className="text-lg text-[rgba(249,250,251,0.6)] max-w-2xl mx-auto">
            A track record of growth, innovation, and impactful contributions
            in the world of web development.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
