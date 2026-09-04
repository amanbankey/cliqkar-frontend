import React from "react";
import { FiClipboard, FiUploadCloud, FiMail } from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: FiClipboard,
    title: "Enter PNR & Flight Details",
    desc: "Input passenger booking reference, passenger surname, and flight route. Our system pulls live sector details directly via carrier reservation APIs.",
    footnote: "TIME REQUIRED: ~45 SECONDS",
  },
  {
    number: "02",
    icon: FiUploadCloud,
    title: "Upload E-Visa & Passport Copy",
    desc: "Upload clear digital copies. Cliqkar's automated OCR engine cross-validates passport MRZ data with visa barcodes in under 3 seconds.",
    footnote: "AUTOMATED BIOMETRIC OCR",
  },
  {
    number: "03",
    icon: FiMail,
    title: "Receive OTB SMS & Email",
    desc: "Receive authenticated OTB confirmation straight to your mobile and email, bundled with official airline DCS stamp and verifiable QR slip.",
    footnote: "100% AIRPORT READY GUARANTEE",
  },
];

const ThreeStepWorkflow = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-blue-600">FRICTIONLESS WORKFLOW</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">3-Step Streamlined Clearance</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          From booking reference entry to automated boarding manifest dispatch in three effortless steps.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          {steps.map(({ number, icon: Icon, title, desc, footnote }) => (
            <div key={number} className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-200">{number}</span>
                <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={16} />
                </span>
              </div>
              <p className="mt-4 text-sm font-bold text-gray-900">{title}</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{desc}</p>
              <p className="mt-4 text-[10px] font-semibold text-blue-600 tracking-wide">{footnote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepWorkflow;
