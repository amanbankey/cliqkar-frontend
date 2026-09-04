import React from "react";
import OTBHero from "../components/OkayToBoard/OTBHero";
import LiveStatusSimulation from "../components/OkayToBoard/LiveStatusSimulation";
import SupportedAirlines from "../components/OkayToBoard/SupportedAirlines";
import ThreeStepWorkflow from "../components/OkayToBoard/ThreeStepWorkflow";
import RequirementsMatrix from "../components/OkayToBoard/RequirementsMatrix";
import DocumentUploadSimulator from "../components/OkayToBoard/DocumentUploadSimulator";
import StatsBar from "../components/OkayToBoard/StatsBar";
import DepartureChecklist from "../components/OkayToBoard/DepartureChecklist";
import OTBCTABanner from "../components/OkayToBoard/OTBCTABanner";

const OkayToBoard = () => {
  return (
    <div>
      <OTBHero />
      <LiveStatusSimulation />
      <SupportedAirlines />
      <ThreeStepWorkflow />
      <RequirementsMatrix />
      <DocumentUploadSimulator />
      <StatsBar />
      <DepartureChecklist />
      <OTBCTABanner />
    </div>
  );
};

export default OkayToBoard;