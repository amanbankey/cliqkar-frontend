import React from "react";
import { FiClipboard, FiUploadCloud, FiMail, FiArrowRight } from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: FiClipboard,
    title: "Enter PNR & Flight Details",
    desc: "Input passenger booking reference, passenger surname, and flight route. Our system pulls live sector details directly via carrier reservation APIs.",
    footnote: "Time required: ~45 seconds",
    animation: "tilt",
  },
  {
    number: "02",
    icon: FiUploadCloud,
    title: "Upload E-Visa & Passport Copy",
    desc: "Upload clear digital copies. Cliqkar's automated OCR engine cross-validates passport MRZ data with visa barcodes in under 3 seconds.",
    footnote: "Automated biometric OCR",
    animation: "lift",
  },
  {
    number: "03",
    icon: FiMail,
    title: "Receive OTB SMS & Email",
    desc: "Receive authenticated OTB confirmation straight to your mobile and email, bundled with official airline DCS stamp and verifiable QR slip.",
    footnote: "100% airport-ready guarantee",
    animation: "send",
  },
];

const ThreeStepWorkflow = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-slate-900">Frictionless workflow</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">3-step streamlined clearance</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          From booking reference entry to automated boarding manifest dispatch in three effortless steps.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          {steps.map(({ number, icon: Icon, title, desc, footnote, animation }, i) => (
            <div
              key={number}
              className="group relative overflow-hidden border border-gray-200 rounded-2xl p-5 transition-all duration-500 hover:border-slate-900 hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(15,23,42,0.35)]"
            >
              {/* connecting thread between steps */}
              {i < steps.length - 1 && (
                <span className="hidden sm:block absolute top-1/2 -right-3 w-3 h-px bg-gray-200 z-10" />
              )}

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-200 transition-colors duration-500 group-hover:text-slate-900">
                  {number}
                </span>

                <span
                  className={[
                    "relative w-9 h-9 rounded-lg bg-slate-50 text-slate-900 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white",
                    animation === "tilt" ? "group-hover:-rotate-[14deg] group-hover:scale-110" : "",
                    animation === "lift" ? "" : "",
                    animation === "send" ? "" : "",
                  ].join(" ")}
                >
                  {animation === "lift" ? (
                    <>
                      <Icon
                        size={16}
                        className="transition-all duration-500 group-hover:-translate-y-6 group-hover:opacity-0"
                      />
                      <span className="absolute inset-0 flex items-center justify-center translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <Icon size={16} />
                      </span>
                    </>
                  ) : animation === "send" ? (
                    <>
                      <Icon
                        size={16}
                        className="transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0"
                      />
                      <FiArrowRight
                        size={16}
                        className="absolute -translate-x-6 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </>
                  ) : (
                    <Icon size={16} />
                  )}
                </span>
              </div>

              <p className="mt-4 text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-slate-900">
                {title}
              </p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{desc}</p>

              <p className="mt-4 text-[11px] font-medium text-gray-400 transition-colors duration-500 group-hover:text-slate-900">
                {footnote}
              </p>

              {/* underline that draws in on hover, anchored to this card only */}
              <span className="absolute left-5 right-5 bottom-0 h-px bg-slate-900 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepWorkflow;