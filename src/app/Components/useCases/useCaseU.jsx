"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const Heading = () => (
  <div className="space-y-4 text-center">
    <div className="relative inline-block">
      <motion.h2
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        className="text-5xl md:text-7xl font-bold text-white relative z-10"
      >
        AI in Action:
      </motion.h2>
      <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-white/20 blur-md -z-10">
        AI in Action:
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <div className="relative inline-block">
        <motion.h2
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-bold text-white relative z-10"
        >
          Use
        </motion.h2>
        <div className="absolute inset-0 text-4xl md:text-6xl font-bold text-white/20 blur-md -z-10">
          Use
        </div>
      </div>

      <div className="relative inline-block">
        <motion.h2
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-bold text-blue-400 relative z-10"
        >
          Cases
        </motion.h2>
        <div className="absolute inset-0 text-4xl md:text-6xl font-bold text-blue-400/20 blur-md -z-10">
          Cases
        </div>
      </div>
    </div>
  </div>
);

const SpaceCard = ({ i, title, src, color, progress, range, targetScale }) => {
  const container = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Animation transforms
  const scale = useTransform(progress, range, [1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 1], [i % 2 ? 150 : -150, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [i % 2 ? -15 : 15, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          y,
          rotateZ,
          rotateX,
          translateZ,
          transformStyle: "preserve-3d",
          top: `calc(-5vh + ${i * 20}px)`,
        }}
        className="relative w-[95%] sm:w-[90%] md:w-[85%] max-w-4xl rounded-2xl overflow-hidden shadow-2xl perspective-1000"
      >
        <div className="pb-[70%] sm:pb-[60%] relative w-full">
          {/* Image Container */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              fill
              src={src}
              alt={title}
              className="object-cover object-center"
              sizes="(max-width: 768px) 95vw, 85vw"
              priority={i < 2}
            />
          </motion.div>

          {/* Number Badge */}
          <div className="absolute top-6 left-6 text-xl font-bold text-white/80">
            {String(i + 1).padStart(2, "0")}
          </div>

          {/* Animated Title */}
          <div
            className="absolute bottom-8 left-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-12 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key="front"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isHovered ? 90 : 0 }}
                  exit={{ rotateX: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute flex items-center"
                >
                  <span className="mr-2 text-2xl">»</span>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                    {title}
                  </h2>
                </motion.div>

                <motion.div
                  key="back"
                  initial={{ rotateX: -90 }}
                  animate={{ rotateX: isHovered ? 0 : -90 }}
                  exit={{ rotateX: -90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute flex items-center"
                >
                  <span className="mr-2 text-2xl">»</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    {title}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SpaceThemedCards = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const cards = [
    {
      title: "BEYOND",
      src: "/images/ai-cloud-concept-with-robot-hand.jpg",
      color: "#D6336C",
    },
    {
      title: "EXPLORE",
      src: "/images/digital-marketing-growth.jpg",
      color: "#1E3A8A",
    },
    {
      title: "DISCOVER",
      src: "/images/mobile-app-dev.jpg",
      color: "#5B21B6",
    },
    {
      title: "INNOVATE",
      src: "/images/fintech-innovation.jpg",
      color: "#059669",
    },
  ];

  return (
    <main ref={container} className="relative bg-black">
      {/* Header Section */}
      <div className="h-[30vh] flex flex-col items-center justify-center px-4">
        <Heading />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8"
        >
          <svg
            className="w-8 h-8 text-white"
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
        </motion.div>
      </div>

      {/* Cards Container */}
      <div className="relative z-20">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <SpaceCard
              key={i}
              i={i}
              {...card}
              progress={scrollYProgress}
              range={[i * 0.15, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Footer Spacer */}
      <div className="h-[50vh] flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white/50 text-lg"
        >
          Continue Exploring →
        </motion.p>
      </div>
    </main>
  );
};

export default SpaceThemedCards;
