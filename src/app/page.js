import Image from "next/image";
import Hero from "./Components/Hero/hero";
import SloganSlider from "./Components/SloganSlider/sloganSlider";

export default function Home() {
  return (
    <div>
      <SloganSlider />
      <Hero />
    </div>
  );
}
