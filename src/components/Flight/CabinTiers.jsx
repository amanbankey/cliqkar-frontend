import React from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const tiers = [
  {
    badge: "Tier II",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?w=800&q=80",
    title: "Business Class",
    quote: '"Your office and sanctuary in the sky."',
    description:
      "180° lie-flat ergonomic beds, priority boarding and fast-track security lanes, gourmet dining, and global airport lounge sanctuaries.",
    features: ["Guaranteed lie-flat flatbed", "Curated fine wine lists", "Dedicated business check-in"],
    buttonLabel: "Explore Business Class",
    buttonStyle: "border border-slate-600 text-slate-200",
  },
  {
    badge: "Tier I · Haute Vol",
    image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800&q=80",
    title: "First Class Suites",
    quote: '"The finest way to fly across continents."',
    description:
      "Enclosed private suites with floor-to-ceiling doors, vintage champagne, caviar tastings, and complimentary chauffeur terminal transfers.",
    features: ["Floor-to-ceiling privacy suites", "Caviar service & Dom Pérignon", "Tarmac limousine escort"],
    buttonLabel: "Explore First Class",
    buttonStyle: "bg-amber-500 text-[#0A1628] font-bold",
  },
  {
    badge: "Bespoke Charter",
    image: "https://images.unsplash.com/photo-1583327970853-6d1c8306a0bb?w=800&q=80",
    title: "Private Aviation",
    quote: '"When time is your most precious asset."',
    description:
      "Dedicated private aircraft, customized departure schedules, VIP ramp tarmac boarding with zero queues, and confidential passenger manifests.",
    features: ["Board in under 15 minutes", "Direct access to 5,000+ airports", "Custom bespoke catering"],
    buttonLabel: "Explore Private Flights",
    buttonStyle: "border border-slate-600 text-slate-200",
  },
];

const CabinTiers = () => {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-500 mb-2">THE FLEET ARCHITECTURE</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#0A1628] mb-3">Explore by Cabin Tier</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Tailored comfort engineered around privacy, gastronomy, and ergonomic quietude.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.title} className="bg-[#0A1628] rounded-2xl p-5 flex flex-col">
            <div className="relative rounded-xl overflow-hidden mb-5 h-56">
              <img src={tier.image} alt={tier.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-slate-900/80 text-slate-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {tier.badge}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">{tier.title}</h3>
            <p className="font-serif italic text-amber-400 text-sm mb-3">{tier.quote}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{tier.description}</p>
            <div className="flex flex-col gap-2 mb-6">
              {tier.features.map((f) => (
                <p key={f} className="flex items-center gap-2 text-sm text-slate-200">
                  <FiCheck className="text-emerald-400 flex-shrink-0" size={14} /> {f}
                </p>
              ))}
            </div>
            <button className={`mt-auto flex items-center justify-center gap-2 text-sm px-5 py-3 rounded-lg ${tier.buttonStyle}`}>
              {tier.buttonLabel} <FiArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CabinTiers;