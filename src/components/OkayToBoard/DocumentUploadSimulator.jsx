import React, { useState } from "react";
import { FiFileText, FiFile, FiCreditCard, FiCheckCircle } from "react-icons/fi";

const initialFiles = [
  { key: "passport", icon: FiCreditCard, title: "Passport Bio-data Page", meta: "passport_arjun_front.pdf • 1.4 MB", status: "Validated & Legible" },
  { key: "ticket", icon: FiFile, title: "Confirmed Return Flight Ticket", meta: "emirates_ticket_bom_dxb.pdf • 840 KB", status: "Validated & PNR Matched" },
  { key: "visa", icon: FiFileText, title: "Electronic Visa PDF (Host Authority)", meta: "uae_tourist_evisa_303.pdf • 2.1 MB", status: "High Resolution Approved" },
];

const DocumentUploadSimulator = () => {
  const [formData, setFormData] = useState({
    passport: null,
    ticket: null,
    visa: null,
  });

  const handleFileChange = (key, file) => {
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, file]) => {
        if (file) payload.append(key, file);
      });

      const response = await fetch("/api/otb/document-precheck", {
        method: "POST",
        body: payload,
      });
      await response.json();
    } catch (error) {
      console.error("Failed to submit documents for clearance", error);
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-blue-600">BIOMETRIC &amp; OCR ENGINE</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Document Upload &amp; Pre-Check Simulator</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
          Test instant file readability, barcode extraction, and passport machine-readable zone (MRZ) validation
          before dispatching to carrier.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 bg-[#F4F6FB] border border-gray-200 rounded-2xl p-5 sm:p-6 text-left">
          <div className="flex items-center justify-between mb-4">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <FiFileText className="text-blue-600" /> Passenger Dossier Pre-Validation
            </p>
            <span className="text-xs font-semibold text-emerald-600">3 of 3 Files Verified</span>
          </div>

          <div className="space-y-3">
            {initialFiles.map(({ key, icon: Icon, title, meta, status }) => (
              <label
                key={key}
                htmlFor={`${key}-upload`}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-[11px] text-gray-400">
                      {formData[key] ? `${formData[key].name} • ${Math.round(formData[key].size / 1024)} KB` : meta}
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 whitespace-nowrap">
                  <FiCheckCircle size={12} /> {status}
                </span>
                <input
                  id={`${key}-upload`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(key, e.target.files[0])}
                />
              </label>
            ))}
          </div>

          <button type="submit" className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-lg">
            SUBMIT FOR CLEARANCE ▷
          </button>
        </form>
      </div>
    </section>
  );
};

export default DocumentUploadSimulator;
