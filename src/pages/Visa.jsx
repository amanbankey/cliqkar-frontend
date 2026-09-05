import React, {useState} from "react";

import VisaHero from "../components/Visa/VisaHero";
import DestinationsCatalog from "../components/Visa/DestinationsCatalog";
import SchengenSuite from "../components/Visa/SchengenSuite";
import EligibilityChecker from "../components/Visa/EligibilityChecker";
import HowItWorks from "../components/Visa/HowItWorks";
import DocumentDossier from "../components/Visa/DocumentDossier";
import LiveTracking from "../components/Visa/LiveTracking";
import WhyChooseUs from "../components/Visa/WhyChooseUs";
import StatsBanner from "../components/Visa/StatsBanner";
import Testimonials from "../components/Visa/Testimonials";
import VisaGuides from "../components/Visa/VisaGuides";
import CTABanner from "../components/Visa/CTABanner";
const Visa = () => {
   
  return (
     <div>
      <VisaHero />
      <DestinationsCatalog />
      <SchengenSuite />
      <EligibilityChecker />
      <HowItWorks />
      <DocumentDossier />
      <LiveTracking />
      <WhyChooseUs />
      <StatsBanner />
      <Testimonials />
      <VisaGuides />
      <CTABanner />
    </div>

  );
};

export default Visa;