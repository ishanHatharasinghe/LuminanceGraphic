import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Grid3X3,
  Image,
  FileText,
  Palette,
  Star
} from "lucide-react";

// Matching color palette from Home component
const COLORS = {
  slate: "#6B7785",
  marble: "#E7DFD6",
  peach: "#F1D6BF",
  bronze: "#B08B57",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518"
};
import logo from "../assets/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const portfolioRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "content",
        "socialMediaPosts",
        "logo",
        "youtubeThumbnails",
        "socialMediaCover",
        "bookCover",
        "Tdesigns",
        "BusinessCarddesigns",
        "CV",
        "Bookmark",
        "Banner"
      ];

      const current = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle portfolio dropdown timing
  const handlePortfolioEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setPortfolioOpen(true);
  };

  const handlePortfolioLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setPortfolioOpen(false);
    }, 300);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        portfolioRef.current &&
        !portfolioRef.current.contains(event.target)
      ) {
        setPortfolioOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setPortfolioOpen(false);
    }
  };

  const mainNavItems = [
    { id: "home", label: "Home", icon: Star },
    { id: "about", label: "About", icon: FileText },
    { id: "content", label: "Content", icon: Grid3X3 }
  ];

  const portfolioItems = [
    {
      id: "socialMediaPosts",
      label: "Social Posts",
      icon: Image,
      category: "Digital",
      description: "Eye-catching social media content"
    },
    {
      id: "logo",
      label: "Logo Design",
      icon: Sparkles,
      category: "Branding",
      description: "Memorable brand identities"
    },
    {
      id: "youtubeThumbnails",
      label: "YouTube Thumbnails",
      icon: Image,
      category: "Digital",
      description: "Click-worthy video previews"
    },
    {
      id: "socialMediaCover",
      label: "Social Covers",
      icon: Palette,
      category: "Digital",
      description: "Professional profile headers"
    },
    {
      id: "bookCover",
      label: "Book Covers",
      icon: FileText,
      category: "Print",
      description: "Compelling book designs"
    },
    {
      id: "Tdesigns",
      label: "Apparel Designs (T‑Shirts & Caps)",
      icon: Palette,
      category: "Apparel",
      description: "Trendy wearable graphics"
    },
    {
      id: "BusinessCarddesigns",
      label: "Business Cards",
      icon: Star,
      category: "Print",
      description: "Professional networking tools"
    },
    {
      id: "CV",
      label: "CV Design",
      icon: FileText,
      category: "Print",
      description: "Modern resume layouts"
    },
    {
      id: "Bookmark",
      label: "Bookmarks",
      icon: Star,
      category: "Print",
      description: "Creative reading accessories"
    },
    {
      id: "Banner",
      label: "Banners & Flyers",
      icon: Image,
      category: "Print",
      description: "Impactful promotional designs"
    }
  ];

  const groupedPortfolio = portfolioItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const isPortfolioActive = portfolioItems.some(
    (item) => activeSection === item.id
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0A0B0D]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b border-white/5"
            : "bg-transparent"
        }`}
        style={{
          background: scrolled
            ? "rgba(10, 11, 13, 0.95)"
            : "linear-gradient(to bottom, rgba(10, 11, 13, 0.8), transparent)"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Enhanced Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="group relative z-10"
          >
            <div className="flex items-center gap-3">
              {/* Animated decorative element */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B08B57] via-[#D4A574] to-[#F1D6BF] shadow-[0_0_25px_rgba(176,139,87,0.6)] group-hover:shadow-[0_0_35px_rgba(176,139,87,0.8)] transition-all duration-500" />
                <div className="absolute inset-1 w-10 h-10 rounded-full bg-gradient-to-tr from-[#F1D6BF]/40 to-transparent animate-pulse" />
                <div className="absolute inset-2 w-8 h-8 rounded-full bg-[#0A0B0D]/20 flex items-center justify-center">
                  <img src={logo} />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF] bg-clip-text text-transparent group-hover:from-[#F1D6BF] group-hover:to-[#B08B57] transition-all duration-500">
                  Luminance
                </h1>
                <div className="text-xs text-[#E7DFD6]/50 font-medium tracking-[0.2em] uppercase">
                  Graphic Design
                </div>
              </div>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 group flex items-center gap-2 ${
                        activeSection === item.id
                          ? "text-[#B08B57] bg-white/10 shadow-[0_0_20px_rgba(176,139,87,0.3)]"
                          : "text-[#E7DFD6]/70 hover:text-[#E7DFD6] hover:bg-white/5"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="relative z-10">{item.label}</span>

                      {/* Active indicator */}
                      {activeSection === item.id && (
                        <div className="absolute inset-0 rounded-xl ring-1 ring-[#B08B57]/30 bg-gradient-to-r from-[#B08B57]/10 to-[#F1D6BF]/10" />
                      )}

                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-[#B08B57]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    </button>
                  </li>
                );
              })}

              {/* Fixed Portfolio Dropdown */}
              <li className="relative" ref={portfolioRef}>
                <button
                  onClick={() => setPortfolioOpen(!portfolioOpen)}
                  onMouseEnter={handlePortfolioEnter}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 group flex items-center gap-2 ${
                    isPortfolioActive || portfolioOpen
                      ? "text-[#B08B57] bg-white/10 shadow-[0_0_20px_rgba(176,139,87,0.3)]"
                      : "text-[#E7DFD6]/70 hover:text-[#E7DFD6] hover:bg-white/5"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="relative z-10">Portfolio</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      portfolioOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />

                  {/* Active indicator */}
                  {(isPortfolioActive || portfolioOpen) && (
                    <div className="absolute inset-0 rounded-xl ring-1 ring-[#B08B57]/30 bg-gradient-to-r from-[#B08B57]/10 to-[#F1D6BF]/10" />
                  )}

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-[#B08B57]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </button>

                {/* Fixed Portfolio Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 transition-all duration-500 portfolio-dropdown ${
                    portfolioOpen
                      ? "opacity-100 visible translate-y-0 scale-100"
                      : "opacity-0 invisible -translate-y-4 scale-95"
                  }`}
                  onMouseEnter={handlePortfolioEnter}
                  onMouseLeave={handlePortfolioLeave}
                >
                  <div className="relative">
                    {/* Enhanced Backdrop */}
                    <div className="absolute inset-0 bg-[#141518] backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.5)]" />

                    {/* Enhanced Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#B08B57]/30 via-transparent to-[#F1D6BF]/30 rounded-2xl blur-xl animate-pulse" />

                    {/* Content */}
                    <div className="relative p-6 w-[420px]">
                      <div className="mb-5 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-[#B08B57]/20 to-[#F1D6BF]/10">
                            <Palette className="w-5 h-5 text-[#B08B57]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#E7DFD6]">
                              Creative Portfolio
                            </h3>
                            <p className="text-xs text-[#E7DFD6]/60">
                              Explore my design work
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {Object.entries(groupedPortfolio).map(
                          ([category, items]) => (
                            <div key={category} className="space-y-3">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#B08B57] to-[#F1D6BF] animate-pulse" />
                                <h4 className="text-sm font-bold text-[#B08B57] uppercase tracking-wider">
                                  {category}
                                </h4>
                                <div className="flex-1 h-px bg-gradient-to-r from-[#B08B57]/40 to-transparent" />
                              </div>

                              <div className="space-y-2">
                                {items.map((item, index) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => scrollToSection(item.id)}
                                      className={`w-full relative p-4 rounded-xl text-left transition-all duration-300 group hover:scale-[1.02] ${
                                        activeSection === item.id
                                          ? "bg-gradient-to-r from-[#B08B57]/25 to-[#F1D6BF]/15 ring-1 ring-[#B08B57]/50 text-[#B08B57] shadow-[0_0_20px_rgba(176,139,87,0.4)]"
                                          : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/5 hover:ring-white/20"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`p-2.5 rounded-lg transition-all duration-300 ${
                                            activeSection === item.id
                                              ? "bg-[#B08B57]/25 text-[#B08B57] shadow-inner"
                                              : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/15 group-hover:text-[#B08B57]"
                                          }`}
                                        >
                                          <IconComponent className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-semibold text-sm mb-1">
                                            {item.label}
                                          </div>
                                          <div className="text-xs text-[#E7DFD6]/50 leading-relaxed">
                                            {item.description}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Enhanced hover glow */}
                                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#B08B57]/15 to-[#F1D6BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                      {/* Active pulse indicator */}
                                      {activeSection === item.id && (
                                        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#B08B57] animate-pulse shadow-[0_0_10px_rgba(176,139,87,0.6)]" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {/* Enhanced Footer */}
                      <div className="mt-5 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-center gap-2 text-xs text-[#E7DFD6]/50">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#B08B57]" />
                            <span className="font-medium">
                              {portfolioItems.length} Creative Categories
                            </span>
                            <Sparkles className="w-3 h-3 text-[#B08B57]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Enhanced CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 group relative inline-flex items-center justify-center px-8 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-[#B08B57] to-[#D4A574] text-[#0A0B0D] font-semibold transition-all duration-500 hover:shadow-[0_0_35px_rgba(176,139,87,0.6)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Let's Connect
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#E5B885] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-4 bg-[#B08B57]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          {/* Enhanced Mobile Toggle */}
          <button
            className="lg:hidden relative z-10 p-3 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 text-[#E7DFD6] transition-all duration-300 ${
                  isOpen
                    ? "opacity-0 rotate-180 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 text-[#E7DFD6] transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-180 scale-75"
                }`}
              />
            </div>
          </button>
        </div>

        {/* FIXED Mobile Menu - Slide down from navbar */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out transform ${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-4 opacity-0 invisible"
          }`}
        >
          <div className="bg-gradient-to-b from-[#141518] via-[#141518] to-[#0A0B0D] backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="px-6 py-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {/* Main Navigation */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-[#B08B57]" />
                  <h3 className="text-sm font-bold text-[#B08B57] uppercase tracking-wider">
                    Main Navigation
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {mainNavItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`mobile-nav-item relative p-4 rounded-xl text-left transition-all duration-300 group ${
                          activeSection === item.id
                            ? "bg-gradient-to-br from-[#B08B57]/25 to-[#F1D6BF]/15 ring-1 ring-[#B08B57]/40 text-[#B08B57] shadow-[0_0_20px_rgba(176,139,87,0.3)]"
                            : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/10"
                        }`}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              activeSection === item.id
                                ? "bg-[#B08B57]/20 text-[#B08B57]"
                                : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="text-sm font-semibold">
                            {item.label}
                          </div>
                        </div>

                        {/* Active indicator */}
                        {activeSection === item.id && (
                          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#B08B57]" />
                    <h3 className="text-sm font-bold text-[#B08B57] uppercase tracking-wider">
                      Portfolio Showcase
                    </h3>
                  </div>
                  <div className="text-xs text-[#E7DFD6]/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {portfolioItems.length} Projects
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(groupedPortfolio).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#B08B57] to-[#F1D6BF] animate-pulse" />
                        <h4 className="text-xs font-bold text-[#B08B57] uppercase tracking-wider">
                          {category}
                        </h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#B08B57]/40 to-transparent" />
                      </div>

                      <div className="space-y-2">
                        {items.map((item, index) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => scrollToSection(item.id)}
                              className={`w-full relative p-3 rounded-xl text-left transition-all duration-300 group hover:scale-[1.01] ${
                                activeSection === item.id
                                  ? "bg-gradient-to-r from-[#B08B57]/20 to-[#F1D6BF]/10 ring-1 ring-[#B08B57]/40 text-[#B08B57] shadow-[0_0_15px_rgba(176,139,87,0.3)]"
                                  : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/5 hover:ring-white/20"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg transition-all duration-300 ${
                                    activeSection === item.id
                                      ? "bg-[#B08B57]/20 text-[#B08B57]"
                                      : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm mb-1">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-[#E7DFD6]/50 leading-relaxed">
                                    {item.description}
                                  </div>
                                </div>
                              </div>

                              {/* Active pulse */}
                              {activeSection === item.id && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full relative p-4 rounded-xl text-left transition-all duration-300 group ${
                    activeSection === "contact"
                      ? "bg-gradient-to-br from-[#B08B57]/25 to-[#F1D6BF]/15 ring-1 ring-[#B08B57]/40 text-[#B08B57] shadow-[0_0_20px_rgba(176,139,87,0.3)]"
                      : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                          activeSection === "contact"
                            ? "bg-[#B08B57]/20 text-[#B08B57]"
                            : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">
                          Get In Touch
                        </div>
                        <div className="text-xs text-[#E7DFD6]/50">
                          Let's discuss your project
                        </div>
                      </div>
                    </div>
                    <div className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </div>
                  </div>
                </button>

                {/* Enhanced Mobile CTA */}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full mt-4 group relative inline-flex items-center justify-center px-6 py-4 rounded-xl overflow-hidden bg-gradient-to-r from-[#B08B57] to-[#D4A574] text-[#0A0B0D] font-bold transition-all duration-500 hover:shadow-[0_0_40px_rgba(176,139,87,0.7)] hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Start Your Creative Journey</span>
                    <div className="w-6 h-6 rounded-full bg-[#0A0B0D]/20 flex items-center justify-center overflow-hidden">
                      <div className="w-2 h-2 rounded-full bg-[#0A0B0D] group-hover:scale-150 transition-transform duration-300" />
                    </div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#E5B885] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-2 bg-[#B08B57]/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-out forwards;
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.4s ease-out forwards;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(176, 139, 87, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Enhanced scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin: 4px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(176, 139, 87, 0.7), rgba(212, 165, 116, 0.5));
          border-radius: 3px;
          border: 1px solid rgba(176, 139, 87, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(176, 139, 87, 0.9), rgba(212, 165, 116, 0.7));
        }
        
        /* Mobile nav items stagger animation */
        .mobile-nav-item {
          animation: slideInUp 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .mobile-nav-item:nth-child(1) { animation-delay: 0.1s; }
        .mobile-nav-item:nth-child(2) { animation-delay: 0.15s; }
        .mobile-nav-item:nth-child(3) { animation-delay: 0.2s; }
        .mobile-nav-item:nth-child(4) { animation-delay: 0.25s; }
        
        /* Portfolio dropdown enhanced animations */
        .portfolio-dropdown {
          transform-origin: top left;
        }
        
        /* Glow effects */
        .glow-bronze {
          box-shadow: 0 0 20px rgba(176, 139, 87, 0.3), 0 0 40px rgba(176, 139, 87, 0.1);
        }
        
        .glow-bronze:hover {
          box-shadow: 0 0 30px rgba(176, 139, 87, 0.5), 0 0 60px rgba(176, 139, 87, 0.2);
        }
        
        /* Custom focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid rgba(176, 139, 87, 0.6);
          outline-offset: 2px;
          border-radius: 12px;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Enhanced backdrop blur support */
        @supports (backdrop-filter: blur(16px)) {
          .backdrop-blur-xl {
            backdrop-filter: blur(16px) saturate(1.5) brightness(1.1);
          }
          .backdrop-blur-md {
            backdrop-filter: blur(12px) saturate(1.2) brightness(1.05);
          }
        }
        
        /* Fallback for browsers without backdrop-filter */
        @supports not (backdrop-filter: blur(16px)) {
          .backdrop-blur-xl {
            background-color: rgba(20, 21, 24, 0.98);
          }
          .backdrop-blur-md {
            background-color: rgba(10, 11, 13, 0.95);
          }
        }
        
        /* Prevent text selection on nav elements */
        nav button {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
        }
        
        /* Enhanced mobile menu visibility */
        .mobile-menu-enter {
          animation: slideInUp 0.5s ease-out forwards;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Portfolio dropdown positioning fix */
        .portfolio-dropdown {
          min-width: 420px;
          max-width: 90vw;
        }
        
        @media (max-width: 500px) {
          .portfolio-dropdown {
            min-width: 350px;
          }
        }
        
        /* Mobile menu specific improvements */
        @media (max-width: 1024px) {
          /* Ensure mobile menu doesn't create horizontal scroll */
          .mobile-menu-container {
            max-width: 100vw;
            overflow-x: hidden;
          }
          
          /* Better mobile menu backdrop */
          .mobile-menu-backdrop {
            background: linear-gradient(
              to bottom,
              rgba(20, 21, 24, 0.98) 0%,
              rgba(20, 21, 24, 0.95) 50%,
              rgba(10, 11, 13, 0.98) 100%
            );
          }
          
          /* Improved mobile button spacing */
          .mobile-grid {
            gap: 0.75rem;
          }
          
          /* Better mobile scroll handling */
          .mobile-menu-scroll {
            max-height: calc(100vh - 200px);
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(176, 139, 87, 0.3) transparent;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
