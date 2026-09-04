import React from "react";
import { FiStar, FiShield, FiRepeat, FiGlobe, FiHeadphones } from "react-icons/fi";
import { TbBrain } from "react-icons/tb";

const features = [
  {
    icon: FiStar,
    title: "Curated Premium Flights",
    description: "We only index widebody aircraft equipped with true lie-flat and suite installations, filtering out substandard regional equipment.",
  },
  {
    icon: FiShield,
    title: "Transparent Net Pricing",
    description: "All quoted tariffs reflect all-inclusive government taxes, carrier fuel levies, and guaranteed seat selection rights.",
  },
  {
    icon: FiRepeat,
    title: "Smart Cabin Comparison",
    description: "Compare pitch, seat width, door privacy status, and Champagne vintages across airlines on an objective side-by-side rubric.",
  },
  {
    icon: TbBrain,
    title: "Cabin Intelligence Feed",
    description: "Real-time aircraft tail swap alerts so you always fly on the refurbished cabins you originally selected.",
  },
  {
    icon: FiGlobe,
    title: "Global Route Coverage",
    description: "Seamless multi-leg interline connections across all three premier alliances: oneworld, Star Alliance, and SkyTeam.",
  },
  {
    icon: FiHeadphones,
    title: "Human Concierge Desk",
    description: "Instant direct-dial access to licensed senior flight dispatchers, 24 hours a day, 365 days a year.",
  },
];

const DiscretionDifference = () => {
  return (
    <section className="bg-[#0A1628] px-4 sm:px-8 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-400 mb-2">THE DISCRETION DIFFERENCE</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 mb-3">
          Engineered Exclusively for Luxury Air Travel
        </h2>
        <p className="text-slate-400 text-sm">Zero irrelevant promotions. Solely the finest international corridors.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="border border-slate-800 rounded-xl p-6">
            <span className="w-10 h-10 rounded-full border border-amber-400 flex items-center justify-center mb-4">
              <Icon className="text-amber-400" size={17} />
            </span>
            <p className="text-base font-bold text-slate-100 mb-2">{title}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscretionDifference;