import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto bg-[#0B1120] rounded-3xl px-6 sm:px-10 py-14 text-center">
        <p className="text-[11px] font-semibold tracking-wide text-amber-400">ZERO DELAY • 100% AIRPORT CONFIDENCE</p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
          Ready to Experience Travel Without Friction?
        </h2>
        <p className="mt-4 text-sm text-gray-400 max-w-xl mx-auto">
          Join over 500,000 global travelers who rely on CLIQKAR for verified flights, express visas, and seamless
          boarding clearances.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide px-6 py-3 rounded-lg"
          >
            SEARCH GLOBAL FLIGHTS <FiArrowRight size={13} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="border border-white/20 text-white text-xs font-bold tracking-wide px-6 py-3 rounded-lg hover:bg-white/10"
          >
            EXPLORE VISA PORTAL
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
