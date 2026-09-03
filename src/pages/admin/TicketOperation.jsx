
import { useState } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Grid3x3,
  Plus,
  Download,
  Filter,
  Eye,
  Pencil,
  FileText,
  Image as ImageIcon,
  CreditCard,
  Ticket,
  BedDouble,
  Save,
  Edit2,
  Plane,
  Wallet,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";



const ticketTabs = ["Applied Tickets", "Series Tickets", "Cancel / Withdraw", "Offline Inventory"];
 
const tickets = [
  { initials: "VT", name: "Vivan Travels", sub: "B2B Agent • ID: AG-8842", route: "DXB ⇄ LHR", ref: "VIN1147739", airline: "EK-007", fare: "AED 2,450", extra: "Paid via Wallet", status: "Ticketed" },
  { initials: "JD", name: "John Doe", sub: "Retail • PAX: 2", route: "JFK ⇄ CDG", ref: "JFX992811", airline: "AF-023", fare: "$1,120", extra: "Auth Pending", status: "Processing", action: "Review" },
  { initials: "GT", name: "Global Tours", sub: "B2B Agent • ID: AG-1102", route: "SIN ⇄ SYD", ref: "SXD441029", airline: "SQ-221", fare: "SGD 3,890", extra: "Payment Failed", status: "Action Req.", action: "Resolve" },
  { initials: "AS", name: "Alice Smith", sub: "Retail • PAX: 1", route: "LHR ⇄ JFK", ref: "LJK882910", airline: "BA-112", fare: "GBP 850", extra: "Paid via CC", status: "Ticketed" },
  { initials: "RJ", name: "Rajesh Kumar", sub: "Retail • PAX: 3", route: "DEL ⇄ BOM", ref: "DBM449102", airline: "6E-455", fare: "INR 15,200", extra: "Paid via UPI", status: "Ticketed" },
];

const StatCard = ({ label, value, valueClass = "text-gray-900", dark = false }) => (
  <div
    className={`rounded-xl p-4 border ${
      dark ? "bg-[#0B1E3E] border-transparent" : "bg-white border-gray-200"
    }`}
  >
    <p className={`text-[11px] font-semibold tracking-wide mb-1 ${dark ? "text-gray-300" : "text-gray-400"}`}>
      {label}
    </p>
    <p className={`text-xl font-bold ${dark ? "text-white" : valueClass}`}>{value}</p>
  </div>
);

const Breadcrumb = ({ items, badge }) => (
  <div className="flex items-center gap-2 text-sm">
    {items.map((item, idx) => (
      <React.Fragment key={item}>
        {idx > 0 && <ChevronRight size={13} className="text-gray-300" />}
        <span className={idx === items.length - 1 ? "text-gray-900 font-semibold" : "text-gray-400"}>{item}</span>
      </React.Fragment>
    ))}
    {badge && (
      <span className="ml-2 bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </div>
);
export const TicketOperationsPage = () => {
  const [activeTab, setActiveTab] = useState("Applied Tickets");
  const [selected, setSelected] = useState([]);
 
  const toggleSelect = (ref) => {
    setSelected((prev) => (prev.includes(ref) ? prev.filter((r) => r !== ref) : [...prev, ref]));
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 w-64">
          <Search size={14} className="text-gray-400" />
          <input placeholder="Search PNR, Ticket..." className="text-sm outline-none flex-1" />
        </div>
        <Breadcrumb items={["Operations", "Ticket Management", "Operations Hub"]} />
      </div>
 
      <div className="px-6 py-6">
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket Operations</h1>
            <p className="text-sm text-gray-400 mt-1">Real-time inventory and fulfillment command center.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
            <Plus size={15} /> Issue Offline Ticket
          </button>
        </div>
 
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
          <StatCard label="TOTAL TICKETS" value="138" />
          <StatCard label="PROCESSING" value="14" valueClass="text-blue-600" />
          <StatCard label="PENDING ACTION" value="9" valueClass="text-red-500" />
          <StatCard label="CANCELLATION Q" value="3" />
          <StatCard label="OFFLINE SEATS" value="3" />
        </div>
 
        <div className="flex items-center justify-between border-b border-gray-200 mb-4">
          <div className="flex items-center gap-1">
            {ticketTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-gray-400 pb-2">
            <button className="hover:text-gray-600">
              <Filter size={16} />
            </button>
            <button className="hover:text-gray-600">
              <Download size={16} />
            </button>
          </div>
        </div>
 
        {activeTab === "Applied Tickets" ? (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3">Passenger / Agent</th>
                  <th className="px-4 py-3">Route & Booking</th>
                  <th className="px-4 py-3">Fare</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.ref} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(t.ref)}
                        onChange={() => toggleSelect(t.ref)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-blue-600 text-sm leading-tight">{t.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{t.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="flex items-center gap-1.5 text-gray-800 font-medium">
                        {t.route.split("⇄")[0].trim()} <Plane size={12} className="text-gray-400 rotate-90" /> {t.route.split("⇄")[1].trim()}
                      </p>
                      <p className="text-xs text-blue-500 mt-0.5">
                        {t.ref} <span className="text-gray-400 ml-1">{t.airline}</span>
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{t.fare}</p>
                      <p className="text-xs text-gray-400">{t.extra}</p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-4 py-3">
                      {t.action ? (
                        <button
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                            t.action === "Review" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-500"
                          }`}
                        >
                          {t.action}
                        </button>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-400">
            No data yet for {activeTab}.
          </div>
        )}
      </div>
    </div>
  );
};
 