import { useEffect, useRef, useState } from "react";

const AnimatedHeading = () => {
  const headingRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current) return;

      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Set visibility state when element is in view
      if (rect.top < windowHeight * 0.9) {
        setIsVisible(true);
      }

      // Calculate progress - much more aggressive triggering
      let progress = 1 - (rect.top + rect.height / 2) / (windowHeight * 0.4);

      // Normalize the progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      // Accelerate the overall progress
      progress = Math.pow(progress, 0.6); // Reaches higher values faster
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to create animated letters with much faster sequencing
  const createAnimatedText = (text, isLowerLine = false, isAccent = false) => {
    return text.split("").map((char, index) => {
      // Minimal stagger for very rapid filling
      const staggerFactor = index / (text.length * 5);
      // Much faster progression
      const adjustedProgress = Math.max(
        0,
        Math.min(1, scrollProgress * 2.5 - staggerFactor)
      );

      // Calculate fill percentage with a steep curve for faster fill
      const fillPercentage = isVisible
        ? adjustedProgress < 0.2
          ? adjustedProgress * 5
          : 1
        : 0;

      // Define colors based on line and accent status
      const fromColor = "#666666"; // Starting with darker gray
      let toColor = "#FFFFFF"; // Default white for main text

      if (isAccent) {
        toColor = "#00A8A8"; // Teal for accent words
      } else if (isLowerLine) {
        toColor = "#F5F5F5"; // Slightly off-white for lower line
      }

      return (
        <span
          key={index}
          className={`inline-block relative transition-all duration-300 ${
            char === " " ? "mx-1" : ""
          }`}
          style={{
            color: interpolateColor(fromColor, toColor, fillPercentage),
            transform: `translateY(${(1 - fillPercentage) * 5}px)`,
            opacity: 0.4 + fillPercentage * 0.6,
            // Very short delay for faster animation
            transitionDelay: `${index * 10}ms`,
          }}
        >
          {char}
          {char !== " " && (
            <span
              className="absolute bottom-0 left-0 w-full bg-current transition-all duration-300"
              style={{
                height: "2px",
                transformOrigin: "left",
                transform: `scaleX(${fillPercentage})`,
                opacity: fillPercentage * 0.8,
                // Minimal delay for underline
                transitionDelay: `${index * 10 + 30}ms`,
              }}
            />
          )}
        </span>
      );
    });
  };

  // Simplified color interpolation for speed
  const interpolateColor = (color1, color2, factor) => {
    if (factor === 0) return color1;
    if (factor === 1) return color2;

    // Convert hex to RGB
    const hex1 = color1.replace("#", "");
    const hex2 = color2.replace("#", "");

    // Parse colors
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    // Fast-fill easing - quickly reaches target value
    const fastFill = (t) => Math.min(1, t * 2);

    const easedFactor = fastFill(factor);

    const r = Math.round(r1 + easedFactor * (r2 - r1));
    const g = Math.round(g1 + easedFactor * (g2 - g1));
    const b = Math.round(b1 + easedFactor * (b2 - b1));

    // Convert back to hex
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <div className="py-24 pt-2 px-4">
      <div
        ref={headingRef}
        className="flex flex-col items-center space-y-2 overflow-hidden"
      >
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          {createAnimatedText("End-to-End")}
        </h2>
        <div className="flex flex-wrap justify-center text-5xl md:text-6xl font-bold">
          <div className="mr-4">{createAnimatedText("AI", false, true)}</div>
          <div>{createAnimatedText("Solutions", true)}</div>
        </div>
        <div
          className="h-1 w-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-500 mt-4"
          style={{
            width: `${scrollProgress * 150}%`, // Much faster expansion
            maxWidth: "240px",
            opacity: scrollProgress * 2, // Quickly reach full opacity
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedHeading;
