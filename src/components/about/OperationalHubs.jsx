import React from "react";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const hubs = [
  {
    tags: [{ text: "GLOBAL MEGA-HUB", color: "bg-blue-50 text-blue-600" }, { text: "24/7 LIVE DESK", color: "bg-emerald-50 text-emerald-600" }],
    flag: "🇦🇪",
    city: "Dubai, UAE",
    code: "DXB / DWC DIRECT GATEWAY",
    number: "180,000+",
    numberLabel: "Annual Verified Travelers",
    rows: [
      { label: "Primary Routes", value: "DEL/BOM → DXB" },
      { label: "Visa SLA", value: "24-48 Hours" },
      { label: "OTB Status", value: "Direct DCS API" },
    ],
    bullets: [
      "Direct Carrier API (Emirates & flydubai)",
      "GDRFA & ICP Pre-Clearance Validation",
      "Instant Terminal OTB Verification Slip",
    ],
    button: "EXPLORE DUBAI HUB",
  },
  {
    tags: [{ text: "GLOBAL TECH HQ", color: "bg-blue-50 text-blue-600" }, { text: "MAIN BASE", color: "bg-amber-50 text-amber-600" }],
    flag: "🇮🇳",
    city: "New Delhi, India",
    code: "DEL COMMAND CENTER",
    number: "220,000+",
    numberLabel: "Annual Verified Travelers",
    rows: [
      { label: "Primary Routes", value: "DEL → SIN/LHR/DXB" },
      { label: "Visa SLA", value: "Instant Pre-Audit" },
      { label: "Agent Base", value: "200+ Active Nodes" },
    ],
    bullets: [
      "Aviation Engineering & Document AI Core",
      "Direct Air India Express & IndiGo GDS Hook",
      "Central Dispatch Operations Center",
    ],
    button: "EXPLORE DELHI HQ",
  },
  {
    tags: [{ text: "APAC TRANSIT HUB", color: "bg-blue-50 text-blue-600" }, { text: "EXPRESS HUB", color: "bg-emerald-50 text-emerald-600" }],
    flag: "🇸🇬",
    city: "Singapore",
    code: "SIN CHANGI REGIONAL NODE",
    number: "95,000+",
    numberLabel: "Annual Verified Travelers",
    rows: [
      { label: "Primary Routes", value: "SIN → DEL/BOM/BKK" },
      { label: "E-Visa SLA", value: "3 Business Days" },
      { label: "Airport Fast-Track", value: "Changi Terminal 1-4" },
    ],
    bullets: [
      "Changi Airport Transit Clearance Gateway",
      "ICA Direct Digital Submission Bridge",
      "South East Asia Corporate Travel Partner",
    ],
    button: "EXPLORE SINGAPORE HUB",
  },
  {
    tags: [{ text: "EUROPEAN GATEWAY", color: "bg-blue-50 text-blue-600" }, { text: "VIP CONCIERGE", color: "bg-purple-50 text-purple-600" }],
    flag: "🇬🇧",
    city: "London, UK",
    code: "LHR OPERATIONS SECTOR",
    number: "75,000+",
    numberLabel: "Annual Verified Travelers",
    rows: [
      { label: "Primary Routes", value: "LHR → DEL/BOM" },
      { label: "Visa SLA", value: "Priority Appointment" },
      { label: "Heathrow Sync", value: "Terminal 3 & 4" },
    ],
    bullets: [
      "UK Visas & Immigration (UKVI) Compliance",
      "British Airways & Virgin Atlantic Interline",
      "Dedicated Heathrow Terminal VIP Liaison",
    ],
    button: "EXPLORE LONDON HUB",
  },
];

const OperationalHubs = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-600">CORE GATEWAYS</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Primary Operational Hubs</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl">
              Our core gateway cities providing 24/7 travel-tech execution and sovereign airline integration.
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> DCS SYNC: LIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hubs.map((hub) => (
            <div key={hub.city} className="border border-gray-200 rounded-2xl p-5 flex flex-col">
              <div className="flex flex-wrap gap-2">
                {hub.tags.map((tag) => (
                  <span key={tag.text} className={`text-[10px] font-semibold px-2 py-1 rounded-full ${tag.color}`}>
                    {tag.text}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-base font-bold text-gray-900">
                {hub.flag} {hub.city}
              </p>
              <p className="text-[11px] font-medium text-gray-400">{hub.code}</p>

              <p className="mt-4 text-2xl font-bold text-gray-900">{hub.number}</p>
              <p className="text-xs text-gray-500">{hub.numberLabel}</p>

              <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
                {hub.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{row.label}:</span>
                    <span className="font-semibold text-gray-700 text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 flex-1">
                {hub.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2">
                    <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={13} />
                    <span className="text-xs text-gray-600">{bullet}</span>
                  </div>
                ))}
              </div>

              <button className="mt-5 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide px-4 py-2.5 rounded-lg">
                {hub.button} <FiArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationalHubs;
