// src/Components/BookCoverSection.jsx
import { useEffect, useRef, useState } from "react";

// Dynamically import all images from each project folder
const mainCoversImages = import.meta.glob("./../assets/Book Cover/books*.jpg", { eager: true, import: "default" });
const heesaraTuteImages = import.meta.glob("./../assets/Book Cover/2026 Sathira Heesara Tute Covers Project/*.jpg", { eager: true, import: "default" });

// Helper to sort and extract values from glob imports
const sortImages = (globObj) => {
  return Object.values(globObj).sort((a, b) => {
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || a.match(/(\d+)\./)?.[1] || "0");
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || b.match(/(\d+)\./)?.[1] || "0");
    return numA - numB;
  });
};

// Organize images by project
const mainCoversSources = sortImages(mainCoversImages);
const heesaraTuteSources = sortImages(heesaraTuteImages);

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

const BookCoverSection = () => {
  const sectionRef = useRef(null);

  // Viewer/overlay refs
  const viewerRef = useRef(null);
  const imgMetaRef = useRef({ w: 0, h: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const offsetStartRef = useRef({ x: 0, y: 0 });
  const swipeStartRef = useRef({ x: 0, y: 0 });

  // Spotlight + in-view
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [isVisible, setIsVisible] = useState(false);

  // Overlay state
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showThumbs, setShowThumbs] = useState(false); // default hidden for compact modal
  const [showHint, setShowHint] = useState(false);

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // See more
  const [showMore, setShowMore] = useState(true);

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    0: true, // Main Covers - expanded
    1: true  // 2026 Sathira Heesara Tute - expanded
  });

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Main featured covers (first 6)
  const mainFeatured = mainCoversSources.slice(0, 6).map((src, i) => ({
    src,
    title: `Book Cover ${i + 1}`,
    category: "Editorial • Cover",
    project: "Main"
  }));

  // Organize projects by sections
  const projectSections = [
    {
      title: "Classic Covers",
      category: "Editorial • Cover",
      images: mainCoversSources.map((src, i) => ({
        src,
        title: `Book Cover ${i + 1}`,
        category: "Editorial • Cover",
        project: "Main"
      }))
    },
    {
      title: "2026 Sathira Heesara Tute",
      category: "Educational • Cover",
      images: heesaraTuteSources.map((src, i) => ({
        src,
        title: `Heesara Tute ${i + 1}`,
        category: "Educational • Cover",
        project: "2026"
      }))
    }
  ];

  // Flatten all covers for the overlay
  const allPosts = projectSections.flatMap(section => section.images);

  // Featured covers (for the main grid)
  const featured = mainFeatured;
  const extras = allPosts.slice(featured.length);

  // Spotlight cursor (section)
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
      {
        threshold: 0.2
      }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Overlay controls
  const openOverlay = (globalIndex) => {
    setActiveIndex(globalIndex);
    setOverlayOpen(true);
    setShowHint(true);
    resetZoom();
  };
  const closeOverlay = () => {
    setOverlayOpen(false);
    setShowThumbs(false);
    resetZoom();
  };

  // Lock scroll + one-time hint
  useEffect(() => {
    if (!overlayOpen) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShowHint(false), 2000);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [overlayOpen]);

  // Keyboard nav
  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeOverlay();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  // Preload neighbors + reset zoom on change
  useEffect(() => {
    if (!overlayOpen) return;
    resetZoom();
    const prevIndex = (activeIndex - 1 + allPosts.length) % allPosts.length;
    const nextIndex = (activeIndex + 1) % allPosts.length;
    [prevIndex, nextIndex].forEach((i) => {
      const im = new Image();
      im.src = allPosts[i].src;
    });
  }, [activeIndex, overlayOpen, allPosts]);

  // Nav
  const next = () => setActiveIndex((i) => (i + 1) % allPosts.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + allPosts.length) % allPosts.length);

  // Zoom/pan helpers
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const getBounds = (z = zoom) => {
    const el = viewerRef.current;
    if (!el) return { maxX: 0, maxY: 0 };
    const cw = el.clientWidth;
    const ch = el.clientHeight;

    const nw = imgMetaRef.current.w || cw;
    const nh = imgMetaRef.current.h || ch;
    const ar = nw / nh;
    const car = cw / ch;

    let baseW, baseH;
    if (ar > car) {
      baseW = cw;
      baseH = cw / ar;
    } else {
      baseH = ch;
      baseW = ch * ar;
    }

    const scaledW = baseW * z;
    const scaledH = baseH * z;
    const maxX = Math.max(0, (scaledW - cw) / 2);
    const maxY = Math.max(0, (scaledH - ch) / 2);
    return { maxX, maxY };
  };
  const clampOffset = (x, y, z = zoom) => {
    const { maxX, maxY } = getBounds(z);
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  };

  // Viewer: wheel zoom
  const handleViewerWheel = (e) => {
    if (!overlayOpen) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextZoom = clamp(zoom * factor, 1, 3.5);
    const clamped = clampOffset(offset.x, offset.y, nextZoom);
    setZoom(nextZoom);
    setOffset(clamped);
  };

  // Viewer: mouse pan
  const handleViewerMouseDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    offsetStartRef.current = { ...offset };
  };
  const handleViewerMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const { x, y } = clampOffset(
      offsetStartRef.current.x + dx,
      offsetStartRef.current.y + dy
    );
    setOffset({ x, y });
  };
  const handleViewerMouseUp = () => setIsDragging(false);

  // Viewer: touch pan/swipe
  const handleViewerTouchStart = (e) => {
    if (zoom > 1) {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = { x: t.clientX, y: t.clientY };
      offsetStartRef.current = { ...offset };
    } else {
      const t = e.touches[0];
      swipeStartRef.current = { x: t.clientX, y: t.clientY };
    }
  };
  const handleViewerTouchMove = (e) => {
    if (!(zoom > 1 && isDragging)) return;
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - dragStartRef.current.x;
    const dy = t.clientY - dragStartRef.current.y;
    const { x, y } = clampOffset(
      offsetStartRef.current.x + dx,
      offsetStartRef.current.y + dy
    );
    setOffset({ x, y });
  };
  const handleViewerTouchEnd = (e) => {
    if (zoom > 1 && isDragging) {
      setIsDragging(false);
      return;
    }
    const t = e.changedTouches[0];
    const dx = t.clientX - swipeStartRef.current.x;
    const dy = t.clientY - swipeStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 40) {
      dx < 0 ? next() : prev();
    }
  };

  // Viewer: double-click zoom toggle
  const handleViewerDoubleClick = () => {
    if (zoom === 1) {
      const nextZoom = 2;
      const clamped = clampOffset(offset.x, offset.y, nextZoom);
      setZoom(nextZoom);
      setOffset(clamped);
    } else {
      resetZoom();
    }
  };

  return (
    <section
      id="bookcover"
      ref={sectionRef}
      onMouseMove={(e) => {
        if (!overlayOpen) handleSectionMouseMove(e);
      }}
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
        <div className="mb-10 md:mb-14 transition-all duration-1000 ">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Editorial • Publishing • Layout
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF]">
                Book Cover Design
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h2>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            Striking covers with strong hierarchy, genre cues, and
            production‑ready files.
          </p>
        </div>

        {/* Featured Grid (portrait covers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <button
              key={`cover-feat-${i}`}
              onClick={() => openOverlay(i)}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 text-left"
            >
              <div className="relative rounded-2xl bg-[#141518]/40 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 opacity-60 bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 -z-10" />
                <div className="relative overflow-hidden">
                  <div className="w-full aspect-[4/5]">
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
              >
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${
                    showMore ? "rotate-180" : ""
                  }`}
                />
                <span className="text-sm font-medium">
                  {showMore ? "Show less" : "See more projects"}
                </span>
              </button>
            </div>

            {/* Project Sections */}
            <div
              className={`mt-6 md:mt-8 overflow-hidden transition-[max-height,opacity,transform] duration-500 ${
                showMore
                  ? "max-h-[10000px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2"
              }`}
              aria-hidden={!showMore}
            >
              <div className="space-y-10 md:space-y-12">
                {projectSections.map((section, sectionIndex) => {
                  const prevSectionsCount = projectSections
                    .slice(0, sectionIndex)
                    .reduce((sum, s) => sum + s.images.length, 0);
                  const sectionStartIndex = featured.length + prevSectionsCount;
                  const isExpanded = expandedSections[sectionIndex] !== false;

                  return (
                    <div key={`project-${sectionIndex}`}>
                      {/* Section Title with Toggle */}
                      <div className="mb-4 md:mb-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#E7DFD6]">
                            {section.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#E7DFD6]/50 mt-1">
                            {section.images.length} covers
                          </p>
                        </div>
                        {section.images.length > 12 && (
                          <button
                            onClick={() => toggleSection(sectionIndex)}
                            className="md:hidden inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-xs font-medium transition"
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Hide" : "Show"}
                          </button>
                        )}
                      </div>

                      {/* Section Grid - Collapsible on Mobile for large sections */}
                      {(isExpanded || section.images.length <= 12) && (
                        <div className="rounded-2xl p-3 md:p-4 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-opacity duration-300">
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-2">
                            {section.images.map((p, i) => {
                              const globalIndex = sectionStartIndex + i;
                              return (
                                <button
                                  key={`cover-${sectionIndex}-${i}`}
                                  onClick={() => openOverlay(globalIndex)}
                                  className="relative overflow-hidden rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition group"
                                  aria-label={`Open ${p.title}`}
                                >
                                  <div className="w-full aspect-[2/3]">
                                    <img
                                      src={p.src}
                                      alt={p.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Compact Lightbox Overlay */}
      {overlayOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#0A0B0D]/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book cover viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeOverlay();
          }}
          onMouseUp={handleViewerMouseUp}
        >
          <div
            className="relative w-[92vw] max-w-4xl md:max-w-5xl rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-1 ring-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#141518]/75 backdrop-blur-xl rounded-2xl overflow-hidden">
              {/* Thin progress bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#B08B57] to-[#D4A574] transition-[width] duration-500"
                  style={{
                    width: `${((activeIndex + 1) / allPosts.length) * 100}%`
                  }}
                />
              </div>

              {/* Header (compact) */}
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

              {/* Viewer (smaller, responsive height) */}
              <div
                ref={viewerRef}
                className={`relative h-[60vh] md:h-[70vh] select-none ${
                  isDragging
                    ? "cursor-grabbing"
                    : zoom > 1
                    ? "cursor-grab"
                    : "cursor-default"
                }`}
                onWheel={handleViewerWheel}
                onDoubleClick={handleViewerDoubleClick}
                onMouseDown={handleViewerMouseDown}
                onMouseMove={handleViewerMouseMove}
                onMouseLeave={handleViewerMouseUp}
                onTouchStart={handleViewerTouchStart}
                onTouchMove={handleViewerTouchMove}
                onTouchEnd={handleViewerTouchEnd}
              >
                {/* Active image with zoom/pan */}
                {allPosts.map((p, idx) => (
                  <img
                    key={`book-viewer-${idx}`}
                    src={p.src}
                    alt={p.title}
                    className={`absolute inset-0 w-full h-full object-contain p-3 md:p-4 transition-opacity duration-200 ${
                      idx === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={
                      idx === activeIndex
                        ? {
                            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
                            willChange: "transform"
                          }
                        : undefined
                    }
                    onLoad={(e) => {
                      if (idx === activeIndex) {
                        imgMetaRef.current = {
                          w: e.currentTarget.naturalWidth || 0,
                          h: e.currentTarget.naturalHeight || 0
                        };
                      }
                    }}
                    draggable="false"
                  />
                ))}

                {/* Edge arrow buttons (compact) */}
                <div className="absolute inset-y-0 left-2 flex items-center">
                  <button
                    onClick={prev}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] ring-1 ring-white/10"
                    aria-label="Previous"
                    title="Previous"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button
                    onClick={next}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0B0D]/50 hover:bg-[#0A0B0D]/70 text-[#E7DFD6] ring-1 ring-white/10"
                    aria-label="Next"
                    title="Next"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Hint */}
                {showHint && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0A0B0D]/60 text-[#E7DFD6] px-3 py-1 text-[11px] ring-1 ring-white/10">
                    Double-click or scroll to zoom • drag to pan • ESC to close
                  </div>
                )}
              </div>

              {/* Toolbar (compact) */}
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-sm"
                    title="Previous"
                  >
                    Prev
                  </button>
                  <button
                    onClick={next}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-sm"
                    title="Next"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const nz = clamp(zoom / 1.15, 1, 3.5);
                      const c = clampOffset(offset.x, offset.y, nz);
                      setZoom(nz);
                      setOffset(c);
                    }}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10"
                    title="Zoom out"
                  >
                    -
                  </button>
                  <button
                    onClick={resetZoom}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-sm"
                    title="Fit to view"
                  >
                    Fit
                  </button>
                  <button
                    onClick={() => {
                      const nz = clamp(zoom * 1.15, 1, 3.5);
                      const c = clampOffset(offset.x, offset.y, nz);
                      setZoom(nz);
                      setOffset(c);
                    }}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10"
                    title="Zoom in"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => setShowThumbs((s) => !s)}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-sm"
                  aria-expanded={showThumbs}
                  title={showThumbs ? "Hide thumbnails" : "Show thumbnails"}
                >
                  {showThumbs ? "Hide thumbnails" : "Show thumbnails"}
                </button>
              </div>

              {/* Filmstrip thumbnails (toggle) */}
              {showThumbs && (
                <div className="px-4 pb-4">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {allPosts.map((p, idx) => (
                      <button
                        key={`book-thumb-${idx}`}
                        onClick={() => {
                          setActiveIndex(idx);
                          resetZoom();
                        }}
                        className={`relative overflow-hidden rounded-md shrink-0 ring-1 ${
                          idx === activeIndex
                            ? "ring-[#B08B57]"
                            : "ring-white/10 hover:ring-white/20"
                        }`}
                        style={{ width: 54, height: 72 }}
                        title={p.title}
                      >
                        <img
                          src={p.src}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable="false"
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
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes morph { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(120deg) scale(1.1);} 66% { transform: rotate(240deg) scale(0.9);} }
        @keyframes morph-reverse { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(-120deg) scale(0.9);} 66% { transform: rotate(-240deg) scale(1.1);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 25s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .5s forwards; }
        .animation-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
};

export default BookCoverSection;
