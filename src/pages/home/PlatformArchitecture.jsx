import {
  Compass,
  Plane,
  ClipboardCheck,
  Headset,
  ShieldCheck,
  Mail,
  ShieldQuestion,
  Lock,
} from "lucide-react";

const flowSteps = [
  { icon: Compass, label: "Discover", sub: "Global Intelligence" },
  { icon: Plane, label: "Book Flight", sub: "Direct GDS Fares", active: true },
  { icon: ClipboardCheck, label: "Apply Visa", sub: "Fast Documentation" },
  { icon: Headset, label: "Connect Agent", sub: "Vetted Professionals" },
  { icon: ShieldCheck, label: "Verify OTB", sub: "Airline Clearance" },
  { icon: Mail, label: "Board & Fly", sub: "Frictionless Journey" },
];

const features = [
  {
    icon: Compass,
    tag: "Direct GDS Feeds",
    tagColor: "bg-blue-50 text-blue-700",
    title: "Smart Flight Discovery",
    description:
      "Proprietary algorithmic routing unlocks unpublished consolidator fares across 400+ international carriers.",
  },
  {
    icon: ClipboardCheck,
    tag: "Fast-Track Dossier",
    tagColor: "bg-emerald-50 text-emerald-700",
    title: "Visa Assistance Desk",
    description:
      "Real-time diplomatic rule engine verifying embassy requirements, financial proofs, and automated dossier compilation.",
  },
  {
    icon: ShieldCheck,
    tag: "Licensed Agents",
    tagColor: "bg-slate-100 text-slate-700",
    title: "Verified Travel Experts",
    description:
      "Direct access to background-checked travel advisors specialized in complex corporate itineraries and VIP leisure.",
  },
  {
    icon: ShieldCheck,
    tag: "Direct DCS Carrier API",
    tagColor: "bg-blue-50 text-blue-700",
    title: "Guaranteed OTB Verification",
    description:
      "Live API connection with GCC carrier handling desks ensures boarding validation before departure to the terminal.",
  },
  {
    icon: Lock,
    tag: "256-Bit SSL",
    tagColor: "bg-blue-50 text-blue-700",
    title: "Enterprise Security",
    description:
      "Bank-grade encryption protecting passport vaults, biometric submissions, and encrypted passenger payment transactions.",
  },
  {
    icon: ShieldQuestion,
    tag: "24/7 Desk",
    tagColor: "bg-amber-50 text-amber-700",
    title: "VIP Concierge Support",
    description:
      "Direct human assistance on WhatsApp and hotline for real-time gate delays, cancellations, and expedited rebooking.",
  },
];

export default function PlatformArchitecture() {
  return (
    <section className="bg-[#eef1f8] py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-2">
            INTEGRATED ARCHITECTURE
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            One Platform. Every Part of Your Journey.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
            Eliminating friction between airline reservations, embassy
            compliance, and local advisory.
          </p>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-10 overflow-x-auto">
          <div className="flex items-center justify-between gap-2 min-w-[600px]">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      step.active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <step.icon size={18} />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        step.active ? "text-blue-600" : "text-slate-800"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-slate-400 text-[10px]">{step.sub}</p>
                  </div>
                </div>
                {index < flowSteps.length - 1 && (
                  <span className="flex-1 h-px bg-slate-200 mx-1 sm:mx-2" />
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <feature.icon className="text-blue-600" size={20} />
                </div>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${feature.tagColor}`}
                >
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {features.map((feature, index) => (
    <div
      key={feature.title}
      className="feature-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.13)]"
      style={{
        animation: "featureReveal 700ms cubic-bezier(.22,1,.36,1) both",
        animationDelay: `${index * 120}ms`,
      }}
    >
      
      <div className="absolute left-0 top-0 h-[2px] w-full overflow-hidden bg-slate-100">
        <div
          className={`h-full w-1/3 animate-[featureLine_3s_ease-in-out_infinite] ${
            index % 3 === 0
              ? "bg-blue-600"
              : index % 3 === 1
                ? "bg-emerald-500"
                : "bg-cyan-500"
          }`}
        />
      </div>

   
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />

      
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-36 w-36 rounded-full bg-emerald-400/10 opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />

      <div className="relative z-10">

        
        <div className="mb-4 flex items-start justify-between">

          
          <div className="relative">

            <div
              className={`absolute -inset-2 rounded-2xl opacity-0 blur-md transition-all duration-500 group-hover:opacity-40 ${
                index % 3 === 0
                  ? "bg-blue-500"
                  : index % 3 === 1
                    ? "bg-emerald-500"
                    : "bg-cyan-500"
              }`}
            />

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-blue-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-100">

      
              <span className="absolute -left-10 top-0 h-full w-6 rotate-[20deg] bg-white/80 transition-all duration-700 group-hover:left-[130%]" />

              <feature.icon
                className="relative text-blue-600 transition-all duration-500 group-hover:scale-110"
                size={20}
              />
            </div>

            
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 opacity-0 transition-all duration-500 group-hover:animate-ping group-hover:opacity-100" />
          </div>

         
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-sm ${feature.tagColor}`}
          >
            {feature.tag}
          </span>
        </div>

 
        <h3 className="mb-2 text-base font-bold text-slate-900 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-700">
          {feature.title}
        </h3>  

     
        <p className="text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
          {feature.description}
        </p>

    
        <div className="mt-5 flex items-center gap-2">

          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="absolute left-0 top-0 h-full w-1/3 animate-[featureProgress_3s_linear_infinite] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"
              style={{
                animationDelay: `${index * 250}ms`,
              }}
            />
          </div>

          <span className="text-[9px] font-bold tracking-widest text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
            ACTIVE
          </span>
        </div>

   
       
      </div>
 
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full overflow-hidden bg-slate-100">
        <div className="absolute h-full w-1/4 animate-[featureScanner_2.8s_linear_infinite] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}