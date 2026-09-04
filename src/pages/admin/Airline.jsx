import React, { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiEdit2,
  FiTrendingUp,
  FiX,
  FiUploadCloud,
  FiCheckCircle,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const initialAirlines = [
  { id: "#A02", name: "Delta Air Lines", sub: "Full-Service International", code: "DL", engines: ["Amadeus", "Sabre"], status: "Active" },
  { id: "#A03", name: "Emirates", sub: "Premium Long-Haul", code: "EK", engines: ["Amadeus", "Travelport"], status: "Active" },
  { id: "#A04", name: "British Airways", sub: "Full-Service Network", code: "BA", engines: ["Amadeus", "Sabre"], status: "Active" },
  { id: "#A05", name: "Qatar Airways", sub: "Global Hub Carrier", code: "QR", engines: ["Amadeus"], status: "Active" },
  { id: "#A06", name: "Lufthansa", sub: "Full-Service Network", code: "LH", engines: ["Amadeus"], status: "Active" },
  { id: "#A07", name: "Air France", sub: "Global Hub Carrier", code: "AF", engines: ["Amadeus"], status: "Active" },
];

const statCards = [
  { icon: TbPlaneDeparture, iconBg: "bg-blue-50", iconColor: "text-blue-500", label: "Total Airlines", value: "41" },
  { icon: FiCheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", label: "Active Partners", value: "41", dot: "bg-emerald-500" },
];

const AirlineFormModal = ({ airline, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: airline?.name || "",
    code: airline?.code || "",
    logo: null,
    status: airline?.status || "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (file) => {
    if (file) setFormData({ ...formData, logo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("code", formData.code);
      payload.append("status", formData.status);
      if (formData.logo) payload.append("logo", formData.logo);

      const response = await fetch("/api/admin/airlines", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      onSave(data);
    } catch (error) {
      console.error("Failed to save airline", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-5 sm:px-6 pt-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">Update Airline Master Profile</h2>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                <FiCheckCircle size={10} /> {formData.name || "Delta Air Lines"} Active Partner
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Configure commercial carrier identity, 2-letter IATA code, and official branding assets.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-6">
          <div>
            <p className="text-[11px] font-semibold text-gray-400 tracking-wide mb-3">CARRIER IDENTITY</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Airline Commercial Name</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <TbPlaneDeparture className="text-gray-400 flex-shrink-0" size={15} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">IATA 2 Letter Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  maxLength={2}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 uppercase focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-400 tracking-wide mb-3">BRANDING</p>
            <label className="text-xs text-gray-500">Airline Official Logo</label>
            <div
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="mt-1 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center py-8 text-center"
            >
              <input
                type="file"
                id="airline-logo"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <label htmlFor="airline-logo" className="flex flex-col items-center cursor-pointer">
                <FiUploadCloud className="text-gray-300" size={26} />
                <p className="text-xs text-gray-500 mt-2">Click to upload or drag and drop</p>
                <p className="text-[10px] text-gray-400 mt-1">SVG, PNG, JPG or WEBP (Max 800x400)</p>
              </label>
            </div>

            {formData.logo && (
              <div className="mt-3 flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {formData.code || "DL"}
                  </span>
                  <div>
                    <p className="text-xs text-gray-700">{formData.logo.name}</p>
                    <p className="text-[10px] text-gray-400">{Math.round(formData.logo.size / 1024)} KB</p>
                  </div>
                </div>
                <label htmlFor="airline-logo" className="text-xs text-blue-600 cursor-pointer">Replace Asset</label>
              </div>
            )}
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-400 tracking-wide mb-3">OPERATIONAL STATUS</p>
            <label className="text-xs text-gray-500">Carrier System Status</label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "Active" })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border ${
                  formData.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                <FiCheckCircle size={12} /> Active
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "Inactive" })}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border ${
                  formData.status === "Inactive" ? "bg-red-50 text-red-500 border-red-200" : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">Last modified: Sep 01, 2026 by Super Admin</p>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="text-xs font-semibold text-gray-600 px-4 py-2.5 rounded-lg border border-gray-200">
                Cancel
              </button>
              <button type="submit" className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg">
                Save & Update Airline
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const AirlineDirectory = () => {
  const [searchForm, setSearchForm] = useState({ query: "", alliance: "All Alliances", status: "All Statuses" });
  const [airlines, setAirlines] = useState(initialAirlines);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(searchForm).toString();
      const response = await fetch(`/api/admin/airlines/search?${params}`);
      const data = await response.json();
      if (data?.airlines) setAirlines(data.airlines);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const openAddModal = () => {
    setSelectedAirline(null);
    setShowModal(true);
  };

  const openEditModal = (airline) => {
    setSelectedAirline(airline);
    setShowModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
  };

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Master Data <span className="mx-1">›</span> Global Aviation <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Airlines Registry</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Airlines Master Directory</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage global airline partnerships, 2-letter IATA codes, carrier visual assets, and booking engine routing.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit"
        >
          <FiPlus size={16} /> Add New Airline
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-w-xl">
        {statCards.map(({ icon: Icon, iconBg, iconColor, label, value, dot }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`${iconColor} text-lg`} />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{label}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">{value}</span>
                {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
            <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
            <input
              type="text"
              name="query"
              value={searchForm.query}
              onChange={handleChange}
              placeholder="Search by airline name or IATA code..."
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
            <select name="alliance" value={searchForm.alliance} onChange={handleChange} className="outline-none bg-transparent">
              <option>All Alliances</option>
              <option>Star Alliance</option>
              <option>OneWorld</option>
              <option>SkyTeam</option>
            </select>
            <FiChevronDown size={14} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
            <select name="status" value={searchForm.status} onChange={handleChange} className="outline-none bg-transparent">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <FiChevronDown size={14} className="text-gray-400" />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg">
            Search
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">AIRLINE & FLEET</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">IATA CODE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">INTEGRATION ENGINES</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {airlines.map((airline) => (
                <tr key={airline.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-xs">{airline.id}</span>
                      <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <TbPlaneDeparture size={14} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{airline.name}</p>
                        <p className="text-xs text-gray-400">{airline.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">{airline.code}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {airline.engines.map((engine) => (
                        <span key={engine} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{engine}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 w-fit bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {airline.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => openEditModal(airline)} className="text-gray-400 hover:text-blue-600">
                      <FiEdit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <AirlineFormModal airline={selectedAirline} onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default AirlineDirectory;