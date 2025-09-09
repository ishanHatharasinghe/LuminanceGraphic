import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRegClock } from "react-icons/fa";

const COLORS = {
  marble: "#E7DFD6",
  bronze: "#B08B57",
  bronzeLight: "#C89B67",
  ink: "#1F232B",
  darkBg: "#0A0B0D",
  darkCard: "#141518",
  slate: "#6B7785",
  peach: "#F1D6BF"
};

const formatLKR = (n) =>
  `LKR ${Number(n).toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

const sectionMap = {
  post: "socialMediaPosts",
  thumbnail: "youtubeThumbnails",
  logo: "logo",
  cover: "socialMediaCover",
  tshirt: "Tdesigns",
  bookmark: "Bookmark",
  banner: "Banner",
  flyer: "Banner",
  poster: "Banner",
  cv: "CV",
  leaflet: "Banner",
  bookcover: "bookCover",
  "business-card": "BusinessCarddesigns",
  cap: "Tdesigns"
};

const bundles = [
  {
    key: "bundle-5-posts",
    title: "5 Social Media Posts",
    subtitle: "Bundle Deal",
    price: 4500,
    originalPrice: 5000,
    savings: 500,
    note: "Save LKR 500",
    isPopular: true
  },
  {
    key: "bundle-10-posts",
    title: "10 Social Media Posts",
    subtitle: "Best Value Bundle",
    price: 8000,
    originalPrice: 10000,
    savings: 2000,
    note: "Save LKR 2,000",
    isPopular: true
  }
];

const aLaCarte = [
  { key: "post", title: "Social Media Post", note: "per post", price: 1000 },
  {
    key: "thumbnail",
    title: "YouTube Thumbnail",
    note: "per thumbnail",
    price: 1000
  },
  { key: "logo", title: "Logo Design", note: "mark + system", price: 1500 },
  {
    key: "cover",
    title: "Social Media Cover Image",
    note: "platform‑specific",
    price: 1200
  },
  {
    key: "tshirt",
    title: "T‑Shirt Design",
    note: "standard / premium",
    priceRange: [1200, 1800]
  },
  {
    key: "bookmark",
    title: "Bookmark Design",
    note: "single / double",
    priceRange: [600, 800]
  },
  { key: "banner", title: "Banner", note: "print‑ready", price: 2000 },
  { key: "flyer", title: "Flyer", note: "single‑sided", price: 1000 },
  { key: "poster", title: "Poster", note: "A3 or similar", price: 1200 },
  {
    key: "cv",
    title: "CV/Resume Design",
    note: "basic / premium",
    priceRange: [800, 1200]
  },
  {
    key: "leaflet",
    title: "Leaflet",
    note: "single / double",
    priceRange: [800, 1200]
  },
  {
    key: "bookcover",
    title: "Book/Tute Cover",
    note: "print or digital",
    price: 1800
  },
  {
    key: "business-card",
    title: "Business Card Design",
    note: "front & back",
    priceRange: [1200, 1500]
  },
  {
    key: "cap",
    title: "Cap Design",
    note: "embroidered / print",
    price: 1500
  }
];

const Pricing = () => {
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const [activeTab, setActiveTab] = useState("bundles");

  const renderPrice = (item) => {
    if (item?.request)
      return <span className="text-[#E7DFD6]/70 italic">Request quote</span>;
    if (item?.priceRange?.length === 2) {
      const [min, max] = item.priceRange;
      return (
        <p className="text-[#B08B57] font-semibold text-lg text-right">
          {formatLKR(min)} - {formatLKR(max)}
        </p>
      );
    }
    return (
      <p className="text-[#B08B57] font-semibold text-lg text-right">
        {formatLKR(item.price)}
      </p>
    );
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden text-[#E7DFD6] py-20 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1F232B 0%, #141518 40%, #0A0B0D 100%)"
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMouse({ x: `${x}%`, y: `${y}%` });
      }}
    >
      {/* Glow cursor effect */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700"
        style={{
          background: `radial-gradient(550px circle at ${mouse.x} ${mouse.y}, rgba(176,139,87,0.13), transparent 60%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header area */}
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full px-5 py-2.5 shadow-md">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B08B57] shadow-[0_0_0_4px_rgba(176,139,87,0.18)]" />
          <span className="text-xs md:text-sm text-[#E7DFD6]/80 font-medium tracking-wide">
            Transparent pricing in LKR
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] relative">
          <span className="block overflow-hidden">
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-[#E7DFD6] via-[#B08B57] to-[#6B7785]">
              Pricing
            </span>
          </span>
          <div
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B08B57] to-transparent"
            style={{ width: 190 }}
          />
        </h2>

        <p className="mt-6 max-w-2xl text-[#E7DFD6]/60 leading-relaxed text-base">
          Choose exactly what you need—transparent, per‑item pricing in LKR with
          money
        </p>

        {/* Tab Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab("bundles")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "bundles"
                  ? "bg-[#B08B57] text-black shadow-lg"
                  : "text-[#E7DFD6]/70 hover:text-[#E7DFD6] hover:bg-white/5"
              }`}
            >
              Package Bundles
            </button>
            <button
              onClick={() => setActiveTab("individual")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "individual"
                  ? "bg-[#B08B57] text-black shadow-lg"
                  : "text-[#E7DFD6]/70 hover:text-[#E7DFD6] hover:bg-white/5"
              }`}
            >
              Individual Items
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative max-w-7xl mx-auto px-6 mt-8">
        {activeTab === "bundles" && (
          <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
            <div className="mb-6">
              <p className="text-[#E7DFD6]/60 text-sm">
                Save more with our bundle deals
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
              {bundles.map((bundle, idx) => (
                <div
                  key={bundle.key}
                  className="group relative bg-gradient-to-br from-[#1F232B] to-[#141518] rounded-xl p-6 border-2 border-[#B08B57]/30 hover:border-[#B08B57]/50 transition duration-300 shadow-xl hover:shadow-2xl"
                >
                  {bundle.isPopular && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-[#B08B57] text-black px-3 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-[#E7DFD6]">
                        {bundle.title}
                      </h4>
                      <p className="text-sm text-[#B08B57] font-medium">
                        {bundle.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#B08B57]">
                        {formatLKR(bundle.price)}
                      </p>
                      <p className="text-sm text-[#E7DFD6]/50 line-through">
                        {formatLKR(bundle.originalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#B08B57]/10 rounded-lg p-3 mb-4">
                    <p className="text-sm text-[#B08B57] font-semibold">
                      💰 {bundle.note}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-[#E7DFD6]/50 gap-2">
                      <FaRegClock className="text-base" />
                      3–5 biz days
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => scrollToSection("socialMediaPosts")}
                        className="bg-[#B08B57] text-black px-3 py-1.5 rounded-full text-xs font-medium hover:brightness-110 transition"
                      >
                        Designs
                      </button>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById("contact");
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start"
                            });
                        }}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#E7DFD6] hover:border-white/30 transition"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "individual" && (
          <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
            <div className="mb-6">
              <p className="text-[#E7DFD6]/60 text-sm">
                A la carte pricing for single items
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aLaCarte.map((item, idx) => (
                <div
                  key={item.key}
                  className="group bg-[#141518] rounded-xl p-6 border border-white/10 hover:border-white/20 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  {/* Title and price */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.note && (
                        <p className="text-sm text-[#E7DFD6]/60 mt-1">
                          {item.note}
                        </p>
                      )}
                    </div>
                    {renderPrice(item)}
                  </div>

                  {/* Footer area */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-sm text-[#E7DFD6]/50 gap-2">
                      <FaRegClock className="text-base" />
                      1–2 biz days
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          scrollToSection(sectionMap[item.key] || "content")
                        }
                        className="bg-[#B08B57] text-black px-3 py-1.5 rounded-full text-xs font-medium hover:brightness-110 transition"
                      >
                        Designs
                      </button>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById("contact");
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start"
                            });
                        }}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#E7DFD6] hover:border-white/30 transition"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
