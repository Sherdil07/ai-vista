"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./heading.module.css";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text, className = "") => {
  return text.split("").map((char, i) => (
    <span key={i} className={`${styles.letter} ${className}`} data-char={char}>
      {char}
    </span>
  ));
};

const Heading = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Faster "End-to-End" animation with bounce effect
      gsap.from(`.${styles.headerText01} .${styles.letter}`, {
        y: 30,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.2)",
        stagger: 0.03,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // AI text animation - faster and more vibrant
      gsap.fromTo(
        `.${styles.aiText} .${styles.letter}`,
        {
          opacity: 0,
          y: 20,
          color: "rgba(255,255,255,0)",
        },
        {
          opacity: 1,
          y: 0,
          color: "#ffffff",
          duration: 0.35,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Solutions text animation - snappier with gradient effect
      gsap.fromTo(
        `.${styles.solutionsText} .${styles.letter}`,
        {
          opacity: 0,
          y: 20,
          color: "rgba(255,255,255,0)",
        },
        {
          opacity: 1,
          y: 0,
          color: "#ff4d6d",
          duration: 0.35,
          ease: "power3.out",
          stagger: {
            each: 0.02,
            from: "end",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add a subtle glow effect on hover
      gsap.to(`.${styles.headerText}`, {
        "--glow-opacity": 0.8,
        duration: 0.3,
        paused: true,
        ease: "sine.out",
      });

      // Set up hover effects
      const texts = document.querySelectorAll(`.${styles.headerText}`);
      texts.forEach((text) => {
        text.addEventListener("mouseenter", () => {
          gsap.to(text, { "--glow-opacity": 0.8, duration: 0.3 });
        });
        text.addEventListener("mouseleave", () => {
          gsap.to(text, { "--glow-opacity": 0, duration: 0.5 });
        });
      });
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
