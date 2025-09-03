import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import qr from "../assets/qr.png"; // Make sure QR is imported

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

  return (
    <section
      id="copyright"
      className="relative overflow-hidden text-[#E7DFD6] py-12 px-6 sm:px-8 lg:px-16"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1F232B 0%, #141518 40%, #0A0B0D 100%)"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-[#B08B57]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-[#E7DFD6]/5 rounded-full blur-2xl animate-float-reverse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Logo and Pill Section (remains the same) */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#B08B57]/20 via-[#E7DFD6]/10 to-[#6B7785]/15 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse" />
            <div className="relative animate-float">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_8px_16px_rgba(176,139,87,0.3)] group-hover:scale-110 transition-transform duration-500 "
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-[#B08B57]/30 group-hover:ring-[#B08B57]/50 transition-all duration-500 " />
            </div>
          </div>
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57] animate-pulse" />
            <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
              Thanks for visiting
            </span>
          </div>
        </div>

        {/* --- MODIFIED SECTION FOR RESPONSIVE QR CODE --- */}
        <div className="w-full mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* QR Code Block (Left Side on Desktop) */}
          <div className="order-last md:order-first">
            {" "}
            {/* Reorders element on mobile */}
            <div className="bg-white/5 p-1.5 rounded-lg ring-1 ring-white/10 backdrop-blur-sm shadow-lg">
              <img
                src={qr}
                alt="QR Code"
                className="w-20 h-20 object-contain"
              />
              <p className="text-[10px] sm:text-xs text-center text-[#E7DFD6]/60 mt-2 font-medium">
                {" "}
                Scan Me{" "}
              </p>
            </div>
          </div>
          {/* Main Content Block (Center on Desktop) */}
          <div className="text-center">
            {/* Copyright */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base">
                &copy; {currentYear} All rights reserved.
              </p>
              <p className="text-sm sm:text-base">
                Designed by{" "}
                <a
                  href="https://ishanhatharasinghe.github.io/portfolio_web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#E7DFD6] via-[#B08B57] to-[#6B7785] font-semibold hover:opacity-90 transition-opacity"
                >
                  {designerName}
                </a>
              </p>
            </div>

            {/* Links */}
            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
              {homeHref && (
                <a
                  href={homeHref}
                  className="text-sm font-medium text-[#E7DFD6]/80 hover:text-[#E7DFD6] transition-colors relative group"
                  aria-label="Home"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B08B57] to-[#E7DFD6] group-hover:w-full transition-all duration-300" />
                </a>
              )}
              {contactHref && (
                <>
                  <span className="text-[#E7DFD6]/30">•</span>
                  <a
                    href={contactHref}
                    className="text-sm font-medium text-[#E7DFD6]/80 hover:text-[#E7DFD6] transition-colors relative group"
                    aria-label="Contact"
                  >
                    <span className="relative z-10">Contact</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B08B57] to-[#E7DFD6] group-hover:w-full transition-all duration-300" />
                  </a>
                </>
              )}
              <span className="text-[#E7DFD6]/30">•</span>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-2 text-sm font-medium text-[#0A0B0D] px-4 py-2 rounded-full overflow-hidden"
                style={{
                  background: COLORS.bronze,
                  boxShadow: "0 12px 28px -16px rgba(176,139,87,.45)"
                }}
                aria-label="Back to top"
                title="Back to top"
              >
                <span className="relative z-10">Back to top</span>
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
          {/* Spacer Block (Right Side on Desktop, Hidden on Mobile) */}
          <div className="hidden md:block w-24 h-24" />{" "}
          {/* Balances QR code for centering */}
        </div>

        {/* Decorative bottom border (remains the same) */}
        <div className="mt-12 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B08B57]/50 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-[#B08B57]/60" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#E7DFD6]/30 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-[#E7DFD6]/40" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B08B57]/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Defaults and Prop Types (remain the same)
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
