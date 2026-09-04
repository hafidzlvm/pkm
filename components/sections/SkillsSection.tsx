"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/effects/AnimatedSection";
import { TextReveal } from "@/components/effects/TextReveal";

interface Skill {
  name: string;
  category: string;
  icon: string;
  color: string;
  url: string;
}

const skills: Skill[] = [
  { name: "Express", category: "Backend Framework", icon: "/icon/Express.svg", color: "#06B6D4", url: "https://expressjs.com/" },
  { name: "Vue.js", category: "Frontend Framework", icon: "/icon/Vue.svg", color: "#42B883", url: "https://vuejs.org/" },
  { name: "React", category: "Frontend Library", icon: "/icon/React.svg", color: "#61DAFB", url: "https://react.dev/" },
  { name: "PostgreSQL", category: "Database", icon: "/icon/Postgresql.svg", color: "#8B5CF6", url: "https://www.postgresql.org/" },
  { name: "MySQL", category: "Database", icon: "/icon/Mysql.svg", color: "#06B6D4", url: "https://www.mysql.com/" },
  { name: "Nginx", category: "Web Server", icon: "/icon/Nginx.svg", color: "#EC4899", url: "https://nginx.org/" },
  { name: "Docker", category: "Container Platform", icon: "/icon/Docker.svg", color: "#2496ED", url: "https://docs.docker.com/" },
  { name: "Next.js", category: "React Framework", icon: "/icon/Next.svg", color: "#8B5CF6", url: "https://nextjs.org/" },
  { name: "ArcGIS", category: "GIS Platform", icon: "/icon/Arcgis.svg", color: "#06B6D4", url: "https://developers.arcgis.com/" },
  { name: "GeoServer", category: "GIS Server", icon: "/icon/Geoserver.svg", color: "#EC4899", url: "https://geoserver.org/" },
  { name: "Laravel", category: "PHP Framework", icon: "/icon/Laravel.svg", color: "#FF2D20", url: "https://laravel.com/" },
  { name: "Odoo", category: "ERP System", icon: "/icon/Odoo.svg", color: "#8B5CF6", url: "https://www.odoo.com/" },
];

function SkillCard3D({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Aurora colors for glow
  const auroraColors = ["#06B6D4", "#8B5CF6", "#EC4899"];
  const glowColor = auroraColors[index % 3];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <StaggerItem>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => window.open(skill.url, "_blank")}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group cursor-pointer"
      >
        {/* Glow Effect - Aurora colors */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          className="absolute -inset-[1px] rounded-2xl opacity-0 blur-sm"
          style={{ 
            background: `linear-gradient(135deg, ${glowColor}, ${auroraColors[(index + 1) % 3]})` 
          }}
        />

        {/* Card */}
        <div className="relative h-full p-6 rounded-2xl bg-[rgba(17,24,39,0.8)] border border-[rgba(139,92,246,0.15)] backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-[rgba(139,92,246,0.4)]">
          {/* Background Gradient */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.15 : 0,
            }}
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${glowColor}40, transparent)` }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-4">
            {/* Icon Container */}
            <motion.div
              style={{
                transform: "translateZ(50px)",
              }}
              className="relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
            >
              {/* Icon Background */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundColor: skill.color }}
              />
              
              {/* Shine Effect */}
              <motion.div
                animate={{
                  x: isHovered ? ["-100%", "100%"] : "-100%",
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <Image
                src={skill.icon}
                alt={skill.name}
                width={40}
                height={40}
                className="relative z-10 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
              />
            </motion.div>

            {/* Text */}
            <div
              style={{
                transform: "translateZ(30px)",
              }}
              className="flex-1"
            >
              <h3 className="text-lg font-semibold text-[#F9FAFB] group-hover:text-gradient-aurora transition-all duration-300">
                {skill.name}
              </h3>
              <p className="text-sm text-[rgba(249,250,251,0.5)]">
                {skill.category}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              style={{
                transform: "translateZ(60px)",
              }}
              animate={{
                x: isHovered ? 0 : -10,
                opacity: isHovered ? 1 : 0,
              }}
            >
              <ExternalLink className="w-5 h-5" style={{ color: glowColor }} />
            </motion.div>
          </div>

          {/* Bottom Highlight - Aurora gradient */}
          <motion.div
            animate={{
              scaleX: isHovered ? 1 : 0,
            }}
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
            style={{ background: `linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899)` }}
          />
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function SkillsSection() {
  return (
    <section id="skill-showcase" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(139,92,246,0.05)] to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-[rgba(6,182,212,0.05)] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-[rgba(236,72,153,0.05)] to-transparent rounded-full blur-3xl" />

      <div className="container relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full border border-[rgba(139,92,246,0.3)] text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-6"
          >
            Technical Arsenal
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-[#F9FAFB]">
              <TextReveal>Skills &</TextReveal>{" "}
            </span>
            <span className="text-gradient-aurora">
              <TextReveal delay={0.2}>Technologies</TextReveal>
            </span>
          </h2>
          
          <p className="text-lg text-[rgba(249,250,251,0.6)] max-w-2xl mx-auto">
            A powerful toolkit of modern technologies that I use to build
            exceptional digital experiences.
          </p>
        </AnimatedSection>

        {/* Skills Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          staggerDelay={0.05}
        >
          {skills.map((skill, index) => (
            <SkillCard3D key={skill.name} skill={skill} index={index} />
          ))}
        </StaggerContainer>

        {/* Additional Skills Tags */}
        <AnimatedSection delay={0.5} className="mt-16 text-center">
          <p className="text-sm text-[rgba(249,250,251,0.4)] mb-4">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["TypeScript", "Git", "Redis", "GraphQL", "REST APIs", "Tailwind CSS", "SASS", "WebSockets", "Linux", "AWS"].map((tech, i) => {
              const colors = ["#06B6D4", "#8B5CF6", "#EC4899"];
              return (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: colors[i % 3],
                    color: colors[i % 3]
                  }}
                  className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] text-sm text-[rgba(249,250,251,0.5)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
