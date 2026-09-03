import React, { useState } from "react";
import {
  FiPlus,
  FiHome,
  FiPhone,
  FiMail,
  FiMessageSquare,
  FiEye,
  FiEdit2,
  FiFileText,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";
import AgentProfileDrawer from "./AgentProfileDrawer";
import AgentQuickView from "./AgentView";

const initialAgents = [
  {
    id: 1,
    letter: "V",
    name: "Vivan Travels",
    company: "Vivan Travels & Tourism",
    tag: "OPC",
    email: "mail@vivantravels.com",
    phone: "+91 88664 47860",
    pan: "BGTPT8352C",
    compliance: "No Restrictions",
    kycPending: false,
    commercials: [{ label: "Visa/OTB Default" }],
    active: true,
  },
  {
    id: 2,
    letter: "B",
    name: "Huzefa Dhilawala",
    company: "Burhani Holidays",
    tag: "PVT LTD",
    email: "info@bhdestinations.com",
    phone: "+91 84604 34951",
    pan: "BG14256669",
    compliance: "No Restrictions",
    kycPending: false,
    commercials: [{ label: "Visa/OTB Default" }],
    active: true,
  },
  {
    id: 3,
    letter: "G",
    name: "Aamir Dingi",
    company: "Giriraj Tours & Travels",
    tag: "PVT LTD",
    email: "girirajtours.visas2@gma",
    phone: "+91 88664 47860",
    pan: "CDDPD7302D",
    compliance: "No Restrictions",
    kycPending: false,
    commercials: [{ label: "Visa: ₹0", color: "blue" }, { label: "OTB: ₹50", color: "blue" }],
    active: true,
  },
  {
    id: 4,
    letter: "F",
    name: "Jalpesh Panchal",
    company: "Friends Tours and Travels",
    tag: "PRIVATE",
    email: "friendstours43@gmail.com",
    phone: "+91 97378 24727",
    pan: null,
    compliance: "No Restrictions",
    kycPending: true,
    commercials: [{ label: "Child: ₹400" }],
    active: true,
  },
  {
    id: 5,
    letter: "N",
    name: "Rohit Soni",
    company: "Nish Travel and Tours",
    tag: "PARTNERSHIP",
    email: "rohitsoni2203@gmail.com",
    phone: "+91 80580 34311",
    pan: "AAXFN9408L",
    compliance: "No Restrictions",
    kycPending: false,
    commercials: [{ label: "Visa: ₹1000", color: "blue" }, { label: "Child: ₹6400" }],
    active: true,
  },
  {
    id: 6,
    letter: "U",
    name: "Jitendra Agarwal",
    company: "Udaan Tour & Travels",
    tag: "PARTNERSHIP",
    email: "udaan.udaipur@gmail.com",
    phone: "+91 98289 22222",
    pan: "AHHPA7914K",
    compliance: "Blocked: UAE",
    blocked: true,
    kycPending: false,
    commercials: [{ label: "Visa/OTB Default" }, { label: "Child: ₹300" }],
    active: true,
  },
];

const AgentDirectory = () => {
  const [filters, setFilters] = useState({ companyName: "", mobileNumber: "", ownershipType: "", status: "" });
  const [agents, setAgents] = useState(initialAgents);
    const [selectedAgent, setSelectedAgent] = useState(null);   
    const [viewAgent, setViewAgent] = useState(null); 
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/agents/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      if (data?.agents) setAgents(data.agents);
    } catch (error) {
      console.error("Filter failed", error);
    }
  };

  const handleReset = () => {
    setFilters({ companyName: "", mobileNumber: "", ownershipType: "", status: "" });
    setAgents(initialAgents);
  };

  const toggleActive = (id) => {
    setAgents(agents.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  return ( 
    <div className="p-4 sm:p-6 bg-gray-50 overflow-y-auto hide-scrollbar w-full ">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Operations <span className="mx-1">›</span> B2B Partner Network <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Agents Directory</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">Agent Directory</h1>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">53 Registered Partners</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Manage commercial terms, credit lines, agent verification, and daily communication.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit">
          <FiPlus size={16} /> Onboard New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-2">Total B2B Partners</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">53</span>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">Active: 51</span>
            <span className="bg-red-50 text-red-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">Pending KYC: 2</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-2">Total Credit/Wallet Exposure</p>
          <p className="text-2xl font-bold text-gray-900">₹14,82,450</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-2">Commission Disbursed (MTD)</p>
          <p className="text-2xl font-bold text-gray-900">₹1,42,800</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-2">Today's Active Bookings</p>
          <p className="text-2xl font-bold text-gray-900">84 Bookings</p>
        </div>
      </div>

      <form onSubmit={handleApplyFilters} className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Company Name</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <FiHome className="text-gray-400 flex-shrink-0" size={15} />
              <input
                type="text"
                name="companyName"
                value={filters.companyName}
                onChange={handleChange}
                placeholder="Search by name"
                className="w-full text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Mobile Number</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <FiPhone className="text-gray-400 flex-shrink-0" size={15} />
              <input
                type="text"
                name="mobileNumber"
                value={filters.mobileNumber}
                onChange={handleChange}
                placeholder="Search by number"
                className="w-full text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Ownership Type</label>
            <select
              name="ownershipType"
              value={filters.ownershipType}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            >
              <option value="">All Types</option>
              <option value="OPC">OPC</option>
              <option value="PVT LTD">PVT LTD</option>
              <option value="PARTNERSHIP">PARTNERSHIP</option>
              <option value="PRIVATE">PRIVATE</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg">
            Apply Filters
          </button>
          <button type="button" onClick={handleReset} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg">
            Reset
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th colSpan={3} className="text-left text-xs font-semibold text-gray-500 px-4 py-2">AGENT INFO</th>
                <th className="text-left text-xs font-semibold text-blue-600 px-4 py-2 border-l border-gray-100">COMMISSIONS &amp; RESTRICTIONS</th>
                <th colSpan={2} className="text-left text-xs font-semibold text-gray-500 px-4 py-2">MANAGEMENT</th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ENTERPRISE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CONTACT</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COMPLIANCE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 border-l border-gray-100">COMMERCIALS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b border-gray-100 last:border-0 align-top">
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {agent.letter}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{agent.company}</p>
                        <p className="text-xs text-gray-500 mb-1">{agent.name}</p>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">{agent.tag}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1.5">
                      <FiMail size={12} className="text-gray-400" />
                      {agent.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <FiPhone size={12} className="text-gray-400" />
                      {agent.phone}
                      <FiMessageSquare size={13} className="text-emerald-500 ml-1" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {agent.pan && (
                      <div className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-600 mb-2 w-fit">
                        PAN: {agent.pan}
                      </div>
                    )}
                    {agent.kycPending && <p className="text-xs italic text-gray-400 mb-1">Pending KYC</p>}
                    <div
                      className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2 py-1 rounded-full ${
                        agent.blocked ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {agent.blocked ? <FiPhone size={11} /> : <FiCheckCircle size={11} />}
                      {agent.compliance}
                    </div>
                  </td>
                  <td className="px-4 py-4 border-l border-gray-100 bg-blue-50/20">
                    <div className="flex flex-col gap-1.5">
                      {agent.commercials.map((c, idx) => (
                        <span
                          key={idx}
                          className={`w-fit text-xs font-medium px-2 py-1 rounded border ${
                            c.color === "blue" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {c.label}
                        </span>
                      ))}
                      <button  className="text-blue-500 mt-1">
                        <FiEye size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleActive(agent.id)}
                      className={`relative w-11 h-6 rounded-full transition-colors flex items-center ${
                        agent.active ? "bg-emerald-100" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white transition-all ${
                          agent.active ? "left-5" : "left-0.5"
                        }`}
                      >
                        {agent.active && <FiCheckCircle size={11} />}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 text-gray-500">
                      <button  onClick={() => setViewAgent(agent)} className="hover:text-blue-600">
                        <FiEye size={16} />
                      </button>
                      <button onClick={() => setSelectedAgent(agent)} className="hover:text-blue-600">
                        <FiEdit2 size={16} />
                      </button>
                      <button className="hover:text-blue-600">
                        <FiFileText size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing 1-10 of 53 Agents</p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg">‹</button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                  page === 1 ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-400 text-xs">...</span>
            <button className="w-8 h-8 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg">6</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg">›</button>
          </div>
        </div>
      </div>

       {selectedAgent && <AgentProfileDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
        {viewAgent && <AgentQuickView agent={viewAgent} onClose={() => setViewAgent(null)} />}


    </div>
  );
};

export default AgentDirectory;