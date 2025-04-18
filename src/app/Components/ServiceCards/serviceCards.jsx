"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import Heading from "./heading";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ServiceCards = () => {
  const [flippedCards, setFlippedCards] = useState(Array(4).fill(false));
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();

  const services = [
    {
      id: 1,
      title: "Machine\nLearning",
      icon: "/images/Vector.svg",
      number: "#01",
      description:
        "Develop predictive models and automate decision-making processes with custom machine learning algorithms that learn from your data.",
      bgImage: "/images/ai-cloud-concept-with-robot-hand (1).jpg",
    },
    {
      id: 2,
      title: "Web\nDevelopment",
      icon: "/images/Black.svg",
      number: "#02",
      description:
        "Leverage image and video analysis to automate visual inspection, enhance security, or provide innovative customer experiences through facial recognition, object detection, and more.",
      bgImage:
        "/images/crm-customer-relationship-management-business-sales-marketing-system-concept.jpg",
    },
    {
      id: 3,
      title: "App\nDevelopment",
      icon: "/images/app.svg",
      number: "#03",
      description:
        "Transform raw data into actionable insights with AI-driven analytics that identify patterns, trends, and anomalies in your data, improving strategic decision-making.",
      bgImage:
        "/images/digital-design-businessman-show-growth-graph-earning-with-digital-marketing-strategy.jpg",
    },
    {
      id: 4,
      title: "Digital\nMarketing",
      icon: "/images/digital.svg",
      number: "#04",
      description:
        "Work with our AI consultants to develop a strategic roadmap tailored to your organization's unique needs, from AI readiness assessment to full-scale AI implementation.",
      bgImage: "/images/e-learning-student-university-conceptual.jpg",
    },
  ];

  const handleFlip = (index) => {
    // Create a new array with all cards reset to not flipped
    const newFlipped = Array(flippedCards.length).fill(false);

    // If the clicked card was not already flipped, set it to flipped
    // If it was already flipped, it will remain false (unflipped) in the newFlipped array
    if (!flippedCards[index]) {
      newFlipped[index] = true;
    }

    setFlippedCards(newFlipped);
  };

  const handleButtonClick = (e) => {
    // Only prevent default and handle click animation on mobile
    if (isMobile) {
      e.preventDefault();
      setButtonClicked(true);

      // Navigate after a short delay to show the animation on mobile
      setTimeout(() => {
        router.push("/services");
      }, 300);
    }
    // On desktop, let the Link component handle navigation normally
  };

  useEffect(() => {
    // Check if device is mobile on mount and when window resizes
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkIfMobile();

    // Setup event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black text-white py-24 pt-2"
    >
      <div className="px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="pb-16">
          <Heading />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="perspective-1000 min-h-[350px] max-h-[450px] cursor-pointer"
                onClick={() => handleFlip(index)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform-style-preserve-3d ${
                    flippedCards[index] ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Card */}
                  <div className="absolute w-full h-full backface-hidden rounded-xl p-8 bg-white/5 border border-white/10 flex flex-col justify-between overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={service.bgImage}
                          alt=""
                          fill
                          className="object-cover opacity-25"
                          loading="lazy"
                        />
                        {/* Lighter gradient overlay to allow more image visibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={60}
                        height={60}
                        className="mb-8"
                        loading="lazy"
                      />

                      <h2 className="text-2xl font-semibold leading-tight whitespace-pre-line text-white">
                        {service.title}
                      </h2>
                    </div>
                    <div className="absolute bottom-6 right-6 z-10">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Back Card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl p-8 bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-emerald-400 mb-4">
                        {service.number}
                      </p>
                      <p className="text-base leading-relaxed text-gray-300">
                        {service.description}
                      </p>
                    </div>
                    <div className="absolute bottom-6 right-6 z-10">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg">
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            {isMobile ? (
              // For mobile: Use button with click effect
              <button
                onClick={handleButtonClick}
                className={`relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden text-base font-semibold text-white border border-[#00A8A8] rounded-lg transition-colors duration-300 ${
                  buttonClicked ? "active-btn" : ""
                }`}
              >
                <span className="relative z-10">All Services</span>
                <div
                  className={`absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-black to-[#00A8A8] transition-transform duration-300 ${
                    buttonClicked ? "translate-x-0" : ""
                  }`}
                />
              </button>
            ) : (
              // For desktop: Use Link with hover effect
              <Link
                href="/services"
                className="relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden text-base font-semibold text-white border  border-[#00A8A8] rounded-lg group hover:border-transparent"
              >
                <span className="relative z-10">All Services</span>
                <div className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-black to-[#00A8A8] transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        /* Button active state for touch devices */
        .active-btn {
          background-color: rgba(0, 168, 168, 0.1);
        }
        /* Active state for the button gradient fill */
        .active-btn .translate-x-0 {
          transform: translateX(0);
        }
        /* Hover effect only for desktop/large screens, not for touch devices */
        @media (min-width: 1024px) and (hover: hover) {
          .perspective-1000:hover .relative {
            transform: rotateY(180deg);
          }
        }
        /* For mobile devices - add tap feedback */
        @media (max-width: 1023px) {
          button:active {
            background-color: rgba(0, 168, 168, 0.2);
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceCards;
