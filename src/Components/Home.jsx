// src/Components/Home.jsx
import { useEffect, useRef, useState } from "react";
import Statue from "../assets/Home Section/marble-greek-goddess-themis-wearing-crown-with-wings.jpg";
import Image1 from "./../assets/Social Media Posts/upper (14).jpg";
import Image2 from "./../assets/Social Media Posts/new/newimg (8).jpg";
import Image3 from "./../assets/Tshirt Designs/5.jpg";

// Brand colors adjusted for dark theme
const COLORS = {
  slate: "#6B7785",
  marble: "#E7DFD6",
  peach: "#F1D6BF",
  bronze: "#B08B57",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518"
};

const ChevronDownIcon = ({ className }) => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
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
const EyeIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
    />
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
  </svg>
);

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // New: posts overlay state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const artRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const socialImages = [
    { src: Image1, title: "Brand Identity Design", category: "Branding" },
    { src: Image2, title: "Brand Identity Design", category: "Branding" },
    { src: Image3, title: "Brand Identity Design", category: "Branding" }
  ];

  useEffect(() => {
    setIsVisible(true);

    // Mobile detection
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Reduced motion respect
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMotionChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMotionChange);

    // Intro hint, auto-hide
    const hintTimeout = setTimeout(() => setShowHint(false), 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      mq.removeEventListener?.("change", onMotionChange);
      clearTimeout(hintTimeout);
    };
  }, []);

  // Autoplay with pause-on-hover and reduced motion
  useEffect(() => {
    if (reducedMotion || !isPlaying || isHovering || !showGrid || isMobile) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % socialImages.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [
    isPlaying,
    isHovering,
    showGrid,
    reducedMotion,
    isMobile,
    socialImages.length
  ]);

  // Spotlight follows cursor - disabled on mobile
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // Parallax tilt - disabled on mobile
  const handleTilt = (e) => {
    if (isMobile) return;
    const el = artRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const maxX = 15;
    const maxY = 20;
    setTilt({ rx: -(py * maxX), ry: px * maxY });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  // Posts controls
  const next = () => setActiveImageIndex((i) => (i + 1) % socialImages.length);
  const prev = () =>
    setActiveImageIndex(
      (i) => (i - 1 + socialImages.length) % socialImages.length
    );
  const selectImage = (i) => {
    setActiveImageIndex(i);
    setIsPlaying(false);
  };
  const togglePlayPause = () => setIsPlaying((p) => !p);
  const toggleOverlay = () => setShowGrid((s) => !s);

  // Keyboard and swipe support
  const onOverlayKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === " ") {
      e.preventDefault();
      togglePlayPause();
    }
    if (e.key === "Escape") setShowGrid(false);
  };
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 40) {
      dx < 0 ? next() : prev();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden text-[#E7DFD6]"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1F232B 0%, #141518 40%, #0A0B0D 100%)"
      }}
      onMouseMove={handleMouseMove}
      ref={heroRef}
    >
      {/* Cursor spotlight - disabled on mobile */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x} ${mouse.y}, rgba(176,139,87,0.14), transparent 55%)`
          }}
        />
      )}

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Copy */}
            <div
              ref={textRef}
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.05] relative">
                  <span className="block overflow-hidden">
                    <span
                      className={`block text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF] ${
                        !isMobile ? "animate-slide-up" : ""
                      }`}
                    >
                      Luminance Graphic
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span
                      className={`mt-1 mb-2 block text-[#E7DFD6]/70 text-[43px] ${
                        !isMobile ? "animate-slide-up animation-delay-200" : ""
                      }`}
                    >
                      for modern brands
                    </span>
                  </span>
                  <div
                    className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent ${
                      !isMobile ? "animate-expand-width" : "w-[200px]"
                    }`}
                  />
                </h1>

                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-all duration-500 group">
                  <span
                    className={`inline-block w-3 h-3 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.2)] group-hover:shadow-[0_0_0_6px_rgba(176,139,87,0.3)] transition-all duration-500 ${
                      !isMobile && !reducedMotion ? "animate-pulse" : ""
                    }`}
                  />
                  <p className="text-sm md:text-base text-[#E7DFD6]/80 font-medium tracking-wide">
                    Branding • Posts • Packaging • Apparel • Social Media
                  </p>
                </div>

                <p
                  className={`text-lg md:text-xl text-[#E7DFD6]/60 max-w-xl ${
                    !isMobile ? "animate-fade-in animation-delay-400" : ""
                  }`}
                >
                  I design logos, brand systems, apparel graphics, packaging,
                  and marketing assets that are distinctive and
                  production‑ready—built to perform across print and digital.
                </p>
              </div>

              <div
                className={`flex flex-col sm:flex-row gap-4 ${
                  !isMobile ? "animate-fade-in animation-delay-600" : ""
                }`}
              >
                <a
                  href="#content"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-[#0A0B0D] overflow-hidden"
                  style={{
                    background: COLORS.bronze,
                    boxShadow: "0 20px 40px -15px rgba(176,139,87,.4)"
                  }}
                >
                  <span className="relative z-10 font-medium">
                    View My Work
                  </span>
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div
                      className={`absolute -inset-10 bg-[#B08B57]/40 group-hover:blur-3xl transition-all duration-500 ${
                        isMobile ? "blur-xl" : "blur-2xl"
                      }`}
                    />
                  </div>
                  {!isMobile && (
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:translate-x-32 group-hover:translate-y-20 transition-transform duration-700" />
                    </div>
                  )}
                </a>

                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center border-2 border-[#E7DFD6]/30 text-[#E7DFD6] px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:border-[#B08B57]"
                >
                  <span className="relative z-10 font-medium">
                    Get In Touch
                  </span>
                  <div className="absolute inset-0 bg-[#B08B57]/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </a>
              </div>

              <div
                className={`flex gap-12 pt-6 ${
                  !isMobile ? "animate-fade-in animation-delay-800" : ""
                }`}
              >
                {[
                  ["50+", "Projects", "01"],
                  ["3+", "Years", "02"],
                  ["25+", "Clients", "03"]
                ].map(([n, t, idx]) => (
                  <div key={t} className="relative group">
                    <div className="absolute -left-4 -top-2 text-6xl font-bold text-[#B08B57]/10 group-hover:text-[#B08B57]/20 transition-colors duration-500">
                      {idx}
                    </div>
                    <div className="relative">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#E7DFD6] to-[#B08B57] bg-clip-text text-transparent">
                        {n}
                      </div>
                      <div className="text-[#E7DFD6]/50 font-medium">{t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Art Card */}
            <div
              className={`relative transition-all duration-1000 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div
                ref={artRef}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className="relative mx-auto w-full max-w-[560px] [perspective:1200px]"
              >
                {/* Morphing blob background - simplified for mobile */}
                <div className="absolute -inset-20 -z-10">
                  {!isMobile ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#B08B57]/20 via-[#F1D6BF]/10 to-[#6B7785]/20 blur-3xl animate-morph" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#6B7785]/15 via-[#1F232B]/30 to-[#B08B57]/15 blur-3xl animate-morph-reverse animation-delay-1000" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B08B57]/15 via-[#F1D6BF]/8 to-[#6B7785]/15 blur-xl opacity-60" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`relative rounded-[2.5rem] p-1 bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] will-change-transform transition-all duration-300 hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)] ${
                    isMobile ? "" : "hover:scale-[1.02]"
                  }`}
                  style={{
                    transform: isMobile
                      ? "none"
                      : `rotateX(${tilt.rx}deg) rotateY(${
                          tilt.ry
                        }deg) translateZ(20px) scale(${
                          1 +
                          Math.abs(tilt.rx) * 0.002 +
                          Math.abs(tilt.ry) * 0.002
                        })`
                  }}
                >
                  <div
                    className={`relative rounded-[2.25rem] p-3 bg-[#141518]/40 overflow-hidden ${
                      !isMobile ? "backdrop-blur-xl" : ""
                    }`}
                  >
                    <div
                      className={`absolute inset-3 rounded-[1.75rem] bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 opacity-60 -z-10`}
                    />

                    {/* Main statue */}
                    <img
                      src={Statue}
                      alt="Marble statue artwork"
                      className="block w-full h-auto rounded-[1.5rem] object-cover shadow-2xl"
                      loading="eager"
                      decoding="async"
                      draggable="false"
                    />

                    {/* Corner label */}
                    <div
                      className={`absolute left-6 top-6 px-4 py-2 rounded-full text-xs bg-[#0A0B0D]/70 ring-1 ring-white/20 text-[#E7DFD6] font-medium tracking-wide shadow-lg z-30 ${
                        !isMobile ? "backdrop-blur-md" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-[#B08B57] ${
                            !isMobile && !reducedMotion ? "animate-pulse" : ""
                          }`}
                        />
                        Featured Piece
                      </span>
                    </div>

                    {/* Toggle posts button */}
                    <button
                      onClick={toggleOverlay}
                      className={`absolute top-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] px-3 py-2 ring-1 ring-white/10 transition ${
                        !isMobile ? "backdrop-blur-md" : ""
                      }`}
                      aria-pressed={showGrid}
                      aria-label={
                        showGrid ? "Hide latest posts" : "Show latest posts"
                      }
                      title={showGrid ? "Hide posts" : "Show posts"}
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:inline">
                        Posts
                      </span>
                    </button>

                    {/* Posts overlay */}
                    <div
                      className={`absolute inset-3 rounded-[1.5rem] overflow-hidden transition-opacity duration-500 ${
                        showGrid
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }`}
                      role="region"
                      aria-label="Latest social posts"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      onKeyDown={onOverlayKeyDown}
                      tabIndex={0}
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                    >
                      {/* Dim/blur the background for readability */}
                      <div
                        className={`absolute inset-0 bg-[#0A0B0D]/40 ${
                          !isMobile ? "backdrop-blur-md" : ""
                        }`}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 md:p-6 grid grid-rows-[1fr_auto] gap-3">
                        {/* Main viewer */}
                        <div className="relative w-full h-full overflow-hidden rounded-xl">
                          {socialImages.map((img, idx) => (
                            <img
                              key={idx}
                              src={img.src}
                              alt={img.title}
                              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                                idx === activeImageIndex
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-105"
                              }`}
                              loading="lazy"
                              decoding="async"
                              draggable="false"
                            />
                          ))}

                          {/* Gradient for caption */}
                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0B0D]/80 via-[#0A0B0D]/20 to-transparent pointer-events-none" />

                          {/* Caption */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`w-2 h-2 rounded-full bg-[#B08B57] ${
                                  !isMobile && !reducedMotion
                                    ? "animate-pulse"
                                    : ""
                                }`}
                              />
                              <span className="text-xs text-[#B08B57] font-medium">
                                Latest Work
                              </span>
                            </div>
                            <h3
                              className="text-base md:text-lg font-bold text-[#E7DFD6]"
                              aria-live="polite"
                            >
                              {socialImages[activeImageIndex].title}
                            </h3>
                            <p className="text-xs md:text-sm text-[#E7DFD6]/70">
                              {socialImages[activeImageIndex].category}
                            </p>
                          </div>

                          {/* Controls: Prev/Next */}
                          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-3">
                            <button
                              onClick={prev}
                              className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0A0B0D]/40 hover:bg-[#0A0B0D]/60 text-[#E7DFD6] ring-1 ring-white/10 transition"
                              aria-label="Previous post"
                              title="Previous"
                            >
                              <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={next}
                              className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0A0B0D]/40 hover:bg-[#0A0B0D]/60 text-[#E7DFD6] ring-1 ring-white/10 transition"
                              aria-label="Next post"
                              title="Next"
                            >
                              <ChevronRightIcon className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Play/Pause */}
                          <button
                            onClick={togglePlayPause}
                            className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] px-3 py-1.5 ring-1 ring-white/10 transition"
                            aria-pressed={!reducedMotion && isPlaying}
                            aria-label={
                              isPlaying
                                ? "Pause auto-rotate"
                                : "Play auto-rotate"
                            }
                            title={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <PauseIcon className="w-4 h-4" />
                            ) : (
                              <PlayIcon className="w-4 h-4" />
                            )}
                            <span className="text-xs hidden sm:inline">
                              {isPlaying ? "Pause" : "Play"}
                            </span>
                          </button>

                          {/* One-time hint */}
                          {showHint && (
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-[#0A0B0D]/60 text-[#E7DFD6] px-3 py-1 text-xs ring-1 ring-white/10">
                              Swipe or use arrows
                            </div>
                          )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          {socialImages.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectImage(idx)}
                              className={`relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-square group transition ${
                                idx === activeImageIndex
                                  ? "ring-2 ring-[#B08B57]"
                                  : "ring-1 ring-white/10 hover:ring-white/20"
                              }`}
                              aria-current={idx === activeImageIndex}
                              aria-label={`View ${img.title}`}
                            >
                              <img
                                src={img.src}
                                alt={img.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                draggable="false"
                              />
                              <div
                                className={`absolute inset-0 transition ${
                                  idx === activeImageIndex
                                    ? "bg-[#B08B57]/20"
                                    : "bg-[#0A0B0D]/20 group-hover:bg-[#0A0B0D]/10"
                                }`}
                              />
                            </button>
                          ))}
                        </div>

                        {/* Progress indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {socialImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectImage(idx)}
                              className={`h-1 rounded-full transition-all duration-300 ${
                                idx === activeImageIndex
                                  ? "w-8 bg-[#B08B57]"
                                  : "w-4 bg-white/30 hover:bg-white/50"
                              }`}
                              aria-label={`Go to item ${idx + 1}`}
                              aria-current={idx === activeImageIndex}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden rounded-tr-[2rem]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B08B57]/15 to-transparent rotate-45 transform origin-top-right" />
                    </div>
                  </div>
                </div>

                {/* Floating accents - simplified for mobile */}
                {!isMobile ? (
                  <>
                    <div className="absolute -top-6 -right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#B08B57] to-[#D4A574] shadow-[0_0_40px_rgba(176,139,87,0.8)] animate-float" />
                    <div className="absolute top-1/2 -right-10 w-6 h-6 rounded-full bg-[#F1D6BF]/30 blur-sm animate-pulse-slow" />
                  </>
                ) : (
                  <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-[#B08B57]/60 shadow-lg" />
                )}
              </div>

              <div
                className={`absolute -bottom-20 left-1/2 -translate-x-1/2 text-[8rem] font-bold text-[#E7DFD6]/[0.02] pointer-events-none select-none ${
                  !isMobile && !reducedMotion ? "animate-float" : ""
                }`}
              >
                ART
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <div className="relative group cursor-pointer">
            <div
              className={`absolute inset-0 bg-[#B08B57]/20 rounded-full group-hover:bg-[#B08B57]/30 transition-colors duration-500 ${
                !isMobile ? "blur-xl" : "blur-sm"
              }`}
            />
            <div
              className={`relative bg-white/10 backdrop-blur-sm rounded-full p-3 ring-1 ring-white/20 ${
                !isMobile && !reducedMotion ? "animate-bounce" : ""
              }`}
            >
              <ChevronDownIcon className="w-6 h-6 text-[#E7DFD6]/80" />
            </div>
          </div>
        </div>
      </section>

      {/* Animations - conditionally applied based on device capabilities */}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(-20px) scale(1.05);} }
        @keyframes float-reverse { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(20px) scale(0.95);} }
        @keyframes float-particle { 0% { transform: translateY(100vh) translateX(0); opacity: 0;} 10% { opacity: 1;} 90% { opacity: 1;} 100% { transform: translateY(-100vh) translateX(100px); opacity: 0;} }
        @keyframes morph { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(120deg) scale(1.1);} 66% { transform: rotate(240deg) scale(0.9);} }
        @keyframes morph-reverse { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(-120deg) scale(0.9);} 66% { transform: rotate(-240deg) scale(1.1);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes pulse-slow { 0%,100% { opacity: .6; transform: scale(1);} 50% { opacity: 1; transform: scale(1.2);} }
        @keyframes grain { 0%,100% { transform: translate(0,0);} 10% { transform: translate(-5%,-10%);} 20% { transform: translate(-15%,5%);} 30% { transform: translate(7%,-25%);} 40% { transform: translate(-5%,25%);} 50% { transform: translate(-15%,10%);} 60% { transform: translate(15%,0%);} 70% { transform: translate(0%,15%);} 80% { transform: translate(3%,25%);} 90% { transform: translate(-10%,10%);} }
        
        /* Base animations */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 20s linear infinite; }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 25s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .5s forwards; }
        .animate-fade-in { animation: fade-in .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-grain { animation: grain 8s steps(10) infinite; }
        
        /* Animation delays */
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        
        /* Background noise */
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          /* Disable heavy animations on mobile */
          .animate-float,
          .animate-float-reverse,
          .animate-morph,
          .animate-morph-reverse,
          .animate-slide-up,
          .animate-expand-width,
          .animate-fade-in {
            animation: none !important;
          }
          
          /* Reduce blur intensity */
          .blur-3xl { filter: blur(8px) !important; }
          .blur-2xl { filter: blur(6px) !important; }
          .blur-xl { filter: blur(4px) !important; }
          
          /* Simplify backdrop blur */
          .backdrop-blur-xl { backdrop-filter: none !important; }
          .backdrop-blur-md { backdrop-filter: none !important; }
          
          /* Keep only essential pulse animation for visual feedback */
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
