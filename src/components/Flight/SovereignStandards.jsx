import React from "react";
import { MdOutlineBed, MdOutlineDoorSliding } from "react-icons/md";
import { FiTruck } from "react-icons/fi";

const features = [
  {
    icon: MdOutlineBed,
    title: "Guaranteed True Lie-Flat Berths",
    description: "No angle-lie surprises. Every tier classified as Business is audited for genuine 180° horizontal resting surfaces.",
  },
  {
    icon: MdOutlineDoorSliding,
    title: "Suite Privacy Architecture",
    description: "Verify sliding door height, privacy partition dimensions, and single aisle seat configurations prior to departure.",
  },
  {
    icon: FiTruck,
    title: "Integrated Chauffeur Drive",
    description: "Private luxury transfer vehicle from your doorstep directly to the VIP check-in curb in 45+ global metropolitan hubs.",
  },
];

const SovereignStandards = () => {
  return (
    <section className="bg-[#0A1628] px-4 sm:px-8 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-400 mb-2">THE SOVEREIGN STANDARDS</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 leading-tight mb-4">
            It's Not Just Where You Fly.
            <br />
            It's How You Fly.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
            Every flight ticket booked via AEROVA guarantees vetted seating geometry, seamless baggage routing, and
            uninterrupted rest cycles tailored around your biological circadian clock.
          </p>

          <div className="flex flex-col gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="w-11 h-11 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-amber-400" size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-100 mb-1">{title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1583396060924-53ad1c2c37a3?w=1000&q=80"
            alt="First class suite dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-72 bg-slate-900/90 backdrop-blur rounded-xl p-4">
            <p className="text-[10px] font-semibold tracking-widest text-amber-400 mb-1">ACOUSTIC ENGINEERING</p>
            <p className="text-sm font-bold text-white mb-1">Under 54 dB Cabin Ambience</p>
            <p className="text-xs text-slate-400">Noise reduction thresholds equivalent to a private library reading room.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SovereignStandards;