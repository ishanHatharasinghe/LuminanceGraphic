// src/Components/SocialMediaPostsSection.jsx
import { useEffect, useRef, useState } from "react";

// Featured images (can be your gig1..gig9 or any you prefer)
import gig1 from "./../assets/Social Media Posts/gig1.jpg";
import gig2 from "./../assets/Social Media Posts/gig2.jpg";
import gig3 from "./../assets/Social Media Posts/gig3.jpg";
import gig4 from "./../assets/Social Media Posts/a.jpg";
import gig5 from "./../assets/Social Media Posts/b.jpg";
import gig6 from "./../assets/Social Media Posts/c.jpg";
import gig7 from "./../assets/Social Media Posts/d.jpg";
import gig8 from "./../assets/Social Media Posts/e.jpg";
import gig9 from "./../assets/Social Media Posts/f.jpg";

// See‑more gallery imports (you already have these at the top of your file)
import Image1 from "./../assets/Social Media Posts/upper (1).jpg";
import Image2 from "./../assets/Social Media Posts/upper (2).jpg";
import Image3 from "./../assets/Social Media Posts/upper (3).jpg";
import Image4 from "./../assets/Social Media Posts/upper (4).jpg";
import Image5 from "./../assets/Social Media Posts/upper (5).jpg";
import Image6 from "./../assets/Social Media Posts/upper (6).jpg";
import Image7 from "./../assets/Social Media Posts/upper (7).jpg";
import Image8 from "./../assets/Social Media Posts/upper (8).jpg";
import Image9 from "./../assets/Social Media Posts/upper (9).jpg";
import Image10 from "./../assets/Social Media Posts/upper (10).jpg";
import Image11 from "./../assets/Social Media Posts/upper (11).jpg";
import Image12 from "./../assets/Social Media Posts/upper (12).jpg";
import Image13 from "./../assets/Social Media Posts/upper (13).jpg";
import Image14 from "./../assets/Social Media Posts/upper (14).jpg";
import Image15 from "./../assets/Social Media Posts/upper (15).jpg";
import Image16 from "./../assets/Social Media Posts/upper (16).jpg";
import Image17 from "./../assets/Social Media Posts/upper (17).jpg";
import Image18 from "./../assets/Social Media Posts/upper (18).jpg";
import Image19 from "./../assets/Social Media Posts/upper (19).jpg";
import Image20 from "./../assets/Social Media Posts/upper (20).jpg";
import Image21 from "./../assets/Social Media Posts/upper (21).jpg";
import Image22 from "./../assets/Social Media Posts/upper (22).jpg";
import Image23 from "./../assets/Social Media Posts/upper (23).jpg";
import Image24 from "./../assets/Social Media Posts/upper (24).jpg";
import Image25 from "./../assets/Social Media Posts/upper (25).jpg";
import Image26 from "./../assets/Social Media Posts/upper (26).jpg";
import Image27 from "./../assets/Social Media Posts/upper (27).jpg";
import Image28 from "./../assets/Social Media Posts/lower (1).jpg";
import Image29 from "./../assets/Social Media Posts/lower (2).jpg";
import Image30 from "./../assets/Social Media Posts/lower (3).jpg";
import Image31 from "./../assets/Social Media Posts/lower (4).jpg";
import Image32 from "./../assets/Social Media Posts/lower (5).jpg";
import Image33 from "./../assets/Social Media Posts/lower (6).jpg";
import Image34 from "./../assets/Social Media Posts/lower (7).jpg";
import Image35 from "./../assets/Social Media Posts/lower (8).jpg";
import Image36 from "./../assets/Social Media Posts/lower (9).jpg";
import Image37 from "./../assets/Social Media Posts/lower (10).jpg";
import Image38 from "./../assets/Social Media Posts/lower (11).jpg";
import Image39 from "./../assets/Social Media Posts/lower (12).jpg";
import Image40 from "./../assets/Social Media Posts/lower (13).jpg";
import Image41 from "./../assets/Social Media Posts/lower (14).jpg";
import Image42 from "./../assets/Social Media Posts/lower (15).jpg";
import Image43 from "./../assets/Social Media Posts/lower (16).jpg";
import Image44 from "./../assets/Social Media Posts/lower (17).jpg";
import Image45 from "./../assets/Social Media Posts/lower (18).jpg";
import Image46 from "./../assets/Social Media Posts/lower (19).jpg";
import Image47 from "./../assets/Social Media Posts/lower (20).jpg";
import Image48 from "./../assets/Social Media Posts/lower (21).jpg";
import Image49 from "./../assets/Social Media Posts/lower (22).jpg";
import Image50 from "./../assets/Social Media Posts/lower (23).jpg";
import Image51 from "./../assets/Social Media Posts/lower (24).jpg";
import Image52 from "./../assets/Social Media Posts/lower (25).jpg";
import Image53 from "./../assets/Social Media Posts/lower (26).jpg";
import Image54 from "./../assets/Social Media Posts/lower (27).jpg";
import Image55 from "./../assets/Social Media Posts/lower (28).jpg";
import Image56 from "./../assets/Social Media Posts/lower (29).jpg";
import Image57 from "./../assets/Social Media Posts/lower (30).jpg";
import Image58 from "./../assets/Social Media Posts/lower (31).jpg";
import Image59 from "./../assets/Social Media Posts/lower (32).jpg";
import Image60 from "./../assets/Social Media Posts/lower (33).jpg";
import Image61 from "./../assets/Social Media Posts/lower (34).jpg";
import Image62 from "./../assets/Social Media Posts/lower (35).jpg";
import Image63 from "./../assets/Social Media Posts/lower (36).jpg";
import Image64 from "./../assets/Social Media Posts/lower (37).jpg";
import Image73 from "./../assets/Social Media Posts/lower (46).jpg";
import Image74 from "./../assets/Social Media Posts/lower (47).jpg";
import Image75 from "./../assets/Social Media Posts/lower (48).jpg";
import Image76 from "./../assets/Social Media Posts/lower (49).jpg";
import Image77 from "./../assets/Social Media Posts/lower (50).jpg";
import Image78 from "./../assets/Social Media Posts/lower (51).jpg";
import Image79 from "./../assets/Social Media Posts/lower (52).jpg";
import Image80 from "./../assets/Social Media Posts/lower (53).jpg";
import Image81 from "./../assets/Social Media Posts/lower (54).jpg";
import Image82 from "./../assets/Social Media Posts/lower (55).jpg";
import Image83 from "./../assets/Social Media Posts/lower (56).jpg";
import Image84 from "./../assets/Social Media Posts/lower (57).jpg";
import Image85 from "./../assets/Social Media Posts/lower (58).jpg";
import Image86 from "./../assets/Social Media Posts/lower (59).jpg";
import Image87 from "./../assets/Social Media Posts/lower (60).jpg";
import Image88 from "./../assets/Social Media Posts/lower (61).jpg";
import Image89 from "./../assets/Social Media Posts/lower (62).jpg";
import Image90 from "./../assets/Social Media Posts/lower (63).jpg";
import Image91 from "./../assets/Social Media Posts/lower (64).jpg";
import Image92 from "./../assets/Social Media Posts/lower (65).jpg";
import Image93 from "./../assets/Social Media Posts/lower (66).jpg";
import Image94 from "./../assets/Social Media Posts/lower (67).jpg";
import Image95 from "./../assets/Social Media Posts/lower (68).jpg";
import Image96 from "./../assets/Social Media Posts/lower (69).jpg";
import Image97 from "./../assets/Social Media Posts/lower (70).jpg";
import Image98 from "./../assets/Social Media Posts/lower (71).jpg";
import Image99 from "./../assets/Social Media Posts/lower (72).jpg";
import Image100 from "./../assets/Social Media Posts/lower (73).jpg";
import Image101 from "./../assets/Social Media Posts/lower (74).jpg";
import Image102 from "./../assets/Social Media Posts/lower (75).jpg";
import Image103 from "./../assets/Social Media Posts/lower (76).jpg";
import Image104 from "./../assets/Social Media Posts/lower (77).jpg";
import Image105 from "./../assets/Social Media Posts/lower (78).jpg";
import Image106 from "./../assets/Social Media Posts/lower (79).jpg";
import Image107 from "./../assets/Social Media Posts/lower (80).jpg";
import Image108 from "./../assets/Social Media Posts/lower (81).jpg";
import Image109 from "./../assets/Social Media Posts/lower (82).jpg";
import Image110 from "./../assets/Social Media Posts/lower (83).jpg";
import Image111 from "./../assets/Social Media Posts/lower (84).jpg";
import Image112 from "./../assets/Social Media Posts/lower (85).jpg";
import Image113 from "./../assets/Social Media Posts/lower (86).jpg";
import Image114 from "./../assets/Social Media Posts/lower (87).jpg";
import Image115 from "./../assets/Social Media Posts/lower (88).jpg";
import Image116 from "./../assets/Social Media Posts/lower (89).jpg";
import Image117 from "./../assets/Social Media Posts/lower (90).jpg";
import Image118 from "./../assets/Social Media Posts/lower (91).jpg";
import Image119 from "./../assets/Social Media Posts/lower (92).jpg";
import Image120 from "./../assets/Social Media Posts/lower (93).jpg";
import Image121 from "./../assets/Social Media Posts/lower (94).jpg";
import Image122 from "./../assets/Social Media Posts/lower (95).jpg";
import Image123 from "./../assets/Social Media Posts/lower (96).jpg";
import Image124 from "./../assets/Social Media Posts/lower (97).jpg";
import Image125 from "./../assets/Social Media Posts/lower (98).jpg";
import Image126 from "./../assets/Social Media Posts/lower (99).jpg";
import Image127 from "./../assets/Social Media Posts/lower (100).jpg";
import Image128 from "./../assets/Social Media Posts/lower (101).jpg";
import Image129 from "./../assets/Social Media Posts/lower (102).jpg";
import Image130 from "./../assets/Social Media Posts/lower (103).jpg";
import Image131 from "./../assets/Social Media Posts/lower (104).jpg";
import Image132 from "./../assets/Social Media Posts/lower (105).jpg";
import Image133 from "./../assets/Social Media Posts/lower (106).jpg";
import Image134 from "./../assets/Social Media Posts/lower (107).jpg";
import Image135 from "./../assets/Social Media Posts/lower (108).jpg";
import Image136 from "./../assets/Social Media Posts/lower (109).jpg";
import Image137 from "./../assets/Social Media Posts/lower (110).jpg";
import Image138 from "./../assets/Social Media Posts/lower (111).jpg";
import Image139 from "./../assets/Social Media Posts/lower (112).jpg";
import Image140 from "./../assets/Social Media Posts/lower (113).jpg";
import Image141 from "./../assets/Social Media Posts/lower (114).jpg";
import Image142 from "./../assets/Social Media Posts/lower (115).jpg";
import Image143 from "./../assets/Social Media Posts/lower (116).jpg";
import Image144 from "./../assets/Social Media Posts/lower (117).jpg";
import Image145 from "./../assets/Social Media Posts/lower (118).jpg";
import Image146 from "./../assets/Social Media Posts/upper (28).jpg";

