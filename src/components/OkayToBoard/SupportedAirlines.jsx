import React from "react";

const airlines = [
  { code: "IX", name: "Air India Express", sub: "Tata Aviation Network", hubs: "UAE, Qatar, Oman, Bahrain", sla: "2-4 Hours", format: "GDS SSR Automation" },
  { code: "6E", name: "IndiGo Airlines", sub: "InterGlobe Aviation", hubs: "UAE, Kuwait, Qatar", sla: "2-5 Hours", format: "Direct Navitaire Hook" },
  { code: "SG", name: "SpiceJet", sub: "Red Hot Carrier", hubs: "UAE, Saudi Arabia", sla: "3-6 Hours", format: "Amadeus Clearance" },
  { code: "EK", name: "Emirates", sub: "Flag Carrier of Dubai", hubs: "Dubai Global Terminal", sla: "1-3 Hours (Priority)", format: "Direct Host Link" },
  { code: "FZ", name: "Flydubai", sub: "Dubai Aviation Corp", hubs: "UAE & GCC Sectors", sla: "2-4 Hours", format: "Raddix Direct Portal" },
  { code: "GF", name: "Gulf Air", sub: "Kingdom of Bahrain", hubs: "Bahrain, Saudi Arabia", sla: "3-6 Hours", format: "Sabre Integration" },
];

const SupportedAirlines = () => {
  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-blue-600">REGIONAL &amp; GULF AVIATION HUBS</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Supported Airlines &amp; Clearances</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          Direct digital tie-ins with regional and global aviation authorities ensuring uninterrupted passenger
          manifest authorization.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {airlines.map((a) => (
            <div key={a.code} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {a.code}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{a.name}</p>
                    <p className="text-[11px] text-gray-400">{a.sub}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> API ONLINE
                </span>
              </div>

              <div className="mt-4 space-y-1.5 text-xs border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Required Hubs:</span>
                  <span className="font-semibold text-gray-700 text-right">{a.hubs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Standard SLA:</span>
                  <span className="font-semibold text-blue-600">{a.sla}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Format:</span>
                  <span className="font-semibold text-gray-700">{a.format}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedAirlines;
