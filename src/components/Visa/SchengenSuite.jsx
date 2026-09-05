import React from "react";
import { FiArrowRight, FiCheck, FiAward } from "react-icons/fi";

const stats = [
  { value: "99.4%", label: "Approval Ratio", color: "text-blue-700" },
  { value: "27", label: "Schengen States", color: "text-gray-900" },
  { value: "12-15", label: "Days Average", color: "text-gray-900" },
  { value: "Included", label: "€30k Travel Ins.", color: "text-emerald-600" },
];

const features = [
  "Multi-country itinerary construction",
  "Embassy-compliant dummy flight bookings",
  "Priority VFS / TLScontact slot search",
  "Cover letter drafted by ex-consular lawyers",
];

const SchengenSuite = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=80"
              alt="Paris Eiffel Tower"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/95 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full">
              🇪🇺 27 SCHENGEN COUNTRIES · SINGLE PERMIT
            </span>
          </div>

          <div className="bg-white p-6 sm:p-10 flex flex-col">
            <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
              <FiAward size={14} /> FLAGSHIP EMBASSY SUITE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Schengen European Visa Suite</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Travel without borders across France, Switzerland, Germany, Italy, Spain, and 22 other European nations
              on a single streamlined permit. Our consular concierge secures hard-to-find biometric interview slots
              and reviews every financial proof point.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {stats.map(({ value, label, color }) => (
                <div key={label} className="bg-indigo-50 rounded-xl p-3">
                  <p className={`text-lg font-extrabold ${color}`}>{value}</p>
                  <p className="text-[11px] font-medium text-gray-600">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
              {features.map((f) => (
                <p key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <FiCheck className="text-emerald-500 flex-shrink-0" size={15} /> {f}
                </p>
              ))}
            </div>

            <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-400 mb-1">TOTAL CONCIERGE PACKAGE</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  ₹12,999 <span className="text-xs font-normal text-gray-400">Official embassy biometric fee</span>
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-6 py-3.5 rounded-xl">
                Explore Schengen Visa <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchengenSuite;