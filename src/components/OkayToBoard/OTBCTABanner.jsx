import React from "react";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const OTBCTABanner = () => {
  return (
    <section className="bg-[#0B1120]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-wide text-emerald-400">
          <FiCheckCircle size={13} /> PREVENT BOARDING DENIAL
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Never Get Denied at the Boarding Gate.
        </h2>
        <p className="mt-4 text-sm text-gray-400 max-w-xl mx-auto">
          Verify your PNR clearance now and travel with complete peace of mind across all Gulf &amp; Asian carrier
          networks.
        </p>

        <button className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide px-6 py-3 rounded-lg">
          CHECK PNR NOW <FiArrowRight size={13} />
        </button>
      </div>
    </section>
  );
};

export default OTBCTABanner;
