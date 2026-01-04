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
  Star,
  MessageSquare,
  DollarSign
} from "lucide-react";
import { BiCubeAlt } from "react-icons/bi";
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
import { PiContactlessPaymentFill } from "react-icons/pi";
import logo from "../assets/logo.png";
import { RiHomeWifiFill } from "react-icons/ri";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const portfolioRef = useRef(null);

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
        "Banner",
        "Pricing",
        "testimonials",
        "contact"
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
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePortfolioClick = () => {
    setPortfolioOpen(!portfolioOpen);
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
    { id: "home", label: "Home", icon: RiHomeWifiFill },
    { id: "about", label: "About", icon: FileText },
    { id: "content", label: "Content", icon: Grid3X3 },
    { id: "Pricing", label: "Pricing", icon: DollarSign },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare }
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
            ? "bg-[#0A0B0D]/90 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
        style={{
          background: scrolled
            ? "rgba(10, 11, 13, 0.90)"
            : "linear-gradient(to bottom, rgba(10, 11, 13, 0.7), transparent)"
        }}
      >
        {" "}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {" "}
          {/* Modern Logo Design */}{" "}
          <button
            onClick={() => scrollToSection("home")}
            className="group relative z-10"
          >
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              {/* Animated decorative element */}{" "}
              <div className="relative">
                {" "}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B08B57] to-[#F1D6BF] shadow-[0_0_25px_rgba(176,139,87,0.6)] group-hover:shadow-[0_0_35px_rgba(176,139,87,0.8)] transition-all duration-500" />{" "}
                <div className="absolute inset-1 w-8 h-8 rounded-full bg-gradient-to-tr from-[#F1D6BF]/40 to-transparent animate-pulse" />{" "}
                <div className="absolute inset-2 w-6 h-6 rounded-full bg-[#0A0B0D]/20 flex items-center justify-center">
                  {" "}
                  <img src={logo} className="w-4 h-4" />{" "}
                </div>{" "}
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#E7DFD6] via-[#B08B57] to-[#F1D6BF] bg-clip-text text-transparent group-hover:from-[#F1D6BF] group-hover:to-[#B08B57] transition-all duration-500">
                  Luminance
                </h1>
                <div className="text-xs text-[#E7DFD6]/50 font-medium tracking-[0.1em] uppercase">
                  Graphic Design
                </div>
              </div>
            </div>
          </button>
          {/* Desktop Menu - Smaller and more compact */}
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-xl p-1.5 border border-white/10">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 group flex items-center gap-1.5 ${
                        activeSection === item.id
                          ? "text-[#0A0B0D] bg-[#B08B57] shadow-lg shadow-[#B08B57]/25"
                          : "text-[#E7DFD6]/70 hover:text-[#E7DFD6] hover:bg-white/10"
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  </li>
                );
              })}

              {/* Smaller Portfolio Dropdown */}
              <li className="relative" ref={portfolioRef}>
                <button
                  onClick={handlePortfolioClick}
                  className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 group flex items-center gap-1.5 ${
                    isPortfolioActive || portfolioOpen
                      ? "text-[#0A0B0D] bg-[#B08B57] shadow-lg shadow-[#B08B57]/25"
                      : "text-[#E7DFD6]/70 hover:text-[#E7DFD6] hover:bg-white/10"
                  }`}
                >
                  <BiCubeAlt className="w-4 h-4" />
                  <span className="font-semibold">Portfolio</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${
                      portfolioOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Ultra-modern Portfolio Dropdown Menu */}
                <div
                  className={`absolute top-full right-0 mt-2 transition-all duration-500 ${
                    portfolioOpen
                      ? "opacity-100 visible translate-y-0 scale-100"
                      : "opacity-0 invisible -translate-y-2 scale-95"
                  }`}
                >
                  <div className="relative">
                    {/* Modern backdrop */}
                    <div className="absolute inset-0 bg-[#141518] backdrop-blur-2xl rounded-2xl border border-white/10" />

                    {/* Content */}
                    <div className="relative p-4 w-[400px]">
                      {/* Modern header */}
                      <div className="mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-bold text-[#E7DFD6] mb-1">
                              Portfolio
                            </h3>
                            <p className="text-xs text-[#E7DFD6]/50 font-medium">
                              Explore creative work across{" "}
                              {Object.keys(groupedPortfolio).length} categories
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-[#B08B57]/15 flex items-center justify-center">
                            <Palette className="w-4 h-4 text-[#B08B57]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[380px] overflow-y-auto modern-scrollbar">
                        {Object.entries(groupedPortfolio).map(
                          ([category, items]) => (
                            <div key={category} className="space-y-2">
                              {/* Smaller category header */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-1 rounded-full bg-[#B08B57]" />
                                <h4 className="text-xs font-bold text-[#B08B57] uppercase tracking-wider">
                                  {category}
                                </h4>
                                <div className="flex-1 h-px bg-gradient-to-r from-[#B08B57]/30 to-transparent" />
                                <div className="text-xs text-[#E7DFD6]/30 bg-white/5 px-2 py-0.5 rounded-full">
                                  {items.length}
                                </div>
                              </div>

                              <div className="grid gap-1.5">
                                {items.map((item) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => scrollToSection(item.id)}
                                      className={`w-full relative p-3 rounded-xl text-left transition-all duration-300 group ${
                                        activeSection === item.id
                                          ? "bg-[#B08B57]/15 ring-1 ring-[#B08B57]/30 text-[#B08B57]"
                                          : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/5 hover:ring-white/15"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <div
                                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                            activeSection === item.id
                                              ? "bg-[#B08B57]/20 text-[#B08B57]"
                                              : "bg-white/10 text-[#E7DFD6]/50 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                                          }`}
                                        >
                                          <IconComponent className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-semibold text-xs mb-0.5">
                                            {item.label}
                                          </div>
                                          <div className="text-xs text-[#E7DFD6]/50 leading-tight">
                                            {item.description}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Smaller active indicator */}
                                      {activeSection === item.id && (
                                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B08B57]" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Smaller CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-3 group relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B08B57] to-[#D4A574] text-[#0A0B0D] font-bold text-xs transition-all duration-300 hover:shadow-xl hover:shadow-[#B08B57]/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <PiContactlessPaymentFill className="w-4 h-4" />
                Let's Connect
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#E5B885] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
          {/* Modern Mobile Toggle */}
          <button
            className="lg:hidden relative z-10 p-2.5 rounded-lg bg-white/5 backdrop-blur-xl ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-4 h-4">
              <Menu
                className={`absolute inset-0 w-4 h-4 text-[#E7DFD6] transition-all duration-300 ${
                  isOpen
                    ? "opacity-0 rotate-90 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 w-4 h-4 text-[#E7DFD6] transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75"
                }`}
              />
            </div>
          </button>
        </div>
        {/* Modern Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 ease-out ${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-4 opacity-0 invisible"
          }`}
        >
          <div className="bg-[#141518] backdrop-blur-2xl border-b border-white/10 mx-4 mt-2 rounded-2xl">
            <div className="p-5 max-h-[80vh] overflow-y-auto modern-scrollbar">
              {/* Main Navigation */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-1 rounded-full bg-[#B08B57]" />
                  <h3 className="text-xs font-bold text-[#B08B57] uppercase tracking-wider">
                    Navigation
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {mainNavItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`mobile-nav-item relative p-3 rounded-xl text-left transition-all duration-300 group ${
                          activeSection === item.id
                            ? "bg-[#B08B57]/15 ring-1 ring-[#B08B57]/30 text-[#B08B57]"
                            : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/5"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                              activeSection === item.id
                                ? "bg-[#B08B57]/20 text-[#B08B57]"
                                : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-xs font-semibold">
                            {item.label}
                          </div>
                        </div>
                        {activeSection === item.id && (
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B08B57]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#B08B57]" />
                    <h3 className="text-xs font-bold text-[#B08B57] uppercase tracking-wider">
                      Portfolio
                    </h3>
                  </div>
                  <div className="text-xs text-[#E7DFD6]/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    {portfolioItems.length} Projects
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(groupedPortfolio).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#B08B57]" />
                        <h4 className="text-xs font-bold text-[#B08B57] uppercase tracking-wider">
                          {category}
                        </h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#B08B57]/20 to-transparent" />
                      </div>

                      <div className="space-y-1.5">
                        {items.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => scrollToSection(item.id)}
                              className={`w-full relative p-3 rounded-xl text-left transition-all duration-300 group ${
                                activeSection === item.id
                                  ? "bg-[#B08B57]/15 ring-1 ring-[#B08B57]/30 text-[#B08B57]"
                                  : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                    activeSection === item.id
                                      ? "bg-[#B08B57]/20 text-[#B08B57]"
                                      : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                                  }`}
                                >
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-xs mb-0.5">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-[#E7DFD6]/50 leading-tight">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                              {activeSection === item.id && (
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B08B57]" />
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
                      ? "bg-[#B08B57]/15 ring-1 ring-[#B08B57]/30 text-[#B08B57]"
                      : "bg-white/5 hover:bg-white/10 text-[#E7DFD6]/80 hover:text-[#E7DFD6] ring-1 ring-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          activeSection === "contact"
                            ? "bg-[#B08B57]/20 text-[#B08B57]"
                            : "bg-white/10 text-[#E7DFD6]/60 group-hover:bg-[#B08B57]/10 group-hover:text-[#B08B57]"
                        }`}
                      >
                        <PiContactlessPaymentFill className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm mb-0.5">
                          Get In Touch
                        </div>
                        <div className="text-xs text-[#E7DFD6]/50">
                          Let's discuss your project
                        </div>
                      </div>
                    </div>
                    <div className="text-lg group-hover:translate-x-1 transition-transform duration-300 opacity-60">
                      →
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>{" "}
      <style>{` @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } } .animate-slide-in-up { animation: slideInUp 0.3s ease-out forwards; } .animate-fade-in-scale { animation: fadeInScale 0.4s ease-out forwards; } /* Modern scrollbar */ .modern-scrollbar::-webkit-scrollbar { width: 4px; } .modern-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 2px; } .modern-scrollbar::-webkit-scrollbar-thumb { background: rgba(176, 139, 87, 0.4); border-radius: 2px; border: 1px solid rgba(176, 139, 87, 0.2); } .modern-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(176, 139, 87, 0.6); } /* Mobile nav animation */ .mobile-nav-item { animation: slideInUp 0.4s ease-out forwards; opacity: 0; } .mobile-nav-item:nth-child(1) { animation-delay: 0.1s; } .mobile-nav-item:nth-child(2) { animation-delay: 0.15s; } .mobile-nav-item:nth-child(3) { animation-delay: 0.2s; } .mobile-nav-item:nth-child(4) { animation-delay: 0.25s; } .mobile-nav-item:nth-child(5) { animation-delay: 0.3s; } /* Modern focus styles */ button:focus-visible { outline: 2px solid rgba(176, 139, 87, 0.5); outline-offset: 2px; border-radius: 12px; } /* Smooth transitions */ * { transition-property: color, background-color, border-color, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); } /* Smooth scrolling */ html { scroll-behavior: smooth; } /* Prevent text selection on nav elements */ nav button { user-select: none; -webkit-user-select: none; -moz-user-select: none; } `}</style>
    </>
  );
};

export default Navbar;
