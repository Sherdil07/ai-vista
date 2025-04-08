"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure menu is closed on page load or refresh
  useEffect(() => {
    setIsOpen(false); // Menu will be closed by default on page load/refresh
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  // Toggle button variants
  const toggleVariants = {
    open: {
      rotate: 180,
      transition: { duration: 0.3 },
    },
    closed: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
  };

  // Dot animation variants
  const dotVariants = {
    open: (custom) => ({
      opacity: custom < 3 ? 1 : 0, // Only show the first 3 dots when open
      x: custom === 0 ? -8 : custom === 1 ? 0 : 8, // Arrange first 3 dots horizontally
      y: 0, // Keep them horizontally aligned
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }),
    closed: (custom) => ({
      opacity: 1,
      x: (custom % 3) * 16 - 16,
      y: Math.floor(custom / 3) * 16 - 16,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }),
  };

  return (
    <nav className="bg-black backdrop-blur-lg border-b border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Logo
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-white hover:text-blue-600"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                <motion.div
                  className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600"
                  whileHover={{
                    width: "100%",
                    left: 0,
                    transition: { duration: 0.3 },
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* Animated Toggle Button */}
          <motion.button
            className="md:hidden p-3 rounded-xl hover:bg-gray-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            variants={toggleVariants}
            animate={isOpen ? "open" : "closed"}
          >
            <div className="w-8 h-8 relative">
              {[...Array(9)].map((_, i) => (
                <motion.span
                  key={i}
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
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden bg-black backdrop-blur-lg shadow-xl rounded-lg mx-4 mt-2"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-4 pt-4 pb-6"
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 rounded-lg hover:bg-blue-50 text-white hover:text-blue-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
