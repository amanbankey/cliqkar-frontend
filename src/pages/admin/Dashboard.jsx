import React, { useState } from "react";
import { FiSearch, FiCalendar, FiChevronDown, FiBell, FiMenu, FiUsers, FiTrendingUp, FiCreditCard, FiCheckSquare, FiCheck, FiFileText, FiUserPlus, FiSettings, FiHelpCircle } from "react-icons/fi";
import { MdSpeed, MdOutlineConfirmationNumber, MdSupportAgent, MdOutlineLocalOffer } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import Sidebar from "../../components/adminComponent/Sidebar";

const statCards = [
  { icon: FiUsers, iconBg: "bg-blue-50", iconColor: "text-blue-500", growth: "+12%", label: "TOTAL USERS", value: "23" },
  { icon: MdSpeed, iconBg: "bg-purple-50", iconColor: "text-purple-500", growth: "+8%", label: "TOTAL AGENTS", value: "53" },
  { icon: FiCreditCard, iconBg: "bg-pink-50", iconColor: "text-pink-500", growth: "+15%", label: "TOTAL VISAS", value: "153" },
  { icon: MdOutlineConfirmationNumber, iconBg: "bg-orange-50", iconColor: "text-orange-500", growth: "+18%", label: "TOTAL TICKETS", value: "204" },
];

const visaRows = [
  { dotColor: "bg-yellow-400", label: "In Process", value: 32 },
  { dotColor: "bg-blue-500", label: "Add. Doc", value: 0 },
  { dotColor: "bg-red-500", label: "Rejected", value: 0 },
  { dotColor: "bg-emerald-500", label: "Approved", value: 65 },
];

const otbRows = [
  { dotColor: "bg-yellow-400", label: "In Process", value: 0 },
  { dotColor: "bg-blue-500", label: "Add. Doc", value: 0 },
  { dotColor: "bg-red-500", label: "Rejected", value: 4 },
  { dotColor: "bg-emerald-500", label: "Approved", value: 11 },
  { dotColor: "bg-gray-400", label: "On Hold", value: 0 },
];

