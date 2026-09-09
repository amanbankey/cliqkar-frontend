import React, { useState , useRef, useEffect} from "react";
import { FiGlobe, FiSearch, FiArrowRight, FiShield, FiFileText, FiAward, FiRadio } from "react-icons/fi";
import {
  Home,
  Plane,
  Calendar,
  ChevronDown,
  Search,
  MapPin,
  X,
  ShieldCheck,
} from "lucide-react";

import aero from "../../assets/image/aero.png"
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

 const COUNTRIES = [
   "India",
   "United States",
   "United Kingdom",
   "United Arab Emirates",
   "Canada",
   "Australia",
   "Germany",
   "France",
   "Singapore",
   "Japan",
   "South Korea",
   "Thailand",
   "Malaysia",
   "Indonesia",
   "China",
   "Italy",
   "Spain",
   "Netherlands",
   "Saudi Arabia",
   "Qatar",
   "Nepal",
   "Sri Lanka",
   "Bangladesh",
   "South Africa",
   "Brazil",
 ];

function DateField({ label, value, onChange, min }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
 
  return (
    <div className="w-full">
      <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-slate-800">
        {label}
        <span className="text-slate-800">*</span>
      </label>
      <button
        type="button"
        onClick={() => inputRef.current?.showPicker?.() || inputRef.current?.focus()}
        className={`flex w-full items-center gap-2.5 rounded-xl border-[1.5px] bg-white px-3.5 py-3 text-left transition-all duration-200 ${
          focused
            ? "border-slate-800 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
            : value
            ? "border-slate-800"
            : "border-slate-800 hover:border-slate-800"
        }`}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
            focused || value
              ? "bg-slate-800 text-white"
              : "bg-slate-80 text-slate-800"
          }`}
        >
          <Calendar size={16} />
        </span>
        <input
          ref={inputRef}
          type="date"
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full flex-1 bg-transparent text-[15px] font-semibold text-blue-950 outline-none [&::-webkit-calendar-picker-indicator]:opacity-0"
        />
      </button>
    </div>
  );
}


function CountryField({ label, icon, placeholder, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
 
  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
 
  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );
 
  return (
    <div className="w-full " ref={wrapRef} >
      <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-slate-600">
        {label}
        <span className="text-slate-800">*</span>
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`group flex w-full items-center border border-slate-800 gap-2.5 rounded-xl  bg-white px-3.5 py-3 text-left transition-all duration-200 ${
            open
              ? "border-slate-800  "
              : value
              ? "border-slate-500"
              : "border-slate-200 hover:border-slate-800"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
              open || value
                ? "bg-slate-800 text-white"
                : "bg-slate-50 text-slate-800"
            }`}
          >
            {icon}
          </span>
          <span
            className={`flex-1 truncate text-[15px] ${
              value ? "font-semibold text-blue-950" : "text-slate-800"
            }`}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-slate-800 transition-transform duration-200 ${
              open ? "rotate-180 text-slate-800" : ""
            }`}
          />
        </button>
 
        {open && (
          <div className="absolute z-20 mt-2 w-full origin-top animate-[dropIn_0.15s_ease-out] rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2  ">
              <MapPin size={15} className="text-slate-800" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country"
                className="w-full bg-transparent  text-sm text-slate-800 outline-none placeholder:text-slate-800"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-slate-800 hover:text-slate-800"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="max-h-48 overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-track]:bg-transparent">
              {filtered.length === 0 && (
                <p className="px-2 py-3 text-center text-sm text-slate-400">
                  No matches found
                </p>
              )}
              {filtered.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    onChange(c);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    value === c
                      ? "bg-orange-50 font-semibold text-slate-800"
                      : "text-slate-800 hover:bg-blue-50 hover:text-slate-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VisaSearchForm() {
  const [citizenOf, setCitizenOf] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const canSearch = citizenOf && goingTo && travelDate && returnDate;
 
  function handleSearch() {
    if (!canSearch || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 700);
  }
 
  return (
    <div className="flex min-h-screen w-full items-center justify-center  bg-blue-100 p-4 sm:p-6">
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
 
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl border border-orange-200/40 bg-white shadow-2xl shadow-black/40 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-track]:bg-orange-50">
        <div className="relative overflow-hidden bg-slate-800 to-s-800 px-6 py-7 sm:px-10 sm:py-9">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-2xl" />
          <div className="absolute -bottom-14 left-10 h-32 w-32 rounded-full bg-orange-400/10 blur-2xl" />
          <div className="relative flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
              <ShieldCheck size={18} className="text-white" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              Trusted by 2M+ travelers
            </span>
          </div>
          <h1 className="relative mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            Guaranteed{" "}
            <span className="text-orange-400 underline decoration-orange-400 decoration-2">
              visa on time
            </span>{" "}
            to your destination
          </h1>
          <p className="relative mt-1.5 text-sm text-blue-200 sm:text-base">
            Check eligibility and processing time in seconds
          </p>
        </div>
 
        <div className="px-5 py-6 sm:px-10 sm:py-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <CountryField
              label="Citizen of"
              icon={<Home size={16} />}
              placeholder="Select nationality"
              value={citizenOf}
              onChange={setCitizenOf}
            />
            <CountryField
              label="Going to"
              icon={<Plane size={16} />}
              placeholder="Select destination"
              value={goingTo}
              onChange={setGoingTo}
            />
            <DateField
              label="Travel Date"
              value={travelDate}
              onChange={setTravelDate}
            />
            <DateField
              label="Return Date"
              value={returnDate}
              onChange={setReturnDate}
              min={travelDate}
            />
          </div>
 
          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!canSearch || loading}
              className={`flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white transition-all duration-200 ${
                canSearch
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-orange-500/50 active:translate-y-0"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <Search size={16} />
              )}
              Search
            </button>
          </div>
 
          <div className="mt-8 border-t border-dashed border-orange-200 pt-6">
            {!searched && (
              <p className="animate-[fadeUp_0.3s_ease-out] text-sm text-slate-400">
                No visa data available
              </p>
            )}
            {searched && (
              <div className="animate-[fadeUp_0.3s_ease-out] rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
                <p className="text-sm font-semibold text-blue-950">
                  {citizenOf} → {goingTo}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Travelling {travelDate || "—"} to {returnDate || "—"}. Visa
                  results will appear here once connected to live data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





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
    <section className="bg-blue-100 py-16 "  style={{ backgroundImage: `url(${aero})` }} >
      <div className="  mx-auto  text-center ">
        <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[11px] font-bold tracking-wide text-gray-700 px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> VISA APPLICATIONS · 180+ DESTINATIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5">Your Visa. Sorted.</h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Apply for your visa online with clear requirements, transparent pricing and expert consular guidance from
          start to finish.
        </p>

        {/* <form onSubmit={handleCheckVisa} className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 max-w-3xl mx-auto text-left">
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
        </form> */}

        <VisaSearchForm />

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 ">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-sm text-gray-600  k">
              <Icon className="text-emerald-600" size={16} /> {label}
            </span>
          ))}
        </div>
      </div>
  

    </section>
  );
};

export default VisaHero;