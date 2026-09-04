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
          {destinations.map((d) => (
            <div key={d.city} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-400 tracking-wide">{d.region}</span>
                <span className={`text-[11px] font-semibold ${d.tag.color}`}>{d.tag.text}</span>
              </div>

              <p className="mt-3 text-base font-bold text-gray-900">{d.city}</p>
              <p className="text-xs text-gray-400">{d.code}</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{d.desc}</p>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-[10px] text-gray-400">FARES FROM</p>
                  <p className="text-sm font-bold text-gray-900">{d.fare}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">CONSULAR SLA</p>
                  <p className="text-sm font-bold text-gray-900">{d.sla}</p>
                </div>
              </div>

              <button className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                View Network <FiArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationNetwork;
