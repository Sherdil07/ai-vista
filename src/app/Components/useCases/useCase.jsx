"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Heading from "./headingUseCase";

const SpaceCard = ({ i, title, src, color, progress, range, targetScale }) => {
  const container = useRef(null);
  const textRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Smoother animation transformations
  const scale = useTransform(progress, range, [1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 0.5], [150, 0]); // Reduced initial offset
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]); // Subtler zoom effect
  const rotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]); // Reduced tilt angle

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
          top: `calc(-3vh + ${i * 15}px)`, // Reduced vertical overlap
          y,
          rotateX: rotate,
        }}
        className="flex flex-col relative w-[95%] sm:w-[92%] md:w-[94%] lg:w-[96%] max-w-3xl rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Increased mobile size */}
        <div className="pb-[80%] sm:pb-[75%] md:pb-[60%] lg:pb-[55%] relative w-full">
          <div className="absolute inset-0 w-full h-full">
            <motion.div
              className="w-full h-full"
              style={{
                scale: imageScale,
                transition: { type: "spring", damping: 15, stiffness: 100 }, // Smoother animation
              }}
            >
              <Image
                fill
                src={src}
                alt={`${title} concept`}
                className="object-cover object-center"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 92vw, (max-width: 1024px) 94vw, 96vw"
                priority={i === 0} // Prioritize first image load
              />
            </motion.div>
          </div>

          <div className="absolute top-4 left-4 text-base sm:text-lg font-medium text-white/80">
            {String(i + 1).padStart(2, "0")}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-white mr-2">»</span>
              <h2
                ref={textRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
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
        </div>
      </motion.div>
    </div>
  );
};

const SpaceThemedCards = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    if (!titleElement || !subtitleElement) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 300;
      const progress = Math.min(1, scrollPosition / maxScroll);

      titleElement.style.backgroundSize = `${progress * 100}% 100%`;
      subtitleElement.style.backgroundSize = `${Math.max(
        0,
        (progress - 0.3) * 100
      )}% 100%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cards = [
    {
      title: "BEYOND",
      src: "/images/ai-cloud-concept-with-robot-hand (1).jpg",
      color: "#D6336C",
    },
    {
      title: "EXPLORE",
      src: "/images/digital-design-businessman-show-growth-graph-earning-with-digital-marketing-strategy.jpg",
      color: "#1E3A8A",
    },
    {
      title: "DISCOVER",
      src: "/images/Mobile App Dev.jpeg",
      color: "#5B21B6",
    },
  ];

  return (
    <main ref={container} className="relative z-10 bg-black">
      {/* Reduced header height and spacing */}
      <div className="h-[15vh] flex flex-col items-center justify-center text-center space-y-2">
        <Heading />
        <div className="mt-1 animate-bounce-slow">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.04; // Adjusted scale factor
        return (
          <SpaceCard
            key={i}
            i={i}
            {...card}
            progress={scrollYProgress}
            range={[i * 0.2, 1]} // Adjusted range for smoother transition
            targetScale={targetScale}
          />
        );
      })}

      <div className="h-screen flex items-center justify-center">
        {/* Optional footer content */}
      </div>
    </main>
  );
};

export default SpaceThemedCards;
