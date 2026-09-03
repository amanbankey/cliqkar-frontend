import React from "react";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const configuredVisa = {
  from: "India",
  to: "UAE",
  title: "Dubai Visa | 30 Days",
  status: "Active",
  entryType: "Single",
  validity: "60 Days",
  sla: "2-5 Working Days",
  stayPeriod: "30 Days",
  documents: ["Passport (Front & Back)", "Passport Size Photo", "PAN Card"],
  retailPrice: "₹7,150",
  agentPriceAdult: "₹6,880",
  agentPriceChild: "₹1,300",
  margin: "-₹270",
};

const VisaChargesManagementPopup = ({ agent, onClose, onViewProfile }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-700 bg-white rounded-full p-1"
        >
          <FiX size={20} />
        </button>

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          <div className="flex items-start justify-between gap-3 mb-5 flex-wrap pr-8">
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray-400 mb-1">
                AGENT SETTINGS <span className="mx-1">›</span>
                <span className="text-blue-600">VISA CHARGES MANAGEMENT</span>
              </p>
              <h2 className="text-2xl font-bold text-gray-900">{agent.company}</h2>
            </div>
            <button
              onClick={onViewProfile}
              className="border border-gray-200 text-blue-600 text-xs font-semibold px-3 py-2 rounded-lg"
            >
              View Agent Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">CONFIGURED ROUTES</p>
              <p className="text-lg font-bold text-gray-900">
                1 <span className="text-xs font-medium text-gray-400">total</span>
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">ACTIVE ROUTES</p>
              <p className="text-lg font-bold text-gray-900">
                1 <span className="text-xs font-medium text-gray-400">live</span>
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">BASE AGENT PRICING</p>
              <p className="text-lg font-bold text-gray-900">
                ₹6,880 <span className="text-xs font-medium text-gray-400">avg/adult</span>
              </p>
            </div>
          </div>

          <p className="text-sm font-bold text-gray-900 mb-3">Configured Visas</p>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 bg-gray-50 px-4 py-3 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <TbPlaneDeparture className="text-blue-600" size={16} />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {configuredVisa.from} <span className="text-gray-400">→</span> {configuredVisa.to}
                  </p>
                  <p className="text-xs text-gray-500">{configuredVisa.title}</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {configuredVisa.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 py-4 border-t border-gray-100">
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">ENTRY TYPE</p>
                <p className="text-sm font-medium text-gray-800">{configuredVisa.entryType}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">VALIDITY</p>
                <p className="text-sm font-medium text-gray-800">{configuredVisa.validity}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">PROCESSING SLA</p>
                <p className="text-sm font-medium text-gray-800">{configuredVisa.sla}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">STAY PERIOD</p>
                <p className="text-sm font-medium text-gray-800">{configuredVisa.stayPeriod}</p>
              </div>
            </div>

            <div className="px-4 py-4 border-t border-gray-100">
              <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-2">REQUIRED DOCUMENTS</p>
              <div className="flex flex-wrap gap-2">
                {configuredVisa.documents.map((doc) => (
                  <span key={doc} className="border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-lg">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">RETAIL PRICE</p>
                  <p className="text-sm font-medium text-gray-400 line-through">{configuredVisa.retailPrice}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-blue-500 mb-1">AGENT PRICE (ADULT)</p>
                  <p className="text-sm font-bold text-blue-600">{configuredVisa.agentPriceAdult}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">AGENT PRICE (CHILD)</p>
                  <p className="text-sm font-medium text-gray-800">{configuredVisa.agentPriceChild}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">YOUR MARGIN</p>
                  <p className="text-sm font-bold text-red-500">{configuredVisa.margin}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-[#0B1120] text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                <FiEdit2 size={13} /> Edit Visa Charges
              </button>
            </div>
          </div>

          <button className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-6 mt-4 text-gray-500 hover:border-gray-400 hover:text-gray-600">
            <FiPlus size={20} />
            <span className="text-sm font-semibold">Add New Route Configuration</span>
            <span className="text-xs text-gray-400">Configure specialized pricing for this agent on a new route.</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisaChargesManagementPopup;