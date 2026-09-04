import React, { useState } from "react";
import {
  FiGrid,
  FiPackage,
  FiCheckSquare,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiPlus,
  FiDownload,
  FiAlertTriangle,
  FiSearch,
  FiChevronDown,
  FiFilter,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiCheck,
  FiX,
  FiHome,
} from "react-icons/fi";
import { BsHourglassSplit } from "react-icons/bs";

/*const navItems = [
  { label: "Dashboard", icon: FiGrid },
  { label: "Inventory", icon: FiPackage },
  { label: "OTB Status", icon: FiCheckSquare },
  { label: "Reservations", icon: FiUsers },
  { label: "Analytics", icon: FiBarChart2 },
  { label: "Settings", icon: FiSettings },
];*/

const statCards = [
  { label: "TOTAL", value: 15, icon: FiGrid, iconColor: "text-gray-500", iconBg: "bg-gray-100", valueColor: "text-gray-900", border: "border-l-gray-300" },
  { label: "PENDING", value: 4, icon: BsHourglassSplit, iconColor: "text-blue-500", iconBg: "bg-blue-50", valueColor: "text-blue-600", border: "border-l-blue-400" },
  { label: "APPROVED", value: 8, icon: FiCheckCircle, iconColor: "text-emerald-500", iconBg: "bg-emerald-50", valueColor: "text-emerald-600", border: "border-l-emerald-400" },
  { label: "REJECTED", value: 3, icon: FiXCircle, iconColor: "text-red-500", iconBg: "bg-red-50", valueColor: "text-red-600", border: "border-l-red-400" },
  { label: "TODAY", value: 5, icon: FiCalendar, iconColor: "text-gray-500", iconBg: "bg-gray-100", valueColor: "text-gray-900", border: "border-l-gray-300" },
];

const initialApplications = [
  {
    id: 1,
    initials: "SM",
    applicant: "Sameerbhai M...",
    agent: "Aamir Dingi",
    routeFrom: "IN",
    routeTo: "AE",
    direction: "OUTBOUND",
    pnr: "09J5NH",
    airline: "6E · IndiGo",
    dob: "05 May 1975",
    phone: "+91 9876543210",
    amount: "₹400",
    paid: true,
    status: "Approved",
  },
  {
    id: 2,
    initials: "JD",
    applicant: "John Doe",
    agent: "Aamir Dingi",
    routeFrom: "IN",
    routeTo: "UK",
    direction: "",
    pnr: "X7K9LM",
    airline: "",
    dob: "12 Aug 1988",
    phone: "",
    amount: "400",
    paid: null,
    status: "Pending",
    editing: true,
  },
  {
    id: 3,
    initials: "RP",
    applicant: "Rahul Patel",
    agent: "Global Travels",
    routeFrom: "IN",
    routeTo: "US",
    direction: "OUTBOUND",
    pnr: "B4Y2TR",
    airline: "EK · Emirates",
    dob: "22 Nov 1990",
    phone: "+91 9876543211",
    amount: "₹0",
    paid: false,
    status: "Rejected",
  },
];

const statusPillStyle = {
  Approved: "bg-emerald-50 text-emerald-600",
  Rejected: "bg-red-50 text-red-600",
  Pending: "bg-blue-50 text-blue-600",
};

const AppliedOTB = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState({ query: "", status: "", airline: "", date: "" });

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch("/api/otb/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search),
      });
      const data = await response.json();
      if (data?.applications) setApplications(data.applications);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, [field]: value } : app)));
  };

  const handleStatusChange = (id, value) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: value } : app)));
  };

  const handleSave = async (id) => {
    const app = applications.find((a) => a.id === id);
    try {
      await fetch(`/api/otb/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app),
      });
    } catch (error) {
      console.error("Save failed", error);
    }
    setApplications(applications.map((a) => (a.id === id ? { ...a, editing: false } : a)));
  };

  const handleCancel = (id) => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, editing: false } : a)));
  };

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/*<aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="px-5 py-5">
          <p className="text-xl font-extrabold text-[#0B1120]">Cliqkar</p>
          <p className="text-[10px] font-semibold tracking-widest text-gray-400">OPS CONTROL</p>
        </div>

        <div className="px-4 mb-4">
          <button className="w-full flex items-center justify-center gap-2 bg-[#0B1120] text-white text-sm font-semibold py-2.5 rounded-lg">
            <FiPlus size={15} /> New Application
          </button>
        </div>

        <nav className="flex-1 px-3">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                label === "OTB Status" ? "bg-[#0B1120] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>*/}

      <main className="flex-1 min-w-0 min-h-screen bg-gray-50 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-400 mb-1">
              OPERATIONS <span className="mx-1">›</span> VISA MANAGEMENT <span className="mx-1">›</span>
              <span className="text-[#0B1120] font-bold">APPLIED OTB</span>
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">Applied OTB</h1>
              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">15 Applications</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl">
              <FiDownload size={15} /> Export CSV
            </button>
            <button className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
              <FiPlus size={15} /> New OTB
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
          {statCards.map(({ label, value, icon: Icon, iconColor, iconBg, valueColor, border }) => (
            <div key={label} className={`bg-white border border-gray-200 border-l-4 ${border} rounded-xl p-4 flex items-center justify-between`}>
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-400 mb-1">{label}</p>
                <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
              </div>
              <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={iconColor} size={16} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-amber-500 flex-shrink-0" size={16} />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Priority Attention Required:</span> 2 Applications nearing SLA breach.
            </p>
          </div>
          <button className="text-blue-600 text-sm font-semibold hover:underline">View Priority Queue</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3 mb-4">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                name="query"
                value={search.query}
                onChange={handleSearchChange}
                placeholder="Search Email or PNR..."
                className="w-full text-sm text-gray-700 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-w-[150px]">
              <select
                name="status"
                value={search.status}
                onChange={handleSearchChange}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <FiChevronDown className="text-gray-400 flex-shrink-0" size={14} />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-w-[150px]">
              <select
                name="airline"
                value={search.airline}
                onChange={handleSearchChange}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              >
                <option value="">All Airlines</option>
                <option value="IndiGo">IndiGo</option>
                <option value="Emirates">Emirates</option>
              </select>
              <FiChevronDown className="text-gray-400 flex-shrink-0" size={14} />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-w-[150px]">
              <input
                type="date"
                name="date"
                value={search.date}
                onChange={handleSearchChange}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
            <button
              onClick={handleSearchSubmit}
              className="flex items-center justify-center border border-gray-200 rounded-lg px-3 py-2.5 text-gray-600"
            >
              <FiFilter size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-wrap gap-2">
            <p className="text-sm font-bold text-gray-900">Applied OTB Applications</p>
            <p className="text-xs text-gray-400">Showing 1-15 of 15</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">APPLICANT &amp; AGENT</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ROUTE</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">PNR &amp; AIRLINE</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">APPLICANT INFO</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">AMOUNT</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS &amp; ACTION</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className={`border-b border-gray-100 last:border-0 ${app.editing ? "bg-blue-50/30 border-l-4 border-l-blue-400" : ""}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {app.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{app.applicant}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FiHome size={11} />
                            {app.agent}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {app.routeFrom} <span className="text-gray-400">⇄</span> {app.routeTo}
                      </p>
                      {app.direction && <p className="text-[10px] font-semibold tracking-wide text-gray-400 mt-0.5">{app.direction}</p>}
                    </td>
                    <td className="px-4 py-4">
                      {app.editing ? (
                        <input
                          type="text"
                          value={app.pnr}
                          onChange={(e) => handleFieldChange(app.id, "pnr", e.target.value)}
                          className="border border-blue-400 rounded-md px-2 py-1.5 text-sm text-gray-800 w-28 focus:outline-none"
                        />
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-blue-600">{app.pnr}</p>
                          {app.airline && <p className="text-xs text-gray-500 mt-0.5">{app.airline}</p>}
                        </>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-800">{app.dob}</p>
                      {app.phone && <p className="text-xs text-gray-500">{app.phone}</p>}
                    </td>
                    <td className="px-4 py-4">
                      {app.editing ? (
                        <input
                          type="text"
                          value={app.amount}
                          onChange={(e) => handleFieldChange(app.id, "amount", e.target.value)}
                          className="border border-gray-200 rounded-md px-2 py-1.5 text-sm text-gray-800 w-20 focus:outline-none"
                        />
                      ) : (
                        <>
                          <p className="text-sm font-bold text-gray-900">{app.amount}</p>
                          {app.paid !== null && (
                            <p className={`flex items-center gap-1 text-xs mt-0.5 ${app.paid ? "text-emerald-600" : "text-red-500"}`}>
                              {app.paid ? <FiCheck size={11} /> : <FiX size={11} />}
                              {app.paid ? "Paid" : "Unpaid"}
                            </p>
                          )}
                        </>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {app.editing ? (
                        <div className="flex flex-col gap-2">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleCancel(app.id)}
                              className="text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSave(app.id)}
                              className="text-xs font-semibold text-white bg-blue-600 px-3 py-1.5 rounded-lg"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full w-fit block ${statusPillStyle[app.status]}`}>
                          {app.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppliedOTB;