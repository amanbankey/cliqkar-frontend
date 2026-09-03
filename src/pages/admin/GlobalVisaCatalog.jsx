import React, { useState } from "react";
import {
  FiPlus,
  FiFilter,
  FiX,
  FiClock,
  FiCamera,
  FiUpload,
  FiMoreVertical,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";

const initialVisas = [
  {
    id: 1,
    route: "IN → AE",
    title: "Dubai Visa 30 Days (Single Entry)",
    typeBadge: "E-VISA",
    typeBadgeColor: "bg-gray-100 text-gray-700",
    stay: "30 Days Stay",
    sla: "24-48 Hrs SLA",
    documents: ["Passport", "Photo", "Ticket"],
    adult: "AED 320",
    child: "AED 150",
    security: "AED 0",
    status: "Active",
  },
  {
    id: 2,
    route: "IN → VN",
    title: "Vietnam Tourist 30 Days",
    typeBadge: "E-VISA",
    typeBadgeColor: "bg-gray-100 text-gray-700",
    stay: "30 Days Stay",
    sla: "3-5 Wrk Days",
    documents: ["Passport", "Photo"],
    adult: "USD 25",
    child: "USD 25",
    security: "USD 0",
    status: "Active",
  },
  {
    id: 3,
    route: "IN → AZ",
    title: "Azerbaijan Standard E-Visa",
    typeBadge: "E-VISA",
    typeBadgeColor: "bg-gray-100 text-gray-700",
    stay: "30 Days Stay",
    sla: "3 Wrk Days",
    documents: ["Passport"],
    adult: "USD 26",
    child: "USD 26",
    security: "USD 0",
    status: "Active",
  },
  {
    id: 4,
    route: "IN → AE",
    title: "Dubai Visa 90 Days (Single Entry)",
    typeBadge: "E-VISA",
    typeBadgeColor: "bg-gray-100 text-gray-700",
    stay: "90 Days Stay",
    sla: "24-48 Hrs SLA",
    documents: ["Passport", "Photo", "Ticket"],
    adult: "AED 850",
    child: "AED 450",
    security: "AED 1000",
    status: "Deactive",
  },
  {
    id: 5,
    route: "IN → TH",
    title: "Thailand TR Visa (Single Entry)",
    typeBadge: "STICKER",
    typeBadgeColor: "bg-gray-700 text-white",
    stay: "60 Days Stay",
    sla: "4-5 Wrk Days",
    documents: ["Orig. Passport", "Bank Stmt", "Ticket"],
    adult: "INR 3500",
    child: "INR 3500",
    security: "INR 0",
    status: "Active",
  },
  {
    id: 6,
    route: "IN → SG",
    title: "Singapore Tourist Visa",
    typeBadge: "E-VISA",
    typeBadgeColor: "bg-gray-100 text-gray-700",
    stay: "30 Days Stay",
    sla: "3-5 Wrk Days",
    documents: ["Passport", "Form 14A", "Photo"],
    adult: "SGD 30",
    child: "SGD 30",
    security: "SGD 0",
    status: "Active",
  },
  {
    id: 7,
    route: "IN → MY",
    title: "Malaysia eNTRI Visa",
    typeBadge: "E-VISA",
    typeBadgeColor: "bg-gray-100 text-gray-700",
    stay: "15 Days Stay",
    sla: "48 Hrs SLA",
    documents: ["Passport", "Photo", "Ticket"],
    adult: "INR 2800",
    child: "INR 2800",
    security: "INR 0",
    status: "Active",
  },
];

const documentIcons = {
  Passport: FiUpload,
  "Orig. Passport": FiUpload,
  Photo: FiCamera,
  Ticket: TbPlaneDeparture,
  "Bank Stmt": FiUpload,
  "Form 14A": FiUpload,
};

const GlobalVisaCatalog = () => {
  const [filters, setFilters] = useState({ from: "India", to: "", status: "Active" });
  const [visas] = useState(initialVisas);
  const [openMenu, setOpenMenu] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleMoreFilters = async () => {
    try {
      const response = await fetch("/api/visas/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      await response.json();
    } catch (error) {
      console.error("Filter failed", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Operations <span className="mx-1">›</span> Visa Management <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Visas List</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">Global Visa Catalog</h1>
            <span className="text-gray-500 text-sm">(153 Configured Products)</span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit">
          <FiPlus size={16} /> Add New Visa Route
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Going From</label>
            <div className="flex items-center justify-between gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm text-gray-700">
                <TbPlaneDeparture className="text-gray-400" size={16} />
                {filters.from || "Origin Country"}
              </span>
              {filters.from && (
                <button onClick={() => setFilters({ ...filters, from: "" })} className="text-gray-400 hover:text-gray-600">
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Going To</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <TbPlaneArrival className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                name="to"
                value={filters.to}
                onChange={handleFilterChange}
                placeholder="Destination Country"
                className="w-full text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
          <button
            onClick={handleMoreFilters}
            className="flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <FiFilter size={15} /> More Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">SL</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ROUTE &amp; PRODUCT</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">TYPE / STAY / SLA</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">DOCUMENTS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">PRICING &amp; SECURITY</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {visas.map((visa, i) => (
                <tr key={visa.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4 text-sm text-gray-500">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-500 mb-1">{visa.route}</p>
                    <p className="text-sm font-semibold text-blue-600">{visa.title}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mb-1 ${visa.typeBadgeColor}`}>
                      {visa.typeBadge}
                    </span>
                    <p className="text-sm text-gray-700">{visa.stay}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FiClock size={11} />
                      {visa.sla}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {visa.documents.map((doc) => {
                        const Icon = documentIcons[doc] || FiUpload;
                        return (
                          <span
                            key={doc}
                            className="flex items-center gap-1 border border-gray-200 text-gray-600 text-[11px] px-2 py-1 rounded-md"
                          >
                            <Icon size={11} />
                            {doc}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-600">
                    <div className="flex justify-between gap-4 mb-1">
                      <span>Adult:</span>
                      <span className="font-semibold text-gray-800">{visa.adult}</span>
                    </div>
                    <div className="flex justify-between gap-4 mb-1">
                      <span>Child:</span>
                      <span className="font-semibold text-gray-800">{visa.child}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Security:</span>
                      <span className="font-semibold text-gray-800">{visa.security}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`flex items-center gap-1.5 w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${
                        visa.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${visa.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
                      {visa.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === visa.id ? null : visa.id)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <FiMoreVertical size={18} />
                    </button>
                    {openMenu === visa.id && (
                      <div className="absolute right-4 top-10 z-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                          <FiEye size={13} /> View
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                          <FiTrash2 size={13} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GlobalVisaCatalog;