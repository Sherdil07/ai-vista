"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Navigation constants
const footernavbarItems = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Services",
    href: "services",
  },
  {
    id: 3,
    title: "Our work",
    href: "presentation",
  },
  {
    id: 4,
    title: "About us",
    href: "ochi-team",
  },
  {
    id: 5,
    title: "Insights",
    href: "insights",
  },
  {
    id: 6,
    title: "Contact us",
    href: "contact",
  },
];

const navbarItems = [
  {
    id: 1,
    title: "Services",
    href: "/services",
  },
  {
    id: 2,
    title: "Our work",
    href: "/presentation",
  },
  {
    id: 3,
    title: "About us",
    href: "/ochi-team",
  },
  {
    id: 4,
    title: "Insights",
    href: "/insights",
  },
  {
    id: 5,
    title: "Contact us",
    href: "/contact",
  },
];

// Text hover animation component
function TextHover({ title1, title2 }) {
  return (
    <div className="group overflow-hidden cursor-pointer transition-all ease-in-out duration-200">
      <div className="relative transition-all ease-in-out duration-500">
        <div>
          <h1 className="translate-y-[0%] group-hover:translate-y-[-100%] absolute left-0 transition-all ease-in-out duration-500">
            <div className="translate-y-[0%] group-hover:translate-y-[-100%] transition-all ease-in-out duration-500 font-bold text-white">
              {title1}
            </div>
          </h1>
          <h1 className="relative transition-all ease-in-out duration-500">
            <div className="translate-y-[100%] group-hover:translate-y-[0%] transition-all ease-in-out duration-500 font-bold text-white">
              {title2}
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionPage, setTransitionPage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Menu slide animation variant
  const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      x: "calc(100% + 100px)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // Item slide animation
  const slide = {
    initial: { x: 80, opacity: 0 },
    enter: (i) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
    exit: (i) => ({
      x: 80,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
  };

  // Enhanced page transition animation with curved clip path
  const pageTransition = {
    initial: {
      y: "100%",
      clipPath: "ellipse(100% 0% at 50% 100%)",
      opacity: 1,
    },
    animate: {
      y: "0%",
      clipPath: "ellipse(140% 100% at 50% 100%)",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        clipPath: {
          duration: 1,
          ease: "easeInOut",
        },
      },
    },
    exit: {
      y: "-50%",
      clipPath: "ellipse(140% 100% at 50% -50%)", // curved exit upward
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.87, 0, 0.13, 1],
        clipPath: {
          duration: 1,
          ease: [0.645, 0.045, 0.355, 1],
        },
      },
    },
  };

  // Title animation
  const titleAnimation = {
    initial: {
      y: 60,
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.3,
      },
    },
    exit: {
      y: -60,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1,
      },
    },
  };

  // Handle page navigation with transition
  const handleNavigation = (href, title) => {
    setIsPageTransitioning(true);
    setTransitionPage(title);
    setToggle(false);

    // Initial phase - showing the transition screen
    setTimeout(() => {
      // Begin exit phase
      setIsExiting(true);

      // Delay navigation to allow for exit animation
      setTimeout(() => {
        router.push(href);

        // Reset states after navigation
        setTimeout(() => {
          setIsPageTransitioning(false);
          setIsExiting(false);
        }, 500);
      }, 1000); // Delay navigation until exit animation is underway
    }, 1500); // Allow entrance animation to complete
  };

  return (
    <>
      {/* Desktop navbar with hover animation */}
      <div className="w-full bg-gradient-to-r from-black to-green-800 justify-between items-center h-[8vh] padding-x hidden lg:flex">
        <Link href={"/"}>
          <Image src="/images/logo.png" alt="logo" width={70} height={70} />
        </Link>
        <div className="flex gap-8">
          {navbarItems.map((item) => (
            <div
              key={item.id}
              className="text-lg cursor-pointer"
              onClick={() => handleNavigation(item.href, item.title)}
            >
              <TextHover title1={item.title} title2={item.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile navbar toggle button */}
      <div className="w-full bg-gradient-to-r from-black to-green-800 flex justify-between items-center h-[8vh] padding-x lg:hidden">
        <Link href={"/"}>
          <Image src="/images/logo.png" alt="logo" width={70} height={70} />
        </Link>
        <HiOutlineMenuAlt4
          onClick={() => setToggle(true)}
          className="text-3xl cursor-pointer text-white"
        />
      </div>

      {/* Mobile menu with animations */}
      <AnimatePresence mode="wait">
        {toggle && (
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed top-0 bottom-0 right-0 z-50 w-full min-h-screen flex justify-end items-end flex-col bg-gradient-to-r from-black to-green-800"
          >
            <div className="w-full flex justify-between items-center h-[8vh] border-b border-[#ffffff33] padding-x">
              <Link href={"/"}>
                <Image
                  src="/images/mobileLogo.png"
                  alt="mobile logo"
                  width={70}
                  height={70}
                />
              </Link>
              <IoMdClose
                onClick={() => setToggle(false)}
                className="text-3xl cursor-pointer text-white"
              />
            </div>
            <ul className="h-full w-full flex justify-center text-left flex-col gap-[10px] padding-x">
              {footernavbarItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={slide}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <div
                    onClick={() => handleNavigation(item.href, item.title)}
                    className="text-[80px] leading-[67px] font-FoundersGrotesk uppercase font-bold tracking-[-.9] text-white block cursor-pointer"
                  >
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced page transition overlay with curved clip path */}
      <AnimatePresence mode="wait">
        {isPageTransitioning && (
          <motion.div
            variants={pageTransition}
            initial="initial"
            animate={isExiting ? "exit" : "animate"}
            className="fixed inset-0 w-full h-full z-[100] bg-gradient-to-r from-black to-green-800 flex items-center justify-center overflow-hidden"
          >
            {/* Wave overlay for added dimension */}
            <motion.div
              className="absolute inset-0 opacity-20 bg-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isExiting ? 0 : 0.05,
                transition: { duration: 1.5 },
              }}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wave' x='0' y='0' width='100' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 5 Q 25 0, 50 5 T 100 5' stroke='white' fill='none' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3C/svg%3E\")",
                backgroundSize: "100px 20px",
              }}
            />

            <motion.div className="relative flex flex-col items-center justify-center z-10">
              <motion.h1
                variants={titleAnimation}
                initial="initial"
                animate={isExiting ? "exit" : "animate"}
                className="text-[80px] font-bold text-white uppercase tracking-wider"
              >
                {transitionPage}
              </motion.h1>

              {/* Decorative curved line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: isExiting ? "10%" : "60%",
                  opacity: isExiting ? 0 : 1,
                }}
                transition={{
                  duration: isExiting ? 0.6 : 0.8,
                  ease: "easeInOut",
                  delay: isExiting ? 0 : 0.4,
                }}
                className="h-1 bg-white rounded-full mt-4"
              />

              {/* Additional decorative elements */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: isExiting ? 1.3 : 1,
                  opacity: isExiting ? 0 : 0.1,
                  transition: {
                    duration: isExiting ? 0.8 : 1.2,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="w-64 h-64 rounded-full border border-white opacity-30 absolute"></div>
                <div className="w-96 h-96 rounded-full border border-white opacity-20 absolute"></div>
                <div className="w-128 h-128 rounded-full border border-white opacity-10 absolute"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
