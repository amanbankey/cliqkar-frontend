import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiPlus,
  FiX,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

const initialTickets = [
  {
    id: "#33902271",
    time: "Today - 10:45 AM",
    initials: "NB",
    avatarBg: "bg-blue-700",
    name: "Nathaniel Brooks",
    email: "n.brooks@example.com",
    category: "Visa Inquiry",
    description: "Awaiting administrative review for expedited p...",
    status: "Pending",
    priority: "High",
    priorityColor: "text-red-500",
  },
  {
    id: "#33902270",
    time: "Today - 10:12 AM",
    initials: "MA",
    avatarBg: "bg-slate-700",
    name: "Marcus Abbott",
    email: "m.abbott@partner.net",
    category: "Wallet Dispute",
    description: "Discrepancy in ledger balance after transacto...",
    status: "Pending",
    priority: "Critical",
    priorityColor: "text-red-600",
  },
  {
    id: "#33902265",
    time: "Today - 09:20 AM",
    initials: "SM",
    avatarBg: "bg-blue-500",
    name: "Sarah Morrison",
    email: "s.morrison@example.com",
    category: "Itinerary Change",
    description: "Requesting flight modification for upcoming s...",
    status: "Pending",
    priority: "Medium",
    priorityColor: "text-amber-500",
  },
];

const lifecycleStages = [
  { key: "Pending", label: "Pending", dot: "bg-amber-500" },
  { key: "In Progress", label: "In Progress", dot: "bg-blue-500" },
  { key: "Resolved", label: "Resolved", dot: "bg-emerald-500" },
  { key: "Escalated", label: "Escalated", dot: "bg-red-500" },
];

const summaryCards = [
  { label: "TOTAL OPEN TICKETS", value: "10" },
  { label: "AVG. FIRST RESPONSE", value: "14", suffix: "mins" },
  { label: "PENDING INQUIRIES", value: "10", accent: true },
  { label: "SLA ADHERENCE", value: "98.4%", green: true },
];

const UpdateTicketModal = ({ ticket, onClose, onSave }) => {
  const [status, setStatus] = useState(ticket.status === "Pending" ? "Pending" : ticket.status);
  const [remarks, setRemarks] = useState("");
  const [notifyUser, setNotifyUser] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/support-tickets/${ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, remarks, notifyUser }),
      });
      if (!response.ok) throw new Error("Failed to update ticket");
      onSave({ ...ticket, status });
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
            <h2 className="text-base font-bold text-blue-700">Update Support Ticket Status</h2>
            <p className="text-xs text-gray-500 mt-1">
              Assign status, log internal resolution notes, and notify the user/agent.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              {ticket.id}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-wide text-gray-400">REQUESTER</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className={`w-8 h-8 rounded-full ${ticket.avatarBg} text-white text-xs font-bold flex items-center justify-center`}>
                  {ticket.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{ticket.name}</p>
                  <p className="text-xs text-gray-500">{ticket.email}</p>
                </div>
              </div>
              <p className="text-[10px] font-bold tracking-wide text-gray-400 mt-3">CREATED</p>
              <p className="text-xs text-gray-600 mt-1">{ticket.time.replace("Today", "Sep 01, 2026")}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wide text-gray-400">CATEGORY</p>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 mt-1.5">
                <FiAlertTriangle size={13} />
                {ticket.category === "Visa Inquiry" ? "Visa Application Status Inquiry" : ticket.category}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-wide text-gray-500 mb-2">TICKET LIFECYCLE STATUS</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {lifecycleStages.map((stage) => (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() => setStatus(stage.key)}
                  className={`flex items-center justify-center gap-1.5 border rounded-lg py-2 text-xs font-semibold transition-colors
                  ${status === stage.key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                  {stage.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] font-bold tracking-wide text-gray-500">INTERNAL RESOLUTION REMARKS</p>
              <p className="text-[10px] text-gray-400">Notes will be logged into the ticket audit trail</p>
            </div>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              placeholder="Document the actions taken, relevant policy clauses, and next steps..."
              className="w-full resize-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={notifyUser}
              onChange={(e) => setNotifyUser(e.target.checked)}
              className="rounded border-gray-300"
            />
            Send automated status update email to applicant
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Assigned Agent: Operations Desk (Super Admin)</p>
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Clear / Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl disabled:opacity-60"
            >
              <FiCheckCircle size={15} />
              {isSaving ? "Saving..." : "Save & Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportHelpdeskQueue = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [activeTicket, setActiveTicket] = useState(null);

  const handleSaveTicket = (updated) => {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setActiveTicket(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Operations <span className="mx-1">›</span> Support <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Helpdesk Tickets</span>
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">Support & Helpdesk Queue</h1>
            <span className="bg-amber-50 text-amber-600 text-[11px] font-bold px-3 py-1 rounded-full">
              10 Pending Tickets
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Manage incoming partner inquiries, ticket escalations, dispute claims, and operational
            resolutions.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap">
          <FiPlus size={16} />
          Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {summaryCards.map(({ label, value, suffix, accent, green }) => (
          <div key={label} className={`bg-white rounded-xl border border-gray-200 p-4 ${accent ? "border-l-4 border-l-amber-400" : ""}`}>
            <p className="text-[10px] font-bold tracking-wide text-gray-400">{label}</p>
            <p className={`text-xl font-bold mt-1 ${green ? "text-emerald-600" : "text-gray-900"}`}>
              {value} {suffix && <span className="text-xs font-medium text-gray-400">{suffix}</span>}
            </p>
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
              placeholder="Search by User Name, Email, or Ticket ID..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-gray-600">
              Priority: All <FiChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-gray-600">
              Status: Pending <FiChevronDown size={13} />
            </button>
            <button className="border border-gray-200 rounded-lg p-2.5 text-gray-500">
              <FiFilter size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">TICKET ID & TIME</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">USER DETAILS</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">CATEGORY & DESCRIPTION</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">STATUS & PRIORITY</th>
                <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-4">
                    <span className="inline-block bg-blue-50 text-blue-600 text-[11px] font-bold px-2 py-0.5 rounded">
                      {ticket.id}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1.5">{ticket.time}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${ticket.avatarBg} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                        {ticket.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{ticket.name}</p>
                        <p className="text-xs text-gray-400">{ticket.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <p className="text-xs font-semibold text-blue-600 uppercase">{ticket.category}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ticket.description}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      <FiClock size={10} />
                      {ticket.status}
                    </span>
                    <p className={`text-[11px] font-semibold mt-1 ${ticket.priorityColor}`}>{ticket.priority}</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setActiveTicket(ticket)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-lg"
                    >
                      <FiEye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeTicket && (
        <UpdateTicketModal
          ticket={activeTicket}
          onClose={() => setActiveTicket(null)}
          onSave={handleSaveTicket}
        />
      )}
    </div>
  );
};

export default SupportHelpdeskQueue;