import { Suspense, lazy, useEffect, useRef, useState } from "react"; // Import lazy + Suspense for section code splitting
import "./index.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AboutMe from "./Components/AboutMe";
import Contact from "./Components/Contact";
import Skills from "./Components/Skills";
import Copyright from "./Components/Copyright";
import Preloader from "./Components/Preloader";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthProvider } from "./Components/AuthContext";

const Content = lazy(() => import("./Components/Content"));
const SocialMediaPosts = lazy(() => import("./Components/SocialMediaPosts"));
const Logo = lazy(() => import("./Components/Logo"));
const YoutubeThumbnails = lazy(() => import("./Components/YoutubeThumbnails"));
const SocialMediaCover = lazy(() => import("./Components/SocialMediaCover"));
const BookCover = lazy(() => import("./Components/BookCover"));
const Tdesigns = lazy(() => import("./Components/TDesigns"));
const BusinessCarddesigns = lazy(() => import("./Components/Businesscard"));
const CV = lazy(() => import("./Components/CVdesigns"));
const Bookmark = lazy(() => import("./Components/Bookmark"));
const Banner = lazy(() => import("./Components/Banner"));
const Pricing = lazy(() => import("./Components/Pricing"));

const SectionLoader = () => (
  <div className="min-h-[28vh] flex items-center justify-center text-white/60">
    Loading section…
  </div>
);

import Image1 from "./assets/Home Section/main post.jpg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null); // Ref for accessibility

  useEffect(() => {
    if (!isLoading) {
      const seen = sessionStorage.getItem("welcomePopupShown");
      if (!seen) {
        setShowPopup(true);
        sessionStorage.setItem("welcomePopupShown", "1");
      }
    }
  }, [isLoading]);

  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

    // Simulate loading time and ensure minimum display duration
    const minLoadTime = 500; 
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("keydown", handleEscape);
      if (popupRef.current) {
        const closeButton = popupRef.current.querySelector(
          'button[aria-label="Close"]'
        );
        if (closeButton) closeButton.focus();
      }
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showPopup]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Preloader */}
      <Preloader isVisible={isLoading} />

      {/* Welcome Popup */}
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          className="flex items-center justify-center fixed inset-0 z-[9999] bg-black/70"
          onClick={closePopup}
        >
          <div
            ref={popupRef}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button on top-right of the image */}
            <button
              onClick={closePopup}
              aria-label="Close"
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 text-black shadow-md 
                         hover:bg-white hover:scale-105 transition flex items-center justify-center text-lg"
            >
              ✕
            </button>

            {/* Image centered */}
            <img
              src={Image1}
              alt="Welcome"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />

        <div id="home">
          <Home />
        </div>

        <div id="about">
          <AboutMe />
        </div>

        <div id="content">
          <Suspense fallback={<SectionLoader />}>
            <Content />
          </Suspense>
        </div>

        <div id="Pricing">
          <Suspense fallback={<SectionLoader />}>
            <Pricing />
          </Suspense>
        </div>

        <div id="socialMediaPosts">
          <Suspense fallback={<SectionLoader />}>
            <SocialMediaPosts />
          </Suspense>
        </div>

        <div id="logo">
          <Suspense fallback={<SectionLoader />}>
            <Logo />
          </Suspense>
        </div>

        <div id="youtubeThumbnails">
          <Suspense fallback={<SectionLoader />}>
            <YoutubeThumbnails />
          </Suspense>
        </div>

        <div id="socialMediaCover">
          <Suspense fallback={<SectionLoader />}>
            <SocialMediaCover />
          </Suspense>
        </div>

        <div id="bookCover">
          <Suspense fallback={<SectionLoader />}>
            <BookCover />
          </Suspense>
        </div>

        <div id="Tdesigns">
          <Suspense fallback={<SectionLoader />}>
            <Tdesigns />
          </Suspense>
        </div>

        <div id="BusinessCarddesigns">
          <Suspense fallback={<SectionLoader />}>
            <BusinessCarddesigns />
          </Suspense>
        </div>

        <div id="CV">
          <Suspense fallback={<SectionLoader />}>
            <CV />
          </Suspense>
        </div>

        <div id="Bookmark">
          <Suspense fallback={<SectionLoader />}>
            <Bookmark />
          </Suspense>
        </div>

        <div id="Banner">
          <Suspense fallback={<SectionLoader />}>
            <Banner />
          </Suspense>
        </div>


        <div id="contact">
          <Contact />
        </div>

        <div id="copyright">
          <Copyright />
        </div>
      </div>
    </>
  );
}

export default App;