const ticketStats = [
  { value: "142", label: "ISSUED / CONFIRMED", bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-500", fill: "w-3/4" },
  { value: "28", label: "IN REVIEW", bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-500", fill: "w-1/3" },
  { value: "18", label: "SERIES PNR", bg: "bg-purple-50", text: "text-purple-600", bar: "bg-purple-500", fill: "w-1/4" },
  { value: "12", label: "CANCELLATION", bg: "bg-red-50", text: "text-red-600", bar: "bg-red-500", fill: "w-1/5" },
  { value: "4", label: "OFFLINE", bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-500", fill: "w-1/12" },
];

const performanceData = [
  { day: "Mon", visa: 20, otb: 30, tickets: 10 },
  { day: "Tue", visa: 28, otb: 35, tickets: 12 },
  { day: "Wed", visa: 40, otb: 42, tickets: 14 },
  { day: "Thu", visa: 30, otb: 50, tickets: 20 },
  { day: "Fri", visa: 55, otb: 48, tickets: 24 },
  { day: "Sat", visa: 62, otb: 60, tickets: 30 },
  { day: "Sun", visa: 75, otb: 68, tickets: 34 },
];

const performanceLegend = [
  { label: "Visa", color: "bg-purple-500" },
  { label: "OTB", color: "bg-blue-500" },
  { label: "Tickets", color: "bg-orange-500" },
];

const activities = [
  { icon: FiCheck, iconBg: "bg-emerald-500", id: "TK-2025-000204", time: "JUST NOW", text: "Ticket Issued Successfully" },
  { icon: FiFileText, iconBg: "bg-blue-500", id: "VA-2025-000153", time: "10M AGO", text: "New Visa Application" },
  { icon: FiUserPlus, iconBg: "bg-purple-500", id: "Rahul Sharma", time: "1H AGO", text: "New Agent Registration" },
  { icon: BsWallet2, iconBg: "bg-orange-500", id: "Wallet Recharge", time: "2H AGO", text: "₹50,000 added by Amit" },
];

const agents = [
  { rank: 1, name: "Rahul Sharma", score: 38 },
  { rank: 2, name: "Priya Patel", score: 31 },
  { rank: 3, name: "Amit Verma", score: 22 },
  { rank: 4, name: "Neha Singh", score: 18 },
  { rank: 5, name: "Sandeep Yadav", score: 15 },
];
const maxAgentScore = Math.max(...agents.map((a) => a.score));

const quickActions = [
  { icon: FiUserPlus, label: "Add User" },
  { icon: MdSupportAgent, label: "Add Agent" },
  { icon: BsWallet2, label: "Wallet Recharge" },
  { icon: MdOutlineLocalOffer, label: "OTB Setup" },
  { icon: FiHelpCircle, label: "Support" },
  { icon: FiSettings, label: "Settings" },
];

const dateRanges = ["May 13 - 19, 2025", "May 20 - 26, 2025", "May 27 - Jun 2, 2025"];

const PerformanceTooltip = ({ active }) => {
  if (!active) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs font-medium text-gray-700">
      Chart Data Visualization (May 13-19)
    </div>
  );
};

const Dashboard = ({ setSidebarOpen, sidebarOpen }) => {
  const [search, setSearch] = useState("");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [activeItem, setActiveItem] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div> 
              <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

    <main className="flex-1 min-w-0 overflow-y-auto bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
            <FiMenu size={22} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Welcome back, Admin 👋</h1>
            <p className="text-sm text-gray-500 mt-0.5">Here is the operational overview for Cliqkar today.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[220px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="w-full bg-white border border-gray-200 rounded-full pl-9 pr-16 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1">
              <span className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-1.5 py-0.5 rounded">Ctrl</span>
              <span className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-1.5 py-0.5 rounded">K</span>
            </span>
          </form>

          <div className="relative">
            <button
              onClick={() => setDateRangeOpen(!dateRangeOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
            >
              <FiCalendar size={15} className="text-gray-400" />
              {selectedRange}
              <FiChevronDown size={14} className="text-gray-400" />
            </button>
            {dateRangeOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      setDateRangeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="relative w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-full">
            <FiBell size={16} className="text-gray-600" />
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        {statCards.map(({ icon: Icon, iconBg, iconColor, growth, label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`}>
                <Icon className={`${iconColor} text-base`} />
              </div>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                <FiTrendingUp size={10} />
                {growth}
              </span>
            </div>
            <p className="text-[11px] font-semibold tracking-wide text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}

        <div className="bg-[#0B1120] rounded-2xl p-4 xl:col-span-1 sm:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <BsWallet2 className="text-white text-base" />
            </div>
            <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              <FiTrendingUp size={10} />
              +9%
            </span>
          </div>
          <p className="text-[11px] font-semibold tracking-wide text-gray-400 mb-1">TOTAL WALLET</p>
          <p className="text-2xl font-bold text-white">₹2,45,680</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <FiCreditCard className="text-purple-500 text-base" />
              Visa Overview
            </p>
            <button className="text-blue-500 text-xs font-semibold hover:underline">View All</button>
          </div>
          <div>
            {visaRows.map(({ dotColor, label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <MdOutlineConfirmationNumber className="text-orange-500 text-base" />
              Ticket Operations
            </p>
            <button className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg">Manage</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ticketStats.map(({ value, label, bg, text, bar, fill }) => (
              <div key={label} className={`${bg} rounded-xl p-3 flex flex-col`}>
                <p className={`text-xl font-bold ${text} mb-1`}>{value}</p>
                <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-3">{label}</p>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden mt-auto">
                  <div className={`${bar} ${fill} h-full rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <FiCheckSquare className="text-emerald-500 text-base" />
              OTB Overview
            </p>
            <button className="text-blue-500 text-xs font-semibold hover:underline">View All</button>
          </div>
          <div>
            {otbRows.map(({ dotColor, label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm font-bold text-gray-900">Operational Performance</p>
            <div className="flex items-center gap-3">
              {performanceLegend.map(({ label, color }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip content={<PerformanceTooltip />} />
                <Line type="monotone" dataKey="visa" stroke="#A855F7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="otb" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="tickets" stroke="#F97316" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Recent Activities</p>
          <div className="relative">
            {activities.map(({ icon: Icon, iconBg, id, time, text }, i) => (
              <div key={id + i} className="relative flex gap-3 pb-5 last:pb-0">
                {i !== activities.length - 1 && (
                  <span className="absolute left-3.5 top-8 bottom-0 w-px bg-gray-200" />
                )}
                <div className={`relative z-10 w-7 h-7 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="text-white text-xs" />
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{id}</span>
                    <span className="text-[10px] font-medium text-gray-400">{time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Top Agents</p>
          <div className="flex flex-col gap-4">
            {agents.map(({ rank, name, score }) => (
              <div key={rank} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate mb-1">{name}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(score / maxAgentScore) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 flex-shrink-0">{score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-xl py-4 hover:bg-gray-50 transition-colors"
              >
                <Icon className="text-gray-700 text-lg" />
                <span className="text-xs font-semibold text-gray-700">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
    </div>
  );
};

export default Dashboard;