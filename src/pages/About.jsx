import React from "react";
import HeroSection from "../components/about/HeroSection";
import OperationalHubs from "../components/about/OperationalHubs";
import DestinationNetwork from "../components/about/DestinationNetwork";
import NetworkMapBanner from "../components/about/NetworkMapBanner";
import CityLeadership from "../components/about/CityLeadership";
import WhyCliqkar from "../components/about/WhyCliqkar";
import CTABanner from "../components/about/CtaBanner";

const About = () => {
  return (
    <div>
      <HeroSection />
      <OperationalHubs />
      <DestinationNetwork />
      <NetworkMapBanner />
      <CityLeadership />
      <WhyCliqkar />
      <CTABanner />
    </div>
  );
};

export default About;