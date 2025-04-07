"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./serviceCards.module.css";
import Heading from "./heading";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text) => {
  return text.split("").map((char, i) => (
    <span key={i} className={styles.letter} data-char={char}>
      {char}
    </span>
  ));
};

const ServiceCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);

  const services = [
    {
      id: 1,
      title: "Machine\nLearning",
      icon: "https://cdn.prod.website-files.com/66d39c6cae70a65d79022708/66e45429520db7856681bb20_icon-01.svg",
      number: "#01",
      description:
        "Develop predictive models and automate decision-making processes with custom machine learning algorithms that learn from your data.",
    },
    {
      id: 2,
      title: "Computer\nVision",
      icon: "https://cdn.prod.website-files.com/66d39c6cae70a65d79022708/66e458c1d8cfb7270742cb23_icon-02.svg",
      number: "#02",
      description:
        "Leverage image and video analysis to automate visual inspection, enhance security, or provide innovative customer experiences through facial recognition, object detection, and more.",
    },
    {
      id: 3,
      title: "AI-Powered\nAnalytics",
      icon: "https://cdn.prod.website-files.com/66d39c6cae70a65d79022708/66e458c120f7c47f0b8d2332_icon-03.svg",
      number: "#03",
      description:
        "Transform raw data into actionable insights with AI-driven analytics that identify patterns, trends, and anomalies in your data, improving strategic decision-making.",
    },
    {
      id: 4,
      title: "AI\nConsultation",
      icon: "https://cdn.prod.website-files.com/66d39c6cae70a65d79022708/66e458c13e46cb50aceb4d49_icon-04.svg",
      number: "#04",
      description:
        "Work with our AI consultants to develop a strategic roadmap tailored to your organization's unique needs, from AI readiness assessment to full-scale AI implementation.",
    },
  ];

  const toggleFlip = (id) => {
    const newFlipped = new Set(flippedCards);
    newFlipped.has(id) ? newFlipped.delete(id) : newFlipped.add(id);
    setFlippedCards(newFlipped);
  };

  useEffect(() => {
    const setupAnimations = () => {
      // Opacity animation for headings
      gsap.to(`.${styles.headerText}`, {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: `.${styles.sectionHomeService}`,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Left to right fill animation for featuredText
      gsap.to(`.${styles.featuredText}::before`, {
        width: "100%",
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: `.${styles.sectionHomeService}`,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    };

    setupAnimations();
  }, []);

  return (
    <section className={styles.sectionHomeService}>
      <div className={styles.paddingGlobal}>
        <div className={styles.containerLarge}>
          <div className={styles.paddingSectionLarge}>
            <div className={styles.spacerXlarge} />
            <Heading />

            <div className={styles.serviceComponentGrid}>
              {services.map((service) => (
                <div
                  key={service.id}
                  className={styles.cardContainer}
                  onClick={() => toggleFlip(service.id)}
                >
                  <div
                    className={styles.cardWrapper}
                    style={{
                      transform: flippedCards.has(service.id)
                        ? "rotateY(180deg)"
                        : "none",
                    }}
                  >
                    {/* Front Card Content */}
                    <div className={styles.cardSide}>
                      <div className={styles.cardContentBlock}>
                        <img
                          src={service.icon}
                          alt={`Service Icon - ${service.title}`}
                          className={styles.serviceIcon}
                          loading="lazy"
                        />
                        <h2 className={styles.cardTitle}>
                          {service.title.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </h2>
                      </div>
                      <div className={styles.cardIconWrap}>
                        <div className={styles.cardIconItem}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Back Card Content */}
                    <div className={`${styles.cardSide} ${styles.isBack}`}>
                      <div className={styles.cardContentBlock}>
                        <div className={styles.cardNumber}>
                          {service.number}
                        </div>
                        <p className={styles.cardDescription}>
                          {service.description}
                        </p>
                      </div>
                      <div className={styles.cardIconWrap}>
                        <div className={styles.cardIconItem}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
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

            <div className={styles.spacerXlarge} />

            <div className={styles.buttonWrapper}>
              <Link href="/services" className={styles.mainButton}>
                <div className={styles.buttonIconBlock}></div>
                <div className={styles.buttonTextWrap}>
                  <div className={styles.buttonText}>All Services</div>
                  <div className={styles.buttonText}>All Services</div>
                </div>
                <div className={styles.buttonBgOverflow}>
                  <div className={styles.buttonBg} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
