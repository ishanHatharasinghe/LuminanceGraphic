// src/Components/Content.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaBrush,
  FaImage,
  FaPenNib,
  FaVideo,
  FaBook,
  FaBezierCurve,
  FaTshirt,
  FaIdCard,
  FaFileAlt,
  FaBookmark,
  FaFlag
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

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

const services = [
  {
    Icon: FaBrush,
    title: "Social Media Post Design",
    desc: "Eye‑catching social posts that captivate your audience and boost engagement.",
    target: "socialMediaPosts",
    level: 95,
    delay: 0.1
  },
  {
    Icon: FaPenNib,
    title: "Logo Design",
    desc: "Custom mark + system that embodies your brand and leaves a lasting impression.",
    target: "logo",
    level: 90,
    delay: 0.2
  },
  {
    Icon: FaVideo,
    title: "YouTube Thumbnails",
    desc: "Bold, high‑contrast thumbnails that increase CTR and grow channel reach.",
    target: "youtubeThumbnails",
    level: 92,
    delay: 0.3
  },
  {
    Icon: FaImage,
    title: "Social Media Cover Images",
    desc: "Professional covers tailored to platforms for a cohesive brand presence.",
    target: "socialMediaCover",
    level: 88,
    delay: 0.4
  },
  {
    Icon: FaBook,
    title: "Tute/Book Cover",
    desc: "Striking editorial covers with strong hierarchy and timeless typography.",
    target: "bookCover",
    level: 87,
    delay: 0.5
  },
  {
    Icon: FaTshirt,
    title: "Apparel Designs (T‑Shirts & Caps)",
    desc: "Custom apparel graphics, mockups, and print‑ready files for any method.",
    target: "Tdesigns",
    level: 91,
    delay: 0.6
  },
  {
    Icon: FaIdCard,
    title: "Business Card Design",
    desc: "Professional business cards with premium finishes and memorable layouts.",
    target: "BusinessCarddesigns",
    level: 89,
    delay: 0.7
  },
  {
    Icon: FaFileAlt,
    title: "CV/Resume Design",
    desc: "Clean, modern CV layouts that showcase your skills and stand out to employers.",
    target: "CV",
    level: 86,
    delay: 0.8
  },
  {
    Icon: FaBookmark,
    title: "Bookmark Design",
    desc: "Custom bookmarks with artistic flair and durable print specifications.",
    target: "Bookmark",
    level: 84,
    delay: 0.9
  },
  {
    Icon: FaFlag,
    title: "Banner & Poster Design",
    desc: "Large format prints and banners for events, advertising, and displays.",
    target: "Banner",
    level: 93,
    delay: 1.0
  }
];

const Content = () => {
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", desc: "" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleModal = (s) => {
    setModalContent({ title: s.title, desc: s.desc });
    setShowModal(true);
  };

  return (
    <section
      id="content"
      className="min-h-auto  relative overflow-hidden text-[#E7DFD6]"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1F232B 0%, #141518 40%, #0A0B0D 100%)"
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMouse({ x: `${x}%`, y: `${y}%` });
      }}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x} ${mouse.y}, rgba(176,139,87,0.14), transparent 55%)`
        }}
      />
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        <div>
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Brand • Digital • Editorial
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
                My Design Services
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h1>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            Premium visuals with classical elegance and modern clarity—crafted
            for impact.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="relative max-w-7xl mx-auto px-6 pt-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-xl p-4 bg-white/[0.06] hover:bg-white/[0.09] backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 overflow-hidden"
            >
              {/* Soft aurora inside card */}
              <div className="pointer-events-none absolute -inset-16 -z-10 opacity-70">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B08B57]/18 via-transparent to-[#6B7785]/20 blur-2xl animate-morph" />
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-3">
                <div className="relative rounded-xl p-2 ring-1 ring-white/10 bg-[#0A0B0D]/40">
                  <div className="absolute -inset-1 rounded-xl bg-[#B08B57]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <s.Icon className="w-6 h-6 text-[#E7DFD6]" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg md:text-xl font-semibold text-center">
                {s.title}
              </h2>

              {/* Description */}
              <p className="text-sm md:text-base text-center text-[#E7DFD6]/70">
                {s.desc}
              </p>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() => scrollToSection(s.target)}
                  className="group relative inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[#0A0B0D] overflow-hidden"
                  style={{
                    background: COLORS.bronze,
                    boxShadow: "0 16px 36px -16px rgba(176,139,87,.45)"
                  }}
                >
                  <span className="relative z-10 text-sm font-medium">
                    Show More
                  </span>
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-8 bg-[#B08B57]/35 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-title"
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#141518]/95 ring-1 ring-white/10 p-6 text-[#E7DFD6] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="service-title" className="text-2xl font-bold mb-2">
              {modalContent.title || "Our Process"}
            </h3>
            <p className="text-[#E7DFD6]/70">
              {modalContent.desc ||
                "We start with sketches and moodboards, move to vector exploration, refine colorways, then deliver print‑ready assets and mockups."}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="group relative inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[#0A0B0D] overflow-hidden"
                style={{ background: COLORS.bronze }}
                onClick={() => setShowModal(false)}
              >
                <span className="relative z-10 text-sm font-medium">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local animations */}
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(-18px) scale(1.04);} }
        @keyframes float-reverse { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(18px) scale(0.96);} }
        @keyframes pulse-slow { 0%,100% { opacity:.6; transform: scale(1);} 50% { opacity:1; transform: scale(1.15);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 190px;} }
        @keyframes grain {
          0%,100% { transform: translate(0,0);}
          10% { transform: translate(-5%,-10%);} 20% { transform: translate(-15%,5%);}
          30% { transform: translate(7%,-25%);} 40% { transform: translate(-5%,25%);}
          50% { transform: translate(-15%,10%);} 60% { transform: translate(15%,0%);}
          70% { transform: translate(0%,15%);} 80% { transform: translate(3%,25%);}
          90% { transform: translate(-10%,10%);}
        }
        @keyframes morph {
          0%,100% { transform: rotate(0deg) scale(1);}
          33% { transform: rotate(120deg) scale(1.06);}
          66% { transform: rotate(240deg) scale(0.94);}
        }
        @keyframes shine {
          0% { transform: translateX(-120%); opacity: 0;}
          20% { opacity: .85;}
          50% { opacity: .6;}
          100% { transform: translateX(320%); opacity: 0;}
        }
        @keyframes fill {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7.5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .4s forwards; }
        .animate-grain { animation: grain 8s steps(10) infinite; }
        .animate-morph { animation: morph 18s ease-in-out infinite; }
        .animate-shine { animation: shine 1.2s 0.2s linear; }
        .animate-fill { animation: fill 1.2s cubic-bezier(.16,1,.3,1) both; }
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>
    </section>
  );
};

export default Content;
