import React from "react";
import { FiRadio, FiCheck, FiRefreshCw } from "react-icons/fi";

const steps = [
  { label: "Application Submitted", value: "May 12, 10:30 AM", status: "done" },
  { label: "Specialist Dossier Review", value: "May 12, 02:15 PM", status: "done" },
  { label: "Ministry Processing", value: "In Review with GDRFA", status: "active" },
  { label: "eVisa Issuance", value: "Pending Decision", status: "pending" },
];

const LiveTracking = () => {
  return (
    <section className="bg-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
          <FiRadio size={13} /> LIVE CONSULAR TELEMETRY
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Your Application. Always Within Reach.</h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-10">
          No more waking up wondering if your passport is stuck in administrative processing. Live tracking with
          minute-by-minute status notifications.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <FiRefreshCw className="text-blue-600" size={18} />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-lg font-bold text-gray-900">Application #VO-28491</p>
                  <span className="bg-indigo-100 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full">IN EMBASSY TRANSIT</span>
                </div>
                <p className="text-sm text-gray-500">Rahul Sharma · UAE Tourist Visa (30 Days)</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-semibold tracking-wide text-gray-400">ESTIMATED DECISION</p>
              <p className="text-base font-bold text-gray-900">Tomorrow, 4:00 PM</p>
            </div>
          </div>

          <div className="relative flex justify-between mb-3">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
            <div className="absolute top-5 left-0 w-2/3 h-0.5 bg-blue-600" />
            {steps.map((step) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center w-1/4 text-center px-1">
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                    step.status === "done"
                      ? "bg-emerald-600 text-white"
                      : step.status === "active"
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.status === "active" ? <FiRefreshCw size={16} className="animate-spin" /> : <FiCheck size={16} />}
                </span>
                <p className={`text-sm font-bold mb-1 ${step.status === "pending" ? "text-gray-400" : "text-gray-900"}`}>{step.label}</p>
                <p className={`text-xs ${step.status === "active" ? "text-blue-600 font-semibold" : "text-gray-400"}`}>{step.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 rounded-xl px-4 py-3 flex items-center gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <p className="text-xs text-gray-700">Real-time webhook linked to UAE GDRFA Immigration Portal.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTracking;