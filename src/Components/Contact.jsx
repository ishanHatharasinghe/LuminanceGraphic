// src/Components/Contact.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagramSquare,
  FaBehanceSquare,
  FaAddressBook,
  FaGithub
} from "react-icons/fa";
import { SiFiverr } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaSquareWhatsapp } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57",
  slate: "#6B7785",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518",
  peach: "#F1D6BF"
};

const Contact = () => {
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const sectionRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    design: "",
    description: ""
  });
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const maxDesc = 600;

  const designOptions = [
    "Social Media Post",
    "Logo Design",
    "YouTube Thumbnails",
    "Social Media Cover Design",
    "Tute/Book Cover",
    "Apparel Designs (T‑Shirts & Caps)",
    "Business Card Design",
    "CV/Resume Design",
    "Bookmark Design",
    "Banner & Poster Design",
    "Other"
  ];

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
  }, []);

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  const socials = [];

  // Form helpers
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const errors = {
    name: !form.name.trim() ? "Please enter your name" : "",
    email: !form.email.trim()
      ? "Please enter your email"
      : !isValidEmail(form.email)
      ? "Enter a valid email"
      : "",
    design: !form.design.trim() ? "Please select the design you need" : "",
    description: !form.description.trim()
      ? "Please add a short description"
      : form.description.length > maxDesc
      ? `Description is too long (max ${maxDesc} chars)`
      : ""
  };

  const isFormValid =
    !errors.name && !errors.email && !errors.design && !errors.description;

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, design: true, description: true });
    if (!isFormValid) return;

    try {
      setSending(true);
      const to = "94703052181"; // WhatsApp number in international format without +
      const text = [
        "New contact via portfolio:",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Design need: ${form.design}`,
        "",
        "Description:",
        form.description
      ].join("\n");
      const url = `https://wa.me/${to}?text=${encodeURIComponent(text)}`;

      // Prefer opening in a new tab; fallback to same tab
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = url;

      // Optional: reset form after launching WA
      // setForm({ name: "", email: "", design: "", description: "" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden text-[#E7DFD6]"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center"
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
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Let’s build something timeless
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
                Contact Me
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h1>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/70">
            Reach out for brand identities, social campaigns, web visuals, or
            collaborations.
          </p>
        </div>

        {/* Primary CTAs */}
        <div
          className="mt-8 flex flex-wrap gap-3"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <a
            href="mailto:ishanhatharasinghe222@gmail.com"
            className="group relative inline-flex items-center justify-center px-5 py-3 rounded-full text-[#0A0B0D] overflow-hidden"
            style={{
              background: COLORS.bronze,
              boxShadow: "0 16px 36px -16px rgba(176,139,87,.45)"
            }}
          >
            <span className="relative z-10 text-sm font-medium">Email Me</span>
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-8 bg-[#B08B57]/35 blur-2xl group-hover:blur-3xl transition-all duration-500" />
            </div>
          </a>
          <a
            href="https://wa.me/94703052181"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center border-2 border-[#E7DFD6]/25 text-[#E7DFD6] px-5 py-3 rounded-full overflow-hidden transition-all duration-500 hover:border-[#B08B57]"
          >
            <span className="relative z-10 text-sm font-medium">WhatsApp</span>
            <div className="absolute inset-0 bg-[#B08B57]/15 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
          </a>
        </div>

        {/* Contact Form to WhatsApp */}
        <form
          className="mt-10 md:mt-12 grid grid-cols-1 gap-4 md:gap-6"
          onSubmit={handleSubmit}
          noValidate
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="rounded-2xl p-5 md:p-6 bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm mb-2 text-[#E7DFD6]/70">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder="Please enter your name"
                  className={`w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ${
                    touched.name && errors.name
                      ? "ring-red-500/60"
                      : "ring-white/10"
                  } px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40`}
                  required
                />
                {touched.name && errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2 text-[#E7DFD6]/70">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ${
                    touched.email && errors.email
                      ? "ring-red-500/60"
                      : "ring-white/10"
                  } px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40`}
                  required
                />
                {touched.email && errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Design type */}
            <div className="mt-4 md:mt-6">
              <label className="block text-sm mb-2 text-[#E7DFD6]/70">
                What design do you need?
              </label>

              <div className="flex flex-wrap gap-2">
                {designOptions.map((opt) => {
                  const active = form.design === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setField("design", opt)}
                      className={`px-3 py-1.5 rounded-full text-xs ring-1 transition ${
                        active
                          ? "bg-[#B08B57] text-[#0A0B0D] ring-transparent"
                          : "bg-white/5 text-[#E7DFD6] ring-white/10 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Accessible select fallback */}
              <select
                value={form.design}
                onChange={(e) => setField("design", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, design: true }))}
                className={`mt-3 w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ${
                  touched.design && errors.design
                    ? "ring-red-500/60"
                    : "ring-white/10"
                } px-4 py-3 outline-none text-[#E7DFD6] focus:ring-[#B08B57]/40`}
              >
                <option value="">Select a design type…</option>
                {designOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {touched.design && errors.design && (
                <p className="mt-1.5 text-xs text-red-400">{errors.design}</p>
              )}
            </div>

            {/* Description */}
            <div className="mt-4 md:mt-6">
              <label className="block text-sm mb-2 text-[#E7DFD6]/70">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setField("description", e.target.value.slice(0, maxDesc))
                }
                onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                placeholder="Share goals, references, sizes, platforms, deadlines…"
                rows={6}
                className={`w-full rounded-xl bg-[#0A0B0D]/50 ring-1 ${
                  touched.description && errors.description
                    ? "ring-red-500/60"
                    : "ring-white/10"
                } px-4 py-3 outline-none text-[#E7DFD6] placeholder:text-[#E7DFD6]/35 focus:ring-[#B08B57]/40`}
                required
              />
              <div className="mt-1.5 flex items-center justify-between">
                {touched.description && errors.description ? (
                  <p className="text-xs text-red-400">{errors.description}</p>
                ) : (
                  <span className="text-xs text-[#E7DFD6]/50">
                    Tell me anything that helps me quote and plan.
                  </span>
                )}
                <span className="text-xs text-[#E7DFD6]/50">
                  {form.description.length}/{maxDesc}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={!isFormValid || sending}
                className={`group relative inline-flex items-center justify-center px-6 py-3 rounded-full overflow-hidden ${
                  !isFormValid || sending
                    ? "opacity-60 cursor-not-allowed bg-[#B08B57]"
                    : "text-[#0A0B0D]"
                }`}
                style={{
                  background: COLORS.bronze,
                  boxShadow: "0 16px 36px -16px rgba(176,139,87,.45)"
                }}
              >
                <span className="relative z-10 text-sm font-medium flex items-center gap-2">
                  <FaSquareWhatsapp className="w-4 h-4" />
                  {sending ? "Opening WhatsApp..." : "Send to WhatsApp"}
                </span>
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-8 bg-[#B08B57]/35 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                </div>
              </button>

              <span className="text-xs text-[#E7DFD6]/60">
                This opens WhatsApp with your message prefilled to +94 70 305
                2181.
              </span>
            </div>
          </div>
        </form>

        {/* Social grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {socials.map(({ label, href, Icon }, idx) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-5 md:p-6 bg-white/[0.06] hover:bg-white/[0.09] backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay={100 + idx * 80}
              aria-label={label}
            >
              <div className="relative rounded-2xl p-3 ring-1 ring-white/10 bg-[#0A0B0D]/40 mb-3">
                <div className="absolute -inset-2 rounded-2xl bg-[#B08B57]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#E7DFD6]" />
              </div>
              <span className="text-sm md:text-base font-semibold">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-xs md:text-sm text-[#E7DFD6]/60">
          Prefer a call?{" "}
          <a
            className="underline underline-offset-4 hover:text-[#E7DFD6]"
            href="tel:+94703052181"
          >
            +94 70 305 2181
          </a>
        </div>
      </div>

      {/* Local animations to match theme */}
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(-18px) scale(1.04);} }
        @keyframes float-reverse { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(18px) scale(0.96);} }
        @keyframes pulse-slow { 0%,100% { opacity:.6; transform: scale(1);} 50% { opacity:1; transform: scale(1.15);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        @keyframes grain {
          0%,100% { transform: translate(0,0);}
          10% { transform: translate(-5%,-10%);} 20% { transform: translate(-15%,5%);}
          30% { transform: translate(7%,-25%);} 40% { transform: translate(-5%,25%);}
          50% { transform: translate(-15%,10%);} 60% { transform: translate(15%,0%);}
          70% { transform: translate(0%,15%);} 80% { transform: translate(3%,25%);}
          90% { transform: translate(-10%,10%);}
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

export default Contact;
