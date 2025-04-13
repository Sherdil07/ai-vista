"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import Image from "next/image";
import imageSrc from "../../../../public/images/front.png";
import imageSrc2 from "../../../../public/images/front.png";

export default function ExpertiseSection() {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Adjusted X & Y movement to keep images in a smooth range
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  // Rotation for subtle scissor-like effect
  const fgRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["5deg", "0deg", "-5deg"]
  );
  const bgRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-5deg", "0deg", "5deg"]
  );

  // Scaling for foreground and background images
  const fgScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // TRUST text animation for fade-in and gradient filling effect
  const textControls = useAnimation();
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const progress = Math.min(Math.max((v - 0) / 0.5, 0), 1); // Normalize to 0-1
      textControls.start({
        backgroundSize: `${progress * 100}% 100%`,
        opacity: progress, // Fade-in effect
      });
    });
  }, [scrollYProgress, textControls]);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-8 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl w-full items-center">
        {/* Image Container */}
        <div className="relative w-full h-[300px] md:h-[500px]" ref={imageRef}>
          {/* Background Image */}
          <motion.div
            style={{
              x,
              y,
              rotate: bgRotate,
              scale: bgScale,
              transformOrigin: "bottom left", // Fixed at bottom-left corner
            }}
            className="absolute bottom-0 left-0 w-full h-full flex justify-center"
          >
            <Image
              src={imageSrc}
              alt="Background VR"
              fill
              className="object-contain blur-[1.5px] opacity-30"
              sizes="(max-width: 1439px) 94vw, 1344px"
            />
          </motion.div>

          {/* Foreground Image */}
          <motion.div
            style={{
              x,
              y,
              rotate: fgRotate,
              scale: fgScale,
              transformOrigin: "bottom left", // Fixed at bottom-left corner
            }}
            className="absolute bottom-0 left-0 w-full h-full flex justify-center"
          >
            <Image
              src={imageSrc2}
              alt="Foreground VR"
              fill
              className="object-contain"
              sizes="(max-width: 1439px) 94vw, 1344px"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 ml-8 md:ml-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            EXPERTISE <br />
            YOU{" "}
            <motion.span
              animate={textControls}
              initial={{ backgroundSize: "0% 100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gradient-to-r from-white to-[#00A8A8] bg-clip-text text-transparent"
              style={{ backgroundRepeat: "no-repeat" }}
            >
              Trust
            </motion.span>
          </h1>
          <p className="mt-6 text-sm tracking-wider text-gray-300 uppercase">
            Innovation, Expertise, and Trust
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Partner with us for your AI journey because we offer a unique blend
            of innovative solutions, expert knowledge, and a commitment to
            ethical AI practices. We prioritize your business goals and work
            closely with you to ensure that our AI solutions not only meet but
            exceed your expectations.
          </p>
          <button className="mt-6 inline-flex items-center bg-[#00A8A8] text-white px-6 py-3 rounded hover:bg-pink-600 transition">
            <span className="mr-2">➤</span> Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
