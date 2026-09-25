import { BadgeCheck, Star, Crown, Radar, Plane, ShieldCheck } from "lucide-react";


const hubs = [
  { name: "Delhi", count: 142 },
  { name: "Mumbai", count: 118 },
  { name: "Dubai", count: 89, active: true },
  { name: "Singapore", count: 64 },
  { name: "London", count: 52 },
];

const hubTags = [
  "Delhi Hub",
  "Mumbai Hub",
  "Bengaluru",
  "Dubai Marina",
  "Singapore CBD",
  "London City",
];

export default function TravelExperts() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 animate-[expertGlow_7s_ease-in-out_infinite] rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="absolute -right-40 top-[35%] h-96 w-96 animate-[expertGlow_9s_ease-in-out_infinite_reverse] rounded-full bg-emerald-400/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

       
        

     

        {/* Network Section */}
        <div
          className="group relative overflow-hidden rounded-2xl p-[1px] animate-[sectionReveal_800ms_ease-out_both] "
          style={{ animationDelay: "450ms" }}
        >

          {/* LIGHT MOVING BORDER */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -inset-[100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,#e2e8f0,#f8fafc,#93c5fd,#e2e8f0,#67e8f9,#f8fafc,#e2e8f0)] opacity-100" />
          </div>

          <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 sm:p-10">

            {/* Background Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Moving Blue Light */}
            <div className="pointer-events-none absolute -left-32 top-0 h-full w-40 rotate-[15deg] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-[networkBeam_5s_ease-in-out_infinite]" />

            <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row">

              {/* Left */}
              <div className="flex-1">

                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />

                  <p className="text-xs font-semibold tracking-[0.16em] text-amber-600">
                    DISTRIBUTED AGENCY CONSORTIUM
                  </p>
                </div>

                <h3 className="mb-4 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  500+ Verified Agents Across 14 Sovereign Hubs
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  From New Delhi and Mumbai to Dubai, Singapore, and London —
                  our network guarantees physical representation for complex
                  paperwork, consular liaison, and emergency airport clearance.
                </p>

                <div className="flex flex-wrap gap-2">
                  {hubTags.map((tag, index) => (
                    <span
                      key={tag}
                      className="cursor-default rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-blue-50 hover:text-blue-600"
                      style={{
                        animation: "tagFloat 4s ease-in-out infinite",
                        animationDelay: `${index * 180}ms`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar */}
              <div className="w-full flex-1 rounded-2xl border border-white/10 bg-[#0d1f33] p-5 shadow-2xl sm:p-8">

                <div className="mb-8 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <Radar
                      size={15}
                      className="animate-[radarSpin_3s_linear_infinite]"
                    />
                    NETWORK RADAR: ONLINE
                  </span>

                  <span className="text-xs text-slate-500">
                    LATENCY: 42ms
                  </span>
                </div>

                {/* Radar Visual */}
                <div className="relative mb-8 h-28">

                  <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />

                  <div className="absolute left-0 right-0 top-1/2 h-px origin-left animate-[radarSweep_3s_linear_infinite] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                  {hubs.map((hub, index) => (
                    <div
                      key={hub.name}
                      className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-3"
                      style={{
                        left: `${index * 24}%`,
                      }}
                    >
                      <div className="relative">
                        <span
                          className={`absolute -inset-2 rounded-full ${
                            hub.active
                              ? "animate-ping bg-emerald-400/20"
                              : "bg-amber-300/10"
                          }`}
                        />

                        <span
                          className={`relative block h-3 w-3 rounded-full border-2 border-[#0d1f33] ${
                            hub.active
                              ? "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]"
                              : "bg-amber-300/70"
                          }`}
                        />
                      </div>

                      <p
                        className={`whitespace-nowrap text-[10px] font-semibold ${
                          hub.active
                            ? "text-emerald-300"
                            : "text-slate-400"
                        }`}
                      >
                        {hub.name} ({hub.count})
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[9px] text-slate-500 sm:text-[10px]">
                  <span>ENC: TLS 1.3 SOVEREIGN</span>
                  <span>GLOBAL AGENT ROSTER v4.8</span>
                </div>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-200">
              <div className="h-full w-1/4 animate-[bottomSignal_4s_linear_infinite] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}