import React, { useState } from "react";
import { FiGlobe, FiSearch, FiArrowRight, FiShield, FiFileText, FiAward, FiRadio } from "react-icons/fi";

const popularCountries = [
  { flag: "🇦🇪", label: "UAE" },
  { flag: "🇹🇭", label: "Thailand" },
  { flag: "🇸🇬", label: "Singapore" },
  { flag: "🇬🇧", label: "UK" },
  { flag: "🇪🇺", label: "Schengen" },
  { flag: "🇺🇸", label: "USA" },
];

const trustBadges = [
  { icon: FiShield, label: "100% Secure Processing" },
  { icon: FiFileText, label: "Transparent Pricing" },
  { icon: FiAward, label: "Expert Dossier Review" },
  { icon: FiRadio, label: "Real-Time Consular Tracking" },
];

const VisaHero = () => {
  const [country, setCountry] = useState("");

  const handleCheckVisa = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/visa/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      await response.json();
    } catch (error) {
      console.error("Check visa failed", error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[11px] font-bold tracking-wide text-gray-700 px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> VISA APPLICATIONS · 180+ DESTINATIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5">Your Visa. Sorted.</h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Apply for your visa online with clear requirements, transparent pricing and expert consular guidance from
          start to finish.
        </p>

        <form onSubmit={handleCheckVisa} className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 max-w-3xl mx-auto text-left">
          <p className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
            <FiGlobe className="text-blue-600" size={16} /> Where are you travelling?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5">
              <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Search a country, e.g. 🇦🇪 United Arab Emirates or 🇫🇷 France"
                className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
              />
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl">
              Check Visa <FiArrowRight size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="text-xs font-semibold text-gray-500">Popular:</span>
            {popularCountries.map(({ flag, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setCountry(label)}
                className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {flag} {label}
              </button>
            ))}
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-sm text-gray-600">
              <Icon className="text-emerald-600" size={16} /> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaHero;