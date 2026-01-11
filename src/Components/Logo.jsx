// src/Components/LogoDesignSection.jsx
import { useEffect, useRef, useState } from "react";

// Brand set (various)
import Logo1 from "./../assets/Logo Design/logo (1).jpg";
import Logo2 from "./../assets/Logo Design/logo (1).png";
import Logo3 from "./../assets/Logo Design/logo (2).jpg";
import Logo4 from "./../assets/Logo Design/logo (2).png";
import Logo5 from "./../assets/Logo Design/logo (3).jpg";
import Logo6 from "./../assets/Logo Design/logo (4).jpg";
import Logo7 from "./../assets/Logo Design/logo (5).jpg";
import Logo8 from "./../assets/Logo Design/logo (6).jpg";
import Logo9 from "./../assets/Logo Design/logo (7).jpg";
import Logo10 from "./../assets/Logo Design/logo (8).jpg";

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

const LogoDesignSection = () => {
  const sectionRef = useRef(null);
  const overlayBackdropRef = useRef(null);
  const overlayContentRef = useRef(null);
  const viewerRef = useRef(null);

  // Spotlight + in-view
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [isVisible, setIsVisible] = useState(false);

  // Overlay state
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const offsetStartRef = useRef({ x: 0, y: 0 });
  const swipeStartRef = useRef({ x: 0, y: 0 });

  // Sources (all logos)
  const logoSources = [
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
    Logo7,
    Logo8,
    Logo9,
    Logo10
  ];

  // Optional per-logo titles (override here if you want custom names)
  // Example:
  // const NAMES = {
  //   0: "Acme Co. • Mark",
  //   3: "Nova Esports • Badge",
  //   8: "Northern Pine • Emblem"
  // };
  const NAMES = {};

  // Build dataset (no "Maya" labels)
  const logos = logoSources.map((src, i) => ({
    src,
    title: NAMES[i] ?? `Logo Design ${i + 1}`,
    category: "Brand • Logo"
  }));

  const allPosts = logos;
  const featured = allPosts.slice(0, 6);
  const extras = allPosts.slice(6);

  // Spotlight cursor
  const handleSectionMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // In-view header animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Overlay controls
  const openOverlay = (globalIndex) => {
    setActiveIndex(globalIndex);
    setOverlayOpen(true);
    resetZoom();
  };
  const closeOverlay = () => {
    setOverlayOpen(false);
    resetZoom();
  };

  // Lock scroll
  useEffect(() => {
    if (!overlayOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOpen]);

  // Keyboard nav
  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeOverlay();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  // Preload neighbors
  useEffect(() => {
    if (!overlayOpen) return;
    const nextIdx = (activeIndex + 1) % allPosts.length;
    const prevIdx = (activeIndex - 1 + allPosts.length) % allPosts.length;
    [nextIdx, prevIdx].forEach((i) => {
      const img = new Image();
      img.src = allPosts[i].src;
    });
  }, [overlayOpen, activeIndex, allPosts]);

  const next = () => {
    setActiveIndex((i) => (i + 1) % allPosts.length);
    resetZoom();
  };
  const prev = () => {
    setActiveIndex((i) => (i - 1 + allPosts.length) % allPosts.length);
    resetZoom();
  };
  const select = (i) => {
    setActiveIndex(i);
    resetZoom();
  };

  // Zoom + pan
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

  const handleViewerWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextZoom = Math.min(3.5, Math.max(1, zoom * factor));
    const rect = viewerRef.current?.getBoundingClientRect();
    if (rect) {
      const maxX = (nextZoom - 1) * rect.width * 0.5;
      const maxY = (nextZoom - 1) * rect.height * 0.5;
      setOffset((o) => ({
        x: Math.max(-maxX, Math.min(maxX, o.x)),
        y: Math.max(-maxY, Math.min(maxY, o.y))
      }));
    }
    setZoom(nextZoom);
  };

  const onViewerMouseDown = (e) => {
    if (zoom === 1) return;
    setDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    offsetStartRef.current = { ...offset };
  };
  const onViewerMouseMove = (e) => {
    if (!dragging || zoom === 1) return;
    const rect = viewerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const maxX = (zoom - 1) * rect.width * 0.5;
    const maxY = (zoom - 1) * rect.height * 0.5;
    const nx = Math.max(-maxX, Math.min(maxX, offsetStartRef.current.x + dx));
    const ny = Math.max(-maxY, Math.min(maxY, offsetStartRef.current.y + dy));
    setOffset({ x: nx, y: ny });
  };
  const onViewerMouseUp = () => setDragging(false);
  const onViewerMouseLeave = () => setDragging(false);

  // Touch
  const onViewerTouchStart = (e) => {
    if (zoom === 1) return;
    const t = e.touches[0];
    setDragging(true);
    dragStartRef.current = { x: t.clientX, y: t.clientY };
    offsetStartRef.current = { ...offset };
  };
  const onViewerTouchMove = (e) => {
    if (!dragging || zoom === 1) return;
    const t = e.touches[0];
    const rect = viewerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = t.clientX - dragStartRef.current.x;
    const dy = t.clientY - dragStartRef.current.y;
    const maxX = (zoom - 1) * rect.width * 0.5;
    const maxY = (zoom - 1) * rect.height * 0.5;
    const nx = Math.max(-maxX, Math.min(maxX, offsetStartRef.current.x + dx));
    const ny = Math.max(-maxY, Math.min(maxY, offsetStartRef.current.y + dy));
    setOffset({ x: nx, y: ny });
  };
  const onViewerTouchEnd = () => setDragging(false);

  // Overlay swipe (when not zoomed)
  const onOverlayTouchStart = (e) => {
    if (zoom > 1) return;
    const t = e.touches[0];
    swipeStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onOverlayTouchEnd = (e) => {
    if (zoom > 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - swipeStartRef.current.x;
    const dy = t.clientY - swipeStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 40) {
      dx < 0 ? next() : prev();
    }
  };

  // See more toggle
  const [showMore, setShowMore] = useState(false);
  const extrasRegionId = "logos-extras";

  return (
    <section
      id="logos"
      ref={sectionRef}
      onMouseMove={(e) => !overlayOpen && handleSectionMouseMove(e)}
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

      {/* Morphing blobs */}
      <div className="absolute -inset-20 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B08B57]/20 via-[#F1D6BF]/10 to-[#6B7785]/20 blur-3xl animate-morph" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6B7785]/15 via-[#1F232B]/30 to-[#B08B57]/15 blur-3xl animate-morph-reverse animation-delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28">
        {/* Header */}
        <div className="mb-10 md:mb-14 transition-all duration-1000 ">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Brand • Logo • Identity
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF]">
                Logo Design
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h2>
          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            Engaging, on-brand visuals built your logo.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <button
              key={`logo-feat-${i}`}
              onClick={() => openOverlay(i)}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 text-left"
            >
              <div className="relative rounded-2xl bg-[#141518]/50 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 opacity-60 bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 -z-10" />
                <div className="relative overflow-hidden">
                  <div className="w-full aspect-[1/1]">
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-contain bg-[#141518] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                    <span className="text-xs text-[#B08B57] font-medium">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base md:text-lg font-semibold text-[#E7DFD6]">
                    {p.title}
                  </h3>
                </div>

                <div className="absolute inset-0 bg-[#0A0B0D]/0 group-hover:bg-[#0A0B0D]/10 transition-colors duration-500" />
              </div>
            </button>
          ))}
        </div>

        {/* See more toggle */}
        {extras.length > 0 && (
          <>
            <div className="mt-10 md:mt-14 flex justify-center">
              <button
                onClick={() => setShowMore((s) => !s)}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] px-4 py-2 ring-1 ring-white/10 transition"
                aria-expanded={showMore}
                aria-controls={extrasRegionId}
              >
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${
                    showMore ? "rotate-180" : ""
                  }`}
                />
                <span className="text-sm font-medium">
                  {showMore ? "Show less" : "See more"}
                </span>
              </button>
            </div>

            {/* Extras grid (collapsible) */}
            <div
              id={extrasRegionId}
              className={`mt-6 md:mt-8 overflow-hidden transition-[max-height,opacity,transform] duration-500 ${
                showMore
                  ? "max-h-[3000px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2"
              }`}
              aria-hidden={!showMore}
            >
              <div className="rounded-2xl p-4 md:p-5 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                  {extras.map((p, i) => {
                    const globalIndex = featured.length + i;
                    return (
                      <button
                        key={`logo-extra-${i}`}
                        onClick={() => openOverlay(globalIndex)}
                        className="relative overflow-hidden rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition group"
                        aria-label={`Open ${p.title}`}
                      >
                        <div className="w-full aspect-[1/1]">
                          <img
                            src={p.src}
                            alt={p.title}
                            className="w-full h-full object-contain bg-[#141518] transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                          />
                        </div>
                        <div className="absolute inset-0 bg-[#0A0B0D]/0 group-hover:bg-[#0A0B0D]/10 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Overlay */}
      {overlayOpen && (
        <div
          ref={overlayBackdropRef}
          className="fixed inset-0 z-[100] bg-[#0A0B0D]/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Logo viewer"
          onClick={(e) => {
            if (e.target === overlayBackdropRef.current) closeOverlay();
          }}
          onTouchStart={onOverlayTouchStart}
          onTouchEnd={onOverlayTouchEnd}
        >
          <div
            ref={overlayContentRef}
            className="relative w-full max-w-5xl h-[80vh] mx-4 rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-1 ring-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] focus:outline-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full h-full bg-[#141518]/80 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#B08B57] to-[#D4A574] transition-[width] duration-500"
                  style={{
                    width: `${((activeIndex + 1) / allPosts.length) * 100}%`
                  }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                  <div>
                    <div className="text-sm text-[#E7DFD6] font-medium">
                      {allPosts[activeIndex].title}
                    </div>
                    <div className="text-[11px] text-[#E7DFD6]/60">
                      {activeIndex + 1} / {allPosts.length} •{" "}
                      {allPosts[activeIndex].category}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={allPosts[activeIndex].src}
                    download
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    title="Download"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 3v12"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 10l5 5 5-5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 21h14"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={closeOverlay}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 transition"
                    aria-label="Close"
                    title="Close"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Viewer */}
              <div
                ref={viewerRef}
                className={`relative flex-1 select-none ${
                  zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
                }`}
                onWheel={handleViewerWheel}
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
                {/* Prev/Next controls */}
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

                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <img
                    key={allPosts[activeIndex].src}
                    src={allPosts[activeIndex].src}
                    alt={allPosts[activeIndex].title}
                    className="max-w-full max-h-full object-contain will-change-transform transition-opacity duration-200 bg-[#141518]"
                    style={{
                      transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`
                    }}
                    draggable="false"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="border-t border-white/10 px-4 py-3">
                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-2 md:gap-3">
                    {allPosts.map((p, idx) => (
                      <button
                        key={`logo-thumb-${idx}`}
                        onClick={() => select(idx)}
                        className={`relative overflow-hidden rounded-lg aspect-[1/1] h-16 md:h-20 group transition ${
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
                          className="w-full h-full object-contain bg-[#141518]"
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
        @keyframes morph { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(120deg) scale(1.1);} 66% { transform: rotate(240deg) scale(0.9);} }
        @keyframes morph-reverse { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(-120deg) scale(0.9);} 66% { transform: rotate(-240deg) scale(1.1);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 25s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .5s forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default LogoDesignSection;
