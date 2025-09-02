// src/Components/Skills.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import illustratorIcon from "./../assets/Skills/ai.png";
import figma from "./../assets/Skills/figma.png";
import id from "./../assets/Skills/id.png";
import photoshopIcon from "./../assets/Skills/ps.png";
import xd from "./../assets/Skills/xd.png";

const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57",
  bronzeLight: "#C89B67",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518",
  slate: "#6B7785",
  peach: "#F1D6BF"
};

const SkillBar = ({ skill, percentage, animate, idx }) => {
  return (
    <div
      className="group relative rounded-2xl p-5 md:p-6 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-all duration-500"
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      {/* Top row: Icon + labels */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-[#B08B57]/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="rounded-xl p-2 ring-1 ring-white/10 bg-[#0A0B0D]/40">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>
          </div>
          <div>
            <div className="text-base md:text-lg font-semibold text-[#E7DFD6]">
              {skill.name}
            </div>
            <div className="text-xs md:text-sm text-[#E7DFD6]/60">
              Proficiency
            </div>
          </div>
        </div>

        {/* Percentage pill */}
        <div className="shrink-0 rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-[#0A0B0D]/60 text-[#E7DFD6] ring-1 ring-white/10">
          {percentage}%
        </div>
      </div>

      {/* Progress */}
      <div
        className="mt-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label={`${skill.name} proficiency`}
      >
        <div className="relative h-2.5 rounded-full bg-white/10 overflow-hidden">
          {/* Track inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

          {/* Fill */}
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-[#C89B67] via-[#B08B57] to-[#8B6A3A] shadow-[0_6px_24px_-6px_rgba(176,139,87,0.7)] transition-[width] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ width: animate ? `${percentage}%` : "0%" }}
          >
            {/* Shine sweep */}
            <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.5),transparent)] mix-blend-screen animate-shine" />
            {/* End cap dot */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/70 ring-2 ring-[#B08B57]/40 shadow-[0_0_20px_rgba(200,155,103,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const sectionRef = useRef(null);

  useEffect(() => {
    // In-view trigger
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "Adobe Photoshop", icon: photoshopIcon, percentage: 90 },
    { name: "Adobe Illustrator", icon: illustratorIcon, percentage: 85 },
    { name: "Adobe InDesign", icon: id, percentage: 80 },
    { name: "Adobe XD", icon: xd, percentage: 75 },
    { name: "Figma", icon: figma, percentage: 95 }
  ];

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden"
      style={{
        color: COLORS.marble,
        background:
          "radial-gradient(ellipse at 70% 10%, #1F232B 0%, #141518 40%, #0A0B0D 100%)"
      }}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x} ${mouse.y}, rgba(176,139,87,0.14), transparent 55%)`
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Tools • UI/UX • Branding
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
                Skills & Proficiency
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h2>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            A balanced toolkit blending classical craft with modern workflows.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skill, idx) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              percentage={skill.percentage}
              animate={isVisible}
              idx={idx}
            />
          ))}
        </div>
      </div>

      {/* Local styles for animations (mirrors Home styles) */}
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(-18px) scale(1.04);} }
        @keyframes float-reverse { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(18px) scale(0.96);} }
        @keyframes pulse-slow { 0%,100% { opacity:.6; transform: scale(1);} 50% { opacity:1; transform: scale(1.15);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 160px;} }
        @keyframes grain {
          0%,100% { transform: translate(0,0);}
          10% { transform: translate(-5%,-10%);} 20% { transform: translate(-15%,5%);}
          30% { transform: translate(7%,-25%);} 40% { transform: translate(-5%,25%);}
          50% { transform: translate(-15%,10%);} 60% { transform: translate(15%,0%);}
          70% { transform: translate(0%,15%);} 80% { transform: translate(3%,25%);}
          90% { transform: translate(-10%,10%);}
        }
        @keyframes shine {
          0% { transform: translateX(-120%); opacity: 0;}
          20% { opacity: .9;}
          50% { opacity: .6;}
          100% { transform: translateX(320%); opacity: 0;}
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7.5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .4s forwards; }
        .animate-grain { animation: grain 8s steps(10) infinite; }
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>
    </section>
  );
};

export default Skills;
