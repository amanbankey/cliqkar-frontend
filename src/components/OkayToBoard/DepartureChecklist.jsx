import React from "react";
import { FiCalendar, FiPrinter, FiSmartphone, FiSend } from "react-icons/fi";

const checklist = [
  {
    icon: FiCalendar,
    title: "1. Passport Validity",
    desc: "Ensure your physical original passport has a minimum of 6 months validity from your planned departure date.",
    tag: "Mandatory ICAO Rule",
  },
  {
    icon: FiPrinter,
    title: "2. Visa Printed Copy",
    desc: "Carry a physical high-contrast colored printout of your issued electronic entry visa for ground immigration checks.",
    tag: "Hardcopy Required",
  },
  {
    icon: FiSmartphone,
    title: "3. OTB Slip Saved Offline",
    desc: "Download your verified Cliqkar clearance PDF and keep the official QR code saved locally on your smartphone.",
    tag: "Instant Station Sync",
  },
  {
    icon: FiSend,
    title: "4. Web Check-in Completed",
    desc: "Once OTB is approved, generate your official boarding pass via the airline website 24-48 hours before take-off.",
    tag: "Fast Bag-Drop Access",
  },
];

const DepartureChecklist = () => {
  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-blue-600">AIRPORT PREPAREDNESS</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Pre-Airport Departure Checklist</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          Keep these critical travel credentials ready in physical and digital formats before approaching the
          security checkpoint.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {checklist.map(({ icon: Icon, title, desc, tag }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-5">
              <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon size={16} />
              </span>
              <p className="mt-4 text-sm font-bold text-gray-900">{title}</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{desc}</p>
              <p className="mt-4 text-[11px] font-semibold text-blue-600">{tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartureChecklist;
