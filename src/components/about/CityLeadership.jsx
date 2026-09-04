import React from "react";

const offices = [
  {
    name: "CLIQKAR India",
    tag: "ENGINEERING CORE",
    location: "Cyber City, Gurugram & Delhi NCR",
    mandate: "Aviation Engineering Core, Document AI Models, GDS Integration & 24/7 Operations Dispatch Center.",
    leadership: "VP of Global Engineering & Airline Partnerships",
    sla: "Instant Real-time",
  },
  {
    name: "CLIQKAR Middle East",
    tag: "AIRLINE INTEGRATION",
    location: "Business Bay & Dubai Airport Freezone, UAE",
    mandate: "Gulf Carrier API Relations, UAE GDRFA / ICP Visas & Okay to Board DCS Handshakes.",
    leadership: "Managing Director - MENA Aviation",
    sla: "Under 2 Hours",
  },
  {
    name: "CLIQKAR Europe",
    tag: "CONSULAR NETWORK",
    location: "The City, London EC2 & Heathrow T3, UK",
    mandate: "Schengen & UK Consular Network, High-Net-Worth Concierge & Interline Ticketing Systems.",
    leadership: "Head of European Travel Systems",
    sla: "Same-Day Priority",
  },
];

const CityLeadership = () => {
  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <p className="text-xs font-semibold tracking-wide text-blue-600">SOVEREIGN PRESENCE</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">City Leadership &amp; Regional Presence</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl">
          Our physical operations centers positioned at the intersection of international travel corridors.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offices.map((office) => (
            <div key={office.name} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-base font-bold text-gray-900">{office.name}</p>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{office.tag}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{office.location}</p>

              <p className="mt-4 text-[10px] font-semibold text-gray-400 tracking-wide">STRATEGIC MANDATE</p>
              <p className="mt-1 text-xs text-gray-600 leading-relaxed">{office.mandate}</p>

              <p className="mt-4 text-[10px] font-semibold text-gray-400 tracking-wide">STATION LEADERSHIP</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{office.leadership}</p>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400">Verification SLA Desk:</span>
                <span className="text-xs font-bold text-emerald-600">{office.sla}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityLeadership;
