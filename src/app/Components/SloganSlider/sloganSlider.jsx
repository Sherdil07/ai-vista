"use client";
import { useEffect, useState } from "react";

const slogans = ["Smart Solutions-Smarter Future"];

export default function SloganSlider() {
  // State for animation duration - can be adjusted as needed
  const [animationDuration, setAnimationDuration] = useState(10);

  useEffect(() => {
    // Function to update animation duration based on screen width
    const updateAnimationSpeed = () => {
      if (window.innerWidth >= 1024) {
        setAnimationDuration(8); // Faster for laptop
      } else if (window.innerWidth <= 768) {
        setAnimationDuration(5); // Even faster for mobile
      } else {
        setAnimationDuration(10); // Default speed
      }
    };

    // Initial check
    updateAnimationSpeed();

    // Set up event listener for window resize
    window.addEventListener("resize", updateAnimationSpeed);

    // Create and inject the styles with the current animation duration
    const style = document.createElement("style");
    style.innerHTML = `
      .slider-container {
        width: 100%;
        overflow: hidden;
        position: relative;
      }
      
      .single-text-slider {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
      }
      
      @keyframes moveLeftToRight {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      .moving-text {
        animation: moveLeftToRight ${animationDuration}s linear infinite;
        white-space: nowrap;
      }
      
      .gradient-overlay::before,
      .gradient-overlay::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50px;
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
      
      /* Default container styling for all devices */
      .slogan-container {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        overflow: hidden;
      }

      /* Laptop view */
      @media (min-width: 1024px) {
        .slogan-container {
          width: 30vw !important;
        }
      }

      /* Tablet view */
      @media (min-width: 768px) and (max-width: 1023px) {
        .slogan-container {
          width: 70vw !important;
        }
      }

      /* Mobile view */
      @media (max-width: 767px) {
        .slogan-container {
          width: 50vw !important;
        }
        .gradient-overlay::before,
        .gradient-overlay::after {
          width: 30px;
        }
      }
    `;
    document.head.appendChild(style);

    // Clean up
    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", updateAnimationSpeed);
    };
  }, [animationDuration]);

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center w-full">
          <div className="relative gradient-overlay slogan-container">
            <div className="single-text-slider">
              <div className="moving-text">
                <p className="text-white text-sm md:text-xl lg:text-2xl font-medium opacity-80 hover:opacity-100 transition-opacity duration-300 px-4 md:px-8 lg:px-12">
                  {slogans[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
