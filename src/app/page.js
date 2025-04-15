import Image from "next/image";
import Hero from "./Components/Hero/hero";
import SloganSlider from "./Components/SloganSlider/sloganSlider";
import Partners from "./Components/Partners/partners";
import ServiceCards from "./Components/ServiceCards/serviceCards";
import ExpertiseSection from "./Components/ExpertiseSection/expertiseSection";
import SpaceThemedCards from "./Components/useCases/useCase";
import ScrollingCards from "./Components/useCases/useCase";

export default function Home() {
  return (
    <div>
      <SloganSlider />
      <Hero />
      <Partners />
      <ServiceCards />
      <ExpertiseSection />
      <ScrollingCards />
    </div>
  );
}
