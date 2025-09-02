// src/Components/Preloader.jsx
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57",
  darkBg: "#0A0B0D",
  darkCard: "#141518",
  slate: "#6B7785",
  ink: "#1F232B",
  peach: "#F1D6BF"
};

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          // Delay before calling onComplete to show completion animation
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        // Random increment for more natural feel
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center transition-all duration-1000 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.ink} 0%, ${COLORS.darkCard} 40%, ${COLORS.darkBg} 100%)`,
        minHeight: "100vh"
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#B08B57]/10 to-[#E7DFD6]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-[#6B7785]/10 to-[#B08B57]/8 rounded-full blur-2xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#E7DFD6]/5 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo container with complex animations */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute -inset-8 rounded-full border border-[#B08B57]/30 animate-spin-slow" />

          {/* Middle pulsing ring */}
          <div className="absolute -inset-6 rounded-full ring-1 ring-[#E7DFD6]/20 animate-pulse" />

          {/* Glow effect */}
          <div className="absolute -inset-12 bg-gradient-to-r from-[#B08B57]/20 via-[#E7DFD6]/10 to-[#6B7785]/15 rounded-full blur-2xl animate-pulse" />

          {/* Logo */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={logo}
              alt="Loading..."
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(176,139,87,0.4)] animate-float"
              style={{
                transform: `scale(${0.8 + (progress / 100) * 0.2})`
              }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-light tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
              Loading Luminance Graphic
            </span>
          </h2>

          {/* Progress bar */}
          <div className="w-64 sm:w-80 mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#E7DFD6]/60">Progress</span>
              <span className="text-xs text-[#B08B57] font-medium">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress bar container */}
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Progress fill */}
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#B08B57] via-[#E7DFD6] to-[#B08B57] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
              </div>

              {/* Glow effect */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 h-3 bg-[#B08B57]/30 blur-sm rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  left: 0
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 bg-[#B08B57] rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-[#E7DFD6] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-[#6B7785] rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>

      {/* Completion animation overlay */}
      {isComplete && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#B08B57]/20 to-[#E7DFD6]/20 animate-pulse" />
      )}

      {/* Custom styles */}
      <style>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(-12px) scale(1.02); } 
        }
        @keyframes float-reverse { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(12px) scale(0.98); } 
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-shine { animation: shine 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Preloader;
