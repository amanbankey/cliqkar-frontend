import React from "react";
import { FiCreditCard, FiSliders, FiAward, FiSmartphone, FiBell, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiCreditCard,
    title: "Transparent Pricing",
    description: "Zero hidden embassy markups, sudden courier surcharges, or opaque processing fees. You see the complete, itemized cost before you apply.",
  },
  {
    icon: FiSliders,
    title: "Personalized Requirements",
    description: "Dynamic document engines only request what your exact nationality and passport configuration requires. No surplus paperwork.",
  },
  {
    icon: FiAward,
    title: "Expert Consular Review",
    description: "Every dossier is cross-referenced by former consular visa processing agents to correct discrepancies before embassy filing.",
  },
  {
    icon: FiSmartphone,
    title: "100% Online Application",
    description: "Eliminate physical queues, confusing paper forms, and postal delays. Complete your application from your smartphone or desktop in minutes.",
  },
  {
    icon: FiBell,
    title: "Milestone Telemetry",
    description: "Instant WhatsApp, SMS, and dashboard updates at every checkpoint: Document Audit → Embassy Submission → eVisa Issuance.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Human Consular Support",
    description: "No infinite chatbot loops. Chat directly with dedicated consular travel specialists who understand complex visa scenarios.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
          ✪ ENGINEERED FOR RADICAL CLARITY
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Why Modern Travelers Choose VISAORA</h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-10">
          Replacing bureaucratic confusion with modern software efficiency and institutional consular rigor.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl p-6">
              <span className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-5">
                <Icon className="text-blue-600" size={18} />
              </span>
              <p className="text-lg font-bold text-gray-900 mb-2">{title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;