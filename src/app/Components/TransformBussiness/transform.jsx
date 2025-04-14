"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const TransformBusinessHero = () => {
  const containerRef = useRef(null);

  const { scrollY } = useScroll();

  // Use scrollY instead of scrollYProgress for more direct control
  // Images move inward when scrolling up, outward when scrolling down
  const leftTopTranslate = useTransform(
    scrollY,
    [0, 300],
    ["-20%", "0%"] // Start more inward, move outward when scrolling down
  );

  const rightTopTranslate = useTransform(
    scrollY,
    [0, 300],
    ["20%", "0%"] // Start more inward, move outward when scrolling down
  );

  const leftBottomTranslate = useTransform(scrollY, [0, 300], ["-20%", "0%"]);

  const rightBottomTranslate = useTransform(scrollY, [0, 300], ["20%", "0%"]);

  // Text becomes more visible as we scroll down, less visible when scrolled up
  const textScale = useTransform(scrollY, [0, 300], [0.8, 1]);
  const textOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Left Top Image - Reduced size */}
      <motion.div
        className="absolute top-0 left-0 w-1/4 h-2/5 z-10"
        style={{ x: leftTopTranslate }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/vr-white.jpg"
            fill
            alt="VR Headset White Background"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Right Top Image - Reduced size */}
      <motion.div
        className="absolute top-0 right-0 w-1/4 h-2/5 z-10"
        style={{ x: rightTopTranslate }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/ar-blue.jpg"
            fill
            alt="AR Glasses Blue Background"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Left Bottom Image - Reduced size */}
      <motion.div
        className="absolute bottom-0 left-0 w-1/4 h-2/5 z-10"
        style={{ x: leftBottomTranslate }}
      >
        <div className="relative w-full h-full bg-pink-500">
          <Image
            src="/vr-pink.jpg"
            fill
            alt="VR Headset Pink Background"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Right Bottom Image - Reduced size */}
      <motion.div
        className="absolute bottom-0 right-0 w-1/4 h-2/5 z-10"
        style={{ x: rightBottomTranslate }}
      >
        <div className="relative w-full h-full bg-teal-400">
          <Image
            src="/ar-teal.jpg"
            fill
            alt="AR Glasses Teal Background"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Center Text Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-0"
        style={{
          scale: textScale,
          opacity: textOpacity,
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-wider mb-4">
            TRANSFORM
            <br />
            YOUR BUSINESS
          </h1>
          <p className="text-2xl md:text-4xl text-pink-500 italic font-light">
            With AI
          </p>
          <div className="mt-10">
            <button className="bg-transparent hover:bg-pink-500 text-white border border-pink-500 px-8 py-3 flex items-center justify-center transition-all duration-300">
              <span className="mr-2 text-pink-500">»</span>
              GET STARTED
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransformBusinessHero;
