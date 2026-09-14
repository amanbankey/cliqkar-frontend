import React from "react";
import { FiGlobe, FiSend, FiUserCheck, FiCheckCircle } from "react-icons/fi";
 
import aero from "../../assets/image/aboutImg.png";

 const cities = ["New Delhi", "Singapore", "London", "Tokyo", "Paris", "New York", "Bangkok", "Doha", "+172 More"];
const stats = [
  { icon: FiGlobe, value: "180+", label: "Connected Global Cities", sub: "Active airport hubs & sovereign consulates" },
  { icon: FiSend, value: "500K+", label: "Journeys Facilitated", sub: "Flawless digital boarding clearances" },
  { icon: FiUserCheck, value: "500+", label: "Verified Local Agents", sub: "Real-time ground concierge network" },
  { icon: FiCheckCircle, value: "98.6%", label: "Visa Success Rate", sub: "Direct AI pre-audited applications" },
];

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#071426]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${aero})`,
        }}
      />

      {/* Dark aviation overlay matching Contact.jsx */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/90 via-[#071426]/75 to-[#071426]/85" />

      {/* Blue glow */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]" />

      {/* Amber glow */}
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" />

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-300/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          GLOBAL TRAVEL TECH • 180+ CITIES CONNECTED
        </span>

        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Travel, Reimagined Across Every City.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          CLIQKAR is building the modern digital infrastructure for international mobility — unifying flight
          discovery, visa clarity, and boarding clearance across the world's most vibrant metropolitan hubs.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {cities.map((city) => (
            <span
              key={city}
              className="text-xs font-medium text-gray-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, sub }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <Icon className="text-blue-400 text-lg mb-3" />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-sm font-semibold text-gray-200 mt-1">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
