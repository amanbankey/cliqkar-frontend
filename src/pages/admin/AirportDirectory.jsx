import React, { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiMapPin,
  FiX,
  FiFlag,
  FiTrendingUp,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const initialAirports = [
  { code: "AAA", name: "Anaa Airport", type: "Public Facility", country: "French Polynesia", region: "Oceania", iata: "AAA", icao: "NTGA", lat: "17.3529 S", lng: "145.5087 E", status: "Active" },
  { code: "AEC", name: "El Meliah Airport", type: "Public Facility", country: "Algeria", region: "Africa", iata: "AEC", icao: "DAAE", lat: "36.8222 N", lng: "7.3892 E", status: "Active" },
  { code: "AAL", name: "Aalborg Airport", type: "Public Military", country: "Denmark", region: "Europe", iata: "AAL", icao: "EKYT", lat: "57.0928 N", lng: "9.8492 E", status: "Active" },
  { code: "AAM", name: "Mala Mala Airport", type: "Private Facility", country: "South Africa", region: "Africa", iata: "AAM", icao: "FAOG", lat: "24.4181 S", lng: "31.5187 E", status: "Active" },
  { code: "AAN", name: "Al Ain Intl Airport", type: "International", country: "United Arab Emirates", region: "Middle East", iata: "AAN", icao: "OMAL", lat: "24.2611 N", lng: "55.6087 E", status: "Active" },
  { code: "OLB", name: "Olbia Costa Smeralda", type: "Public Facility", country: "Italy", region: "Europe", iata: "OLB", icao: "LIEO", lat: "40.8987 N", lng: "9.5175 E", status: "Active" },
  { code: "AAT", name: "Altay Airport", type: "Public Facility", country: "China", region: "Asia", iata: "AAT", icao: "ZWAT", lat: "47.8587 N", lng: "88.0817 E", status: "Active" },
  { code: "AAF", name: "Apalachicola Regional", type: "Regional", country: "United States", region: "North America", iata: "AAF", icao: "KAAF", lat: "29.7275 N", lng: "85.0275 W", status: "Active" },
  { code: "ARR", name: "Arraias Airport", type: "Public Facility", country: "Brazil", region: "South America", iata: "AR1", icao: "SBRR", lat: "12.9367 S", lng: "46.9307 W", status: "Inactive" },
];

const AirportFormModal = ({ airport, onClose }) => {
  const [formData, setFormData] = useState({
    name: airport?.name || "",
    country: airport?.country || "Andorra",
    iata: airport?.iata || "",
    icao: airport?.icao || "",
    lat: airport?.lat || "",
    lng: airport?.lng || "",
    availability: "Fully Operational",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/airports/${airport?.code || "new"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.json();
      onClose();
    } catch (error) {
      console.error("Failed to save airport", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-5 sm:px-6 pt-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Update Airport Master Data</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Configure aviation registry codes, geographic positioning, and operational availability.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              {formData.iata || airport?.iata || "IATA"}: {formData.icao || airport?.icao || "EDKA"} Active Hub
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-5">
          <div>
            <p className="text-[11px] font-semibold text-gray-400 tracking-wide mb-3">IDENTITY</p>
            <label className="text-xs text-gray-500">Airport Facility Name</label>
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

            <label className="text-xs text-gray-500 mt-3 block">Country / Sovereign Territory</label>
            <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <FiFlag className="text-gray-400 flex-shrink-0" size={15} />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="flex-1 text-sm text-gray-700 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-xs text-gray-500">IATA Short Code</label>
                <input
                  type="text"
                  name="iata"
                  value={formData.iata}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 uppercase focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">ICAO Short Code</label>
                <input
                  type="text"
                  name="icao"
                  value={formData.icao}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 uppercase focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-gray-400 tracking-wide">NAVIGATION</p>
              <button type="button" className="text-[11px] text-blue-600 font-medium">Verify Location on Global Grid</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Latitude</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <FiMapPin className="text-gray-400 flex-shrink-0" size={14} />
                  <input
                    type="text"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Longitude</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <FiMapPin className="text-gray-400 flex-shrink-0" size={14} />
                  <input
                    type="text"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">Operational Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            >
              <option>Fully Operational</option>
              <option>Limited Operations</option>
              <option>Under Maintenance</option>
              <option>Closed</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">Last modified: Aug 18, 2026 by Super Admin</p>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="text-xs font-semibold text-gray-600 px-4 py-2.5 rounded-lg border border-gray-200">
                Cancel
              </button>
              <button type="submit" className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg">
                Save &amp; Apply Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const AirportDirectory = () => {
  const [filters, setFilters] = useState({ query: "", region: "All Regions", facilityType: "" });
  const [airports, setAirports] = useState(initialAirports);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/admin/airports/search?${params}`);
      const data = await response.json();
      if (data?.airports) setAirports(data.airports);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const openEditModal = (airport) => {
    setSelectedAirport(airport);
    setShowModal(true);
  };

  const openAddModal = () => {
    setSelectedAirport(null);
    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Master Data <span className="mx-1">›</span> Global Aviation <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Airport Registry</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">Global Airport Directory</h1>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-full">8,590 Airports</span>
          </div>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit"
        >
          <FiPlus size={16} /> Add New Airport
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-w-xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-[10px] font-semibold text-gray-400 tracking-wide mb-1">TOTAL AIRPORTS</p>
          <span className="text-xl font-bold text-gray-900">8,590</span>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1">
            <FiTrendingUp size={11} /> +12 this month
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-[10px] font-semibold text-gray-400 tracking-wide mb-1">ACTIVE FACILITIES</p>
          <span className="text-xl font-bold text-gray-900">8,412</span>
          <p className="text-[11px] text-gray-400 mt-1">97.9% uptime</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
            <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
            <input
              type="text"
              name="query"
              value={filters.query}
              onChange={handleChange}
              placeholder="Search by name, code, or country..."
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
            <select name="region" value={filters.region} onChange={handleChange} className="outline-none bg-transparent w-full">
              <option>All Regions</option>
              <option>Africa</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
              <option>Middle East</option>
              <option>North America</option>
              <option>South America</option>
            </select>
            <FiChevronDown size={14} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
            <select name="facilityType" value={filters.facilityType} onChange={handleChange} className="outline-none bg-transparent w-full">
              <option value="">Facility Type</option>
              <option>Public Facility</option>
              <option>Private Facility</option>
              <option>Public Military</option>
              <option>International</option>
              <option>Regional</option>
            </select>
            <FiChevronDown size={14} className="text-gray-400" />
          </div>

          <button type="submit" className="flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg">
            <FiFilter size={15} /> Filters
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-900">Airport Registry</p>
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">AIRPORT</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COUNTRY / TERRITORY</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">IATA / ICAO</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COORDINATES</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {airports.map((a) => (
                <tr key={a.code} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <TbPlaneDeparture size={14} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-blue-600">{a.name}</p>
                        <p className="text-xs text-gray-400">{a.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-700">{a.country}</p>
                    <p className="text-xs text-gray-400">{a.region}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">{a.iata}</span>
                    <span className="text-gray-400 text-xs ml-1">/ {a.icao}</span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500">
                    <p>{a.lat}</p>
                    <p>{a.lng}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`flex items-center gap-1.5 w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${
                        a.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${a.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEditModal(a)} className="text-gray-400 hover:text-blue-600">
                        <FiEdit2 size={15} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600">
                        <FiMapPin size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing 9 of 8,590 Airports</p>
          <div className="flex items-center gap-2">
            <button className="border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">Previous</button>
            <button className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg">Next</button>
          </div>
        </div>
      </div>

      {showModal && <AirportFormModal airport={selectedAirport} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AirportDirectory;