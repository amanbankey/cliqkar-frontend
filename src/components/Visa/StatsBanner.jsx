import React from "react";
import { FiStar } from "react-icons/fi";

const stats = [
  { value: "500k+", label: "Applications Assisted", color: "text-white" },
  { value: "180+", label: "Countries Supported", color: "text-white" },
  { value: "99.2%", label: "Approval Ratio", color: "text-emerald-400" },
  { value: "24/7", label: "Consular Desk", color: "text-white" },
  { value: "4.9", label: "42k+ Reviews", color: "text-white", star: true },
];

const StatsBanner = () => {
  return (
    <section className="bg-[#282f45] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-3">Visa Applications, Without the Anxiety.</h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-10">
          Trusted by hundreds of thousands of international leisure travelers, corporate executives, and global
          digital nomads.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {stats.map(({ value, label, color, star }) => (
            <div key={label} className="bg-slate-700/40 rounded-2xl py-8 px-3">
              <p className={`font-serif text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-1.5 ${color}`}>
                {star && <FiStar className="text-amber-400 fill-amber-400" size={20} />}
                {value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-300 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;