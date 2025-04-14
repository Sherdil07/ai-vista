import Image from "next/image";
import Hero from "./Components/Hero/hero";
import Partners from "./Components/Partners/partners";
import ServiceCards from "./Components/ServiceCards/serviceCards";

import ExpertiseSection from "./Components/ExpertiseSection/expertiseSection";

import AIInActionCards from "./Components/useCases/useCase";

import TransformBusinessHero from "./Components/TransformBussiness/transform";
import SloganSlider from "./Components/SloganSlider/sloganSlider";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <SloganSlider />
      <Hero />
      
      <ServiceCards />
      <ExpertiseSection />
      <AIInActionCards /> */}
      {/* <TransformBusinessHero /> */}
      <Hero />
      {/* <Partners /> */}
    </div>
  );
}
