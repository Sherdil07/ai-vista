import Image from "next/image";
import Hero from "./Components/Hero/hero";
import Partners from "./Components/Partners/partners";
import ServiceCards from "./Components/ServiceCards/serviceCards";
import Navbar from "./Components/Navbar/navbar";
import ExpertiseSection from "./Components/ExpertiseSection/expertiseSection";
import UseCases from "./Components/useCases/useCase";
import StackedCards from "./Components/useCases/useCase";
import ParallaxCards from "./Components/useCases/useCase";
import AIInActionCards from "./Components/useCases/useCase";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <Partners />
      <ServiceCards />
      <ExpertiseSection />
      <AIInActionCards />
    </div>
  );
}
