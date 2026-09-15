import { BadgeCheck, Star, Crown, Radar, Plane, ShieldCheck } from "lucide-react";

const agents = [
  {
    name: "Priya Sharma",
    company: "Global Skyline Travel Ltd.",
    rating: "4.9",
    reviews: "340+ Reviews",
    specialization: "Schengen & UK Expedited",
    responseTime: "< 15 mins",
    hub: "New Delhi / NCR",
    featured: false,
  },
  {
    name: "Amit Kapur",
    company: "Apex Corporate Mobility",
    rating: "4.8",
    reviews: "210+ Reviews",
    specialization: "GCC OTB & Corporate Fleet",
    responseTime: "< 10 mins",
    hub: "Mumbai Central",
    featured: false,
  },
];

const featuredAgent = {
  name: "Raj Travel Solutions",
  person: "Mr. Rajesh Verma · Director",
  rating: "4.95 Rating",
  reviews: "1,240+ Travelers",
  note: "96% first-attempt visa success rate across GCC & Schengen routes. Dedicated VIP fast-track concierge liaison.",
};

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

        {/* Heading */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          <div className="animate-[sectionReveal_700ms_ease-out_both]">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />

              <p className="text-xs font-semibold tracking-[0.16em] text-blue-600 sm:text-sm">
                DEDICATED HUMAN EXPERTISE
              </p>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Meet Your Travel Expert.
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Connect with verified travel professionals who understand your journey.
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm sm:flex">
            <div className="relative">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
              <span className="relative block h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            <span className="text-[10px] font-bold tracking-widest text-slate-500">
              EXPERT NETWORK ONLINE
            </span>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="mb-14 grid grid-cols-1 gap-5 lg:grid-cols-3">

          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="group relative overflow-hidden rounded-2xl p-[1px] shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(15,23,42,0.16)]"
              style={{
                animation: "cardReveal 700ms ease-out both",
                animationDelay: `${index * 140}ms`,
              }}
            >

              {/* DARK ROTATING BORDER */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -inset-[120%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,#020617_0deg,#0f172a_45deg,#2563eb_90deg,#0f172a_135deg,#020617_180deg,#06b6d4_220deg,#0f172a_270deg,#020617_360deg)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Inner Card */}
              <div className="relative h-full overflow-hidden rounded-[15px] bg-slate-50 p-5">

                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 animate-[cardGlow_5s_ease-in-out_infinite] rounded-full bg-blue-500/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 -left-20 h-36 w-36 animate-[cardGlow_6s_ease-in-out_infinite_reverse] rounded-full bg-emerald-400/10 blur-3xl" />

                {/* Scanning Beam */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-[15deg] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-[cardScan_2.5s_ease-in-out_infinite]" />
                </div>

                <div className="relative z-10">

                  {/* Agent Header */}
                  <div className="mb-4 flex items-center gap-3">

                    {/* Animated Avatar */}
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-slate-900 text-sm font-bold text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      {agent.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}

                      <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-emerald-400/70" />

                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-50 bg-emerald-500" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
                          {agent.name}
                        </p>

                        <BadgeCheck
                          className="text-blue-500 transition-transform duration-300 group-hover:scale-125"
                          size={16}
                        />
                      </div>

                      <p className="text-xs text-slate-500">
                        {agent.company}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-amber-500">
                        <Star size={12} fill="currentColor" />
                        {agent.rating} ({agent.reviews})
                      </p>
                    </div>
                  </div>

                  {/* Information Box */}
                  <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4">

                    {[
                      ["Specialization:", agent.specialization, "text-slate-900"],
                      ["Response Time:", agent.responseTime, "text-emerald-600"],
                      ["Station Hub:", agent.hub, "text-slate-900"],
                    ].map(([label, value, color], rowIndex) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0 last:pb-0 first:pt-0 transition-all duration-300 group-hover:px-1"
                        style={{
                          transitionDelay: `${rowIndex * 70}ms`,
                        }}
                      >
                        <span className="text-xs text-slate-400">
                          {label}
                        </span>

                        <span
                          className={`text-right text-xs font-semibold ${color}`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-lg bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-200 hover:-translate-y-0.5">
                      View Profile
                    </button>

                    <button className="relative flex-1 overflow-hidden rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25">
                      <span className="absolute -left-20 top-0 h-full w-10 rotate-[20deg] bg-white/30 transition-all duration-700 group-hover:left-[130%]" />

                      <span className="relative">
                        Contact Agent
                      </span>
                    </button>
                  </div>
                </div>

                {/* Bottom Signal */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-slate-200">
                  <div className="h-full w-1/3 animate-[bottomSignal_3s_linear_infinite] bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-500" />
                </div>
              </div>
            </div>
          ))}

          {/* Featured Agent */}
          <div
            className="group relative overflow-hidden rounded-2xl p-[2px] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(245,158,11,0.22)]"
            style={{
              animation: "cardReveal 700ms ease-out both",
              animationDelay: "280ms",
            }}
          >

            {/* Gold + Dark Rotating Border */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -inset-[120%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#451a03,#f59e0b,#78350f,#fbbf24,#451a03,#020617,#f59e0b,#451a03)] opacity-95" />
            </div>

            <div className="relative h-full overflow-hidden rounded-[14px] bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5">

              {/* Gold Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 animate-[cardGlow_4s_ease-in-out_infinite] rounded-full bg-amber-400/20 blur-3xl" />

              {/* Badge */}
              <span className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-amber-900 to-amber-700 px-3 py-1.5 text-[10px] font-bold tracking-wide text-amber-50 shadow-lg">
                TOP AGENT OF THE MONTH
              </span>

              <div className="relative z-10 mt-3">

                <div className="mb-4 flex items-center gap-3">

                  {/* Crown Avatar */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Crown
                      size={25}
                      className="transition-transform duration-500 group-hover:-translate-y-1"
                    />

                    <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-amber-300" />
                  </div>

                  <div>
                    <p className="text-base font-bold text-slate-900">
                      {featuredAgent.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {featuredAgent.person}
                    </p>

                    <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-amber-600">
                      <Star size={12} fill="currentColor" />
                      {featuredAgent.rating} ({featuredAgent.reviews})
                    </p>
                  </div>
                </div>

                {/* Note */}
                <div className="mb-4 rounded-xl border border-amber-200 bg-white/80 p-4 backdrop-blur-sm transition-all duration-500 group-hover:border-amber-300 group-hover:shadow-md">
                  <p className="text-xs leading-relaxed text-slate-700">
                    {featuredAgent.note}
                  </p>
                </div>

                {/* Trust Signals */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                    <ShieldCheck size={14} />
                    VERIFIED EXPERT
                  </div>

                  <div className="h-3 w-px bg-amber-200" />

                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
                    <Plane size={13} />
                    VIP CONCIERGE
                  </div>
                </div>

                <button className="relative w-full overflow-hidden rounded-lg bg-blue-700 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-[0_12px_35px_rgba(29,78,216,0.3)]">
                  <span className="absolute -left-24 top-0 h-full w-14 rotate-[20deg] bg-white/30 transition-all duration-700 group-hover:left-[130%]" />

                  <span className="relative flex items-center justify-center gap-2">
                    Connect With Top Agent
                    <Crown
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                  </span>
                </button>
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-amber-100">
                <div className="h-full w-1/3 animate-[bottomSignal_2.5s_linear_infinite] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Network Section */}
        <div
          className="group relative overflow-hidden rounded-2xl p-[1px] animate-[sectionReveal_800ms_ease-out_both]"
          style={{ animationDelay: "450ms" }}
        >

          {/* DARK MOVING BORDER */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -inset-[100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,#020617,#0f172a,#2563eb,#020617,#06b6d4,#0f172a,#020617)] opacity-100" />
          </div>

          <div className="relative overflow-hidden rounded-[15px] bg-[#0a1628] p-6 sm:p-10">

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
            <div className="pointer-events-none absolute -left-32 top-0 h-full w-40 rotate-[15deg] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-[networkBeam_5s_ease-in-out_infinite]" />

            <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row">

              {/* Left */}
              <div className="flex-1">

                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />

                  <p className="text-xs font-semibold tracking-[0.16em] text-amber-300">
                    DISTRIBUTED AGENCY CONSORTIUM
                  </p>
                </div>

                <h3 className="mb-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  500+ Verified Agents Across 14 Sovereign Hubs
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  From New Delhi and Mumbai to Dubai, Singapore, and London —
                  our network guarantees physical representation for complex
                  paperwork, consular liaison, and emergency airport clearance.
                </p>

                <div className="flex flex-wrap gap-2">
                  {hubTags.map((tag, index) => (
                    <span
                      key={tag}
                      className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300"
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
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
              <div className="h-full w-1/4 animate-[bottomSignal_4s_linear_infinite] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}