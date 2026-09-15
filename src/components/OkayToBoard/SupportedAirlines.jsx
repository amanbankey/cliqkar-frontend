import React from "react";

const airlines = [
  {
    code: "IX",
    name: "Air India Express",
    sub: "Tata Aviation Network",
    hubs: "UAE, Qatar, Oman, Bahrain",
    sla: "2-4 Hours",
    format: "GDS SSR Automation",
  },
  {
    code: "6E",
    name: "IndiGo Airlines",
    sub: "InterGlobe Aviation",
    hubs: "UAE, Kuwait, Qatar",
    sla: "2-5 Hours",
    format: "Direct Navitaire Hook",
  },
  {
    code: "SG",
    name: "SpiceJet",
    sub: "Red Hot Carrier",
    hubs: "UAE, Saudi Arabia",
    sla: "3-6 Hours",
    format: "Amadeus Clearance",
  },
  {
    code: "EK",
    name: "Emirates",
    sub: "Flag Carrier of Dubai",
    hubs: "Dubai Global Terminal",
    sla: "1-3 Hours (Priority)",
    format: "Direct Host Link",
  },
  {
    code: "FZ",
    name: "Flydubai",
    sub: "Dubai Aviation Corp",
    hubs: "UAE & GCC Sectors",
    sla: "2-4 Hours",
    format: "Raddix Direct Portal",
  },
  {
    code: "GF",
    name: "Gulf Air",
    sub: "Kingdom of Bahrain",
    hubs: "Bahrain, Saudi Arabia",
    sla: "3-6 Hours",
    format: "Sabre Integration",
  },
];

const SupportedAirlines = () => {
  return (
    <section className="bg-[#F4F6FB]">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <p className="text-xs font-semibold tracking-wide text-blue-600">
          REGIONAL &amp; GULF AVIATION HUBS
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Supported Airlines &amp; Clearances
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Direct digital tie-ins with regional and global aviation authorities
          ensuring uninterrupted passenger manifest authorization.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {airlines.map((a, index) => (
            <div
              key={a.code}
              className="group relative overflow-hidden rounded-[22px] p-[2px] transition-all duration-500 hover:scale-[1.025] hover:shadow-[0_20px_50px_rgba(37,99,235,0.16)]"
            >
              {/* Rotating Energy Border */}
              <div className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_55deg,#2563eb_100deg,#06b6d4_145deg,#10b981_185deg,transparent_230deg,transparent_360deg)] opacity-60 transition-all duration-700 group-hover:opacity-100" />

              {/* Inner Card */}
              <div className="relative h-full overflow-hidden rounded-[20px] bg-white p-5">
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-all duration-700 group-hover:scale-[2] group-hover:opacity-100" />

                <div className="pointer-events-none absolute -bottom-20 -left-20 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-all duration-700 group-hover:scale-[1.8] group-hover:opacity-100" />

                {/* Moving Shine */}
                <div className="pointer-events-none absolute -left-[80%] top-0 z-20 h-full w-1/3 rotate-[18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-1000 group-hover:left-[130%]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* Airline Code */}
                      <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-xs font-bold text-blue-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:bg-blue-100">
                        <span className="absolute -left-8 top-0 h-full w-4 rotate-[20deg] bg-white/80 transition-all duration-700 group-hover:left-[120%]" />

                        <span className="relative z-10">{a.code}</span>
                      </span>

                      <div>
                        <p className="text-sm font-bold text-gray-900 transition-all duration-500 group-hover:translate-x-1 group-hover:text-blue-700">
                          {a.name}
                        </p>

                        <p className="text-[11px] text-gray-400 transition-colors duration-300 group-hover:text-gray-500">
                          {a.sub}
                        </p>
                      </div>
                    </div>

                    {/* API Status */}
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 transition-all duration-500 group-hover:scale-105">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>

                      API ONLINE
                    </span>
                  </div>

                  {/* Data Section */}
                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    <div className="flex justify-between gap-4">
                      <span className="text-xs text-gray-400">
                        Required Hubs:
                      </span>

                      <span className="text-right text-xs font-semibold text-gray-700 transition-all duration-300 group-hover:text-gray-900">
                        {a.hubs}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">
                        Standard SLA:
                      </span>

                      <span className="text-xs font-semibold text-blue-600 transition-all duration-300 group-hover:text-cyan-600">
                        {a.sla}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-xs text-gray-400">Format:</span>

                      <span className="text-right text-xs font-semibold text-gray-700 transition-all duration-300 group-hover:text-gray-900">
                        {a.format}
                      </span>
                    </div>
                  </div>

                  {/* Bottom System Indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full transition-all duration-700 group-hover:w-full ${
                          index % 3 === 0
                            ? "w-[35%] bg-blue-500"
                            : index % 3 === 1
                            ? "w-[45%] bg-cyan-500"
                            : "w-[30%] bg-emerald-500"
                        }`}
                      />
                    </div>

                    <span className="text-[9px] font-bold tracking-widest text-gray-300 transition-colors duration-500 group-hover:text-blue-500">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Bottom Energy Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100">
                  <div className="h-full w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-700 group-hover:w-full" />
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