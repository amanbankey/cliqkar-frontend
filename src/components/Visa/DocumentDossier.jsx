import React from "react";
import { FiCrop, FiHash, FiShield, FiCheckCircle } from "react-icons/fi";

const requirements = [
  {
    title: "Valid Passport (Original or High-Res Scan)",
    subtitle: ">6 Months validity detected (Expiry: Nov 2029)",
  },
  {
    title: "Passport Size Photograph",
    subtitle: "ICAO white background standard applied via AI crop",
  },
  {
    title: "Confirmed Return Flight Ticket",
    subtitle: "Emirates (EK-512 / EK-517) validated",
  },
  {
    title: "Hotel Accommodation / Stay Voucher",
    subtitle: "Downtown Dubai Hotel reservation match verified",
  },
  {
    title: "Basic Financial Solvency Declaration",
    subtitle: "Standard applicant self-declaration attached",
  },
];

const DocumentDossier = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
              ⚡ DYNAMIC EMBASSY COMPLIANCE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Know Exactly What You Need.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              No vague PDF guidelines or outdated embassy forums. Our dynamic verification system evaluates your
              passport type, itinerary dates, and travel history to generate an exact document dossier with zero
              guesswork.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FiCrop className="text-blue-600" size={16} />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Automated ICAO Biometric Cropper</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Photos automatically centered and adjusted to 35x45mm white background embassy specs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FiHash className="text-blue-600" size={16} />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">MRZ Passport Validation</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Detects expiration dates under 6 months before you spend a single rupee on government fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between gap-3 bg-indigo-50 px-5 py-4 flex-wrap">
              <div>
                <p className="text-[10px] font-bold tracking-wide text-blue-600 mb-1">LIVE DOSSIER AUDIT</p>
                <p className="text-base font-bold text-gray-900">United Arab Emirates (30-Day Leisure)</p>
              </div>
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full">
                <FiCheckCircle size={13} /> 5 / 5 Required Ready
              </span>
            </div>

            <div className="px-5 py-2">
              {requirements.map((req, i) => (
                <div
                  key={req.title}
                  className={`flex items-center justify-between gap-4 py-4 ${i !== requirements.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{req.title}</p>
                      <p className="text-xs text-gray-400">{req.subtitle}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-md flex-shrink-0">VERIFIED</span>
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 mx-5 mb-5 rounded-xl px-4 py-3 flex items-center gap-2">
              <FiShield className="text-blue-600 flex-shrink-0" size={15} />
              <p className="text-xs text-gray-700">All uploads stored in isolated AES-256 encrypted vaults.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentDossier;