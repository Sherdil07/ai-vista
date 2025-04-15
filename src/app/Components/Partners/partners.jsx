"use client";

import { useEffect, useState, useRef } from "react";

const logos = [
  "/logos/Frame 47.png",
  "/logos/Frame 45.png",
  "/logos/Frame 45 (1).png",
  "/logos/Frame 46.png",
];

export default function Partners() {
  const [animationDuration, setAnimationDuration] = useState(20);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Function to update animation duration based on screen width
    const updateAnimationSpeed = () => {
      if (window.innerWidth <= 768) {
        setAnimationDuration(8); // Fast for mobile
      } else if (window.innerWidth <= 1024) {
        setAnimationDuration(12); // Fast for tablets
      } else {
        setAnimationDuration(15); // Fast for desktop
      }
    };

    // Initial check
    updateAnimationSpeed();

    // Set up event listener for window resize
    window.addEventListener("resize", updateAnimationSpeed);

    // Create and inject CSS for smooth animation
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slide {
        from { transform: translateX(0); }
        to { transform: translateX(-33.33%); }
      }
      
      .slider-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        background-color: #000;
        padding: 1rem 0;
      }
      
      .slide-track {
        display: flex;
        width: 300%; /* Triple the logos for seamless looping */
        animation: slide ${animationDuration}s linear infinite;
        will-change: transform;
        backface-visibility: hidden;
        transform: translate3d(0, 0, 0); /* Hardware acceleration */
      }
      
      .slide-track.paused {
        animation-play-state: paused;
      }
      
      .logo-item {
        flex-shrink: 0;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .logo-image {
        transition: all 0.3s ease;
        filter: grayscale(100%) brightness(0.8) opacity(0.7);
        object-fit: contain; /* Prevent image distortion */
        max-width: 100%;
        height: 100px; /* Default height for desktop */
        width: auto;
      }
      
      .logo-image:hover {
        filter: grayscale(0) brightness(1) opacity(1);
        transform: scale(1.05);
      }
      
      .gradient-overlay::before,
      .gradient-overlay::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 120px;
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

      /* Mobile devices */
      @media (max-width: 768px) {
        .slider-container {
          padding: 0.75rem 0; 
          margin-top: -15rem; /* Increased negative margin to reduce gap */
        }
        
        .logo-item {
          padding: 0 15px;
        }
        
        .logo-image {
          height: 100px !important; /* Increased height for better visibility on mobile */
          width: auto;
          max-width: 100%;
          filter: grayscale(100%) brightness(0.9) opacity(0.85);
        }
        
        .gradient-overlay::before,
        .gradient-overlay::after {
          width: 50px;
        }
      }

      /* Small phones specific styling */
      @media (max-width: 375px) {
        .slider-container {
          margin-top: -3rem; /* Adjusted margin for small phones */
          padding: 0.5rem 0;
        }
        
        .logo-image {
          height: 80px !important; /* Increased from 55px for better visibility */
        }
      }

      /* iPad Mini */
      @media (min-width: 768px) and (max-width: 834px) {
        .slider-container {
          margin-top: -15rem; /* Increased negative margin for iPad Mini */
          padding: 1rem 0;
        }
        
        .logo-image {
          height: 90px !important;
        }
      }

      /* iPad Pro */
      @media (min-width: 834px) and (max-width: 1024px) {
        .slider-container {
          margin-top: -18rem; /* Increased negative margin for iPad Pro */
          padding: 1rem 0;
        }
        
        .logo-image {
          height: 100px !important;
        }
      }

      /* Laptops/smaller desktops */
      @media (min-width: 1024px) and (max-width: 1440px) {
        .slider-container {
          margin-top: -1.5rem; /* Slight negative margin for laptops */
        }
        
        .logo-image {
          height: 110px;
        }
      }
      
      /* Handle landscape orientation specifically */
      @media (max-width: 768px) and (orientation: landscape) {
        .slider-container {
          margin-top: -14rem;
          padding: 0.5rem 0;
        }
        
        .logo-image {
          height: 90px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Handle visibility changes to prevent animation stuttering
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        // Small delay before resuming to ensure smooth transition
        setTimeout(() => setIsPaused(false), 10);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up
    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", updateAnimationSpeed);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [animationDuration]);

  // Create an expanded logo array that repeats the logos 3 times for smoother looping
  const expandedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-black md:py-8 -mt-6 md:-mt-8 lg:-mt-6">
      <div className="container mx-auto px-4">
        <div className="slider-container gradient-overlay">
          <div
            ref={sliderRef}
            className={`slide-track ${isPaused ? "paused" : ""}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {expandedLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="logo-item"
                style={{ width: `${100 / expandedLogos.length}%` }}
              >
                <img
                  src={logo}
                  alt={`Partner logo ${(index % logos.length) + 1}`}
                  loading="lazy"
                  className="logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
