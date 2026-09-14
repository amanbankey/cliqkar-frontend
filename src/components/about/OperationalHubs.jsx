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

        

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
  {hubs.map((hub, index) => (
    <div
      key={hub.city}
      className="group relative h-full overflow-hidden rounded-2xl bg-white p-[1px] shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(37,99,235,0.20)]"
    >
      {/* Animated Border */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -inset-[100%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_45deg,#2563eb_80deg,#06b6d4_110deg,#10b981_145deg,transparent_180deg,transparent_360deg)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Card */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white p-5">

        {/* Moving Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Animated Grid Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-blue-400/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-emerald-400/10 blur-3xl" />

        {/* Scanning Line */}
        <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full animate-[scan_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />

        {/* Live Indicator */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[9px] font-bold tracking-[0.15em] text-emerald-600">
            LIVE
          </span>
        </div>

        <div className="relative z-10 flex h-full flex-col">

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pr-12">
            {hub.tags.map((tag, tagIndex) => (
              <span
                key={tag.text}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all duration-500 group-hover:-translate-y-1 ${
                  tagIndex === 0
                    ? "group-hover:shadow-md group-hover:shadow-blue-500/20"
                    : "group-hover:shadow-md group-hover:shadow-emerald-500/20"
                } ${tag.color}`}
              >
                {tag.text}
              </span>
            ))}
          </div>

          {/* City */}
          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-100">
              <span className="transition-transform duration-500 group-hover:scale-125">
                {hub.flag}
              </span>

              {/* Orbit Dot */}
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500 ring-4 ring-blue-50" />
            </div>

            <div>
              <p className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                {hub.city}
              </p>

              <p className="text-[10px] font-semibold tracking-wide text-gray-400">
                {hub.code}
              </p>
            </div>
          </div>

          {/* Traveler Number */}
          <div className="mt-5">
            <p className="text-3xl font-extrabold tracking-tight text-gray-900 transition-all duration-500 group-hover:translate-x-1 group-hover:text-blue-600">
              {hub.number}
            </p>

            <p className="text-xs text-gray-500">
              {hub.numberLabel}
            </p>
          </div>

          {/* Animated Divider */}
          <div className="relative mt-4 h-px overflow-hidden bg-gray-100">
            <div className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-transform duration-1000 group-hover:translate-x-[400%]" />
          </div>

          {/* Stats */}
          <div className="mt-4 space-y-2">
            {hub.rows.map((row, rowIndex) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-300 group-hover:bg-blue-50/50"
                style={{
                  transitionDelay: `${rowIndex * 70}ms`,
                }}
              >
                <span className="text-xs text-gray-400">
                  {row.label}:
                </span>

                <span className="text-right text-xs font-bold text-gray-700 transition-colors duration-300 group-hover:text-blue-700">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-4 flex-1 space-y-2.5">
            {hub.bullets.map((bullet, bulletIndex) => (
              <div
                key={bullet}
                className="flex items-start gap-2 transition-all duration-500 group-hover:translate-x-1"
                style={{
                  transitionDelay: `${bulletIndex * 80}ms`,
                }}
              >
                <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                  <FiCheckCircle
                    className="text-emerald-500"
                    size={11}
                  />
                </div>

                <span className="text-xs leading-5 text-gray-600">
                  {bullet}
                </span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="relative mt-5 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-4 py-3 text-xs font-bold tracking-wide text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.30)] active:scale-95">
            
            {/* Button Shine */}
            <span className="absolute -left-20 top-0 h-full w-12 rotate-[20deg] bg-white/30 transition-all duration-700 group-hover:left-[120%]" />

            <span className="relative z-10">
              {hub.button}
            </span>

            <FiArrowRight
              size={14}
              className="relative z-10 transition-all duration-300 group-hover:translate-x-1.5"
            />
          </button>
        </div>

        {/* Bottom Progress Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-gray-100">
          <div className="h-full w-1/3 animate-[progress_3s_ease-in-out_infinite] bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />
        </div>
      </div>
    </div>
  ))}
</div>

  
      </div>
    </section>
  );
};

export default OperationalHubs;
