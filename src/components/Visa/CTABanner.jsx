import React from "react";
import { FiArrowRight, FiLock, FiAward, FiRefreshCw } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const trustBadges = [
  { icon: FiLock, label: "256-Bit SSL Encrypted Vault" },
  { icon: FiAward, label: "Official Ministry Integration" },
  { icon: FiRefreshCw, label: "Money-Back Guarantee on Processing Error" },
];

const CTABanner = () => {
  return (
    <section className="bg-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1220] via-[#0B1220] to-blue-900 rounded-3xl px-6 sm:px-10 py-14 text-center">
          <span className="inline-flex items-center gap-2 bg-slate-800/80 text-slate-200 text-xs font-bold px-4 py-2 rounded-full mb-6">
            <TbPlaneDeparture size={14} /> READY FOR TAKE-OFF?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 max-w-3xl mx-auto">
            Your Next Destination Is Closer Than You Think.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Check your visa requirements, get an instant document checklist, and submit your verified application in
            under 10 minutes.
          </p>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-3.5 rounded-xl mb-8">
            Explore All 180+ Visas <FiArrowRight size={16} />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-xs text-slate-300">
                <Icon size={14} className="text-slate-400" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;