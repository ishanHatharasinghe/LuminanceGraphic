import { motion } from "framer-motion";
import { FaArrowDown, FaBriefcase, FaEnvelope } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import bg from "./../assets/TempScreen/Thai Pongal/bg5.jpg";
import temp1 from "./../assets/TempScreen/Thai Pongal/1.png";

const TempHome = () => {
  const [isTextVisible, setIsTextVisible] = useState(true);

  const handleTypewriterComplete = () => {
    setIsTextVisible(false);
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Top Image */}
      <div className="relative z-50">
        <img
          src={temp1}
          alt="Top Decoration"
          className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 w-1/2 md:w-1/3 lg:w-1/4"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#0a0a0a]/70 text-[#fafafa] fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-lg font-bold">MyPortfolio</div>
        <ul className="flex space-x-6 text-sm">
          <li>
            <a
              href="#home"
              className="hover:text-[#60a5fa] transition-all duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-[#60a5fa] transition-all duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-[#60a5fa] transition-all duration-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-[#60a5fa] transition-all duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-[#fafafa] relative pt-24"
      >
        {/* Content Container */}
        <motion.div
          className="text-center px-6 py-12 bg-gradient-to-b from-[#0a0a0a]/70 to-transparent rounded-lg w-[90%] md:w-[70%] lg:w-[50%] mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Subheading */}
          <motion.p
            className="text-4xl font-bold md:text-4xl mb-21 text-[#fafafa] p-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Welcome to my Portfolio.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl mb-8 text-[#fafafa] p-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I craft stunning visual designs that communicate your message
            effectively.
          </motion.p>

          {/* Call-to-Action */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <a
              href="#content"
              className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-[#fafafa] px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <FaBriefcase /> View My Work
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-[#60a5fa] text-[#60a5fa] px-6 py-3 rounded-full hover:bg-[#60a5fa] hover:text-white hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <FaEnvelope /> Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 flex justify-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <a
            href="#about"
            className="text-[#fafafa] hover:text-[#60a5fa] transition-all duration-300 flex flex-col items-center"
          >
            <FaArrowDown className="text-2xl animate-bounce" />
            <span className="mt-2 text-sm">Scroll Down</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default TempHome;
