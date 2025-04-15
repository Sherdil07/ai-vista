"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import AnimatedHeading from "./headingUseCase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollingCards = () => {
  const verticalSectionRef = useRef(null);

  useEffect(() => {
    const verticalSection = verticalSectionRef.current;

    if (verticalSection) {
      initScroll(
        verticalSection,
        verticalSection.querySelectorAll(".item"),
        "vertical"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const initScroll = (section, items, direction) => {
    items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, { yPercent: 100 });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${items.length * 100}%`,
        scrub: 0.25, // Speed up scroll when going back up
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    });

    items.forEach((item, index) => {
      timeline.to(item, {
        scale: 0.9,
        borderRadius: "10px",
        ease: "power1.inOut", // Smooth transition
      });

      timeline.to(items[index + 1], { yPercent: 0 }, "<");
    });
  };

  return (
    <main className="bg-black text-white">
      {/* First Section */}
      <div className="overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="flex items-center justify-center ">
            <div className="max-w-2xl text-center">
              <AnimatedHeading />
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Scrolling Section */}
      <div ref={verticalSectionRef} className="overflow-hidden scroll-section">
        <div className="h-screen wrapper">
          <div role="list" className="flex relative h-full p-0.5 list">
            {/* Card 1 */}
            <div className="w-full h-full absolute inset-0 shadow-md overflow-hidden item">
              <img
                src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Nature"
              />
              <span className="absolute top-6 left-6 h-12 w-12 bg-black text-white flex items-center justify-center rounded-full z-10 text-2xl font-bold">
                1
              </span>
              <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white drop-shadow-lg">
                Wild
              </h2>
            </div>

            {/* Card 2 */}
            <div className="w-full h-full absolute inset-0 shadow-md overflow-hidden item">
              <img
                src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Nature"
              />
              <span className="absolute top-6 left-6 h-12 w-12 bg-black text-white flex items-center justify-center rounded-full z-10 text-2xl font-bold">
                2
              </span>
              <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white drop-shadow-lg">
                Cycle
              </h2>
            </div>

            {/* Card 3 */}
            <div className="w-full h-full absolute inset-0 shadow-md overflow-hidden item">
              <img
                src="https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Nature"
              />
              <span className="absolute top-6 left-6 h-12 w-12 bg-black text-white flex items-center justify-center rounded-full z-10 text-2xl font-bold">
                3
              </span>
              <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white drop-shadow-lg">
                Guard
              </h2>
            </div>

            {/* Card 4 */}
            <div className="w-full h-full absolute inset-0 shadow-md overflow-hidden item">
              <img
                src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Nature"
              />
              <span className="absolute top-6 left-6 h-12 w-12 bg-black text-white flex items-center justify-center rounded-full z-10 text-2xl font-bold">
                4
              </span>
              <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white drop-shadow-lg">
                Astral
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div className="overflow-hidden">
        <div className="px-10">
          <div className="container mx-auto">
            <div className="py-8"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ScrollingCards;
