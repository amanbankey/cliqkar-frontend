import React from "react";
import { FiArrowRight } from "react-icons/fi";

const destinations = [
  {
    region: "SOUTHEAST ASIA",
    tag: { text: "E-Visa On Arrival", color: "text-emerald-600" },
    city: "Bangkok, Thailand",
    code: "BKK / DMK",
    desc: "120K+ travelers facilitated with digital express pass clearance.",
    fare: "₹4,999",
    sla: "Instant QR Pass",
  },
  {
    region: "EAST ASIA",
    tag: { text: "Electronic Visa", color: "text-blue-600" },
    city: "Tokyo, Japan",
    code: "HND / NRT",
    desc: "45K+ verified itineraries with sovereign eVisa biometric pre-audit.",
    fare: "₹3,499",
    sla: "5 Working Days",
  },
  {
    region: "EUROPEAN UNION",
    tag: { text: "Schengen Hub", color: "text-purple-600" },
    city: "Paris, France",
    code: "CDG / ORY",
    desc: "60K+ cleared passengers across premier European aviation routes.",
    fare: "₹12,999",
    sla: "Biometric Appt",
  },
  {
    region: "FINANCIAL CAPITAL",
    tag: { text: "Direct OTB Sync", color: "text-blue-600" },
    city: "Mumbai, India",
    code: "BOM T2 BASE",
    desc: "190K+ verified departures via integrated airline check-in desks.",
    fare: "₹2,499",
    sla: "Realtime DCS Clear",
  },
  {
    region: "GULF CORRIDOR",
    tag: { text: "4-Hour OTB SLA", color: "text-orange-600" },
    city: "Doha, Qatar",
    code: "DOH HAMAD",
    desc: "85K+ bookings with Hayya entry protocol & fast-track verification.",
    fare: "₹7,899",
    sla: "Hayya / MOI Sync",
  },
  {
    region: "INNOVATION HUB",
    tag: { text: "150+ Verified Agents", color: "text-emerald-600" },
    city: "Bengaluru, India",
    code: "BLR AIRPORT",
    desc: "110K+ tech traveler bookings with express corporate credentials.",
    fare: "₹2,199",
    sla: "Corporate Pass",
  },
];

const DestinationNetwork = () => {
  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <p className="text-xs font-semibold tracking-wide text-blue-600">GLOBAL NETWORK</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Destination Network Footprint</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl">
          High-frequency routes supported by CLIQKAR's verified partner and consular network.
        </p>

     

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {destinations.map((d, index) => (
    <div
      key={d.city}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_55px_rgba(37,99,235,0.14)]"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl transition-all duration-700 group-hover:scale-[2] group-hover:bg-blue-400/20" />

      <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl transition-all duration-700 group-hover:scale-[1.8]" />

      {/* Route Scanner */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[2px] overflow-hidden">
        <div className="h-20 w-full animate-[destinationScan_3.5s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100" />
      </div>

      {/* Shine */}
      <div className="pointer-events-none absolute -left-32 top-0 h-full w-20 rotate-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100" />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-wide text-gray-400 transition-colors duration-300 group-hover:text-blue-500">
            {d.region}
          </span>

          <span
            className={`text-[11px] font-semibold transition-all duration-300 group-hover:-translate-y-0.5 ${d.tag.color}`}
          >
            {d.tag.text}
          </span>
        </div>

        {/* Destination */}
        <div className="mt-4 flex items-center gap-3">
          
          {/* Destination Pin */}
          <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-100">
            
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-blue-400/40" />

            <span className="relative h-2.5 w-2.5 rounded-full bg-blue-600 transition-all duration-300 group-hover:scale-125" />

            {/* Orbit Ring */}
            <span className="absolute inset-1 rounded-full border border-blue-300/50 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
          </div>

          <div>
            <p className="text-base font-bold text-gray-900 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-700">
              {d.city}
            </p>

            <p className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-blue-400">
              {d.code}
            </p>
          </div>
        </div>

        {/* Route Line */}
        <div className="relative mt-4 h-[2px] overflow-hidden rounded-full bg-gray-100">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-[routeMove_3s_linear_infinite] rounded-full bg-gradient-to-r from-transparent via-blue-500 to-emerald-400 opacity-60" />
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
          {d.desc}
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 pt-4">
          
          <div className="pr-3 transition-transform duration-300 group-hover:-translate-y-0.5">
            <p className="text-[10px] font-medium text-gray-400">
              FARES FROM
            </p>

            <p className="mt-0.5 text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
              {d.fare}
            </p>
          </div>

          <div className="pl-3 text-right transition-transform duration-300 group-hover:-translate-y-0.5">
            <p className="text-[10px] font-medium text-gray-400">
              CONSULAR SLA
            </p>

            <p className="mt-0.5 text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">
              {d.sla}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button className="group/btn mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700">
          <span className="relative">
            View Network

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover/btn:w-full" />
          </span>

          <FiArrowRight
            size={12}
            className="transition-transform duration-300 group-hover/btn:translate-x-1.5"
          />
        </button>
      </div>

      {/* Bottom Active Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100">
        <div className="h-full w-1/4 animate-[networkProgress_3s_ease-in-out_infinite] bg-gradient-to-r from-blue-500 to-emerald-400 opacity-70" />
      </div>

      {/* Corner Signal */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-30 transition-all duration-500 group-hover:opacity-100">
        <span className="h-1 w-1 rounded-full bg-emerald-500" />
        <span className="h-1 w-1 rounded-full bg-emerald-500 delay-100 animate-pulse" />
        <span className="h-1 w-1 rounded-full bg-emerald-500 delay-200 animate-pulse" />
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default DestinationNetwork;
