import React from "react";
import FlightHero from "../components/Flight/FlightHero";
import CuratedDeals from "../components/Flight/CuratedDeals";
import FeaturedRoute from "../components/Flight/FeaturedRoute";
import CabinTiers from "../components/Flight/CabinTiers";
import PreferredCarriers from "../components/Flight/PreferredCarriers";
import SovereignStandards from "../components/Flight/SovereignStandards";
import DestinationCurations from "../components/Flight/DestinationCurations";
import DiscretionDifference from "../components/Flight/DiscretionDifference";

const Flight = () => {
  return (
    <div>
      <FlightHero />
      <CuratedDeals />
      <FeaturedRoute />
      <CabinTiers />
      <PreferredCarriers />
      <SovereignStandards />
      <DestinationCurations />
      <DiscretionDifference />
    </div>
  );
};

export default Flight;