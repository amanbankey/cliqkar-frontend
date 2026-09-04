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

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {features.map(({ icon: Icon, title, desc, tag }) => (
            <div key={title} className="border border-gray-200 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Icon size={18} />
              </div>
              <p className="mt-4 text-sm font-bold text-gray-900">{title}</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{desc}</p>
              <p className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCliqkar;
