import styles from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  const images = [
    "/images/h1.webp",
    "/images/h2.webp",
    "/images/h3.webp",
    "/images/h4.webp",
    "/images/h5.webp",
    "/images/h6.webp",
    "/images/h7.webp",
    "/images/h4.webp", // Added 3 more images
  ];

  return (
    <div className={styles.banner}>
      {/* Headings */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center z-50 w-full">
        <h1 className="text-5xl font-bold text-white mb-4">
          UNLOCK THE FUTURE
        </h1>
        <h2 className="text-4xl italic text-pink-500">With AI</h2>
      </div>

      {/* Zero-sized central container acting as the rotation axis */}
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
              width={200}
              height={250}
              className={styles.image}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
