// src/Components/About.jsx
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Add your teammates' photos here
import member1 from "./../assets/pasindu.png";
import member2 from "./../assets/my2.png";

// Same theme as Home.jsx
const COLORS = {
  slate: "#6B7785",
  marble: "#E7DFD6",
  peach: "#F1D6BF",
  bronze: "#B08B57",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518"
};

// Simple social icons (inline SVGs to avoid extra libs)
const SocialIcon = ({ type, className = "w-5 h-5" }) => {
  const base = "fill-current";
  switch (type) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.84v1.98h.05c.54-1.02 1.86-2.09 3.82-2.09 4.08 0 4.83 2.69 4.83 6.19V23h-4v-6.44c0-1.54-.03-3.53-2.15-3.53-2.15 0-2.48 1.68-2.48 3.42V23h-4V8.5z" />
        </svg>
      );
    case "behance":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
          <path d="M9.24 11.2a2.34 2.34 0 001.68-2.29c0-2.04-1.54-2.91-3.56-2.91H2v12h5.61c1.99 0 3.93-.9 3.93-3.16 0-1.59-.85-2.5-2.3-2.64zM5.13 8.16h2.21c.84 0 1.56.3 1.56 1.18 0 .9-.61 1.24-1.49 1.24H5.13V8.16zm2.28 7.79H5.13v-2.88h2.44c.98 0 1.69.37 1.69 1.44 0 1.02-.78 1.44-1.85 1.44zM22 7.74h-5.6V6h5.6v1.74zM18.59 8.9c-2.7 0-4.48 1.83-4.48 4.56 0 2.71 1.73 4.51 4.48 4.51 2.14 0 3.54-1.05 4.03-2.75h-2.22c-.24.63-.86 1.02-1.79 1.02-1.21 0-1.98-.72-2.1-1.98h6.24c.03-.23.05-.45.05-.68 0-2.62-1.52-4.68-4.21-4.68zm-1.99 3.62c.17-1.06.84-1.7 1.97-1.7 1.09 0 1.8.67 1.86 1.7h-3.83z" />
        </svg>
      );
    case "dribbble":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12a10 10 0 1010-10zm6.32 6.22a8.07 8.07 0 00-2.88-2.38c.54.86 1.02 1.79 1.44 2.77.5-.13 1-.25 1.44-.39zM12 3.93c1.61 0 3.09.49 4.32 1.32-.42.11-.86.23-1.32.36a24.7 24.7 0 00-2.91-3.2c-.03 0-.06-.01-.09-.01zM8.24 5.33A8.07 8.07 0 005.1 8.19c.87.02 2.08-.05 3.5-.25.39-1.08.85-2.03 1.38-2.61-.58.31-1.09.64-1.74 1zM3.94 12.2c0-.12 0-.24.01-.36.94.02 3.23-.02 5.73-.41-.23.64-.43 1.34-.6 2.1-2.08.75-3.86 1.8-5.14 3.22A8 8 0 013.94 12.2zm8.06 7.87c-1.7 0-3.28-.55-4.55-1.49.99-1.27 2.45-2.19 4.42-2.88.76 2.08 1.79 3.89 2.51 4.93a7.89 7.89 0 01-2.38.44zm3.65-1.16c-.64-.9-1.75-2.78-2.55-5.02 1.48-.2 3.14-.23 4.94.08-.04 1.87-.71 3.52-1.89 4.94-.16 0-.33 0-.5-.01zm-2.92-7.23c-2.83.45-5.53.5-6.69.47.3-1.09.72-2.13 1.27-3.09 2.21-.36 5.12-.79 7.5-1.3.48 1.09.86 2.14 1.13 3.17a23.81 23.81 0 00-3.21.75zm6.88-.48c-.56-.09-1.11-.16-1.66-.2-.27-1.01-.63-2.03-1.12-3.12.62-.17 1.23-.35 1.83-.55a7.98 7.98 0 01.95 3.87z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM18 6.5a1 1 0 110 2 1 1 0 010-2z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.49v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.45-1.14-1.1-1.44-1.1-1.44-.9-.61.07-.6.07-.6 1 .07 1.52 1.05 1.52 1.05.89 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.11-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0112 7.06c.85 0 1.72.11 2.53.32 1.9-1.3 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.56 4.92.36.31.67.92.67 1.85v2.74c0 .27.18.59.69.49A10 10 0 0012 2z" />
        </svg>
      );
    default:
      return null;
  }
};

