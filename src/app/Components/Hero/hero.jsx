import styles from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  const images = [
    "/images/abstract-dark-background-with-flowing-colouful-waves.jpg",
    "/images/future-artificial-intelligence-robot-cyborg.jpg",
    "/images/h2.jpg",
    "/images/saas-concept-collage.jpg",
    "/images/h5.jpg",
    "/images/descomposition-person-wearing-vr-glasses (1).jpg",
    "/images/ai-cloud-concept-with-robot-hand (1).jpg",
    "/images/digital-design-businessman-show-growth-graph-earning-with-digital-marketing-strategy.jpg",
  ];

  return (
    <div className={styles.banner}>
      {/* Headings section */}
      <div className={`${styles.headings} text-center`}>
        <h1 className="text-5xl font-bold text-white mb-4">
          UNLOCK THE FUTURE
        </h1>
        <h2 className="text-4xl italic text-[#00A8A8]">With AI</h2>
      </div>

      {/* 3D Carousel */}
      <div className={styles.slider} style={{ "--quantity": images.length }}>
        {images.map((src, index) => (
          <div
            key={index}
            className={styles.item}
            style={{ "--position": index }}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={800}
              height={1080}
              className={styles.image}
              priority
              style={{
                width: "100%",
                height: "100%",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
