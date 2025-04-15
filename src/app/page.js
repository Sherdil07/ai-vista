import Image from "next/image";
import Hero from "./Components/Hero/hero";
import SloganSlider from "./Components/SloganSlider/sloganSlider";
import Partners from "./Components/Partners/partners";

export default function Home() {
  return (
    <div>
      <SloganSlider />
      <Hero />
      <Partners />
    </div>
  );
}
