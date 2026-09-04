import React from "react";
import { FiCheckCircle, FiRefreshCw, FiDownload } from "react-icons/fi";

const steps = ["SUBMITTED", "REVIEW", "CARRIER DCS", "CLEARED"];

const LiveStatusSimulation = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-600">REAL-TIME DISPATCH CONSOLE</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Live OTB Status Verification Simulation</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">
            Observe live dispatch state transitions between active carrier queue transmission and finalized digital
            boarding stamps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE CLEARANCE</p>
                <p className="text-base font-bold text-gray-900">Arjun Mehta</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> PROCESSING
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                PNR: <span className="font-semibold text-gray-800">IX-4891B2</span> · Air India Express
              </span>
              <span className="font-semibold text-gray-800">DEL → DXB</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs border-t border-gray-100 pt-4">
              <div>
                <p className="text-gray-400">Carrier Flight</p>
                <p className="font-semibold text-gray-800">IX-141</p>
              </div>
              <div>
                <p className="text-gray-400">Depart Date</p>
                <p className="font-semibold text-gray-800">18 May 2026</p>
              </div>
              <div>
                <p className="text-gray-400">Arrival Hub</p>
                <p className="font-semibold text-gray-800">DXB Terminal 2</p>
              </div>
              <div>
                <p className="text-gray-400">Ticket Class</p>
                <p className="font-semibold text-gray-800">Economy (Y)</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">E-Visa Legitimacy Check (UAE GDRFA/ICP)</span>
                <span className="font-semibold text-emerald-600">Passed (Score 100%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Airline GDS Sector &amp; PNR Match</span>
                <span className="font-semibold text-emerald-600">Verified</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Direct Carrier Clearance Handshake</span>
                <span className="font-semibold text-blue-600">Transmitting DCS...</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-blue-500 rounded-full" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-1">
              {steps.map((step, i) => (
                <div key={step} className="text-center">
                  <div className={`h-1 rounded-full mb-1.5 ${i <= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
                  <p className={`text-[9px] font-semibold ${i === 2 ? "text-blue-600" : "text-gray-400"}`}>{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Queue Priority: Standard Web</span>
              <button className="flex items-center gap-1.5 text-blue-600 font-semibold">
                <FiRefreshCw size={12} /> Refresh Status
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE CLEARANCE</p>
                <p className="text-base font-bold text-gray-900">Rohit Sharma</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <FiCheckCircle size={11} /> VERIFIED
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                PNR: <span className="font-semibold text-gray-800">EK-9824A1</span> · Emirates Official
              </span>
              <span className="font-semibold text-gray-800">BOM → DOH</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs border-t border-gray-100 pt-4">
              <div>
                <p className="text-gray-400">Carrier Flight</p>
                <p className="font-semibold text-gray-800">EK-501</p>
              </div>
              <div>
                <p className="text-gray-400">Depart Date</p>
                <p className="font-semibold text-gray-800">14 May 2026</p>
              </div>
              <div>
                <p className="text-gray-400">Arrival Hub</p>
                <p className="font-semibold text-gray-800">DOH Hamad Intl</p>
              </div>
              <div>
                <p className="text-gray-400">Passenger Class</p>
                <p className="font-semibold text-gray-800">Business (J)</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">E-Visa Legitimacy Check</span>
                <span className="font-semibold text-emerald-600">Authenticated</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Airline System PNR Validation</span>
                <span className="font-semibold text-emerald-600">Matched &amp; Ticketed</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Direct Carrier Clearance Stamp</span>
                <span className="font-semibold text-emerald-600">Approved &amp; Synced</span>
              </div>
            </div>

            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <FiCheckCircle size={13} /> OK TO BOARD CONFIRMED
              </p>
              <p className="mt-1 text-[11px] text-emerald-700 leading-relaxed">
                Cleared in Airline DCS (Departure Control System) with Digital Stamp #CLQ-77821. Physical airport
                counter clearance guaranteed.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">VERIFIED 28 MIN AGO</span>
              <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg">
                <FiDownload size={13} /> Download OTB Slip (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatusSimulation;
