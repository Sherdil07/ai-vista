// UseCases.jsx
"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const useCases = [
  {
    id: 1,
    name: "Beyond",
    image: "/images/case-img-01.webp",
    link: "/use-case/beyond",
    number: "01",
  },
  {
    id: 2,
    name: "Healthify",
    image: "/images/case-img-02.webp",
    link: "/use-case/healthify",
    number: "02",
  },
  {
    id: 3,
    name: "FinTechPro",
    image: "/images/case-img-03.webp",
    link: "/use-case/fintechpro",
    number: "03",
  },
  {
    id: 4,
    name: "InnovateX",
    image: "/images/case-img-04.webp",
    link: "/use-case/innovatex",
    number: "04",
  },
];

const UseCaseCard = ({ useCase, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full mb-20"
      initial={{ rotate: 10, y: "50%" }}
      whileInView={{
        rotate: 8 + index * 0.5,
        y: "43%" + index * 2 + "%",
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <Link
          href={useCase.link}
          className="block w-full relative overflow-hidden"
        >
          <motion.div
            className="w-full aspect-[16/9]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={useCase.image}
              alt={useCase.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </Link>

        <Link
          href={useCase.link}
          className="flex items-center p-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center">
            <div className="mr-2 text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"></path>
              </svg>
            </div>
            <div className="relative h-8 overflow-hidden">
              <motion.div
                className="text-2xl font-bold"
                animate={{ y: isHovered ? "-100%" : "0%" }}
                transition={{ duration: 0.3 }}
              >
                {useCase.name}
              </motion.div>
              <motion.div
                className="text-2xl font-bold text-purple-600 absolute top-full"
                animate={{ y: isHovered ? "-100%" : "0%" }}
                transition={{ duration: 0.3 }}
              >
                {useCase.name}
              </motion.div>
            </div>
          </div>
        </Link>

        <div className="absolute top-4 right-4 bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
          {useCase.number}
        </div>
      </div>
    </motion.div>
  );
};

export default function UseCases() {
  return (
    <div className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0">
              AI in Action:
            </h2>
            <div className="flex items-center">
              <h2 className="text-4xl md:text-5xl font-bold mr-2">Use</h2>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-purple-600">Cases</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="relative mt-32">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
