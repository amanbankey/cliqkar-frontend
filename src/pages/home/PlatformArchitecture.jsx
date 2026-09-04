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

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-10 overflow-x-auto">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
        </div>
      </div>
    </section>
  );
}