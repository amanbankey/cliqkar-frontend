import React, { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiX,
  FiEdit2,
  FiFilter,
  FiGrid,
  FiCheckCircle,
  FiTag,
  FiDollarSign,
  FiToggleRight,
} from "react-icons/fi";

const initialRules = [
  { id: "#26", airline: "Akasa Air", country: "UAE", flag: "🇦🇪", charge: 680, status: "Active" },
  { id: "#25", airline: "Air India Express", country: "UAE", flag: "🇦🇪", charge: 480, status: "Active" },
  { id: "#24", airline: "Air India", country: "UAE", flag: "🇦🇪", charge: 480, status: "Active" },
  { id: "#23", airline: "Air India Express", country: "India", flag: "🇮🇳", charge: 600, status: "Deactive" },
  { id: "#22", airline: "Air India", country: "India", flag: "🇮🇳", charge: 600, status: "Deactive" },
  { id: "#21", airline: "Kuwait Airways", country: "UAE", flag: "🇦🇪", charge: 380, status: "Active" },
];

const summaryCards = [
  { label: "TOTAL RULES", value: "26" },
  { label: "ACTIVE RULES", value: "24", trend: "+9%" },
  { label: "INACTIVE", value: "2" },
  { label: "AVERAGE FEE", value: "₹585.00" },
];

const UpdateTariffModal = ({ rule, onClose, onSave }) => {
  const [airline, setAirline] = useState(rule.airline);
  const [country, setCountry] = useState(rule.country);
  const [charge, setCharge] = useState(rule.charge);
  const [status, setStatus] = useState(rule.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/otb-tariffs/${rule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ airline, country, charge, status }),
      });
      if (!response.ok) throw new Error("Failed to update tariff");
      onSave({ ...rule, airline, country, charge, status });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/60 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Update OTB Airline Tariff</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-sm">
              Configure base On-To-Board verification pricing and operational status for this airline
              sector.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {rule.airline} | {rule.country}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-blue-600 mb-3">
              <FiTag size={12} /> AIRLINE & SECTOR IDENTIFIERS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Airline Commercial Partner</label>
                <input
                  type="text"
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-[10px] text-gray-400 mt-1">Target commercial carrier for OTB clearance</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Destination Country / Sector</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option>United Arab Emirates (UAE)</option>
                  <option>India</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Designated arrival territory for OTB clearance</p>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-blue-600 mb-3">
              <FiDollarSign size={12} /> TARIFF COMMERCIALS & PRICING
            </p>
            <label className="block text-xs text-gray-500 mb-1.5">Base OTB Verification Charge (INR)</label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
              <input
                type="number"
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Standard base verification fee charged to agent wallet upon submission
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-blue-600 mb-3">
              <FiToggleRight size={12} /> OPERATIONAL AVAILABILITY
            </p>
            <label className="block text-xs text-gray-500 mb-1.5">Tariff Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full max-w-xs border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Last modified: Sep 01, 2026 by Super Admin</p>
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Close / Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl disabled:opacity-60"
            >
              <FiCheckCircle size={15} />
              {isSaving ? "Saving..." : "Save Tariff Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OTBPricingTariffs = () => {
  const [rules, setRules] = useState(initialRules);
  const [search, setSearch] = useState("");
  const [activeRule, setActiveRule] = useState(null);

  const handleSaveRule = (updated) => {
    setRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setActiveRule(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Finance <span className="mx-1">›</span> Commercials & Tariffs <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">OTB Price Master</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">OTB Pricing & Airline Tariffs</h1>
            <span className="bg-gray-100 text-gray-500 text-[11px] font-semibold px-2.5 py-1 rounded-full">
              26 Configured Rates
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap">
          <FiPlus size={16} />
          Add OTB Price Rule
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {summaryCards.map(({ label, value, trend }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[10px] font-bold tracking-wide text-gray-400">{label}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xl font-bold text-gray-900">{value}</p>
              {trend && <span className="text-xs font-semibold text-emerald-500">{trend}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 border-b border-gray-100">
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search airline or ID..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-gray-600">
              Airline <FiChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-gray-600">
              Country <FiChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-gray-600">
              Status <FiChevronDown size={13} />
            </button>
            <button className="border border-gray-200 rounded-lg p-2.5 text-gray-500">
              <FiFilter size={15} />
            </button>
            <button className="border border-gray-200 rounded-lg p-2.5 text-gray-500">
              <FiGrid size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[680px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">SL & AIRLINE IDENTIFIER</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">DESTINATION COUNTRY</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">BASE OTB CHARGE</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">TARIFF STATUS</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-gray-400 w-8">{rule.id}</span>
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">
                        {rule.flag}
                      </div>
                      <p className="text-sm font-bold text-gray-900">{rule.airline}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 px-2.5 py-1 rounded-lg">
                      {rule.flag} {rule.country}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900">₹ {rule.charge.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        rule.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                      }`}
                    >
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setActiveRule(rule)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-lg"
                    >
                      <FiEdit2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Showing 1-10 of 26 OTB Pricing Rules</p>
          <div className="flex items-center gap-1.5">
            <button className="text-gray-300 p-1 rounded hover:bg-gray-50" disabled>‹</button>
            <button className="w-6 h-6 rounded bg-blue-700 text-white text-xs font-semibold">1</button>
            <button className="w-6 h-6 rounded text-gray-500 text-xs font-semibold hover:bg-gray-50">2</button>
            <button className="w-6 h-6 rounded text-gray-500 text-xs font-semibold hover:bg-gray-50">3</button>
            <button className="text-gray-400 p-1 rounded hover:bg-gray-50">›</button>
          </div>
        </div>
      </div>

      {activeRule && (
        <UpdateTariffModal rule={activeRule} onClose={() => setActiveRule(null)} onSave={handleSaveRule} />
      )}
    </div>
  );
};

export default OTBPricingTariffs;