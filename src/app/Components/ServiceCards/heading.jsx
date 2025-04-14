"use client";
import { useEffect, useRef, useState } from "react";

const AnimatedHeading = () => {
  const headingRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current) return;

      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Adjusted calculation for earlier animation start
      const adjustedHeight = windowHeight * 1.1; // 10% larger viewport area
      const rawProgress = 1 - rect.top / adjustedHeight;
      const normalizedProgress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(normalizedProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Style generation
  const getClipStyle = () => {
    const clipWidth = scrollProgress * 100;
    return {
      clipPath: `inset(0 ${100 - clipWidth}% 0 0)`,
      WebkitClipPath: `inset(0 ${100 - clipWidth}% 0 0)`,
      transition: "clip-path 0.3s ease-out",
    };
  };

  return (
    <div className="py-24 pt-2 px-4 bg-black">
      <div
        ref={headingRef}
        className="flex flex-col items-center justify-center text-center"
      >
        {/* END-TO-END text */}
        <div className="relative mb-2">
          <h2 className="text-5xl md:text-7xl font-bold tracking-widest text-gray-800 uppercase">
            END-TO-END
          </h2>
          <h2
            className="text-5xl md:text-7xl font-bold tracking-widest text-white uppercase absolute top-0 left-0"
            style={getClipStyle()}
          >
            END-TO-END
          </h2>
        </div>

        {/* AI Solutions text */}
        <div className="flex items-center justify-center">
          {/* AI text */}
          <div className="relative mr-4">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800">AI</h2>
            <h2
              className="text-5xl md:text-7xl font-bold text-white absolute top-0 left-0"
              style={getClipStyle()}
            >
              AI
            </h2>
          </div>

          {/* Solutions text */}
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold italic text-gray-800">
              Solutions
            </h2>
            <h2
              className="text-5xl md:text-7xl font-bold italic text-[#00A8A8] absolute top-0 left-0"
              style={getClipStyle()}
            >
              Solutions
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeading;
