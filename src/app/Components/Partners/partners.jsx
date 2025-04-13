"use client";

import { useEffect } from "react";

const logos = [
  "/logos/Frame 47.png",
  "/logos/Frame 45.png",
  "/logos/Frame 45 (1).png",
  "/logos/Frame 46.png",
];

export default function Partners() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .slide-track {
        animation: slide 20s linear infinite;
        display: inline-flex;
        white-space: nowrap;
        position: relative;
        width: 200%;
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

      /* Mobile view fix */
      @media (max-width: 768px) {
        .slide-track {
          width: 100% !important; /* Ensure slide track does not overflow */
          animation: slide 20s linear infinite; /* Keep the same speed on mobile as in desktop */
        }

        .gradient-overlay::before,
        .gradient-overlay::after {
          display: none; /* Remove gradient overlays on mobile */
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden gradient-overlay">
          <div className="slide-track">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex items-center justify-center"
                style={{ minWidth: "160px" }}
              >
                <img
                  src={logo}
                  alt={`Partner logo ${index}`}
                  loading="lazy"
                  className="h-12 opacity-70 hover:opacity-100 transition-all duration-300 ease-out grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
