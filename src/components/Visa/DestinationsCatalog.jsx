import React, { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const regions = ["All Popular", "Asia", "Europe", "Middle East", "Americas", "Africa", "Oceania"];

const destinations = [
  {
    code: "AE",
    name: "United Arab Emirates",
    subtitle: "Tourist / 30-Day Leisure eVisa",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    price: "₹6,999",
    priceNote: "Government + visa fees included",
    processing: "3-5 Days",
    stay: "30 Days",
    entry: "Single",
    features: ["100% Online application", "Document review by ex-consular staff", "24/7 Live application tracking"],
    mostPopular: true,
  },
  {
    code: "TH",
    name: "Thailand",
    subtitle: "Tourist Visa / eVisa on Arrival",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
    price: "₹3,499",
    priceNote: "Pre-verified immigration clearance",
    processing: "2-3 Days",
    stay: "60 Days",
    entry: "Single",
    features: ["Zero embassy visit needed", "Automated passport photo crop", "Express entry QR voucher"],
  },
  {
    code: "SG",
    name: "Singapore",
    subtitle: "e-Visa (Authorized Consular Channel)",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
    price: "₹2,850",
    priceNote: "Direct ICA system linkage",
    processing: "24-48 Hrs",
    stay: "30 Days",
    entry: "Multiple",
    features: ["Authorized strategic agency", "SG Arrival Card integration", "PDF eVisa sent to WhatsApp"],
  },
  {
    code: "MY",
    name: "Malaysia",
    subtitle: "MDAC & Tourist eVisa",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
    price: "₹2,499",
    priceNote: "Digital MDAC processing",
    processing: "Instant",
    stay: "30 Days",
    entry: "Single",
    features: ["Automated clearance pipeline", "Instant submission verification", "Biometric waiver support"],
  },
];

const DestinationsCatalog = () => {
  const [activeRegion, setActiveRegion] = useState("All Popular");

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
              <TbPlaneDeparture size={14} /> GLOBAL DESTINATIONS CATALOG
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Where Are You Going?</h2>
            <p className="text-gray-500 text-sm">Find your destination and launch your guided application in minutes.</p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline flex-shrink-0">
            View All 180+ Countries <FiArrowRight size={14} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`text-sm font-semibold px-4 py-2 rounded-full ${
                activeRegion === region ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {destinations.map((d) => (
            <div key={d.code} className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-36">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                {d.mostPopular && (
                  <span className="absolute top-3 right-3 bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">{d.code}</span>
                  {d.name}
                </p>
                <p className="text-xs text-gray-500 mb-3">{d.subtitle}</p>

                <div className="bg-indigo-50 rounded-xl p-3 mb-3">
                  <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-0.5">FROM</p>
                  <p className="text-xl font-extrabold text-gray-900 mb-1">
                    {d.price} <span className="text-xs font-normal text-gray-500">/applicant</span>
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-emerald-600">
                    <FiCheck size={11} /> {d.priceNote}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-3 pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-[9px] font-semibold tracking-wide text-gray-400">PROCESSING</p>
                    <p className="text-xs font-bold text-gray-800">{d.processing}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold tracking-wide text-gray-400">STAY</p>
                    <p className="text-xs font-bold text-gray-800">{d.stay}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold tracking-wide text-gray-400">ENTRY</p>
                    <p className="text-xs font-bold text-gray-800">{d.entry}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  {d.features.map((f) => (
                    <p key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <FiCheck className="text-emerald-500 flex-shrink-0" size={12} /> {f}
                    </p>
                  ))}
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl">
                  Apply Now <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsCatalog;