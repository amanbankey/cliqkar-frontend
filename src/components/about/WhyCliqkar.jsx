import React from "react";
import { FiDollarSign, FiCpu, FiLink2, FiUsers } from "react-icons/fi";

const features = [
  {
    icon: FiDollarSign,
    title: "Fintech Precision",
    desc: "Zero hidden markup, transparent airline net fares, and instant sovereign currency settlement across multi-country journeys.",
    tag: "NO HIDDEN CHARGES",
  },
  {
    icon: FiCpu,
    title: "Document AI Pre-Audit",
    desc: "Computer-vision verification of passport MRZ, biometric visa specs, and ICAO compliance before submission to consulates.",
    tag: "99.4% OCR ACCURACY",
  },
  {
    icon: FiLink2,
    title: "Direct DCS Handshakes",
    desc: "Direct digital integration into airline Departure Control Systems for bulletproof, instant Okay to Board electronic stamps.",
    tag: "TIMATIC COMPLIANT",
  },
  {
    icon: FiUsers,
    title: "Local Human Touch",
    desc: "Accredited licensed ground agents and station teams ready to assist travelers personally in every hub.",
    tag: "500+ LICENSED AGENTS",
  },
];

const WhyCliqkar = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-blue-600">ARCHITECTURE</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Why CLIQKAR Powering Modern Mobility</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          Architected with fintech rigor to eliminate travel uncertainty and streamline cross-border compliance.
        </p>

       <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
  {features.map(({ icon: Icon, title, desc, tag }, index) => (
    <div
      key={title}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-700 hover:-translate-y-3 hover:border-cyan-200 hover:shadow-[0_25px_60px_rgba(14,165,233,0.15)]"
    >
      {/* Moving Background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl transition-all duration-700 group-hover:scale-[2.5] group-hover:bg-blue-400/15" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl transition-all duration-700 group-hover:scale-[2] group-hover:bg-cyan-400/10" />

      {/* Icon */}
      <div className="relative z-10">
        <div
          className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[-8deg] group-hover:rounded-xl ${
            index === 0
              ? "group-hover:bg-blue-100"
              : index === 1
              ? "group-hover:bg-cyan-100"
              : index === 2
              ? "group-hover:bg-emerald-100"
              : "group-hover:bg-indigo-100"
          }`}
        >
          <div className="absolute -left-12 top-0 h-full w-7 rotate-12 bg-white/80 transition-all duration-700 group-hover:left-[130%]" />

          <Icon
            size={22}
            className="relative z-10 transition-transform duration-500 group-hover:scale-125"
          />

          <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-500 opacity-0 transition-all duration-500 group-hover:animate-ping group-hover:opacity-100" />
        </div>
      </div>

      {/* Tag */}
      <div className="relative z-10 mt-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-blue-600 transition-all duration-500 group-hover:border-cyan-200 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-all duration-500 group-hover:scale-150 group-hover:bg-cyan-500" />
          {tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-4 text-base font-bold text-slate-900 transition-all duration-500 group-hover:translate-x-1 group-hover:text-blue-700">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-2 text-xs leading-relaxed text-slate-500 transition-all duration-500 group-hover:text-slate-600">
        {desc}
      </p>

      {/* Bottom Data */}
      <div className="relative z-10 mt-6 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:w-full ${
              index === 0
                ? "w-[35%] bg-blue-500"
                : index === 1
                ? "w-[45%] bg-cyan-500"
                : index === 2
                ? "w-[55%] bg-emerald-500"
                : "w-[40%] bg-indigo-500"
            }`}
          />
        </div>

        <span className="text-[9px] font-bold tracking-widest text-slate-300 transition-colors duration-500 group-hover:text-cyan-600">
          0{index + 1}
        </span>
      </div>

      {/* Bottom Hover Reveal */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="flex items-center gap-1.5 text-[9px] font-semibold tracking-wider text-slate-400 transition-all duration-500 group-hover:text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-all duration-500 group-hover:scale-150" />
          VERIFIED
        </span>

        <span className="translate-x-3 text-[9px] font-bold tracking-widest text-cyan-600 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          EXPLORE →
        </span>
      </div>

      {/* Hover Border Accent */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-700 group-hover:w-full" />

      {/* Corner Indicator */}
      <div className="absolute right-4 top-4 flex gap-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span className="h-1 w-1 rounded-full bg-blue-400" />
        <span className="h-1 w-1 rounded-full bg-cyan-400" />
        <span className="h-1 w-1 rounded-full bg-emerald-400" />
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default WhyCliqkar;
