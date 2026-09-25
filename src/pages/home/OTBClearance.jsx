import { useState } from "react";
import {
  Mail,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Download, BadgeCheck, Star, Crown,Plane
} from "lucide-react";

const auditTrail = [
  {
    title: "Biometric Documentation Dossier Verified",
    description:
      "Passenger passport digital copy and approved GCC e-Visa validated.",
  },
  {
    title: "Carrier PNR & Manifest Cross-Check",
    description:
      "Confirmed live seat inventory on Air India Express AIX 192.",
  },
  {
    title: "Civil Aviation Desk Clearance Stamped",
    description:
      "Official Gulf aviation board clearance code issued to airline terminal.",
  },
];

const featuredAgent = {
  name: "Raj Travel Solutions",
  person: "Mr. Rajesh Verma · Director",
  rating: "4.95 Rating",
  reviews: "1,240+ Travelers",
  note: "96% first-attempt visa success rate across GCC & Schengen routes. Dedicated VIP fast-track concierge liaison.",
};


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


export default function OTBClearance() {
  const [clearanceForm, setClearanceForm] = useState({
    carrier: "Air India Express",
    portOfEntry: "United Arab Emirates (DXB)",
    travelDate: "2026-10-28",
    pnr: "CKR89921DEL",
    passportId: "Z6492019",
  });

  const [cleared, setCleared] = useState(true);

  const handleChange = (field, value) => {
    setClearanceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearanceCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/otb/clearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clearanceForm),
      });
      const data = await response.json();
      setCleared(Boolean(data.cleared));
    } catch (error) {
      console.log("clearance check error", error);
    }
  };

  return (
 
  <section className="relative overflow-hidden bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

  {/* Radar Grid */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "linear-gradient(#0284c7 1px, transparent 1px), linear-gradient(90deg, #0284c7 1px, transparent 1px)",
      backgroundSize: "36px 36px",
    }}
  />

  {/* Ambient Lights */}
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 animate-[dcsGlow_8s_ease-in-out_infinite] rounded-full bg-blue-400/15 blur-[120px]" />

  <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 animate-[dcsGlow_10s_ease-in-out_infinite_reverse] rounded-full bg-emerald-400/15 blur-[120px]" />

 

  <div className="relative mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-10 text-center">

      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5">

        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500" />
          <span className="relative block h-2 w-2 rounded-full bg-emerald-500" />
        </span>

        <span className="text-[10px] font-bold tracking-[0.16em] text-cyan-700">
          AIRLINE DEPARTURE CONTROL SYSTEM · DCS TIER 1
        </span>
      </div>

           
      <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Ready to Fly.{" "}
        <span className="  ">
          Verified to Board.
        </span>
      </h2>

      <p className="mx-auto max-w-2xl text-sm text-slate-500 sm:text-base">
        Automated pre-flight clearance synchronized with civil aviation
        desks and airline DCS networks.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

   
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/50 sm:p-6">

        {/* Corner Brackets */}
        <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-cyan-500/60 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-cyan-500/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-500/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-500/60 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        {/* Horizontal Scanner */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute left-0 h-px w-full animate-[terminalScan_3s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </div>

        {/* Header */}
        <div className="relative z-10 mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10">
              <Mail
                className="text-blue-600 transition-transform duration-500 group-hover:scale-110"
                size={18}
              />
            </div>

            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
              OTB Clearance Engine
            </h3>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">

            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500" />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>

            GATE LINK ACTIVE
          </span>
        </div>

        <p className="relative z-10 mb-6 text-xs text-slate-500">
          Direct GCC Aviation Protocol Synchronization
        </p>

        <form
          onSubmit={handleClearanceCheck}
          className="relative z-10 space-y-4"
        >

          {/* Input helper */}
          {[
            ["carrier", "SELECT CARRIER", clearanceForm.carrier],
            ["portOfEntry", "PORT OF ENTRY", clearanceForm.portOfEntry],
          ].map(([field, label, value]) => (
            <div
              key={field}
              className="group/input relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/60 focus-within:bg-cyan-50"
            >
              <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/input:w-full" />

              <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-400">
                {label}
              </p>

              <input
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
              />
            </div>
          ))}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {[
              ["travelDate", "TRAVEL DATE", "date"],
              ["pnr", "AIRLINE PNR / BOOKING REF", "text"],
            ].map(([field, label, type]) => (
              <div
                key={field}
                className="group/input relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/60"
              >
                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/input:w-full" />

                <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-400">
                  {label}
                </p>

                <input
                  type={type}
                  value={clearanceForm[field]}
                  onChange={(e) =>
                    handleChange(field, e.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
                />
              </div>
            ))}
          </div>

          <div className="group/input relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/60">

            <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/input:w-full" />

            <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-400">
              BIOMETRIC PASSPORT ID
            </p>

            <input
              value={clearanceForm.passportId}
              onChange={(e) =>
                handleChange("passportId", e.target.value)
              }
              className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">

            <button
              type="submit"
              className="group/check relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]"
            >

              <span className="absolute -left-20 top-0 h-full w-12 rotate-[20deg] bg-white/30 transition-all duration-700 group-hover/check:left-[130%]" />

              <span className="relative">
                Execute Clearance Check
              </span>

              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover/check:translate-x-1.5"
              />
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-50"
            >
              <FileText size={16} />
              Audit Log
            </button>

          </div>
        </form>
      </div>

  

 
        <div className="group relative flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-emerald-400/40 sm:p-4">
       
              
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="group relative overflow-hidden rounded-2xl p-[1px] shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(15,23,42,0.16)]"
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
              <div className="relative h-full overflow-hidden rounded-[15px] bg-slate-50 p-4">

                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 animate-[cardGlow_5s_ease-in-out_infinite] rounded-full bg-blue-500/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 -left-20 h-36 w-36 animate-[cardGlow_6s_ease-in-out_infinite_reverse] rounded-full bg-emerald-400/10 blur-3xl" />

                {/* Scanning Beam */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-[15deg] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-[cardScan_2.5s_ease-in-out_infinite]" />
                </div>

                <div className="relative z-10">

                  {/* Agent Header */}
                  <div className="mb-3 flex items-center gap-3">

                    {/* Animated Avatar */}
                    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-slate-900 text-xs font-bold text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
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

                     
                    </div>
                  </div>

                  {/* Information Box */}
                  <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">

                    {[
                      ["Specialization:", agent.specialization, "text-slate-900"],
                      ["Response Time:", agent.responseTime, "text-emerald-600"],
                      ["Station Hub:", agent.hub, "text-slate-900"],
                    ].map(([label, value, color], rowIndex) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-slate-100 py-1.5 last:border-0 last:pb-0 first:pt-0 transition-all duration-300 group-hover:px-1"
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
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-slate-100 py-2 text-xs font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-200 hover:-translate-y-0.5">
                      View Profile
                    </button>

                    <button className="relative flex-1 overflow-hidden rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25">
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
            className="group relative overflow-hidden rounded-2xl p-[2px] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(245,158,11,0.22)] sm:col-span-2"
            style={{
              animation: "cardReveal 700ms ease-out both",
              animationDelay: "280ms",
            }}
          >

            {/* Gold + Dark Rotating Border */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -inset-[120%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#451a03,#f59e0b,#78350f,#fbbf24,#451a03,#020617,#f59e0b,#451a03)] opacity-95" />
            </div>

            <div className="relative h-full overflow-hidden rounded-[14px] bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4">

              {/* Gold Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 animate-[cardGlow_4s_ease-in-out_infinite] rounded-full bg-amber-400/20 blur-3xl" />

              {/* Badge */}
              <span className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-amber-900 to-amber-700 px-3 py-1.5 text-[10px] font-bold tracking-wide text-amber-50 shadow-lg">
                TOP AGENT OF THE MONTH
              </span>

              <div className="relative z-10 mt-3">

                <div className="mb-3 flex items-center gap-3">

                  {/* Crown Avatar */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Crown
                      size={22}
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
                <div className="mb-3 rounded-xl border border-amber-200 bg-white/80 p-3 backdrop-blur-sm transition-all duration-500 group-hover:border-amber-300 group-hover:shadow-md">
                  <p className="text-xs leading-relaxed text-slate-700">
                    {featuredAgent.note}
                  </p>
                </div>
                <button className="relative w-full overflow-hidden rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-[0_12px_35px_rgba(29,78,216,0.3)]">
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
 
        </div>

      
    
    </div>
    </div>
  </section>
  );
}