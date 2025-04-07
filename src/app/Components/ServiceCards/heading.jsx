"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./heading.module.css";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text, className = "") => {
  return text.split("").map((char, i) => (
    <span key={i} className={`${styles.letter} ${className}`}>
      {char}
    </span>
  ));
};

const Heading = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Common animation settings
      const animationSettings = {
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.5, // Smooth scrubbing instead of toggle
          toggleActions: "play reverse play reverse", // Plays forward and reverses
        },
      };

      // "End-to-End" letters
      gsap.fromTo(
        `.${styles.headerText01} .${styles.letter}`,
        { opacity: 0 },
        {
          opacity: 1,
          ...animationSettings,
        }
      );

      // AI text animation
      gsap.fromTo(
        `.${styles.aiText} .${styles.letter}`,
        { opacity: 0, color: "rgba(255,255,255,0.3)" },
        {
          opacity: 1,
          color: "#ffffff",
          ...animationSettings,
        }
      );

      // Solutions text animation with slight delay
      gsap.fromTo(
        `.${styles.solutionsText} .${styles.letter}`,
        { opacity: 0, color: "rgba(255,255,255,0.3)" },
        {
          opacity: 1,
          color: "#ff4d6d",
          ...animationSettings,
          delay: 0.1,
        }
      );

      // Scale animation with proper reset
      gsap.fromTo(
        `.${styles.headerText} .${styles.letter}`,
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          stagger: 0.02,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.headerContentWrapper}>
      <div className={styles.headingWrapper}>
        <div className={styles.headingItem}>
          <h2 className={`${styles.headerText} ${styles.headerText01}`}>
            {splitText("End-to-End")}
          </h2>
        </div>
        <div className={styles.headingFlex}>
          <div className={styles.headingItem}>
            <h2
              className={`${styles.headerText} ${styles.headerText02} ${styles.aiText}`}
            >
              {splitText("AI")}
            </h2>
          </div>
          <div className={styles.headingItem}>
            <h2
              className={`${styles.headerText} ${styles.headerText03} ${styles.solutionsText}`}
            >
              {splitText("Solutions")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
