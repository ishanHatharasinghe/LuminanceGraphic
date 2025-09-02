// src/Components/TShirtDesignSection.jsx
import { useEffect, useRef, useState } from "react";

// Images (T‑Shirts)
import Tdesign1 from "../assets/Tshirt Designs/1.jpg";
import Tdesign2 from "../assets/Tshirt Designs/2.jpg";
import Tdesign3 from "../assets/Tshirt Designs/3.jpg";
import Tdesign4 from "../assets/Tshirt Designs/4.jpg";
import Tdesign5 from "../assets/Tshirt Designs/5.jpg";
import Tdesign6 from "../assets/Tshirt Designs/6.jpg";
import Tdesign7 from "../assets/Tshirt Designs/7.jpg";
import Tdesign8 from "../assets/Tshirt Designs/8.jpg";
import Tdesign9 from "../assets/Tshirt Designs/9.jpg";
import Tdesign10 from "../assets/Tshirt Designs/10.jpg";

// Images (Caps) — add more here as needed
import Cap1 from "../assets/Cap/IMG-20250901-WA0013.jpg";

// Theme
const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57",
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
const ZoomInIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <path strokeWidth="2" d="M11 8v6M8 11h6" />
    <path strokeWidth="2" d="M20 20l-3-3" />
  </svg>
);
const ZoomOutIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <path strokeWidth="2" d="M8 11h6" />
    <path strokeWidth="2" d="M20 20l-3-3" />
  </svg>
);
const DownloadIcon = ({ className }) => (
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
      d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
    />
  </svg>
);

