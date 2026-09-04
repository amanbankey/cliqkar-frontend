import React, { useState } from "react";
import { FiArrowRight, FiRepeat, FiZap } from "react-icons/fi";

const tabs = ["Flights", "Business Class", "First Class", "Award Flights"];
const tripTypes = ["Round Trip", "One Way", "Multi-City"];

const stats = [
  { value: "500K+", label: "PREMIUM TRAVELERS" },
  { value: "180+", label: "COUNTRIES CONNECTED" },
  { value: "1,200+", label: "DIRECT LUXURY ROUTES" },
  { value: "50+", label: "PREMIER AIRLINES" },
  { value: "24/7", label: "HUMAN FLIGHT SUPPORT" },
];

const FlightHero = () => {
  const [activeTab, setActiveTab] = useState("Flights");
  const [tripType, setTripType] = useState("One Way");
  const [flexibleDates, setFlexibleDates] = useState(true);
  const [nonStopOnly, setNonStopOnly] = useState(true);
  const [form, setForm] = useState({
    from: "New Delhi, India",
    fromCode: "DEL",
    fromAirport: "Indira Gandhi Int'l",
    to: "Dubai, United Arab Emirates",
    toCode: "DXB",
    toAirport: "Dubai International",
    departure: "2026-10-24",
    return: "2026-10-31",
    cabinClass: "Business Class",
    passengers: 1,
  });

  const handleSwap = () => {
    setForm({
      ...form,
      from: form.to,
      fromCode: form.toCode,
      fromAirport: form.toAirport,
      to: form.from,
      toCode: form.fromCode,
      toAirport: form.fromAirport,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tripType, flexibleDates, nonStopOnly }),
      });
      await response.json();
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <section className="bg-[#0A1628] px-4 sm:px-8 lg:px-16 py-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-400">
              PREMIUM FLIGHTS · GLOBAL DESTINATIONS · EXCEPTIONAL FARES
            </p>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-3">Fly Beyond Ordinary.</h1>
          <p className="font-serif italic text-2xl sm:text-3xl text-amber-300 mb-6">
            The world's finest flights, intelligently curated.
          </p>
          <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">
            Discover exceptional Business and First Class flights from premier global airlines. Compare luxury fares,
            inspect cabin architecture, and secure your passage with absolute confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-lg">
              Search Flights <FiArrowRight size={16} />
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-600 text-slate-200 text-sm font-semibold px-6 py-3.5 rounded-lg">
              Explore Premium Cabins
            </button>
          </div>
          <div className="border border-slate-700 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> LIVE GDS FEED: ACTIVE
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-300">A380 · QSUITE · 777-9 READY</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 relative">
          <span className="hidden sm:block absolute -top-4 right-4 bg-[#0A1628] text-slate-300 text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-full">
            AEROVA INTELLIGENT ENGINE
          </span>

          <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-5 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                  activeTab === tab ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 mb-5">
            {tripTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 relative">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold tracking-wide text-gray-400">FROM · DEPARTURE POINT</p>
                  <p className="text-[10px] font-bold text-blue-600">{form.fromCode}</p>
                </div>
                <input
                  type="text"
                  value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })}
                  className="text-sm font-bold text-gray-900 bg-transparent w-full focus:outline-none"
                />
                <p className="text-xs text-gray-400">{form.fromCode} · {form.fromAirport}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold tracking-wide text-gray-400">TO · DESTINATION</p>
                  <p className="text-[10px] font-bold text-blue-600">{form.toCode}</p>
                </div>
                <input
                  type="text"
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                  className="text-sm font-bold text-gray-900 bg-transparent w-full focus:outline-none"
                />
                <p className="text-xs text-gray-400">{form.toCode} · {form.toAirport}</p>
              </div>
              <button
                type="button"
                onClick={handleSwap}
                className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow"
              >
                <FiRepeat className="text-gray-500" size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">DEPARTURE</p>
                <input
                  type="date"
                  value={form.departure}
                  onChange={(e) => setForm({ ...form, departure: e.target.value })}
                  className="text-sm font-bold text-gray-900 bg-transparent w-full focus:outline-none"
                />
                <p className="text-xs text-gray-400">Saturday</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">RETURN</p>
                <input
                  type="date"
                  value={form.return}
                  onChange={(e) => setForm({ ...form, return: e.target.value })}
                  className="text-sm font-bold text-gray-900 bg-transparent w-full focus:outline-none"
                />
                <p className="text-xs text-gray-400">+7 Days later</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">CABIN CLASS</p>
                <p className="text-sm font-bold text-gray-900">1 Adult</p>
                <select
                  value={form.cabinClass}
                  onChange={(e) => setForm({ ...form, cabinClass: e.target.value })}
                  className="text-xs font-semibold text-blue-600 bg-transparent focus:outline-none"
                >
                  <option>Business Class</option>
                  <option>First Class</option>
                  <option>Economy</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flexibleDates}
                  onChange={(e) => setFlexibleDates(e.target.checked)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-xs text-gray-600">Flexible dates ±3 days (save up to 24%)</span>
              </label>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <FiZap className="text-amber-500" size={13} /> Best Fare Guaranteed
              </span>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3.5 rounded-xl">
              Search Premium Flights <FiArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg">{form.fromCode} {form.from.split(",")[0]}</span>
          <span className="text-slate-500">→</span>
          <span className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg">{form.toCode} {form.to.split(",")[0]}</span>
          <span className="text-slate-500">•</span>
          <span className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg">24 Oct - 31 Oct 2026</span>
          <span className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg">1 Passenger</span>
          <span className="bg-amber-500 text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-lg">Business Class</span>
          <div className="flex items-center gap-4 ml-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={nonStopOnly}
                onChange={(e) => setNonStopOnly(e.target.checked)}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-xs text-slate-300">Non-stop only</span>
            </label>
            <button className="text-xs font-semibold text-slate-200 border border-slate-700 px-3 py-2 rounded-lg">Modify Search</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-2xl sm:text-3xl text-white mb-1">{value}</p>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlightHero;