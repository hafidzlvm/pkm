"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { CursorFollower } from "@/components/experimental/CursorFollower";
import { MarqueeText } from "@/components/experimental/MarqueeText";
import { MagneticElement } from "@/components/experimental/MagneticElement";
import { SplitTextReveal } from "@/components/experimental/GlitchText";

/* ═══════════════════════════════════════════════════════════════
   EXTRAORDINARY LOADER - NOT YOUR TYPICAL LOADING SCREEN
   ═══════════════════════════════════════════════════════════════ */

function ExtraordinaryLoader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 200);
          setTimeout(() => setPhase(2), 600);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="border-l border-[#1a1a1a]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ transformOrigin: "top" }}
          />
        ))}
      </div>

      {/* Counter */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: phase === 1 ? 1.5 : phase === 2 ? 20 : 1,
          opacity: phase === 2 ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-massive font-mono text-white">
          {String(Math.min(count, 100)).padStart(3, "0")}
        </span>
      </motion.div>

      {/* Bottom text */}
      <motion.div
        className="absolute bottom-8 left-8 text-[#4a4a4a] text-xs tracking-[0.3em] uppercase font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading Experience
      </motion.div>

      {/* Glitch lines */}
      {phase === 1 && (
        <>
          <motion.div
            className="absolute h-[2px] bg-[#00ff88] left-0"
            style={{ top: "30%" }}
            initial={{ width: 0, x: "-100%" }}
            animate={{ width: "100%", x: "100%" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute h-[2px] bg-[#ff0066] left-0"
            style={{ top: "70%" }}
            initial={{ width: 0, x: "100%" }}
            animate={{ width: "100%", x: "-100%" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION - BRUTALIST FLOATING DOTS
   ═══════════════════════════════════════════════════════════════ */

function BrutalNavigation() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["INTRO", "WORK", "SKILLS", "PROJECTS", "CONTACT"];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Section aktif saat berada di tengah viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionIndex = parseInt(sectionId.split("-")[1]);
          if (!isNaN(sectionIndex)) {
            setActiveSection(sectionIndex);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe semua section
    sections.forEach((_, i) => {
      const section = document.getElementById(`section-${i}`);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((_, i) => {
        const section = document.getElementById(`section-${i}`);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <motion.nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
    >
      {sections.map((section, i) => (
        <MagneticElement key={section} strength={0.3}>
          <button
            onClick={() => {
              document
                .getElementById(`section-${i}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 cursor-pointer"
            data-cursor="GO"
          >
            <span
              className={`text-xs font-mono tracking-wider transition-all duration-300 ${
                activeSection === i ? "text-white" : "text-[#4a4a4a]"
              } group-hover:text-[#00ff88]`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <motion.div
              className="w-2 h-2 rounded-full border border-current transition-all duration-300"
              animate={{
                scale: activeSection === i ? 1.5 : 1,
                backgroundColor:
                  activeSection === i ? "#00ff88" : "transparent",
              }}
            />
          </button>
        </MagneticElement>
      ))}
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION - MASSIVE TYPOGRAPHY
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
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
      id="section-0"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Giant background letter */}
      <motion.div
        className="absolute -right-[10%] top-1/2 -translate-y-1/2 text-[60vw] font-black text-[#0a0a0a] select-none pointer-events-none leading-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
      >
        H
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="container-brutal relative z-10"
      >
        {/* Overline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60px" }}
          transition={{ duration: 1, delay: 1.2 }}
          className="h-[2px] bg-[#00ff88] mb-8"
        />

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-[#4a4a4a] text-sm tracking-[0.3em] uppercase font-mono mb-4"
        >
          Full-Stack Developer
        </motion.p>

        {/* Main title - MASSIVE */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.77, 0, 0.175, 1] }}
            className="text-massive text-white leading-[0.85]"
          >
            HAFIDZ
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.77, 0, 0.175, 1] }}
            className="text-massive text-stroke leading-[0.85]"
          >
            MUHAMMAD
          </motion.h1>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="max-w-md"
        >
          <p className="text-[#8a8a8a] text-lg leading-relaxed">
            Crafting <span className="text-[#00ff88]">extraordinary</span>{" "}
            digital experiences that break the conventional. Based in Indonesia,
            building for the world.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-8 flex items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-16 bg-gradient-to-b from-[#00ff88] to-transparent"
          />
          <span className="text-xs font-mono text-[#4a4a4a] tracking-wider -rotate-90 origin-left translate-x-4">
            SCROLL
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-0 left-0 right-0 border-t border-[#1a1a1a] py-4 overflow-hidden"
      >
        <MarqueeText
          text="DEVELOPER • DESIGNER • CREATIVE • INNOVATOR"
          className="text-[#2a2a2a] text-6xl md:text-8xl font-black"
          speed={40}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WORK EXPERIENCE - NUMBERED BRUTALIST LIST
   ═══════════════════════════════════════════════════════════════ */

function WorkSection() {
  return (
    <section id="section-1" className="min-h-screen bg-black py-32">
      <div className="container-brutal">
        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <span className="text-[#00ff88] text-sm font-mono tracking-wider">
              01
            </span>
            <h2 className="text-huge text-white mt-2">
              <SplitTextReveal text="WORK" />
            </h2>
          </div>
          <p className="text-[#4a4a4a] text-sm font-mono max-w-xs text-right hidden md:block">
            Professional journey building digital products that matter.
          </p>
        </div>

        {/* Experience item */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-[#2a2a2a]"
        >
          <div className="numbered-item group" data-cursor="VIEW">
            <span className="number">01</span>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h3 className="text-display text-white group-hover:text-[#00ff88] transition-colors">
                  Full-Stack Developer
                </h3>
                <span className="text-[#4a4a4a] font-mono text-sm">
                  2 Years
                </span>
              </div>
              <p className="text-[#8a8a8a] text-lg max-w-2xl mb-6">
                PT. Pintar Inovasi Mandiri — Building enterprise GIS platforms,
                real-time dashboards, and IoT integrations serving thousands of
                users.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Vue.js", "React", "Hono", "Express", "PostgreSQL", "Docker", "GeoServer"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 border border-[#2a2a2a] text-[#8a8a8a] text-sm font-mono hover:border-[#00ff88] hover:text-[#00ff88] transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS - ORBIT / CONSTELLATION
   ═══════════════════════════════════════════════════════════════ */

function SkillsSection() {
  const skills = [
    { name: "React", level: 90, icon: "/icon/React.svg" },
    { name: "Vue.js", level: 95, icon: "/icon/Vue.js.svg" },
    { name: "Node.js", level: 88, icon: "/icon/Node.js.svg" },
    { name: "PostgreSQL", level: 88, icon: "/icon/Postgresql.svg" },
    { name: "Docker", level: 93, icon: "/icon/Docker.svg" },
    { name: "TypeScript", level: 90, icon: "/icon/TypeScript.svg" },
    { name: "Next.js", level: 88, icon: "/icon/Next.svg" },
    { name: "Laravel", level: 77, icon: "/icon/Laravel.svg" },
    { name: "GIS/Maps", level: 80, icon: "/icon/Arcgis.svg" },
    { name: "Python", level: 75, icon: "/icon/Python.svg" },
    { name: "Express", level: 90, icon: "/icon/Express.svg" },
    { name: "Nginx", level: 80, icon: "/icon/Nginx.svg" },
    { name: "Git", level: 100, icon: "/icon/Git.svg" },
    { name: "Odoo", level: 72, icon: "/icon/Odoo.svg" },
  ];

  return (
    <section
      id="section-2"
      className="min-h-screen bg-black py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-l border-[#111] h-full" />
        ))}
      </div>

      <div className="container-brutal relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <span className="text-[#00ff88] text-sm font-mono tracking-wider">
            02
          </span>
          <h2 className="text-huge text-white mt-2">
            <SplitTextReveal text="SKILLS" />
          </h2>
        </div>

        {/* Skills grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-[#0a0a0a] flex flex-col justify-end h-16 p-8 border border-[#1a1a1a] hover:border-[#00ff88] transition-all duration-500 cursor-default"
              data-cursor={`${skill.level}%`}
            >
              {/* Skill name */}
              <h3 className="text-2xl font-bold text-white group-hover:text-[#00ff88] transition-colors">
                {skill.name}
              </h3>

              {/* Progress bar */}
              <div className="mt-4 h-[2px] bg-[#2a2a2a] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                  className="h-full bg-[#00ff88]"
                />
              </div>

              {/* Percentage */}
              <span className="absolute top-4 right-4 text-[#2a2a2a] text-6xl font-black group-hover:text-[#111] transition-colors">
                {skill.level}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Additional skills marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 py-6 border-t border-b border-[#1a1a1a]"
        >
          <MarqueeText
            text="GIT • AWS • NGINX • REDIS • GRAPHQL • REST • WEBSOCKET • LINUX • FIGMA • TAILWIND"
            className="text-[#2a2a2a] text-xl font-mono"
            speed={25}
            reverse
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS - HORIZONTAL SCROLL GALLERY
   ═══════════════════════════════════════════════════════════════ */

function ProjectsSection() {
  // "offset: ['start start', 'end end']" digunakan untuk menentukan kapan animasi horizontal scroll dimulai dan berakhir berdasarkan posisi scroll pada container.
  // Dengan offset ini, scrollYProgress akan 0 saat bagian atas container sejajar dengan bagian atas viewport ("start start"),
  // dan scrollYProgress jadi 1 saat bagian bawah container sejajar dengan bagian bawah viewport ("end end").
  // Selanjutnya, useTransform akan membuat nilai x berubah dari "0%" ke "-100%" seiring scrollYProgress dari 0 ke 1.
  // Sehingga, motion.div yang menggunakan style { x } akan bergerak horizontal dari posisi awal ke kiri (seakan membuat horizontal scrolling effect) selama kita scroll section tersebut.
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "10% 10%", "20% 20%", "30% 30%", "45% 45%", "65% 65%", "80% 80%", "90% 90%", "end end"], // Animasi mulai ketika section masuk viewport dari atas, selesai saat keluar dari bawah
  });

  const x = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.45, 0.65, 0.8, 0.9, 1], ["0%", "0%", "0%", "-100%", "-100%", "-100%", "-200%", "-200%", "-200%"]); // Nilai x berubah sepanjang scroll section

  const projects = [
    {
      num: "01",
      title: "MOVIE\nEXPLORER",
      desc: "Film discovery platform with intuitive search and filtering",
      tech: ["React", "TypeScript", "TMDB API"],
      color: "#ff0066",
    },
    {
      num: "02",
      title: "POKÉDEX\nEXPLORER",
      desc: "Modern interface for the Pokémon universe",
      tech: ["Vue.js", "Pinia", "PokéAPI"],
      color: "#00ff88",
    },
    {
      num: "03",
      title: "E-COMMERCE\nPLATFORM",
      desc: "Full-stack shopping experience with payments",
      tech: ["Next.js", "PostgreSQL", "Stripe"],
      color: "#00d4ff",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="section-3"
      className="relative bg-black"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section number */}
        <div className="absolute top-8 left-8 z-20">
          <span className="text-[#00ff88] text-sm font-mono tracking-wider">
            03
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">PROJECTS</h2>
        </div>

        {/* Horizontal scroll content */}
        <motion.div style={{ x }} className="flex h-full">
          {projects.map((project, i) => (
            <div
              key={project.num}
              className="w-screen h-full flex-shrink-0 flex items-center justify-center px-8 md:px-20"
            >
              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Project info */}
                <div>
                  <span
                    className="text-[200px] font-black leading-none"
                    style={{ color: project.color, opacity: 0.2 }}
                  >
                    {project.num}
                  </span>
                  <h3 className="text-5xl md:text-7xl font-black text-white whitespace-pre-line -mt-20 mb-6">
                    {project.title}
                  </h3>
                  <p className="text-[#8a8a8a] text-xl mb-8">{project.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-2 border text-sm font-mono"
                        style={{
                          borderColor: project.color,
                          color: project.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project visual placeholder */}
                <div
                  className="aspect-[4/3] border-2 flex items-center justify-center"
                  style={{ borderColor: project.color }}
                >
                  <span
                    className="text-9xl font-black"
                    style={{ color: project.color, opacity: 0.3 }}
                  >
                    {project.num}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-8 right-8 h-[2px] bg-[#1a1a1a]">
          <motion.div
            className="h-full bg-[#00ff88]"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT - BRUTALIST CTA
   ═══════════════════════════════════════════════════════════════ */

function ContactSection() {
  const socials = [
    { name: "GitHub", icon: "/icon/Github.svg", url: "https://github.com/hafidzlvm" },
    { name: "LinkedIn", icon: "/icon/Linkedin.svg", url: "https://www.linkedin.com/in/hafidz-lvm/" },
    // { name: "Twitter", icon: "/icon/Twitter.svg", url: "https://x.com/hafidzlvm" },
  ];
  return (
    <section
      id="section-4"
      className="min-h-screen bg-black flex items-center py-32"
    >
      <div className="container-brutal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left side - CTA */}
          <div>
            <span className="text-[#00ff88] text-sm font-mono tracking-wider">
              04
            </span>
            <h2 className="text-huge text-white mt-4 mb-8">
              <SplitTextReveal text="LET'S" />
              <br />
              <span className="text-stroke">
                <SplitTextReveal text="TALK" delay={0.3} />
              </span>
            </h2>

            <p className="text-[#8a8a8a] text-xl max-w-md mb-12">
              Got a project in mind? Let's create something extraordinary
              together.
            </p>

            <MagneticElement strength={0.2}>
              <a
                href="mailto:muhammadh1904@gmail.com"
                className="inline-block px-12 py-6 bg-[#00ff88] text-black text-xl font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                data-cursor="SEND"
              >
                Say Hello →
              </a>
            </MagneticElement>
          </div>

          {/* Right side - Info */}
          <div className="flex flex-col justify-end">
            <div className="space-y-8">
              <div>
                <span className="text-[#4a4a4a] text-xs font-mono tracking-wider uppercase">
                  Email
                </span>
                <p className="text-white text-2xl mt-2">
                  muhammadh1904@gmail.com
                </p>
              </div>
              <div>
                <span className="text-[#4a4a4a] text-xs font-mono tracking-wider uppercase">
                  Location
                </span>
                <p className="text-white text-2xl mt-2">Indonesia</p>
              </div>
              <div>
                <span className="text-[#4a4a4a] text-xs font-mono tracking-wider uppercase">
                  Availability
                </span>
                <p className="text-[#00ff88] text-2xl mt-2">Open to Work</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-6 mt-12 pt-8 border-t border-[#2a2a2a]">
              {socials.map((social) => (
                <MagneticElement key={social.name} strength={0.3}>
                  <a
                    href={social.url}
                    className="text-[#4a4a4a] hover:text-[#00ff88] transition-colors font-mono text-sm cursor-pointer"
                    data-cursor="OPEN"
                  >
                    {social.name}
                  </a>
                </MagneticElement>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER - MINIMAL
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-black border-t border-[#1a1a1a] py-8">
      <div className="container-brutal flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#4a4a4a] text-sm font-mono">
          © 2025 MUHAMMAD HAFIDZ
        </p>
        <p className="text-[#4a4a4a] text-sm font-mono">
          EXTRAORDINARY BY DESIGN
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <ExtraordinaryLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Grain overlay */}
          <div className="grain" />

          {/* Custom cursor */}
          <CursorFollower />

          {/* Navigation */}
          <BrutalNavigation />

          {/* Main content */}
          <main>
            <HeroSection />
            <WorkSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
