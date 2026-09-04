import React from "react";
import { TbPlaneDeparture } from "react-icons/tb";

const carriers = [
  { name: "Emirates", subtitle: "A380 Suites" },
  { name: "Qatar Airways", subtitle: "Qsuite Flagship" },
  { name: "Singapore Air", subtitle: "A380 Double Bed" },
  { name: "Etihad Airways", subtitle: "The Residence" },
  { name: "Lufthansa", subtitle: "Allegris Suite" },
  { name: "Air France", subtitle: "La Première" },
  { name: "British Airways", subtitle: "Club Suite Door" },
  { name: "All Nippon (ANA)", subtitle: "The Room 777" },
];

const PreferredCarriers = () => {
  return (
    <section className="bg-[#0A1628] px-4 sm:px-8 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-400 mb-2">THE PREFERRED CARRIER REGISTRY</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-slate-100">Fly With the World's Finest</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {carriers.map((carrier) => (
          <div key={carrier.name} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
            <TbPlaneDeparture className="text-amber-400 mx-auto mb-3" size={22} />
            <p className="text-sm font-bold text-slate-100 mb-1">{carrier.name}</p>
            <p className="text-xs text-slate-500">{carrier.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreferredCarriers;