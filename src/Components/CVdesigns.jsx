// src/Components/CVResumeSection.jsx
import { useEffect, useRef, useState } from "react";

// CV images (two 2-sided CVs)
import cv1Front from "../assets/CV/cv1.jpg";
import cv1Back from "../assets/CV/cv2.jpg";

import cv2Front from "../assets/CV/cv3.jpg";
import cv2Back from "../assets/CV/cv4.jpg";

import cv3Front from "../assets/CV/cv5.jpg";
import cv4Front from "../assets/CV/cv6.jpg";
import cv5Front from "../assets/CV/cv7.jpg";
import cv6Front from "../assets/CV/cv8.jpg";

// Theme (match site)
const COLORS = {
  slate: "#6B7785",
  marble: "#E7DFD6",
  peach: "#F1D6BF",
  bronze: "#B08B57",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518"
};

const ChevronLeftIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const ChevronRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const PlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const CloseIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
  </svg>
);

/*
  Data model (ID JSON-like):
  Each CV set has an id, title, and pages array (1 or 2 images).
*/
const cvSets = [
  { id: "cv-001", title: "CV / Resume 1", pages: [cv1Front, cv1Back] },
  { id: "cv-002", title: "CV / Resume 2", pages: [cv2Front, cv2Back] },

  { id: "cv-003", title: "CV / Resume 3", pages: [cv3Front] },
  { id: "cv-004", title: "CV / Resume 4", pages: [cv4Front] },
  { id: "cv-005", title: "CV / Resume 5", pages: [cv5Front] },
  { id: "cv-006", title: "CV / Resume 6", pages: [cv6Front] }
];

const CVResumeSection = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [isVisible, setIsVisible] = useState(false);

  // Overlay state
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [cvIndex, setCvIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const currentSet = cvSets[cvIndex];
  const totalSets = cvSets.length;
  const totalPages = currentSet?.pages?.length ?? 0;

  // Spotlight cursor
  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // In-view header
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Autoplay across pages (only within current set)
  useEffect(() => {
    if (
      !overlayOpen ||
      reducedMotion ||
      !isPlaying ||
      isHovering ||
      totalPages <= 1
    ) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setPageIndex((i) => (i + 1) % totalPages);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [overlayOpen, isPlaying, isHovering, reducedMotion, totalPages]);

  // Keyboard nav
  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeOverlay();
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowUp") prevCv();
      if (e.key === "ArrowDown") nextCv();
      if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  // Open/close
  const openOverlay = (i) => {
    setCvIndex(i);
    setPageIndex(0);
    setOverlayOpen(true);
    setIsPlaying(true);
  };
  const closeOverlay = () => {
    setOverlayOpen(false);
    setIsPlaying(false);
  };

  // Page navigation
  const nextPage = () => setPageIndex((i) => (i + 1) % totalPages);
  const prevPage = () => setPageIndex((i) => (i - 1 + totalPages) % totalPages);
  const selectPage = (i) => {
    setPageIndex(i);
    setIsPlaying(false);
  };
  const togglePlayPause = () => setIsPlaying((p) => !p);

  // CV set navigation
  const nextCv = () => {
    const ni = (cvIndex + 1) % totalSets;
    setCvIndex(ni);
    setPageIndex(0);
  };
  const prevCv = () => {
    const pi = (cvIndex - 1 + totalSets) % totalSets;
    setCvIndex(pi);
    setPageIndex(0);
  };

  // Touch swipe (overlay) for pages
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 40) {
      dx < 0 ? nextPage() : prevPage();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="cv-resumes"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden text-[#E7DFD6]"
      style={{
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

      {/* Morphing blob background */}
      <div className="absolute -inset-20 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B08B57]/20 via-[#F1D6BF]/10 to-[#6B7785]/20 blur-3xl animate-morph" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6B7785]/15 via-[#1F232B]/30 to-[#B08B57]/15 blur-3xl animate-morph-reverse animation-delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28">
        {/* Header */}
        <div className="mb-10 md:mb-14 transition-all duration-1000">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Print • Resume • CV
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF]">
                CV / Resume Designs
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h2>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            Clean, ATS-friendly resumes and portfolio-driven CVs with strong
            hierarchy and typography.
          </p>
        </div>

        {/* Grid (3 per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cvSets.map((cv) => (
            <button
              key={cv.id}
              onClick={() =>
                openOverlay(cvSets.findIndex((c) => c.id === cv.id))
              }
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 text-left"
            >
              <div className="relative rounded-2xl bg-[#141518]/40 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 opacity-60 bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 -z-10" />
                {/* CVs are usually portrait — use 3:4 ratio */}
                <div className="relative w-full aspect-[3/4]">
                  <img
                    src={cv.pages[0]}
                    alt={cv.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </div>
                {/* Badge for 2 pages */}
                {cv.pages.length > 1 && (
                  <div className="absolute top-3 right-3 rounded-full bg-[#0A0B0D]/60 text-[#E7DFD6] text-xs px-2 py-1 ring-1 ring-white/10">
                    2 pages
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                    <span className="text-xs text-[#B08B57] font-medium">
                      Resume • CV
                    </span>
                  </div>
                  <h3 className="mt-1 text-base md:text-lg font-semibold text-[#E7DFD6]">
                    {cv.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-[#0A0B0D]/0 group-hover:bg-[#0A0B0D]/10 transition-colors duration-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay (smaller, friendlier) */}
      {overlayOpen && currentSet && (
        <div
          className="fixed inset-0 z-[100] bg-[#0A0B0D]/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="CV / Resume viewer"
          ref={overlayRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            if (e.target === overlayRef.current) closeOverlay(); // click backdrop to close
          }}
        >
          <div className="relative w-full max-w-4xl rounded-2xl p-[2px] bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-1 ring-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
            <div className="relative bg-[#141518]/70 backdrop-blur-xl rounded-2xl overflow-hidden">
              {/* Header (compact) */}
              <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B08B57]" />
                  <div className="text-[11px] md:text-sm text-[#E7DFD6]/80">
                    <div className="font-semibold text-[#E7DFD6] text-sm md:text-base">
                      {currentSet.title}
                    </div>
                    <div className="opacity-70">
                      Design {cvIndex + 1} / {totalSets} • Page {pageIndex + 1}{" "}
                      / {totalPages}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Switch CV set (optional) */}
                  <button
                    onClick={prevCv}
                    className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    title="Previous design"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextCv}
                    className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    title="Next design"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>

                  {totalPages > 1 && (
                    <button
                      onClick={() => setIsPlaying((p) => !p)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-4 h-4" />
                      ) : (
                        <PlayIcon className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={closeOverlay}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Close"
                    title="Close"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Viewer (smaller height) */}
              <div className="relative h-[72vh] md:h-[58vh] lg:h-[52vh]">
                {currentSet.pages.map((src, idx) => (
                  <img
                    key={`cv-page-${idx}`}
                    src={src}
                    alt={`${currentSet.title} • Page ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain p-3 md:p-4 transition-all duration-500 ${
                      idx === pageIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[1.02]"
                    }`}
                    loading="eager"
                    decoding="async"
                    draggable="false"
                  />
                ))}

                {/* Page controls (compact) */}
                {totalPages > 1 && (
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
                    <button
                      onClick={prevPage}
                      className="pointer-events-auto inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#0A0B0D]/40 hover:bg-[#0A0B0D]/60 text-[#E7DFD6] ring-1 ring-white/10 transition"
                      aria-label="Previous page"
                      title="Previous page"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextPage}
                      className="pointer-events-auto inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#0A0B0D]/40 hover:bg-[#0A0B0D]/60 text-[#E7DFD6] ring-1 ring-white/10 transition"
                      aria-label="Next page"
                      title="Next page"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Caption + Play/Pause (compact) */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-[#E7DFD6]">
                      {currentSet.title}
                    </h3>
                    <p className="text-[11px] text-[#E7DFD6]/60">
                      Page {pageIndex + 1} / {totalPages}
                    </p>
                  </div>
                  {totalPages > 1 && (
                    <button
                      onClick={togglePlayPause}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] px-2.5 py-1 ring-1 ring-white/10 transition"
                      aria-pressed={!reducedMotion && isPlaying}
                      aria-label={
                        isPlaying ? "Pause auto-rotate" : "Play auto-rotate"
                      }
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-3.5 h-3.5" />
                      ) : (
                        <PlayIcon className="w-3.5 h-3.5" />
                      )}
                      <span className="text-[11px] hidden sm:inline">
                        {isPlaying ? "Pause" : "Play"}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Page thumbnails (smaller) */}
              {totalPages > 1 && (
                <div className="p-3 md:p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {currentSet.pages.map((src, idx) => (
                      <button
                        key={`cv-thumb-${idx}`}
                        onClick={() => selectPage(idx)}
                        className={`relative overflow-hidden rounded-lg aspect-[3/4] group transition ${
                          idx === pageIndex
                            ? "ring-2 ring-[#B08B57]"
                            : "ring-1 ring-white/10 hover:ring-white/20"
                        }`}
                        aria-current={idx === pageIndex}
                        aria-label={`View page ${idx + 1}`}
                      >
                        <img
                          src={src}
                          alt={`${currentSet.title} • Page ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                        <div
                          className={`absolute inset-0 transition ${
                            idx === pageIndex
                              ? "bg-[#B08B57]/20"
                              : "bg-[#0A0B0D]/10 group-hover:bg-[#0A0B0D]/5"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes morph { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(120deg) scale(1.1);} 66% { transform: rotate(240deg) scale(0.9);} }
        @keyframes morph-reverse { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(-120deg) scale(0.9);} 66% { transform: rotate(-240deg) scale(1.1);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 25s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .5s forwards; }
      `}</style>
    </section>
  );
};

export default CVResumeSection;
