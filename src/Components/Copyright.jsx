import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import qr from "../assets/qr.png";

const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57",
  darkBg: "#0A0B0D",
  darkCard: "#141518",
  slate: "#6B7785",
  ink: "#1F232B",
  peach: "#F1D6BF"
};

const Copyright = ({ designerName, contactHref, homeHref }) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const portfolioLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Content", id: "content" },
    { name: "Contact", id: "contact" }
  ];

  const designLinks = [
    { name: "Social Posts", id: "socialMediaPosts" },
    { name: "Logos", id: "logo" },
    { name: "YouTube Thumbnails", id: "youtubeThumbnails" },
    { name: "Book Covers", id: "bookCover" }
  ];

  const moreDesigns = [
    { name: "T-Shirt Designs", id: "Tdesigns" },
    { name: "Business Cards", id: "BusinessCarddesigns" },
    { name: "CV Designs", id: "CV" },
    { name: "Banners", id: "Banner" }
  ];

  return (
    <footer
      id="copyright"
      className="relative overflow-hidden text-[#E7DFD6] py-16 px-6 sm:px-8 lg:px-16"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1F232B 0%, #141518 40%, #0A0B0D 100%)"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-[#B08B57]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-[#E7DFD6]/5 rounded-full blur-2xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#6B7785]/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Logo and Brand Section */}
        <div className="flex flex-col items-center space-y-6 mb-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#B08B57]/20 via-[#E7DFD6]/10 to-[#6B7785]/15 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse" />
            <div className="relative animate-float">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_8px_16px_rgba(176,139,87,0.3)] group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-[#B08B57]/30 group-hover:ring-[#B08B57]/50 transition-all duration-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
              Luminance Graphic
            </h3>
            <p className="text-sm text-[#E7DFD6]/70">
              Creative Designer & Developer
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-white/8 backdrop-blur-xl ring-1 ring-white/15 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B08B57]/5 via-[#E7DFD6]/3 to-[#B08B57]/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57] animate-pulse relative z-10" />
            <span className="text-sm text-[#E7DFD6]/90 font-medium tracking-wide relative z-10">
              Thanks for visiting my portfolio
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
          </div>
        </div>

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Portfolio Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#B08B57] mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z"
                />
              </svg>
              Portfolio
            </h4>
            <ul className="space-y-3">
              {portfolioLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(link.id, e)}
                    className="text-[#E7DFD6]/70 hover:text-[#B08B57] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#6B7785] group-hover:bg-[#B08B57] transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Design Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#B08B57] mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Design Work
            </h4>
            <ul className="space-y-3">
              {designLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(link.id, e)}
                    className="text-[#E7DFD6]/70 hover:text-[#B08B57] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#6B7785] group-hover:bg-[#B08B57] transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Designs */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#B08B57] mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              More Designs
            </h4>
            <ul className="space-y-3">
              {moreDesigns.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(link.id, e)}
                    className="text-[#E7DFD6]/70 hover:text-[#B08B57] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#6B7785] group-hover:bg-[#B08B57] transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code and Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#B08B57] mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Connect
            </h4>

            {/* QR Code */}
            <div className="bg-white/5 p-3 rounded-lg ring-1 ring-white/10 backdrop-blur-sm shadow-lg w-fit">
              <img
                src={qr}
                alt="QR Code - Portfolio Link"
                className="w-24 h-24 object-contain"
              />
              <p className="text-xs text-center text-[#E7DFD6]/60 mt-2 font-medium">
                Scan for Portfolio
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E7DFD6]/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-sm">
                &copy; {currentYear} All rights reserved.
              </p>
              <p className="text-sm">
                Designed by{" "}
                <a
                  href="https://ishanhatharasinghe.github.io/portfolio_web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#E7DFD6] via-[#B08B57] to-[#6B7785] font-semibold hover:opacity-90 transition-opacity"
                >
                  Ishan Hatharasinghe
                </a>
              </p>
            </div>

            {/* Back to Top Button */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 text-sm font-medium text-[#0A0B0D] px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: COLORS.bronze,
                boxShadow: "0 12px 28px -16px rgba(176,139,87,.45)"
              }}
              aria-label="Back to top"
              title="Back to top"
            >
              <span className="relative z-10">Back to Top</span>
              <svg
                className="w-4 h-4 relative z-10 group-hover:translate-y-[-2px] transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C89B67] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-8 bg-[#B08B57]/35 blur-2xl group-hover:blur-3xl transition-all duration-500" />
              </div>
            </a>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B08B57]/50 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#B08B57]/60" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#E7DFD6]/30 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E7DFD6]/40" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B08B57]/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* CSS for animations (add to your index.css) */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

// Prop Types
Copyright.defaultProps = {
  designerName: "Ishan Hatharasinghe",
  homeHref: "#home",
  contactHref: "#contact"
};

Copyright.propTypes = {
  designerName: PropTypes.string,
  homeHref: PropTypes.string,
  contactHref: PropTypes.string
};

export default Copyright;
