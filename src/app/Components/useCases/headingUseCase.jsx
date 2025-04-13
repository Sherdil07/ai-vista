import { useEffect, useRef, useState } from "react";

const AnimatedHeading = () => {
  const headingRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current) return;

      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element is through the viewport (0 to 1)
      // 0 = just entered bottom of viewport, 0.5 = middle of viewport, 1 = top of viewport
      let progress = 1 - (rect.top + rect.height / 2) / windowHeight;

      // Normalize the progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to create animated letters
  const createAnimatedText = (text, isLowerLine = false) => {
    return text.split("").map((char, index) => {
      // Stagger the animation by delaying based on letter position
      const delay = index * 20;
      const staggeredProgress = Math.max(0, scrollProgress - delay / 1000);

      return (
        <span
          key={index}
          className="inline-block transition-all duration-500"
          style={{
            color: isLowerLine
              ? interpolateColor("#9CA3AF", "#00A8A8", staggeredProgress)
              : interpolateColor("#9CA3AF", "#FFFFFF", staggeredProgress),
            transitionDelay: `${delay}ms`,
          }}
        >
          {char}
        </span>
      );
    });
  };

  // Helper function to smoothly interpolate between colors
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

    // Interpolate RGB values
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    // Convert back to hex
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <div className="pb-0 pt-0 px-4">
      <div ref={headingRef} className="flex flex-col items-center space-y-2">
        <h2 className="text-5xl font-bold">
          {createAnimatedText("PORTFOLIO")}
        </h2>
        <div className="flex space-x-4 text-5xl font-bold">
          <div>{createAnimatedText("USE")}</div>
          <div>{createAnimatedText("Cases", true)}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeading;
