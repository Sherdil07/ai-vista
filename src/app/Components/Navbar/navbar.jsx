"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionPage, setTransitionPage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Prevent body scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  // Modified dot animation with proper horizontal ellipsis transformation
  const dotVariants = {
    open: (custom) => {
      // For open state, show horizontal ellipsis (...)
      // Only make the dots at positions 3, 4, and 5 visible (indices 2, 4, 6 for middle row)
      const isMiddleDot = custom === 3 || custom === 4 || custom === 5;
      return {
        opacity: isMiddleDot ? 1 : 0,
        // Position the dots horizontally in the center with equal spacing
        x: isMiddleDot ? (custom - 4) * 12 : 0,
        y: 0, // All dots aligned to the center vertically
        scale: isMiddleDot ? 1 : 0,
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
      };
    },
    closed: (custom) => ({
      opacity: 1, // All 9 dots visible
      x: (custom % 3) * 16 - 16, // Grid position X
      y: Math.floor(custom / 3) * 16 - 16, // Grid position Y
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  // Mobile menu slide from top animation
  const menuSlide = {
    initial: { y: "-100%" },
    enter: { y: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // Item slide animation for mobile menu - coming from bottom
  const slide = {
    initial: { y: 80, opacity: 0 },
    enter: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
    exit: (i) => ({
      y: 80,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
  };

  // Page transition animation with curved clip path
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

  // Title animation for page transition
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

  // Button container rotation animation - UPDATED with rotation
  const buttonContainerVariants = {
    open: {
      rotate: 180, // Rotate 180 degrees when opening
      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
    },
    closed: {
      rotate: 0,
      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
    },
  };

  // Close button animation
  const closeButtonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.2 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Handle navigation with transition animation
  const handleNavigation = (href, name) => {
    setIsPageTransitioning(true);
    setTransitionPage(name);
    setIsOpen(false);

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

  // Text hover animation component
  const TextHover = ({ title }) => {
    return (
      <div className="group overflow-hidden cursor-pointer transition-all ease-in-out duration-200">
        <div className="relative transition-all ease-in-out duration-500">
          <div>
            <h1 className="translate-y-[0%] group-hover:translate-y-[-100%] absolute left-0 transition-all ease-in-out duration-500">
              <div className="translate-y-[0%] group-hover:translate-y-[-100%] transition-all ease-in-out duration-500 font-bold text-white">
                {title}
              </div>
            </h1>
            <h1 className="relative transition-all ease-in-out duration-500">
              <div className="translate-y-[100%] group-hover:translate-y-[0%] transition-all ease-in-out duration-500 font-bold text-white">
                {title}
              </div>
            </h1>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className="bg-black backdrop-blur-lg border-gray-100 w-full z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Logo
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation with TextHover effect */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.href, item.name)}
                >
                  <TextHover title={item.name} />
                </motion.div>
              ))}
            </div>

            {/* Mobile Toggle Button with rotating dots animation */}
            <motion.button
              className="md:hidden p-3 rounded-xl relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {/* Container for dots with rotation animation */}
              <motion.div
                className="w-8 h-8 relative"
                variants={buttonContainerVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
              >
                {/* All 9 dots using array mapping for cleaner code */}
                {[...Array(9)].map((_, i) => (
                  <motion.span
                    key={`dot-${i}`}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                    custom={i}
                    variants={dotVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: "-0.1875rem",
                      marginTop: "-0.1875rem",
                    }}
                  />
                ))}
              </motion.div>
            </motion.button>
          </div>

          {/* Enhanced Mobile Menu with slide-from-top animation and fully opaque background */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                variants={menuSlide}
                initial="initial"
                animate="enter"
                exit="exit"
                className="md:hidden fixed top-0 left-0 right-0 z-40 w-full min-h-screen flex flex-col bg-gradient-to-r from-black to-blue-900"
                style={{ backgroundColor: "rgba(0,0,0,0.98)" }} // Ensure high opacity
              >
                {/* Add an overlay to ensure complete coverage */}
                <div className="absolute inset-0 bg-black opacity-95 z-0"></div>

                <div className="w-full flex justify-between items-center h-20 border-b border-[#ffffff33] px-6 relative z-10">
                  <Link href="/">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Logo
                    </span>
                  </Link>

                  {/* Close button (separate from the dots for smoother transition) */}
                  <motion.div
                    variants={closeButtonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="opacity-0 hidden" // We're using the dot pattern instead
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </motion.div>
                </div>

                {/* Centered menu items that slide from bottom */}
                <div className="flex-grow flex flex-col justify-center items-center relative z-10">
                  <ul className="w-full flex flex-col items-center justify-center gap-8 p-8">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        custom={i}
                        variants={slide}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="text-center"
                      >
                        <div
                          onClick={() => handleNavigation(item.href, item.name)}
                          className="text-5xl uppercase font-bold tracking-wider text-white block cursor-pointer"
                        >
                          {item.name}
                        </div>
                      </motion.div>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Page Transition Overlay */}
      <AnimatePresence mode="wait">
        {isPageTransitioning && (
          <motion.div
            variants={pageTransition}
            initial="initial"
            animate={isExiting ? "exit" : "animate"}
            className="fixed inset-0 w-full h-full z-[100] bg-gradient-to-r from-black to-blue-900 flex items-center justify-center overflow-hidden"
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
                className="text-6xl font-bold text-white uppercase tracking-wider"
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
};

export default Navbar;
