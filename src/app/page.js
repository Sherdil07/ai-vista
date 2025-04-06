import Image from "next/image";
import Hero from "./Components/Hero/hero";
import Partners from "./Components/Partners/partners";
import ServiceCards from "./Components/ServiceCards/serviceCards";

export default function Home() {
  return (
    <div>
      <Hero />
      <Partners />
      <ServiceCards />
    </div>
  );
}
