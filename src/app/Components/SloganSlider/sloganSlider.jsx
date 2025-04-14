"use client";
import { motion } from "framer-motion";

const SloganSlider = () => {
  return (
    <section className="bg-black py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 
            text-white font-medium text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 
            whitespace-nowrap hover:[&>span:not(:first-child,:last-child)]:text-teal-300 
            transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 120,
          }}
        >
          <motion.span
            className="text-teal-400/80 animate-pulse text-xs sm:text-sm md:text-base"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            ✦
          </motion.span>

          <span className="mx-1 sm:mx-2 md:mx-3 opacity-90 font-semibold">
            SMART SOLUTIONS
          </span>
          <span className="opacity-90 font-semibold -mx-1 sm:-mx-0.5">—</span>

          <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            SMARTER FUTURE
          </span>

          <motion.span
            className="text-teal-400/80 animate-pulse text-xs sm:text-sm md:text-base"
            animate={{ rotate: [360, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            ✦
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default SloganSlider;
