import { useState, useEffect } from "react";
import "./index.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AboutMe from "./Components/AboutMe";
import Content from "./Components/Content";
import SocialMediaPosts from "./Components/SocialMediaPosts";
import Logo from "./Components/Logo";
import YoutubeThumbnails from "./Components/YoutubeThumbnails";
import SocialMediaCover from "./Components/SocialMediaCover";
import BookCover from "./Components/BookCover";
import Contact from "./Components/Contact";
import Skills from "./Components/Skills";
import Copyright from "./Components/Copyright";
import TempHome from "./Components/TempHome";
import Tdesigns from "./Components/TDesigns";
import BusinessCarddesigns from "./Components/Businesscard";
import CV from "./Components/CVdesigns";
import Bookmark from "./Components/Bookmark";
import Banner from "./Components/Banner";
import Preloader from "./Components/Preloader";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

    // Simulate loading time and ensure minimum display duration
    const minLoadTime = 2500; // Minimum 2.5 seconds
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

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

      {/* Main content - hidden during loading */}
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
          <Content />
        </div>

        <div id="socialMediaPosts">
          <SocialMediaPosts />
        </div>

        <div id="logo">
          <Logo />
        </div>

        <div id="youtubeThumbnails">
          <YoutubeThumbnails />
        </div>

        <div id="socialMediaCover">
          <SocialMediaCover />
        </div>

        <div id="bookCover">
          <BookCover />
        </div>

        <div id="Tdesigns">
          <Tdesigns />
        </div>

        <div id="BusinessCarddesigns">
          <BusinessCarddesigns />
        </div>

        <div id="CV">
          <CV />
        </div>

        <div id="Bookmark">
          <Bookmark />
        </div>

        <div id="Banner">
          <Banner />
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
