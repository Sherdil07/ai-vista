import Image from "next/image";
import Hero from "./Components/Hero/hero";
import Partners from "./Components/Partners/partners";
import ServiceCards from "./Components/ServiceCards/serviceCards";
import Navbar from "./Components/Navbar/navbar";
import ExpertiseSection from "./Components/ExpertiseSection/expertiseSection";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <Partners />
      <ServiceCards />
      <ExpertiseSection />
      <Hero />
    </div>
  );
}
