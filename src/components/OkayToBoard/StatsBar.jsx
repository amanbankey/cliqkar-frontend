import React from "react";

const stats = [
  { value: "150K+", label: "Boardings Cleared", sub: "Flawless Gulf transit history" },
  { value: "100%", label: "Accuracy Guarantee", sub: "Timatic backed compliance" },
  { value: "< 4 Hours", label: "Average Turnaround SLA", sub: "Rapid expedited processing" },
  { value: "24/7", label: "Ops Liaison Desk", sub: "Station ground dispatch support" },
];

const StatsBar = () => {
  return (
    <section className="bg-[#0B1120]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-2xl sm:text-3xl font-bold text-amber-400">{s.value}</p>
            <p className="mt-2 text-sm font-semibold text-white">{s.label}</p>
            <p className="mt-1 text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