import NewImage1 from "./../assets/Social Media Posts/new/newimg (1).jpg";
import NewImage2 from "./../assets/Social Media Posts/new/newimg (2).jpg";
import NewImage3 from "./../assets/Social Media Posts/new/newimg (3).jpg";
import NewImage4 from "./../assets/Social Media Posts/new/newimg (4).jpg";
import NewImage5 from "./../assets/Social Media Posts/new/newimg (5).jpg";
import NewImage6 from "./../assets/Social Media Posts/new/newimg (6).jpg";
import NewImage7 from "./../assets/Social Media Posts/new/newimg (7).jpg";
import NewImage8 from "./../assets/Social Media Posts/new/newimg (8).jpg";
import NewImage9 from "./../assets/Social Media Posts/new/newimg (9).jpg";
import NewImage10 from "./../assets/Social Media Posts/new/newimg (10).jpg";
import NewImage11 from "./../assets/Social Media Posts/new/newimg (11).jpg";
import NewImage12 from "./../assets/Social Media Posts/new/newimg (12).jpg";
import NewImage13 from "./../assets/Social Media Posts/new/newimg (13).jpg";
import NewImage14 from "./../assets/Social Media Posts/new/newimg (14).jpg";
import NewImage15 from "./../assets/Social Media Posts/new/newimg (15).jpg";
import NewImage16 from "./../assets/Social Media Posts/new/newimg (16).jpg";
import NewImage17 from "./../assets/Social Media Posts/new/newimg (17).jpg";
import NewImage18 from "./../assets/Social Media Posts/new/newimg (18).jpg";
import NewImage19 from "./../assets/Social Media Posts/new/newimg (19).jpg";
import NewImage20 from "./../assets/Social Media Posts/new/newimg (20).jpg";
import NewImage21 from "./../assets/Social Media Posts/new/newimg (21).jpg";
import NewImage22 from "./../assets/Social Media Posts/new/newimg (22).jpg";
import NewImage23 from "./../assets/Social Media Posts/new/newimg (23).jpg";
import NewImage24 from "./../assets/Social Media Posts/new/newimg (24).jpg";
import NewImage25 from "./../assets/Social Media Posts/new/newimg (25).jpg";
import NewImage26 from "./../assets/Social Media Posts/new/newimg (26).jpg";
import NewImage27 from "./../assets/Social Media Posts/new/newimg (27).jpg";
import NewImage28 from "./../assets/Social Media Posts/new/newimg (28).jpg";
import NewImage29 from "./../assets/Social Media Posts/new/newimg (29).jpg";
import NewImage30 from "./../assets/Social Media Posts/new/newimg (30).jpg";
import NewImage31 from "./../assets/Social Media Posts/new/newimg (31).jpg";
import NewImage32 from "./../assets/Social Media Posts/new/newimg (32).jpg";
import NewImage33 from "./../assets/Social Media Posts/new/newimg (33).jpg";
import NewImage34 from "./../assets/Social Media Posts/new/newimg (34).jpg";
import NewImage35 from "./../assets/Social Media Posts/new/newimg (35).jpg";
import NewImage36 from "./../assets/Social Media Posts/new/newimg (36).jpg";
import NewImage37 from "./../assets/Social Media Posts/new/newimg (37).jpg";
import NewImage38 from "./../assets/Social Media Posts/new/newimg (38).jpg";
import NewImage39 from "./../assets/Social Media Posts/new/newimg (39).jpg";
import NewImage40 from "./../assets/Social Media Posts/new/newimg (40).jpg";
import NewImage41 from "./../assets/Social Media Posts/new/newimg (41).jpg";
import NewImage42 from "./../assets/Social Media Posts/new/newimg (42).jpg";
import NewImage43 from "./../assets/Social Media Posts/new/newimg (43).jpg";
import NewImage44 from "./../assets/Social Media Posts/new/newimg (44).jpg";
import NewImage45 from "./../assets/Social Media Posts/new/newimg (45).jpg";
import NewImage46 from "./../assets/Social Media Posts/new/newimg (46).jpg";
import NewImage47 from "./../assets/Social Media Posts/new/newimg (47).jpg";
import NewImage48 from "./../assets/Social Media Posts/new/newimg (48).jpg";
import NewImage49 from "./../assets/Social Media Posts/new/newimg (49).jpg";
import NewImage50 from "./../assets/Social Media Posts/new/newimg (50).jpg";
import NewImage51 from "./../assets/Social Media Posts/new/newimg (51).jpg";
import NewImage52 from "./../assets/Social Media Posts/new/newimg (52).jpg";
import NewImage53 from "./../assets/Social Media Posts/new/newimg (53).jpg";
import NewImage54 from "./../assets/Social Media Posts/new/newimg (54).jpg";
import NewImage55 from "./../assets/Social Media Posts/new/newimg (55).jpg";
import NewImage56 from "./../assets/Social Media Posts/new/newimg (56).jpg";
import NewImage57 from "./../assets/Social Media Posts/new/newimg (57).jpg";
import NewImage58 from "./../assets/Social Media Posts/new/newimg (58).jpg";
import NewImage59 from "./../assets/Social Media Posts/new/newimg (59).jpg";
import NewImage60 from "./../assets/Social Media Posts/new/newimg (60).jpg";
import NewImage61 from "./../assets/Social Media Posts/new/newimg (61).jpg";
import NewImage62 from "./../assets/Social Media Posts/new/newimg (62).jpg";
import NewImage63 from "./../assets/Social Media Posts/new/newimg (63).jpg";
import NewImage64 from "./../assets/Social Media Posts/new/newimg (64).jpg";
import NewImage65 from "./../assets/Social Media Posts/new/newimg (65).jpg";
import NewImage66 from "./../assets/Social Media Posts/new/newimg (66).jpg";
import NewImage67 from "./../assets/Social Media Posts/new/newimg (67).jpg";
import NewImage68 from "./../assets/Social Media Posts/new/newimg (68).jpg";
import NewImage69 from "./../assets/Social Media Posts/new/newimg (69).jpg";
import NewImage70 from "./../assets/Social Media Posts/new/newimg (70).jpg";
import NewImage71 from "./../assets/Social Media Posts/new/newimg (71).jpg";
import NewImage72 from "./../assets/Social Media Posts/new/newimg (72).jpg";
import NewImage73 from "./../assets/Social Media Posts/new/newimg (73).jpg";
import NewImage74 from "./../assets/Social Media Posts/new/newimg (74).jpg";
import NewImage75 from "./../assets/Social Media Posts/new/newimg (75).jpg";
import NewImage76 from "./../assets/Social Media Posts/new/newimg (76).jpg";
import NewImage77 from "./../assets/Social Media Posts/new/newimg (77).jpg";
import NewImage78 from "./../assets/Social Media Posts/new/newimg (78).jpg";
import NewImage79 from "./../assets/Social Media Posts/new/newimg (79).jpg";
import NewImage80 from "./../assets/Social Media Posts/new/newimg (80).jpg";
import NewImage81 from "./../assets/Social Media Posts/new/newimg (81).jpg";
import NewImage82 from "./../assets/Social Media Posts/new/newimg (82).jpg";
import NewImage83 from "./../assets/Social Media Posts/new/newimg (83).jpg";
import NewImage84 from "./../assets/Social Media Posts/new/newimg (84).jpg";
import NewImage85 from "./../assets/Social Media Posts/new/newimg (85).jpg";
import NewImage86 from "./../assets/Social Media Posts/new/newimg (86).jpg";
import NewImage87 from "./../assets/Social Media Posts/new/newimg (87).jpg";
import NewImage88 from "./../assets/Social Media Posts/new/newimg (88).jpg";
import NewImage89 from "./../assets/Social Media Posts/new/newimg (89).jpg";
import NewImage90 from "./../assets/Social Media Posts/new/newimg (90).jpg";
import NewImage91 from "./../assets/Social Media Posts/new/newimg (91).jpg";
import NewImage92 from "./../assets/Social Media Posts/new/newimg (92).jpg";
import NewImage93 from "./../assets/Social Media Posts/new/newimg (93).jpg";
import NewImage94 from "./../assets/Social Media Posts/new/newimg (94).jpg";
import NewImage95 from "./../assets/Social Media Posts/new/newimg (95).jpg";
import NewImage96 from "./../assets/Social Media Posts/new/newimg (96).jpg";
import NewImage97 from "./../assets/Social Media Posts/new/newimg (97).jpg";
import NewImage98 from "./../assets/Social Media Posts/new/newimg (98).jpg";
import NewImage99 from "./../assets/Social Media Posts/new/newimg (99).jpg";
import NewImage100 from "./../assets/Social Media Posts/new/newimg (100).jpg";
import NewImage101 from "./../assets/Social Media Posts/new/newimg (101).jpg";
import NewImage102 from "./../assets/Social Media Posts/new/newimg (102).jpg";
import NewImage103 from "./../assets/Social Media Posts/new/newimg (103).jpg";
import NewImage104 from "./../assets/Social Media Posts/new/newimg (104).jpg";

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
const CloseIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
  </svg>
);

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

  // See more
  const [showMore, setShowMore] = useState(false);

  // Featured posts (hero grid)
  const featured = [
    { src: gig1, title: "Featured 1", category: "Social • Ad" },
    { src: gig2, title: "Featured 2", category: "Social • Campaign" },
    { src: gig3, title: "Featured 3", category: "Social • Promo" },
    { src: gig4, title: "Featured 4", category: "Social • Carousel" },
    { src: gig5, title: "Featured 5", category: "Social • Ad" },
    { src: gig6, title: "Featured 6", category: "Social • Launch" },
    { src: gig7, title: "Featured 7", category: "Social • Story" },
    { src: gig8, title: "Featured 8", category: "Social • Campaign" },
    { src: gig9, title: "Featured 9", category: "Social • Promo" }
  ];

  // FIXED: Complete morePostsSources array with ALL imported images
  const morePostsSources = [
    // All upper images
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
    Image12,
    Image13,
    Image14,
    Image15,
    Image16,
    Image17,
    Image18,
    Image19,
    Image20,
    Image21,
    Image22,
    Image23,
    Image24,
    Image25,
    Image26,
    Image27,
    Image146,

    // All lower images
    Image28,
    Image29,
    Image30,
    Image31,
    Image32,
    Image33,
    Image34,
    Image35,
    Image36,
    Image37,
    Image38,
    Image39,
    Image40,
    Image41,
    Image42,
    Image43,
    Image44,
    Image45,
    Image46,
    Image47,
    Image48,
    Image49,
    Image50,
    Image51,
    Image52,
    Image53,
    Image54,
    Image55,
    Image56,
    Image57,
    Image58,
    Image59,
    Image60,
    Image61,
    Image62,
    Image63,
    Image64,
    Image73,
    Image74,
    Image75,
    Image76,
    Image77,
    Image78,
    Image79,
    Image80,
    Image81,
    Image82,
    Image83,
    Image84,
    Image85,
    Image86,
    Image87,
    Image88,
    Image89,
    Image90,
    Image91,
    Image92,
    Image93,
    Image94,
    Image95,
    Image96,
    Image97,
    Image98,
    Image99,
    Image100,
    Image101,
    Image102,
    Image103,
    Image104,
    Image105,
    Image106,
    Image107,
    Image108,
    Image109,
    Image110,
    Image111,
    Image112,
    Image113,
    Image114,
    Image115,
    Image116,
    Image117,
    Image118,
    Image119,
    Image120,
    Image121,
    Image122,
    Image123,
    Image124,
    Image125,
    Image126,
    Image127,
    Image128,
    Image129,
    Image130,
    Image131,
    Image132,
    Image133,
    Image134,
    Image135,
    Image136,
    Image137,
    Image138,
    Image139,
    Image140,
    Image141,
    Image142,
    Image143,
    Image144,
    Image145,

    // All new images
    NewImage1,
    NewImage2,
    NewImage3,
    NewImage4,
    NewImage5,
    NewImage6,
    NewImage7,
    NewImage8,
    NewImage9,
    NewImage10,
    NewImage11,
    NewImage12,
    NewImage13,
    NewImage14,
    NewImage15,
    NewImage16,
    NewImage17,
    NewImage18,
    NewImage19,
    NewImage20,
    NewImage21,
    NewImage22,
    NewImage23,
    NewImage24,
    NewImage25,
    NewImage26,
    NewImage27,
    NewImage28,
    NewImage29,
    NewImage30,
    NewImage31,
    NewImage32,
    NewImage33,
    NewImage34,
    NewImage35,
    NewImage36,
    NewImage37,
    NewImage38,
    NewImage39,
    NewImage40,
    NewImage41,
    NewImage42,
    NewImage43,
    NewImage44,
    NewImage45,
    NewImage46,
    NewImage47,
    NewImage48,
    NewImage49,
    NewImage50,
    NewImage51,
    NewImage52,
    NewImage53,
    NewImage54,
    NewImage55,
    NewImage56,
    NewImage57,
    NewImage58,
    NewImage59,
    NewImage60,
    NewImage61,
    NewImage62,
    NewImage63,
    NewImage64,
    NewImage65,
    NewImage66,
    NewImage67,
    NewImage68,
    NewImage69,
    NewImage70,
    NewImage71,
    NewImage72,
    NewImage73,
    NewImage74,
    NewImage75,
    NewImage76,
    NewImage77,
    NewImage78,
    NewImage79,
    NewImage80,
    NewImage81,
    NewImage82,
    NewImage83,
    NewImage84,
    NewImage85,
    NewImage86,
    NewImage87,
    NewImage88,
    NewImage89,
    NewImage90,
    NewImage91,
    NewImage92,
    NewImage93,
    NewImage94,
    NewImage95,
    NewImage96,
    NewImage97,
    NewImage98,
    NewImage99,
    NewImage100,
    NewImage101,
    NewImage102,
    NewImage103,
    NewImage104
  ];

  const morePosts = morePostsSources.map((src, i) => ({
    src,
    title: `Gallery Post ${i + 1}`,
    category: "Social • Gallery"
  }));

  // All posts for overlay
  const allPosts = [...featured, ...morePosts];

  // Spotlight cursor
  const onMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  // In-view header animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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

        {/* See more grid (compact) */}
        <div
          className={`mt-6 md:mt-8 overflow-hidden transition-[max-height,opacity,transform] duration-500 ${
            showMore
              ? "max-h-[6000px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
          aria-hidden={!showMore}
        >
          <div className="rounded-2xl p-4 md:p-5 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
              {morePosts.map((p, i) => {
                const globalIndex = featured.length + i;
                return (
                  <button
                    key={`more-${i}`}
                    onClick={() => openOverlay(globalIndex)}
                    className="relative overflow-hidden rounded-lg aspect-square ring-1 ring-white/10 hover:ring-white/20 transition group"
                    aria-label={`Open ${p.title}`}
                  >
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-[#0A0B0D]/0 group-hover:bg-[#0A0B0D]/10 transition-colors" />
                  </button>
                );
              })}
            </div>
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
                    href={allPosts[activeIndex].src}
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
                  <img
                    key={`viewer-${idx}`}
                    src={p.src}
                    alt={p.title}
                    className={`absolute inset-0 w-full h-full object-contain p-4 md:p-6 transition-opacity duration-300 ${
                      idx === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
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
                          w: e.currentTarget.naturalWidth || 0,
                          h: e.currentTarget.naturalHeight || 0
                        };
                      }
                    }}
                    draggable="false"
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
                  <button
                    onClick={resetZoom}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-sm"
                    title="Reset (fit)"
                  >
                    Fit
                  </button>
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
                </div>

                <button
                  onClick={() => setShowThumbs((s) => !s)}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#E7DFD6] ring-1 ring-white/10 text-sm"
                  aria-expanded={showThumbs}
                  title={showThumbs ? "Hide thumbnails" : "Show thumbnails"}
                >
                  {showThumbs ? "Hide thumbnails" : "Show thumbnails"}
                </button>
              </div>

              {/* Filmstrip thumbnails (toggle) */}
              {showThumbs && (
                <div className="px-4 md:px-6 pb-4">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {allPosts.map((p, idx) => (
                      <button
                        key={`thumb-${idx}`}
                        onClick={() => {
                          setActiveIndex(idx);
                          resetZoom();
                        }}
                        className={`relative overflow-hidden rounded-md shrink-0 ring-1 ${
                          idx === activeIndex
                            ? "ring-[#B08B57]"
                            : "ring-white/10 hover:ring-white/20"
                        }`}
                        style={{ width: 72, height: 72 }}
                        title={p.title}
                      >
                        <img
                          src={p.src}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable="false"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations (same vibe as Home) */}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes morph { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(120deg) scale(1.1);} 66% { transform: rotate(240deg) scale(0.9);} }
        @keyframes morph-reverse { 0%,100% { transform: rotate(0) scale(1);} 33% { transform: rotate(-120deg) scale(0.9);} 66% { transform: rotate(-240deg) scale(1.1);} }
        @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
        @keyframes expand-width { from { width: 0;} to { width: 200px;} }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 25s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-expand-width { animation: expand-width 1s cubic-bezier(0.16,1,0.3,1) .5s forwards; }
        .animation-delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
};

export default SocialMediaPostsSection;
