import { ArrowRight, ShieldCheck, Gem, Headset } from "lucide-react";

// import airportBg from "../assets/images/airport-bg.jpg";

const stats = [
  { value: "50K+", label: "Travelers Empowered" },
  { value: "120+", label: "Global Destinations" },
  { value: "500+", label: "Verified Agents" },
  { value: "98%", label: "Satisfaction Rate", accent: true },
  { value: "24/7", label: "Live Human Desk" },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Secure Experience" },
  { icon: Gem, label: "Verified Partners" },
  { icon: Headset, label: "24/7 Dedicated Support" },
];

export default function CTASection() {
  return (
    <section className="bg-[#0a1628] px-4 sm:px-6 lg:px-10 pt-14 sm:pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-5 text-center"
            >
              <p
                className={`text-xl sm:text-2xl font-extrabold mb-1 ${
                  stat.accent ? "text-amber-400" : "text-white"
                }`}
              >
                {stat.value}
              </p>
              <p className="text-slate-400 text-[11px] sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          {/* <img
            src={airportBg}
            alt="Airport"
            className="absolute inset-0 w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/40" />

          <div className="relative py-16 sm:py-24 px-6 text-center">
            <p className="text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-4">
              BEGIN YOUR EXPEDITION
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Your Next Journey
              <br />
              Starts Here.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Flights. Visas. OTB. Trusted Experts. One Seamless Journey.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
                Search Flights <ArrowRight size={16} />
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
                <ShieldCheck size={16} /> Explore Visas
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustPoints.map((point) => (
                <span
                  key={point.label}
                  className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm"
                >
                  <point.icon size={15} className="text-amber-400" />
                  {point.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}