const TShirtDesignSection = () => {
  const sectionRef = useRef(null);
  const overlayBackdropRef = useRef(null);
  const overlayContentRef = useRef(null);
  const viewerRef = useRef(null);
  const intervalRef = useRef(null); // overlay slideshow
  const touchStartRef = useRef({ x: 0, y: 0 });

  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [isVisible, setIsVisible] = useState(false);

  // Overlay
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // overlay slideshow manual by default
  const [isHovering, setIsHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Zoom + Pan
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStartRef2 = useRef({ x: 0, y: 0 });
  const offsetStartRef2 = useRef({ x: 0, y: 0 });

  // Data: split by category
  const tshirtSources = [
    Tdesign1,
    Tdesign2,
    Tdesign3,
    Tdesign4,
    Tdesign5,
    Tdesign6,
    Tdesign7,
    Tdesign8,
    Tdesign9,
    Tdesign10
  ];
  const capSources = [Cap1]; // Add more caps here when available

  const tshirtCovers = tshirtSources.map((src, i) => ({
    src,
    title: `T‑Shirt Design ${i + 1}`,
    category: "T‑Shirt"
  }));
  const capCovers = capSources.map((src, i) => ({
    src,
    title: `Cap Design ${i + 1}`,
    category: "Cap"
  }));

  // Unified for overlay
  const allPosts = [...tshirtCovers, ...capCovers];
  const capsOffset = tshirtCovers.length;

  // Pair builders (2 images per card), using global indices
  const buildPairs = (offset, len) => {
    const pairs = [];
    for (let i = 0; i < len; i += 2) {
      const a = offset + i;
      const b = offset + i + 1;
      pairs.push([a, b].filter((x) => x < offset + len));
    }
    return pairs;
  };
  const tshirtPairs = buildPairs(0, tshirtCovers.length);
  const capPairs = buildPairs(capsOffset, capCovers.length);

  // Spotlight cursor
  const handleSectionMouseMove = (e) => {
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

  // Body scroll lock + focus when overlay opens
  useEffect(() => {
    if (!overlayOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const first = overlayContentRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOpen]);

  // Slideshow (overlay)
  useEffect(() => {
    if (!overlayOpen || reducedMotion || !isPlaying || isHovering) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % allPosts.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [overlayOpen, isPlaying, isHovering, reducedMotion, allPosts.length]);

  // Keyboard + focus trap
  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeOverlay();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "Tab") {
        const focusables = overlayContentRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  // Preload neighbors (overlay)
  useEffect(() => {
    if (!overlayOpen) return;
    const nextIdx = (activeIndex + 1) % allPosts.length;
    const prevIdx = (activeIndex - 1 + allPosts.length) % allPosts.length;
    [nextIdx, prevIdx].forEach((i) => {
      const img = new Image();
      img.src = allPosts[i].src;
    });
  }, [overlayOpen, activeIndex, allPosts]);

  const openOverlay = (index) => {
    setActiveIndex(index);
    setIsLoading(true);
    setOverlayOpen(true);
    setIsPlaying(false);
    resetZoom();
  };
  const closeOverlay = () => {
    setOverlayOpen(false);
    setIsPlaying(false);
  };
  const next = () => {
    setActiveIndex((i) => (i + 1) % allPosts.length);
    setIsLoading(true);
    resetZoom();
  };
  const prev = () => {
    setActiveIndex((i) => (i - 1 + allPosts.length) % allPosts.length);
    setIsLoading(true);
    resetZoom();
  };
  const select = (i) => {
    setActiveIndex(i);
    setIsPlaying(false);
    setIsLoading(true);
    resetZoom();
  };
  const togglePlayPause = () => setIsPlaying((p) => !p);

  // Zoom + pan (overlay)
  const zoomIn = () => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)));
  const zoomOut = () =>
    setZoom((z) => {
      const nz = Math.max(1, +(z - 0.5).toFixed(1));
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const toggleZoom = () => (zoom === 1 ? setZoom(2) : resetZoom());

  const onViewerMouseDown = (e) => {
    if (zoom === 1) return;
    setDragging(true);
    dragStartRef2.current = { x: e.clientX, y: e.clientY };
    offsetStartRef2.current = { ...offset };
  };
  const onViewerMouseMove = (e) => {
    if (!dragging || zoom === 1) return;
    const rect = viewerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - dragStartRef2.current.x;
    const dy = e.clientY - dragStartRef2.current.y;
    const maxX = (zoom - 1) * rect.width * 0.5;
    const maxY = (zoom - 1) * rect.height * 0.5;
    const nx = Math.max(-maxX, Math.min(maxX, offsetStartRef2.current.x + dx));
    const ny = Math.max(-maxY, Math.min(maxY, offsetStartRef2.current.y + dy));
    setOffset({ x: nx, y: ny });
  };
  const onViewerMouseUp = () => setDragging(false);
  const onViewerMouseLeave = () => setDragging(false);

  // Touch drag for pan when zoomed
  const onViewerTouchStart = (e) => {
    if (zoom === 1) return;
    const t = e.touches[0];
    setDragging(true);
    dragStartRef2.current = { x: t.clientX, y: t.clientY };
    offsetStartRef2.current = { ...offset };
    e.stopPropagation();
  };
  const onViewerTouchMove = (e) => {
    if (!dragging || zoom === 1) return;
    const t = e.touches[0];
    const rect = viewerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = t.clientX - dragStartRef2.current.x;
    const dy = t.clientY - dragStartRef2.current.y;
    const maxX = (zoom - 1) * rect.width * 0.5;
    const maxY = (zoom - 1) * rect.height * 0.5;
    const nx = Math.max(-maxX, Math.min(maxX, offsetStartRef2.current.x + dx));
    const ny = Math.max(-maxY, Math.min(maxY, offsetStartRef2.current.y + dy));
    setOffset({ x: nx, y: ny });
    e.stopPropagation();
  };
  const onViewerTouchEnd = () => setDragging(false);

  // Overlay swipe (when not zoomed)
  const onOverlayTouchStart = (e) => {
    if (zoom > 1) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onOverlayTouchEnd = (e) => {
    if (zoom > 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 40) {
      dx < 0 ? next() : prev();
      setIsPlaying(false);
    }
  };

  // Duo slider card (2 images per card)
  const DuoSliderCard = ({ pair }) => {
    const slides = pair.map((i) => ({ ...allPosts[i], index: i }));
    const [index, setIndex] = useState(0);
    const [hovering, setHovering] = useState(false);
    const [playing, setPlaying] = useState(true);
    const autoRef = useRef(null);
    const swipeRef = useRef({ x: 0, y: 0, moved: false });

    const hasTwo = slides.length > 1;

    const nextSlide = () => setIndex((i) => (i + 1) % slides.length);
    const prevSlide = () =>
      setIndex((i) => (i - 1 + slides.length) % slides.length);

    // Autoplay (pause on hover, respect reduced motion)
    useEffect(() => {
      if (!hasTwo || reducedMotion || !playing || hovering) {
        if (autoRef.current) clearInterval(autoRef.current);
        return;
      }
      autoRef.current = setInterval(nextSlide, 3000);
      return () => clearInterval(autoRef.current);
    }, [playing, hovering, reducedMotion, hasTwo]);

    // Swipe handlers
    const onPointerDown = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      swipeRef.current = { x, y, moved: false };
    };
    const onPointerMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = x - swipeRef.current.x;
      const dy = y - swipeRef.current.y;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) swipeRef.current.moved = true;
    };
    const onPointerUp = (e) => {
      if (!hasTwo) return;
      const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = x - swipeRef.current.x;
      if (Math.abs(dx) > 40) {
        dx < 0 ? nextSlide() : prevSlide();
      }
    };

    const open = () => {
      if (swipeRef.current.moved) return; // prevent click after swipe
      openOverlay(slides[index].index);
    };

    // Ensure arrow interactions never bubble to parent
    const stopAll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      swipeRef.current.moved = true;
    };

    return (
      <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-500">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? open() : null)}
          onClick={open}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          onPointerCancel={() => (swipeRef.current.moved = false)}
          className="relative rounded-2xl bg-[#141518]/40 backdrop-blur-xl overflow-hidden"
          aria-label="Open design"
        >
          {/* BG flair */}
          <div className="absolute inset-0 opacity-60 bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 -z-10" />

          {/* Slider */}
          <div className="relative w-full aspect-[1/1] overflow-hidden">
            <div
              className="flex w-full h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((s, i) => (
                <div
                  key={`duo-${s.index}-${i}`}
                  className="w-full h-full shrink-0 relative"
                >
                  <img
                    src={s.src}
                    alt={s.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Orbit ring */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-white/10 animate-[orbit_18s_linear_infinite]" />
            </div>

            {/* Arrows */}
            {hasTwo && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      stopAll(e);
                      prevSlide();
                    }}
                    onPointerDown={stopAll}
                    onPointerUp={stopAll}
                    onPointerMove={stopAll}
                    onTouchStart={stopAll}
                    onTouchEnd={stopAll}
                    className="pointer-events-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] ring-1 ring-white/10 transition opacity-0 group-hover:opacity-100"
                    aria-label="Previous"
                    title="Previous"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      stopAll(e);
                      nextSlide();
                    }}
                    onPointerDown={stopAll}
                    onPointerUp={stopAll}
                    onPointerMove={stopAll}
                    onTouchStart={stopAll}
                    onTouchEnd={stopAll}
                    className="pointer-events-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] ring-1 ring-white/10 transition opacity-0 group-hover:opacity-100"
                    aria-label="Next"
                    title="Next"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}

            {/* Dots + play/pause */}
            {hasTwo && (
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                {[0, 1].map((i) => (
                  <span
                    key={`dot-${i}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-[#B08B57]" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
                <button
                  type="button"
                  onClick={(e) => {
                    stopAll(e);
                    setPlaying((p) => !p);
                  }}
                  onPointerDown={stopAll}
                  onPointerUp={stopAll}
                  onTouchStart={stopAll}
                  onTouchEnd={stopAll}
                  className="ml-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0A0B0D]/60 hover:bg-[#0A0B0D]/80 text-[#E7DFD6]/90 ring-1 ring-white/10 transition"
                  aria-label={playing ? "Pause slider" : "Play slider"}
                  title={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <PauseIcon className="w-3.5 h-3.5" />
                  ) : (
                    <PlayIcon className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
              <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
                {slides[index]?.category}
              </span>
            </div>
            <h3 className="mt-1 text-base md:text-lg font-semibold text-[#E7DFD6]">
              {slides[index]?.title}
            </h3>
          </div>

          <div className="absolute inset-0 bg-[#0A0B0D]/0 group-hover:bg-[#0A0B0D]/10 transition-colors duration-500" />
        </div>
      </div>
    );
  };

  return (
    <section
      id="tshirtdesign"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
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
        <div
          className={`mb-10 md:mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Apparel • T-Shirts • Caps • Merch
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF]">
                Apparel Designs (T‑Shirts & Caps)
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h2>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            Custom apparel and headwear graphics, mockups, and print‑ready
            deliverables for any print method.
          </p>
        </div>

        {/* T‑Shirt Designs */}
        {tshirtPairs.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 md:mb-6 flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57]" />
              <h3 className="text-xl md:text-2xl font-bold">T‑Shirt Designs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tshirtPairs.map((pair, i) => (
                <DuoSliderCard key={`tee-pair-${i}`} pair={pair} />
              ))}
            </div>
          </div>
        )}

        {/* Cap Designs */}
        {capPairs.length > 0 && (
          <div>
            <div className="mb-4 md:mb-6 flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57]" />
              <h3 className="text-xl md:text-2xl font-bold">Cap Designs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {capPairs.map((pair, i) => (
                <DuoSliderCard key={`cap-pair-${i}`} pair={pair} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {overlayOpen && (
        <div
          ref={overlayBackdropRef}
          className="fixed inset-0 z-[100] bg-[#0A0B0D]/80 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Apparel design viewer"
          onClick={(e) => {
            if (e.target === overlayBackdropRef.current) closeOverlay();
          }}
          onTouchStart={onOverlayTouchStart}
          onTouchEnd={onOverlayTouchEnd}
        >
          <div
            ref={overlayContentRef}
            className="relative w-full max-w-6xl h-[92vh] mx-4 md:mx-6 rounded-3xl p-[2px] bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-1 ring-white/10 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.9)] focus:outline-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full h-full bg-[#141518]/80 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-3 md:px-5 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                  <div>
                    <div className="text-sm md:text-base font-semibold text-[#E7DFD6]">
                      {allPosts[activeIndex].title}
                    </div>
                    <div className="text-xs text-[#E7DFD6]/60">
                      {activeIndex + 1} / {allPosts.length}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={togglePlayPause}
                    className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] px-3 py-1.5 ring-1 ring-white/10 transition"
                    aria-label={
                      isPlaying ? "Pause slideshow" : "Play slideshow"
                    }
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-4 h-4" />
                    ) : (
                      <PlayIcon className="w-4 h-4" />
                    )}
                    <span className="ml-2 text-xs hidden sm:inline">
                      {isPlaying ? "Pause" : "Play"}
                    </span>
                  </button>
                  <button
                    onClick={zoomOut}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Zoom out"
                    title="Zoom out (-)"
                  >
                    <ZoomOutIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={zoomIn}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Zoom in"
                    title="Zoom in (+)"
                  >
                    <ZoomInIcon className="w-5 h-5" />
                  </button>
                  <a
                    href={allPosts[activeIndex].src}
                    download
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Download image"
                    title="Download"
                  >
                    <DownloadIcon className="w-5 h-5" />
                  </a>
                  <button
                    onClick={closeOverlay}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Close viewer"
                    title="Close"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Viewer (zoom/pan) */}
              <div
                ref={viewerRef}
                className={`relative flex-1 select-none ${
                  zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
                }`}
                onDoubleClick={toggleZoom}
                onMouseDown={onViewerMouseDown}
                onMouseMove={onViewerMouseMove}
                onMouseUp={onViewerMouseUp}
                onMouseLeave={onViewerMouseLeave}
                onTouchStart={onViewerTouchStart}
                onTouchMove={onViewerTouchMove}
                onTouchEnd={onViewerTouchEnd}
                style={{
                  touchAction: zoom > 1 ? "pan-x pan-y" : "manipulation"
                }}
              >
                {/* Prev/Next */}
                <div className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 flex items-center justify-start pointer-events-none">
                  <button
                    onClick={prev}
                    className="pointer-events-auto m-3 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Previous"
                    title="Previous"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 flex items-center justify-end pointer-events-none">
                  <button
                    onClick={next}
                    className="pointer-events-auto m-3 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Next"
                    title="Next"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Loading spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-[#B08B57] animate-spin" />
                  </div>
                )}

                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <img
                    key={allPosts[activeIndex].src}
                    src={allPosts[activeIndex].src}
                    alt={allPosts[activeIndex].title}
                    onLoad={() => setIsLoading(false)}
                    className="max-w-full max-h-full object-contain will-change-transform transition-opacity duration-300"
                    style={{
                      transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
                      opacity: isLoading ? 0 : 1
                    }}
                    draggable="false"
                  />
                </div>
              </div>

              {/* Thumbnails strip */}
              <div className="border-t border-white/10 px-3 md:px-5 py-3">
                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-2 md:gap-3">
                    {allPosts.map((p, idx) => (
                      <button
                        key={`thumb-${idx}`}
                        onClick={() => select(idx)}
                        className={`relative overflow-hidden rounded-lg aspect-[1/1] h-20 md:h-24 group transition ${
                          idx === activeIndex
                            ? "ring-2 ring-[#B08B57]"
                            : "ring-1 ring-white/10 hover:ring-white/20"
                        }`}
                        aria-current={idx === activeIndex}
                        aria-label={`View ${p.title}`}
                      >
                        <img
                          src={p.src}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                        <div
                          className={`absolute inset-0 transition ${
                            idx === activeIndex
                              ? "bg-[#B08B57]/20"
                              : "bg-[#0A0B0D]/10 group-hover:bg-[#0A0B0D]/5"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes morph { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(120deg) scale(1.06);} 66% { transform: rotate(240deg) scale(0.94);} }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph 25s ease-in-out infinite; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .5s forwards; }
      `}</style>
    </section>
  );
};

export default TShirtDesignSection;
