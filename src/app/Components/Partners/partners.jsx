"use client";

import { useEffect, useState } from "react";

const logos = [
  "/logos/Frame 47.png",
  "/logos/Frame 45.png",
  "/logos/Frame 45 (1).png",
  "/logos/Frame 46.png",
];

export default function Partners() {
  // State to control animation speed
  const [animationDuration, setAnimationDuration] = useState(20);

  useEffect(() => {
    // Function to update animation duration based on screen width
    const updateAnimationSpeed = () => {
      if (window.innerWidth <= 768) {
        setAnimationDuration(6); // Much faster for mobile (6 seconds)
      } else if (window.innerWidth <= 1024) {
        setAnimationDuration(12); // Medium speed for tablets (12 seconds)
      } else {
        setAnimationDuration(20); // Default speed for desktop (20 seconds)
      }
    };

    // Initial check
    updateAnimationSpeed();

    // Set up event listener for window resize
    window.addEventListener("resize", updateAnimationSpeed);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .slide-track {
        animation: slide ${animationDuration}s linear infinite;
        display: inline-flex;
        white-space: nowrap;
        position: relative;
        width: 200%;
        will-change: transform; /* Optimize for animations */
      }
      .gradient-overlay::before,
      .gradient-overlay::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100px;
        z-index: 2;
        pointer-events: none;
      }
      .gradient-overlay::before {
        left: 0;
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
      }
      .gradient-overlay::after {
        right: 0;
        background: linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
      }

      /* Mobile view adjustments */
      @media (max-width: 768px) {
        .slide-track {
          animation-timing-function: linear; /* Ensure smooth linear motion */
          animation-play-state: running !important; /* Force animation to run */
        }
        
        .logo-item {
          min-width: 120px !important; /* Slightly smaller min-width for mobile */
          margin: 0 4px !important; /* Reduced margin on mobile */
        }
        
        .logo-image {
          height: 10vw; /* Responsive height based on viewport width */
          max-height: 40px; /* Cap maximum height */
          min-height: 24px; /* Ensure minimum height */
        }
        
        .gradient-overlay::before,
        .gradient-overlay::after {
          width: 50px; /* Smaller gradients on mobile */
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", updateAnimationSpeed);
    };
  }, [animationDuration]);

  return (
    <section className="bg-black py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden gradient-overlay">
          <div className="slide-track">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="logo-item mx-4 md:mx-8 flex items-center justify-center"
                style={{ minWidth: "160px" }}
              >
                <img
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  loading="lazy"
                  className="logo-image h-12 opacity-70 hover:opacity-100 transition-all duration-300 ease-out grayscale hover:grayscale-0"
                />
              </div>
            ))}

            {/* Duplicate set for seamless looping */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="logo-item mx-4 md:mx-8 flex items-center justify-center"
                style={{ minWidth: "160px" }}
              >
                <img
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  loading="lazy"
                  className="logo-image h-12 opacity-70 hover:opacity-100 transition-all duration-300 ease-out grayscale hover:grayscale-0"
                />
              </div>
            ))}

            {/* Add a third set for extra smooth looping with many logos */}
            {logos.map((logo, index) => (
              <div
                key={`third-${index}`}
                className="logo-item mx-4 md:mx-8 flex items-center justify-center"
                style={{ minWidth: "160px" }}
              >
                <img
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  loading="lazy"
                  className="logo-image h-12 opacity-70 hover:opacity-100 transition-all duration-300 ease-out grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
