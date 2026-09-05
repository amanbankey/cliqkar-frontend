import React from "react";
import { FiCompass, FiClipboard, FiShield, FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: FiCompass,
    title: "Choose",
    description: "Select your destination, citizenship, and purpose. We display exact transparent government and concierge fee breakdowns upfront.",
    tag: "AVG TIME: 1 MINUTE",
    tagColor: "text-gray-400",
  },
  {
    number: "02",
    icon: FiClipboard,
    title: "Prepare",
    description: "Receive your dynamic, nationality-tuned checklist. Upload documents with smart AI photo compliance checks and MRZ validation.",
    tag: "ZERO AMBIGUITY",
    tagColor: "text-gray-400",
  },
  {
    number: "03",
    icon: FiShield,
    title: "Apply",
    description: "Consular specialists conduct a 3-layer dossier audit before securely transferring documents via official embassy and ministry gateways.",
    tag: "256-BIT ENCRYPTED",
    tagColor: "text-gray-400",
  },
  {
    number: "04",
    icon: FiCheckCircle,
    title: "Track & Fly",
    description: "Follow live consular telemetry milestones on your dashboard. Receive your authenticated eVisa directly via email and WhatsApp.",
    tag: "100% PEACE OF MIND",
    tagColor: "text-emerald-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
          ⟿ THE REDUCED-FRICTION LIFECYCLE
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">How VISAORA Works</h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-10">
          From digital onboarding to passport stamped without ever stepping foot inside a chaotic embassy hall.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 text-left">
          {steps.map(({ number, icon: Icon, title, description, tag, tagColor }) => (
            <div key={number} className="bg-indigo-50/60 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xl font-extrabold text-blue-700">{number}</span>
                <span className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon className="text-blue-600" size={16} />
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 mb-2">{title}</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
              <p className={`text-[11px] font-semibold tracking-wide ${tagColor}`}>{tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;