"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Heading from "./headingUaeCase";

// Individual Card Component
const SpaceCard = ({ i, title, src, color, progress, range, targetScale }) => {
  const container = useRef(null);
  const textRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Animation transformations
  const scale = useTransform(progress, range, [1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [10, 0]); // Tilt animation

  // Text fill animation
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const handleScroll = () => {
      const rect = container.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visiblePercentage = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / windowHeight)
      );

      // Set the text fill based on scroll position
      text.style.backgroundSize = `${visiblePercentage * 100}% 100%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          y,
          rotateX: rotate, // Apply tilt animation
        }}
        className="flex flex-col relative aspect-square h-auto w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <Image
              fill
              src={src}
              alt={`${title} concept`}
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Content - Number positioned at top-left */}
        <div className="absolute top-6 left-6 text-lg font-medium text-white/80">
          {String(i + 1).padStart(2, "0")}
        </div>

        {/* Title with fill animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-white mr-2">»</span>
            <h2
              ref={textRef}
              className="text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, white 0%, white 100%)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
                WebkitBackgroundClip: "text",
              }}
            >
              {title}
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Component
const SpaceThemedCards = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Heading fill animation
  useEffect(() => {
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    if (!titleElement || !subtitleElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 300; // Adjust this value to control animation speed
      const progress = Math.min(1, scrollPosition / maxScroll);

      // Set the title fill based on scroll position
      titleElement.style.backgroundSize = `${progress * 100}% 100%`;
      subtitleElement.style.backgroundSize = `${Math.max(
        0,
        (progress - 0.3) * 100
      )}% 100%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Card Data
  const cards = [
    {
      title: "BEYOND",
      src: "/images/h1.webp",
      color: "#D6336C",
    },
    {
      title: "EXPLORE",
      src: "/images/h2.webp",
      color: "#1E3A8A",
    },
    {
      title: "DISCOVER",
      src: "/images/h3.webp",
      color: "#5B21B6",
    },
    {
      title: "IMAGINE",
      src: "/images/h4.webp",
      color: "#065F46",
    },
  ];

  return (
    <main ref={container} className="relative z-10 bg-black">
      {/* Header with fill animation - further reduced height on mobile */}
      <div className="h-[30vh] sm:h-[40vh] md:h-screen flex flex-col items-center justify-center text-center px-4">
        <Heading />
        <div className="mt-4 sm:mt-6 md:mt-12 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Cards */}
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <SpaceCard
            key={i}
            i={i}
            {...card}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}

      {/* Footer Space */}
      <div className="h-screen flex items-center justify-center">
        {/* <p className="text-white/50">Journey into the future</p> */}
      </div>
    </main>
  );
};

export default SpaceThemedCards;
