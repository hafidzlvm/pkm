"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { TextReveal } from "@/components/effects/TextReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  color: string;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "Movie Explorer",
    category: "Web Application",
    description:
      "A sophisticated platform for film discovery featuring intuitive search, genre filtering, and comprehensive movie details with cast information, ratings, and synopses.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "TMDB API"],
    image: "",
    color: "#06B6D4",
    github: "#",
    live: "#",
  },
  {
    title: "Pokédex Explorer",
    category: "Interactive App",
    description:
      "Modern, mobile-first interface for the Pokémon universe with intuitive navigation and rich data display for detailed stats, abilities, and evolution chains.",
    technologies: ["Vue.js", "Pinia", "PokéAPI", "SCSS"],
    image: "",
    color: "#8B5CF6",
    github: "#",
    live: "#",
  },
  {
    title: "E-Commerce Platform",
    category: "Full-Stack Application",
    description:
      "A modern, streamlined shopping experience with intuitive product catalog, simplified checkout flow, and visually appealing interface designed for maximum engagement.",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    image: "",
    color: "#EC4899",
    github: "#",
    live: "#",
  },
];

function ProjectCard({
  project,
  index,
  isReversed,
}: {
  project: Project;
  index: number;
  isReversed: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col gap-8 items-center ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } lg:gap-16`}
    >
      {/* Image Container */}
      <motion.div
        style={{ scale: imageScale }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden group cursor-pointer"
      >
        {/* Gradient Background */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`,
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
            rotate: isHovered ? 5 : 0,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-video bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-6xl font-playfair font-bold opacity-30"
              style={{ color: project.color }}
            >
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-[rgba(3,7,18,0.8)] flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: project.color }}
          >
            <ExternalLink className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center cursor-pointer"
            style={{ borderColor: project.color }}
          >
            <Github className="w-6 h-6" style={{ color: project.color }} />
          </motion.button>
        </motion.div>

        {/* Corner Accents */}
        <div
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? project.color : "rgba(139, 92, 246, 0.3)" }}
        />
        <div
          className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? project.color : "rgba(139, 92, 246, 0.3)" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className={`w-full lg:w-1/2 ${isReversed ? "lg:text-right" : ""}`}
      >
        {/* Category */}
        <motion.span
          initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-block text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: project.color }}
        >
          {project.category}
        </motion.span>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#F9FAFB] mb-6">
          {project.title}
        </h3>

        {/* Description Card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <p className="text-[rgba(249,250,251,0.7)] leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className={`flex flex-wrap gap-3 mb-8 ${isReversed ? "lg:justify-end" : ""}`}>
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-[rgba(139,92,246,0.2)] text-[rgba(249,250,251,0.6)] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className={`flex gap-4 ${isReversed ? "lg:justify-end" : ""}`}>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 cursor-pointer"
            style={{ 
              background: `linear-gradient(135deg, ${project.color}, #8B5CF6)`,
              boxShadow: `0 0 30px ${project.color}40`
            }}
          >
            View Project <ArrowUpRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border font-semibold transition-all duration-300 cursor-pointer"
            style={{ 
              borderColor: `${project.color}80`,
              color: project.color
            }}
          >
            <Github className="w-4 h-4" /> Source
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="project-showcase" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)" }}
      />

      <div className="container relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full border border-[rgba(139,92,246,0.3)] text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-6"
          >
            Featured Work
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-[#F9FAFB]">
              <TextReveal>Project</TextReveal>{" "}
            </span>
            <span className="text-gradient-aurora">
              <TextReveal delay={0.2}>Showcase</TextReveal>
            </span>
          </h2>
          
          <p className="text-lg text-[rgba(249,250,251,0.6)] max-w-2xl mx-auto">
            Driven by design and powered by code. Here are some projects
            that showcase my passion for creating impactful digital experiences.
          </p>
        </AnimatedSection>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection delay={0.3} className="text-center mt-20">
          <MagneticButton className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[rgba(139,92,246,0.5)] text-[#8B5CF6] font-semibold text-lg hover:bg-[rgba(139,92,246,0.1)] transition-all duration-300 cursor-pointer">
            View All Projects
            <ChevronRight className="w-5 h-5" />
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
