import { useState } from "react";
import {
  Building2,
  BadgeCheck,
  Zap,
  Search,
  ArrowRight,
  Star,
  Crown,
} from "lucide-react";

// import uaeImage from "../assets/images/visa-uae.jpg";
// import thailandImage from "../assets/images/visa-thailand.jpg";
// import singaporeImage from "../assets/images/visa-singapore.jpg";

const visaCards = [
  {
    // image: uaeImage,
    tag: "EXPRESS ELIGIBLE",
    duration: "30 Days",
    country: "United Arab Emirates",
    info: "Tourist Visa · Single / Multiple Entry Available",
    turnaround: "Turnaround: 24-48 Hours",
    price: "₹6,999",
  },
  {
    // image: thailandImage,
    tag: "E-VISA AVAILABLE",
    duration: "60 Days",
    country: "Thailand",
    info: "Tourist Visa · 60 Days Single Entry",
    turnaround: "Turnaround: 2-3 Days",
    price: "₹3,499",
  },
  {
    // image: singaporeImage,
    tag: "PRE-APPROVED TIER",
    duration: "30 Days",
    country: "Singapore",
    info: "Entry Visa · 30 Days Multiple Entry",
    turnaround: "Turnaround: 3-4 Days",
    price: "₹2,850",
  },
];

const steps = [
  {
    title: "Choose Country",
    description: "Select destination and intended stay period",
  },
  {
    title: "Check Checklist",
    description: "Automatic document criteria generated",
  },
  {
    title: "Submit Vault",
    description: "Encrypted portal upload with AI scan",
  },
  {
    title: "Legal Review",
    description: "Vetted specialist cross-verifies dossier",
  },
  {
    title: "Visa Processed",
    description: "Direct embassy grant & e-Visa delivery",
  },
];

export default function VisaSection() {
  const [visaSearch, setVisaSearch] = useState({
    destination: "United Arab Emirates",
    category: "Tourist / Leisure Visa",
    turnaround: "Express (24 - 48 Hours)",
  });

  const handleChange = (field, value) => {
    setVisaSearch((prev) => ({ ...prev, [field]: value }));
  };

  const handleFindVisa = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/visas/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visaSearch),
      });
      const data = await response.json();
      console.log("visa search results", data);
    } catch (error) {
      console.log("visa search error", error);
    }
  };

  return (
    <section className="bg-[#eef1f8] py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-2">
            GLOBAL ENTRY SIMPLIFIED
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Your Visa, Simplified.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Explore destinations. Understand requirements. Apply with
            confidence.
          </p>
        </div>

        <form
          onSubmit={handleFindVisa}
          className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 mb-10 flex flex-col lg:flex-row gap-3"
        >
          <div className="flex-1 flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3">
            <Building2 className="text-blue-600 shrink-0" size={18} />
            <div className="w-full">
              <p className="text-slate-400 text-[10px] font-semibold tracking-wide">
                TARGET DESTINATION
              </p>
              <input
                value={visaSearch.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                className="text-slate-900 text-sm font-semibold outline-none w-full"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3">
            <BadgeCheck className="text-blue-600 shrink-0" size={18} />
            <div className="w-full">
              <p className="text-slate-400 text-[10px] font-semibold tracking-wide">
                VISA CATEGORY
              </p>
              <select
                value={visaSearch.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="text-slate-900 text-sm font-semibold outline-none w-full bg-transparent"
              >
                <option>Tourist / Leisure Visa</option>
                <option>Business Visa</option>
                <option>Student Visa</option>
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3">
            <Zap className="text-blue-600 shrink-0" size={18} />
            <div className="w-full">
              <p className="text-slate-400 text-[10px] font-semibold tracking-wide">
                TURNAROUND PROTOCOL
              </p>
              <select
                value={visaSearch.turnaround}
                onChange={(e) => handleChange("turnaround", e.target.value)}
                className="text-slate-900 text-sm font-semibold outline-none w-full bg-transparent"
              >
                <option>Express (24 - 48 Hours)</option>
                <option>Standard (2 - 3 Days)</option>
                <option>Priority (Same Day)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm whitespace-nowrap transition-colors"
          >
            <Search size={16} /> Find Visa Protocol
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {visaCards.map((visa) => (
            <div
              key={visa.country}
              className="relative rounded-2xl overflow-hidden h-72"
            >
              <img
                src={visa.image}
                alt={visa.country}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="relative h-full flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full">
                    {visa.tag}
                  </span>
                  <span className="bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {visa.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-white text-lg font-bold mb-1">
                    {visa.country}
                  </h3>
                  <p className="text-white/70 text-xs mb-2">{visa.info}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-[11px]">
                        {visa.turnaround}
                      </p>
                      <p className="text-amber-400 text-lg font-extrabold">
                        From {visa.price}
                      </p>
                    </div>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-900 shrink-0">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="relative rounded-2xl overflow-hidden h-72 bg-[#0a1628] p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-full">
                <Star size={11} /> DIPLOMATIC CONCIERGE
              </span>
              <span className="flex items-center gap-1 bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                <Crown size={11} /> VIP Priority
              </span>
            </div>

            <div>
              <h3 className="text-white text-xl font-bold mb-2 leading-tight">
                Schengen Visa Assistance
              </h3>
              <p className="text-white/60 text-xs mb-4">
                27 European Member States · Multiple Entry Dossier ·
                Embassy Liaison Desk
              </p>
              <p className="text-white/50 text-[11px]">Concierge Fee:</p>
              <p className="text-amber-400 text-xl font-extrabold mb-3">
                From ₹12,999
              </p>
              <button className="w-full bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                Explore Schengen <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
          <h3 className="text-center text-slate-900 text-lg sm:text-xl font-bold mb-8">
            The Seamless 5-Step Visa Protocol
          </h3>

          <div className="relative flex flex-col sm:flex-row gap-8 sm:gap-0">
            <div className="hidden sm:block absolute top-6 left-0 right-0 h-0.5 bg-slate-100" />
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex-1 flex sm:flex-col items-start sm:items-center gap-4 sm:gap-0 sm:text-center"
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 sm:mb-4 ${
                    index < 4
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm mb-1">
                    {step.title}
                  </p>
                  <p className="text-slate-500 text-xs max-w-[160px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}