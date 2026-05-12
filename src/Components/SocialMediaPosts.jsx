// src/Components/SocialMediaPostsSection.jsx
import { useEffect, useRef, useState } from "react";

// Dynamically import all images from each folder (lazy loading)
const mainAreaImages = import.meta.glob("./../assets/Social Media Posts/main area/*.{jpg,jpeg,png,webp}", { eager: false });
const _2026Images = import.meta.glob("./../assets/Social Media Posts/2026/*.{jpg,jpeg,png,webp}", { eager: false });
const myDesignsImages = import.meta.glob("./../assets/Social Media Posts/My Designs/*.{jpg,jpeg,png,webp}", { eager: false });
const subOrdersImages = import.meta.glob("./../assets/Social Media Posts/Sub Orders/*.{jpg,jpeg,png,webp}", { eager: false });

// Helper to sort and extract values from glob imports (lazy loading)
const sortImages = (globObj) => {
  const entries = Object.entries(globObj);
  return entries
    .map(([path, importer]) => ({
      path,
      importer,
      // Extract number from parentheses first: "lower (1).jpg" -> 1
      num: parseInt(path.match(/\((\d+)\)/)?.[1] || path.match(/(\d+)/)?.[1] || "0"),
      prefix: path.match(/^.*\/(upper|lower|newimg)/)?.[1] || ""
    }))
    .sort((a, b) => {
      // If numbers are equal, sort by prefix (lower before upper)
      if (a.num === b.num) {
        if (a.prefix === b.prefix) return 0;
        if (a.prefix === "lower") return -1;
        if (b.prefix === "lower") return 1;
        if (a.prefix === "upper") return -1;
        return 1;
      }
      return a.num - b.num;
    })
    .map(item => ({ path: item.path, importer: item.importer }));
};

// Organize images by category (lazy loaded)
const mainAreaSources = sortImages(mainAreaImages);
const _2026Sources = sortImages(_2026Images);
const myDesignsSources = sortImages(myDesignsImages);
const subOrdersSources = sortImages(subOrdersImages);

