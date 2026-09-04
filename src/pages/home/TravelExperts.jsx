import { BadgeCheck, Star, Crown, Radar } from "lucide-react";

// import priya from "../assets/images/agent-priya.jpg";
// import amit from "../assets/images/agent-amit.jpg";
// import raj from "../assets/images/agent-raj.jpg";

const agents = [
  {
    // image: priya,
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
    // image: amit,
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
//   image: raj,
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
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-2">
              DEDICATED HUMAN EXPERTISE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Meet Your Travel Expert.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Connect with verified travel professionals who understand
              your journey.
            </p>
          </div>
          <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0">
            500+ Verified Agents in Network
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                {/* <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                /> */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-slate-900 font-bold text-sm">
                      {agent.name}
                    </p>
                    <BadgeCheck className="text-amber-500" size={16} />
                  </div>
                  <p className="text-slate-500 text-xs">{agent.company}</p>
                  <p className="text-amber-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                    <Star size={12} fill="currentColor" /> {agent.rating} (
                    {agent.reviews})
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Specialization:</span>
                  <span className="text-slate-900 font-semibold text-right">
                    {agent.specialization}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Response Time:</span>
                  <span className="text-emerald-600 font-semibold">
                    {agent.responseTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Station Hub:</span>
                  <span className="text-slate-900 font-semibold">
                    {agent.hub}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm py-2.5 rounded-lg transition-colors">
                  View Profile
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          ))}

          <div className="relative bg-gradient-to-br from-amber-50 to-white border-2 border-amber-300 rounded-2xl p-5 overflow-hidden">
            <span className="absolute top-0 right-0 bg-amber-900 text-amber-50 text-[10px] font-bold px-3 py-1.5 rounded-bl-lg">
              TOP AGENT OF THE MONTH
            </span>

            <div className="flex items-center gap-3 mb-4 mt-3">
              <img
                src={featuredAgent.image}
                alt={featuredAgent.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <p className="text-slate-900 font-bold text-base">
                  {featuredAgent.name}
                </p>
                <p className="text-slate-500 text-xs">
                  {featuredAgent.person}
                </p>
                <p className="text-amber-600 text-xs font-semibold flex items-center gap-1 mt-0.5">
                  <Star size={12} fill="currentColor" />{" "}
                  {featuredAgent.rating} ({featuredAgent.reviews})
                </p>
              </div>
            </div>

            <div className="bg-white/70 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-slate-700 text-xs leading-relaxed">
                {featuredAgent.note}
              </p>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm py-3 rounded-lg transition-colors">
              Connect With Top Agent <Crown size={16} />
            </button>
          </div>
        </div>

        <div className="bg-[#0a1628] rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1">
            <p className="text-amber-300 text-xs font-semibold tracking-wide mb-3">
              DISTRIBUTED AGENCY CONSORTIUM
            </p>
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
              500+ Verified Agents Across 14 Sovereign Hubs
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              From New Delhi and Mumbai to Dubai, Singapore, and London —
              our network guarantees physical representation for complex
              paperwork, consular liaison, and emergency airport clearance.
            </p>
            <div className="flex flex-wrap gap-2">
              {hubTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full bg-[#0d1f33] border border-white/10 rounded-2xl p-5 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <span className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <Radar size={14} /> NETWORK RADAR: ONLINE
              </span>
              <span className="text-slate-500 text-xs">LATENCY: 42ms</span>
            </div>

            <div className="flex items-end justify-between gap-2 mb-8">
              {hubs.map((hub) => (
                <div
                  key={hub.name}
                  className="flex flex-col items-center gap-2"
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      hub.active ? "bg-white" : "bg-amber-300/70"
                    }`}
                  />
                  <p
                    className={`text-[11px] font-semibold ${
                      hub.active ? "text-amber-300" : "text-slate-300"
                    }`}
                  >
                    {hub.name} ({hub.count})
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>ENC: TLS 1.3 SOVEREIGN</span>
              <span>GLOBAL AGENT ROSTER v4.8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
