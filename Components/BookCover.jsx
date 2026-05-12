// src/Components/BookCoverSection.jsx
import { useEffect, useRef, useState } from "react";

// Dynamically import all images from each project folder
const mainCoversImages = import.meta.glob("./../assets/Book Cover/books*.jpg", { eager: false });
const heesaraTuteImages = import.meta.glob("./../assets/Book Cover/2026 Sathira Heesara Tute Covers Project/*.jpg", { eager: false });

// Helper to sort and extract values from glob imports (lazy loading)
const sortImages = (globObj) => {
  const entries = Object.entries(globObj);
  return entries
    .map(([path, importer]) => ({
      path,
      importer,
      num: parseInt(path.match(/\((\d+)\)/)?.[1] || path.match(/(\d+)\./)?.[1] || "0")
    }))
    .sort((a, b) => a.num - b.num)
    .map(item => ({ path: item.path, importer: item.importer }));
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
// Lazy Overlay Image Component for Book Covers
const LazyOverlayBookImage = ({ post, isActive, style, onLoad }) => {
  const [src, setSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const loadImage = async () => {
      try {
        const imageSrc = await post.imageData.importer();
        setSrc(imageSrc);
        setIsLoading(false);
        if (onLoad) onLoad({ currentTarget: { naturalWidth: 600, naturalHeight: 800 } }); // Mock book dimensions
      } catch (error) {
        console.error('Failed to load book cover overlay image:', post.imageData.path);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [post.imageData, isActive, onLoad]);

  if (!isActive || !src) {
    return (
      <div
        className={`absolute inset-0 w-full h-full object-contain p-3 md:p-4 transition-opacity duration-200 bg-gray-800 flex items-center justify-center ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={style}
      >
        {isActive && isLoading && (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={post.title}
      className={`absolute inset-0 w-full h-full object-contain p-3 md:p-4 transition-opacity duration-200 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={style}
      onLoad={onLoad}
      draggable="false"
    />
  );
};

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

  // Lazy loading state
  const [loadedImages, setLoadedImages] = useState(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12; // Load 12 images at a time for book covers

  // Lazy load image function
  const loadImage = async (imageData) => {
    if (loadedImages.has(imageData.path)) {
      return loadedImages.get(imageData.path);
    }

    try {
      const src = await imageData.importer();
      setLoadedImages(prev => new Map(prev.set(imageData.path, src)));
      return src;
    } catch (error) {
      console.error('Failed to load book cover image:', imageData.path, error);
      return null;
    }
  };

  // Load images for current page
  const loadImagesForPage = async (page, sectionImages) => {
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const imagesToLoad = sectionImages.slice(startIndex, endIndex);

    await Promise.all(imagesToLoad.map(img => loadImage(img)));
  };

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

  const mainFeatured = mainCoversSources.slice(0, 6).map((imageData, i) => ({
    imageData,
    title: `Book Cover ${i + 1}`,
    category: "Editorial • Cover",
    project: "Main"
  }));

  // Organize projects by sections with pagination
  const projectSections = [
    {
      title: "Classic Covers",
      category: "Editorial • Cover",
      images: mainCoversSources,
      totalPages: Math.ceil(mainCoversSources.length / imagesPerPage)
    },
    {
      title: "2026 Sathira Heesara Tute",
      category: "Educational • Cover",
      images: heesaraTuteSources,
      totalPages: Math.ceil(heesaraTuteSources.length / imagesPerPage)
    }
  ];

  // Flatten all covers for the overlay (lazy loaded)
  const allPosts = projectSections.flatMap(section =>
    section.images.map((imageData, i) => ({
      imageData,
      title: section.title === "Classic Covers"
        ? `Book Cover ${i + 1}`
        : `Heesara Tute ${i + 1}`,
      category: section.category,
      project: section.title === "Classic Covers" ? "Main" : "2026"
    }))
  );

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

  // Load initial images
  useEffect(() => {
    const loadInitialImages = async () => {
      // Load first page of main covers
      if (mainCoversSources.length > 0) {
        await loadImagesForPage(1, mainCoversSources);
      }
      // Load first page of heesara tute covers
      if (heesaraTuteSources.length > 0) {
        await loadImagesForPage(1, heesaraTuteSources);
      }
    };
    loadInitialImages();
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
            <LazyBookImage
              key={`cover-feat-${i}`}
              imageData={p.imageData}
              alt={p.title}
              onClick={() => openOverlay(i)}
              index={i}
            />
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
                            {section.images
                              .slice(0, currentPage * imagesPerPage)
                              .map((imageData, i) => {
                                const globalIndex = sectionStartIndex + i;
                                const title = section.title === "Classic Covers"
                                  ? `Book Cover ${i + 1}`
                                  : `Heesara Tute ${i + 1}`;

                                return (
                                  <LazyBookImage
                                    key={`cover-${sectionIndex}-${i}`}
                                    imageData={imageData}
                                    alt={title}
                                    onClick={() => openOverlay(globalIndex)}
                                    index={i}
                                    aspectRatio="aspect-[2/3]"
                                  />
                                );
                              })}
                          </div>

                          {/* Load More Button */}
                          {section.images.length > currentPage * imagesPerPage && (
                            <div className="mt-6 flex justify-center">
                              <button
                                onClick={() => {
                                  const nextPage = currentPage + 1;
                                  setCurrentPage(nextPage);
                                  loadImagesForPage(nextPage, section.images);
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] px-4 py-2 ring-1 ring-white/10 transition text-sm"
                              >
                                Load More ({Math.min(imagesPerPage, section.images.length - currentPage * imagesPerPage)} covers)
                              </button>
                            </div>
                          )}
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
                    href={loadedImages.get(allPosts[activeIndex]?.imageData?.path) || '#'}
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
                  <LazyOverlayBookImage
                    key={`book-viewer-${idx}`}
                    post={p}
                    isActive={idx === activeIndex}
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
                          w: e.currentTarget.naturalWidth || 600,
                          h: e.currentTarget.naturalHeight || 800
                        };
                      }
                    }}
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