// Theme (matches Home)
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
// Lazy Overlay Image Component
const LazyOverlayImage = ({ post, isActive, style, onLoad }) => {
  const [src, setSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const loadImage = async () => {
      try {
        const imageSrc = await post.imageData.importer();
        setSrc(imageSrc);
        setIsLoading(false);
        if (onLoad) onLoad({ currentTarget: { naturalWidth: 800, naturalHeight: 600 } }); // Mock dimensions
      } catch (error) {
        console.error('Failed to load overlay image:', post.imageData.path);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [post.imageData, isActive, onLoad]);

  if (!isActive || !src) {
    return (
      <div
        className={`absolute inset-0 w-full h-full object-contain p-4 md:p-6 transition-opacity duration-300 bg-gray-800 flex items-center justify-center ${
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
      className={`absolute inset-0 w-full h-full object-contain p-4 md:p-6 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={style}
      onLoad={onLoad}
      draggable="false"
    />
  );
};

const SocialMediaPostsSection = () => {
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
  const [showThumbs, setShowThumbs] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Zoom + pan
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedImages, setLoadedImages] = useState(new Map());
  const imagesPerPage = 20; // Load 20 images at a time

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
      console.error('Failed to load image:', imageData.path, error);
      return null;
    }
  };

  // Load images for current page
  const loadImagesForPage = async (page, sectionImages) => {
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const imagesToLoad = sectionImages.slice(startIndex, endIndex);

    // Load images in parallel
    await Promise.all(imagesToLoad.map(img => loadImage(img)));
  };

  // Collapsible sections state (track which sections are expanded)
  const [expandedSections, setExpandedSections] = useState({
    0: true, // 2026 - expanded
    1: true, // Our Designs - expanded
    2: true // Sub Orders - expanded
  });

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Main Area showcase (hero grid)
  const featured = mainAreaSources.map((src, i) => ({
    src,
    title: `Social Media Kit ${i + 1}`,
    category: "Social • Main"
  }));

  // Organize gallery posts by sections with pagination
  const gallerySections = [
    {
      title: "2026",
      images: _2026Sources,
      totalPages: Math.ceil(_2026Sources.length / imagesPerPage)
    },
    {
      title: "Our Designs",
      images: myDesignsSources,
      totalPages: Math.ceil(myDesignsSources.length / imagesPerPage)
    },
    {
      title: "Sub Orders",
      isSubOrder: true,
      images: subOrdersSources,
      totalPages: Math.ceil(subOrdersSources.length / imagesPerPage)
    }
  ];

  // Flatten all covers for the overlay (lazy loaded)
  const allPosts = gallerySections.flatMap(section =>
    section.images.map((imageData, i) => ({
      imageData,
      title: section.isSubOrder
        ? `Order ${i + 1}`
        : section.title === "Our Designs"
          ? `Design ${i + 1}`
          : `${section.title} ${i + 1}`,
      category: section.isSubOrder ? "Social • Order" : `Social • ${section.title}`
    }))
  );

  // Spotlight cursor
  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // Load images when component mounts or page changes
  useEffect(() => {
    const loadInitialImages = async () => {
      // Load first page of each section
      for (const section of gallerySections) {
        if (section.images.length > 0) {
          await loadImagesForPage(1, section.images);
        }
      }
    };
    loadInitialImages();
  }, []);

  // Load images when page changes
  useEffect(() => {
    const currentSection = gallerySections.find(s => s.title === "Our Designs");
    if (currentSection) {
      loadImagesForPage(currentPage, currentSection.images);
    }
  }, [currentPage]);

  // Overlay controls
  const openOverlay = (globalIndex) => {
    setActiveIndex(globalIndex);
    setOverlayOpen(true);
    setShowHint(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const closeOverlay = () => {
    setOverlayOpen(false);
    setShowThumbs(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Lock scroll + one-time hint
  useEffect(() => {
    if (!overlayOpen) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShowHint(false), 2200);
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
    setZoom(1);
    setOffset({ x: 0, y: 0 });

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

  // Wheel zoom
  const onWheelZoom = (e) => {
    if (!overlayOpen) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextZoom = clamp(zoom * factor, 1, 3.5);
    const clamped = clampOffset(offset.x, offset.y, nextZoom);
    setZoom(nextZoom);
    setOffset(clamped);
  };

  // Mouse pan (renamed from onMouseMove to avoid conflict)
  const onMouseDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    offsetStartRef.current = { ...offset };
  };
  const onDragMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const { x, y } = clampOffset(
      offsetStartRef.current.x + dx,
      offsetStartRef.current.y + dy
    );
    setOffset({ x, y });
  };
  const onMouseUp = () => setIsDragging(false);

  // Touch: pan when zoomed, swipe to nav otherwise
  const onTouchStartCombined = (e) => {
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
  const onTouchMoveCombined = (e) => {
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
  const onTouchEndCombined = (e) => {
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

  // Double-click zoom toggle
  const onDoubleClick = () => {
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
      id="social-posts"
      ref={sectionRef}
      onMouseMove={(e) => {
        // Spotlight only on main section, not overlay
        if (!overlayOpen) onMouseMove(e);
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
        <div className="mb-10 md:mb-14 transition-all duration-1000">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Instagram • Facebook • Campaigns
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF]">
                Social Media Post Design
              </span>
            </span>
            <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent animate-expand-width" />
          </h2>

          <p className="mt-6 max-w-2xl text-[#E7DFD6]/60">
            Engaging, on-brand visuals built for performance across social
            platforms.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <button
              key={`feat-${i}`}
              onClick={() => openOverlay(i)} // global index inside allPosts
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 text-left"
            >
              <div className="relative rounded-2xl bg-[#141518]/40 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 opacity-60 bg-gradient-to-tr from-[#B08B57]/10 via-transparent to-[#F1D6BF]/10 -z-10" />
                <div className="relative overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-[280px] md:h-[320px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
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
              {showMore ? "Show less" : `See more (${morePosts.length} images)`}
            </span>
          </button>
        </div>

        {/* See more grid (organized by sections) */}
        <div
          className={`mt-6 md:mt-8 overflow-hidden transition-[max-height,opacity,transform] duration-500 ${
            showMore
              ? "max-h-[10000px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
          aria-hidden={!showMore}
        >
          <div className="space-y-10 md:space-y-12">
            {gallerySections.map((section, sectionIndex) => {
              // Calculate the starting global index for this section
              const prevSectionsCount = gallerySections
                .slice(0, sectionIndex)
                .reduce((sum, s) => sum + s.images.length, 0);
              const sectionStartIndex = featured.length + prevSectionsCount;
              const isExpanded = expandedSections[sectionIndex] !== false;
              const isLargeSection = section.images.length > 50;

              return (
                <div key={`section-${sectionIndex}`}>
                  {/* Section Title with Collapse Toggle */}
                  <div className="mb-4 md:mb-6 flex items-center justify-between">
                    <div>
                      {section.isSubOrder ? (
                        <h3 className="text-sm md:text-base font-medium text-[#B08B57] uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B08B57]" />
                          {section.title}
                        </h3>
                      ) : (
                        <h3 className="text-lg md:text-xl font-semibold text-[#E7DFD6]">
                          {section.title}
                        </h3>
                      )}
                      {isLargeSection && (
                        <p className="text-xs md:text-sm text-[#E7DFD6]/50 mt-1">
                          {section.images.length} designs
                        </p>
                      )}
                    </div>
                    {/* Mobile Collapse Toggle */}
                    {isLargeSection && (
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="md:hidden inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-xs font-medium transition"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>

                  {/* Section Images Grid - Collapsible on Mobile */}
                  {(isExpanded || !isLargeSection) && (
                    <div className="rounded-2xl p-4 md:p-5 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-opacity duration-300">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
                        {section.images
                          .slice(0, currentPage * imagesPerPage)
                          .map((imageData, i) => {
                            const globalIndex = sectionStartIndex + i;
                            const title = section.isSubOrder
                              ? `Order ${i + 1}`
                              : section.title === "Our Designs"
                                ? `Design ${i + 1}`
                                : `${section.title} ${i + 1}`;

                            return (
                              <LazyImage
                                key={`more-${sectionIndex}-${i}`}
                                imageData={imageData}
                                alt={title}
                                onClick={() => openOverlay(globalIndex)}
                                index={i}
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
                            Load More ({Math.min(imagesPerPage, section.images.length - currentPage * imagesPerPage)} images)
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
      </div>

      {/* Lightbox Overlay (improved UX) */}
      {overlayOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#0A0B0D]/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Social media post viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeOverlay();
          }}
          onMouseUp={onMouseUp}
        >
          <div
            className="relative w-full max-w-6xl rounded-3xl p-[2px] bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-1 ring-white/10 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#141518]/70 backdrop-blur-xl rounded-3xl overflow-hidden">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#B08B57] to-[#D4A574] transition-[width] duration-500"
                  style={{
                    width: `${((activeIndex + 1) / allPosts.length) * 100}%`
                  }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                  <div>
                    <div className="text-xs md:text-sm text-[#E7DFD6] font-medium">
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

              {/* Viewer */}
              <div
                ref={viewerRef}
                className={`relative aspect-[16/10] md:aspect-[16/9] select-none ${
                  isDragging
                    ? "cursor-grabbing"
                    : zoom > 1
                    ? "cursor-grab"
                    : "cursor-default"
                }`}
                onWheel={onWheelZoom}
                onDoubleClick={onDoubleClick}
                onMouseDown={onMouseDown}
                onMouseMove={onDragMove}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStartCombined}
                onTouchMove={onTouchMoveCombined}
                onTouchEnd={onTouchEndCombined}
              >
                {/* Active image with zoom/pan */}
                {allPosts.map((p, idx) => (
                  <LazyOverlayImage
                    key={`viewer-${idx}`}
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
                          w: e.currentTarget.naturalWidth || 800,
                          h: e.currentTarget.naturalHeight || 600
                        };
                      }
                    }}
                  />
                ))}

                {/* Big click zones */}
                <button
                  onClick={prev}
                  className="absolute left-0 top-0 bottom-0 w-1/3 md:w-1/4 hover:bg-white/0 focus:bg-white/0"
                  aria-label="Previous"
                  title="Previous"
                />
                <button
                  onClick={next}
                  className="absolute right-0 top-0 bottom-0 w-1/3 md:w-1/4 hover:bg-white/0 focus:bg-white/0"
                  aria-label="Next"
                  title="Next"
                />

                {/* Visible arrows */}
                <div className="absolute inset-y-0 left-2 md:left-4 flex items-center">
                  <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0A0B0D]/40 text-[#E7DFD6] ring-1 ring-white/10">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-2 md:right-4 flex items-center">
                  <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0A0B0D]/40 text-[#E7DFD6] ring-1 ring-white/10">
                    <ChevronRightIcon className="w-5 h-5" />
                  </div>
                </div>

                {/* Hint */}
                {showHint && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0A0B0D]/60 text-[#E7DFD6] px-3 py-1 text-xs ring-1 ring-white/10">
                    Scroll to zoom • drag to pan • swipe/arrow to navigate • ESC
                    to close
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between gap-2 px-4 md:px-6 py-3">
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
                  <span className="text-xs text-[#E7DFD6]/60 min-w-[3ch] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
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
                  <button
                    onClick={resetZoom}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-xs"
                    title="Reset view"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SocialMediaPostsSection;