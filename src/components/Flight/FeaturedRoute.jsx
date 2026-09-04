import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { GiMartini } from "react-icons/gi";
import { MdOutlineBed } from "react-icons/md";

const FeaturedRoute = () => {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-14 bg-white">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative min-h-[520px] flex items-end lg:items-center">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Emirates A380"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/80 to-[#0A1628]/20" />

        <span className="absolute top-6 left-6 bg-slate-900/80 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full">
          Flagship Corridor · DEL <span className="mx-1">⇄</span> DXB
        </span>

        <div className="relative z-10 w-full lg:w-1/2 lg:ml-auto px-6 sm:px-10 py-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-400 mb-2">FEATURED ROUTE EXPERIENCE</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-4">
            Emirates A380 Business Suite Experience
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-md">
            Step directly into the upper deck of aviation excellence. Experience the legendary Onboard Lounge &amp;
            Bar at 40,000 feet, fully lie-flat seating with Bulgari wellness amenities, and curated multicourse
            gastronomic service.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <GiMartini className="text-amber-400 mb-2" size={20} />
              <p className="text-sm font-bold text-white mb-1">Onboard Lounge</p>
              <p className="text-xs text-slate-400">Socialize over fine spirits</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <MdOutlineBed className="text-amber-400 mb-2" size={20} />
              <p className="text-sm font-bold text-white mb-1">Lie-flat Haven</p>
              <p className="text-xs text-slate-400">Direct aisle access always</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Fares starting from</p>
              <p className="text-2xl font-bold text-amber-400">₹74,900 <span className="text-sm font-normal text-slate-400">/pax</span></p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg">
              Explore Flight <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoute;