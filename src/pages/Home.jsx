import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./home/HeroSection";
import FlightOffers from "./home/FlightOffers";
import PopularConnections from "./home/PopularConnections";
import VisaSection from "./home/VisaSection";
import OTBClearance from "./home/OTBClearance";
import TravelExperts from "./home/TravelExperts";
import Testimonials from "./home/Testimonials";
import PlatformArchitecture from "./home/PlatformArchitecture";
import CTASection from "./home/CTASection";


const Home = () => {
   const navigate = useNavigate()
   

   
  return (
   <div className="">
     <HeroSection />
     <FlightOffers />
     <PopularConnections />
     <VisaSection />
     <OTBClearance />
     <TravelExperts />
     <Testimonials />
     <PlatformArchitecture />
     <CTASection />
    {/* <button onClick={() => navigate("/dashboard")} >
      Dashboard
    </button> */}
   
   </div>
  );
};

export default Home;