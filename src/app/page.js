import Image from "next/image";
import Hero from "./Components/Hero/hero";
import SloganSlider from "./Components/SloganSlider/sloganSlider";
import Partners from "./Components/Partners/partners";
import ServiceCards from "./Components/ServiceCards/serviceCards";

export default function Home() {
  return (
    <div>
      <SloganSlider />
      <Hero />
      <Partners />
      <ServiceCards />
    </div>
  );
}
