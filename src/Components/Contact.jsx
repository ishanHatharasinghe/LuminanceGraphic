import React, { useEffect, useState, useRef } from "react";
import { FaSquareWhatsapp } from "react-icons/fa6";

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

  // Form state - changed design to array for multiple selections
  const [form, setForm] = useState({
    name: "",
    email: "",
    design: [], // Changed from string to array
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

  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // Form helpers
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const errors = {
    name: !form.name.trim() ? "Please enter your name" : "",
    email: !form.email.trim()
      ? "Please enter your email"
      : !isValidEmail(form.email)
      ? "Enter a valid email"
      : "",
    design:
      form.design.length === 0 ? "Please select at least one design type" : "",
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

  // Handle multi-select for design types
  const toggleDesignOption = (option) => {
    setForm((f) => ({
      ...f,
      design: f.design.includes(option)
        ? f.design.filter((item) => item !== option)
        : [...f.design, option]
    }));
  };

  // Clear all selected design options
  const clearAllDesigns = () => {
    setForm((f) => ({ ...f, design: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, design: true, description: true });
    if (!isFormValid) return;

    try {
      setSending(true);
      const to = "94703052181"; // WhatsApp number in international format without +
      const designList = form.design.join(", ");
      const text = [
        "New contact via portfolio:",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Design needs: ${designList}`,
        "",
        "Description:",
        form.description
      ].join("\n");
      const url = `https://wa.me/${to}?text=${encodeURIComponent(text)}`;

      // Prefer opening in a new tab; fallback to same tab
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = url;
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden text-[#E7DFD6] bg-gradient-to-br from-[#0A0B0D] via-[#141518] to-[#1F232B]"
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
        <div>
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Let's build something timeless
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
        <div className="mt-8 flex flex-wrap gap-3">
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
          <a
            href="https://www.facebook.com/share/16uVBZEyjD/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center border-2 border-[#E7DFD6]/25 text-[#E7DFD6] px-5 py-3 rounded-full overflow-hidden transition-all duration-500 hover:border-[#B08B57]"
          >
            <span className="relative z-10 text-sm font-medium">Facebook</span>
            <div className="absolute inset-0 bg-[#B08B57]/15 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
          </a>
        </div>

        {/* Contact Form to WhatsApp */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-4 md:gap-6">
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

            {/* Design type - Multi-select */}
            <div className="mt-4 md:mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-[#E7DFD6]/70">
                  What designs do you need?{" "}
                  {form.design.length > 0 && (
                    <span className="text-[#B08B57]">
                      ({form.design.length} selected)
                    </span>
                  )}
                </label>
                {form.design.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllDesigns}
                    className="text-xs text-[#E7DFD6]/50 hover:text-[#B08B57] underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {designOptions.map((opt) => {
                  const isSelected = form.design.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleDesignOption(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs ring-1 transition-all duration-300 ${
                        isSelected
                          ? "bg-[#B08B57] text-[#0A0B0D] ring-transparent scale-105 shadow-lg"
                          : "bg-white/5 text-[#E7DFD6] ring-white/10 hover:bg-white/10 hover:ring-[#B08B57]/30"
                      }`}
                    >
                      {opt}
                      {isSelected && <span className="ml-1">✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Selected items summary */}
              {form.design.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-[#B08B57]/10 ring-1 ring-[#B08B57]/20">
                  <p className="text-xs text-[#E7DFD6]/70 mb-1">
                    Selected designs:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {form.design.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B08B57]/20 text-xs text-[#E7DFD6]"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => toggleDesignOption(item)}
                          className="hover:text-red-400 ml-1"
                          aria-label={`Remove ${item}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid || sending}
                className={`group relative inline-flex items-center justify-center px-6 py-3 rounded-full overflow-hidden transition-all duration-300 ${
                  !isFormValid || sending
                    ? "opacity-60 cursor-not-allowed bg-[#B08B57]"
                    : "text-[#0A0B0D] hover:scale-105"
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
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .4s forwards; }
      `}</style>
    </section>
  );
};

export default Contact;