// Reusable card for each team member
const TeamMemberCard = ({ member, index = 0 }) => {
  return (
    <div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      <div className="relative h-full rounded-2xl bg-[#141518]/50 backdrop-blur-xl p-6">
        {/* Decorative soft glow */}
        <div className="absolute -inset-10 -z-10 bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 blur-2xl opacity-60 pointer-events-none" />

        {/* Media */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="flex items-center justify-center h-80">
            <img
              src={member.avatar}
              alt={member.name}
              className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>

          {/* role chip */}
          <div className="absolute left-4 top-4 px-3 py-1.5 rounded-full text-xs bg-[#0A0B0D]/70 backdrop-blur-md ring-1 ring-white/20 text-[#E7DFD6] font-medium tracking-wide shadow-lg">
            {member.role}
          </div>
        </div>

        {/* Content */}
        <div className="mt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E7DFD6] to-[#B08B57]">
                {member.name}
              </h3>
              {member.tagline && (
                <p className="text-sm text-[#E7DFD6]/60">{member.tagline}</p>
              )}
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#B08B57] shadow-[0_0_16px_rgba(176,139,87,0.6)] mt-1" />
          </div>

          {member.bio && (
            <p className="mt-3 text-sm text-[#E7DFD6]/70 leading-relaxed">
              {member.bio}
            </p>
          )}

          {/* Skills */}
          {member.skills?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {member.skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-[11px] ring-1"
                  style={{
                    backgroundColor: "rgba(231,223,214,.06)",
                    color: "#E7DFD6",
                    borderColor: "rgba(231,223,214,.15)"
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Socials + CTA */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#E7DFD6]/70">
              {member.socials?.dribbble && (
                <a
                  href={member.socials.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:text-[#B08B57] hover:bg-white/10 transition-colors"
                  aria-label={`${member.name} on Dribbble`}
                >
                  <SocialIcon type="dribbble" />
                </a>
              )}
              {member.socials?.behance && (
                <a
                  href={member.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:text-[#B08B57] hover:bg-white/10 transition-colors"
                  aria-label={`${member.name} on Behance`}
                >
                  <SocialIcon type="behance" />
                </a>
              )}
              {member.socials?.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:text-[#B08B57] hover:bg-white/10 transition-colors"
                  aria-label={`${member.name} on Instagram`}
                >
                  <SocialIcon type="instagram" />
                </a>
              )}
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:text-[#B08B57] hover:bg-white/10 transition-colors"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <SocialIcon type="linkedin" />
                </a>
              )}
              {member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:text-[#B08B57] hover:bg-white/10 transition-colors"
                  aria-label={`${member.name} on GitHub`}
                >
                  <SocialIcon type="github" />
                </a>
              )}
            </div>

            {member.cta && (
              <a
                href={member.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-4 py-2 rounded-full text-[#0A0B0D] overflow-hidden"
                style={{
                  background: COLORS.bronze,
                  boxShadow: "0 12px 28px -12px rgba(176,139,87,.35)"
                }}
              >
                <span className="relative z-10 text-sm font-medium">
                  {member.cta.label}
                </span>
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });

  // Parallax for background decor/orbits
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const parallaxUp = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxDown = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Mouse move for spotlight
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // Team data (add your real details/links)
  const team = [
    {
      name: "Pasindu Lakshan",
      role: "Graphic Designer",
      avatar: member1,
      tagline: "Textile and Apparel Engineer UG • Graphic Designer",
      bio: "Skilled graphic designer experienced in Adobe Creative Suite, delivering innovative and modern designs that enhance user engagement and brand identity",

      skills: ["Illustrator", "Photoshop"],
      socials: {
        behance: "https://behance.net/",
        linkedin: "http://linkedin.com/in/pasindu-lakshan5"
      },
      cta: {
        label: "View Portfolio",
        href: "http://linkedin.com/in/pasindu-lakshan5"
      }
    },
    {
      name: "Ishan Nilaksha",
      role: "Graphic Designer",
      avatar: member2,
      tagline: "Electronics Engineer UG • Graphic Designer",
      bio: "Passionate graphic designer with a keen eye for detail, specializing in creating visually compelling designs that communicate brand stories effectively across digital and print media.",
      skills: ["Illustrator", "Photoshop", "React"],
      socials: {
        behance: "https://www.behance.net/ishannilaksha",
        linkedin: "https://www.linkedin.com/in/ishan-nilaksha-686461308/"
      },
      cta: {
        label: "View Portfolio",
        href: "https://www.linkedin.com/in/ishan-nilaksha-686461308/"
      }
    }
  ];

  return (
    <section
      id="about"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden text-[#E7DFD6] flex items-center"
      style={{
        paddingTop: "4rem",
        paddingBottom: "3rem",
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

      <div className="max-w-7xl mx-auto w-full px-6">
        {/* Team section */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition">
                <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
                <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
                  Team • Same Vibe • Creativity
                </span>
              </div>

              <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
                <span className="block overflow-hidden">
                  <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
                    Meet the Team
                  </span>
                </span>
                <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
              </h2>

              <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
                Two more creative minds who help elevate every project.
              </p>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-8">
            {team.map((m, i) => (
              <TeamMemberCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Copy of the animation utilities used in Home so styles match */}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes float-reverse { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(20px) scale(0.95); } }
        @keyframes morph { 0%, 100% { transform: rotate(0deg) scale(1); } 33% { transform: rotate(120deg) scale(1.1); } 66% { transform: rotate(240deg) scale(0.9); } }
        @keyframes morph-reverse { 0%, 100% { transform: rotate(0deg) scale(1); } 33% { transform: rotate(-120deg) scale(0.9); } 66% { transform: rotate(-240deg) scale(1.1); } }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 25s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
};

export default About;
