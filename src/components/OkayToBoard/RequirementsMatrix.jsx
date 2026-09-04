import React from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";

const rows = [
  {
    country: "UAE (Dubai / Sharjah)",
    who: "E-Visa Holders holding Indian / Subcontinent Passports",
    docs: "Valid E-Visa Copy + Confirmed Return Flight Ticket",
    window: "At least 48h prior to flight",
    sla: "~3 Hours",
  },
  {
    country: "Qatar (Doha Hamad)",
    who: "Select Tourist, Business & Single-entry Employment Visas",
    docs: "Valid Hotel Booking + Hayya / Ministry E-Visa",
    window: "72h prior to departure",
    sla: "~4 Hours",
  },
  {
    country: "Oman & Bahrain",
    who: "Express work entry & specific paper visa endorsements",
    docs: "Verified Royal Police Visa + Confirmed Ticket",
    window: "48h prior to flight",
    sla: "~6 Hours",
  },
  {
    country: "Kuwait & Saudi Arabia",
    who: "Commercial visit, Family visit & Transit Visas",
    docs: "Biometric Slip + MOFA Stamped Visa PDF",
    window: "96h prior to flight",
    sla: "~8 Hours",
  },
];

const RequirementsMatrix = () => {
  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-600">REGULATORY COMPLIANCE TABLE</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Requirements Matrix by Destination</h2>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full w-fit">
            <FiCheckCircle size={12} /> Current to IATA Timatic 2026
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">DESTINATION COUNTRY</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">WHO NEEDS OTB?</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">MANDATORY DOCUMENTS</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">SUBMISSION WINDOW</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">AVERAGE SLA</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.country} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <FiSend className="text-blue-600" size={13} /> {row.country}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-600 max-w-[200px]">{row.who}</td>
                    <td className="px-4 py-4 text-xs text-gray-600 max-w-[220px]">{row.docs}</td>
                    <td className="px-4 py-4 text-xs font-semibold text-gray-700">{row.window}</td>
                    <td className="px-4 py-4 text-xs font-bold text-blue-600">{row.sla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementsMatrix;
