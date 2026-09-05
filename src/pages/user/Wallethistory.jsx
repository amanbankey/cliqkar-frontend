import React, { useState } from "react";
import Sidebar from "../../components/userComponent/SideBar";
import TopBar from "../../components/userComponent/Topbar";
import {
  FiCreditCard,
  FiPlusCircle,
  FiMinusCircle,
  FiSearch,
  FiChevronDown,
  FiCalendar,
  FiDownload,
  FiPlus,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiRefreshCcw,
  FiCopy,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
} from "react-icons/fi";

const transactions = [
  {
    type: "debit",
    title: "Flight Booking - IndiGo 6E-8502 (JAI → MAA)",
    tags: [{ label: "IndiGo", type: "neutral" }, { label: "Debit", type: "Debit" }],
    meta: "Today, 24 Oct 2025 • 14:22 IST • Pax: Mr. Umesh Taglani",
    ref: "F-6E8502-VT8502478",
    refExtra: "PNR: 6E-JAI99",
    amount: "17,036.29",
    balance: "4,85,250.00",
    actions: ["Receipt", "View Ticket"],
  },
  {
    type: "credit",
    title: "Agency Wallet Recharge - RTGS / Bank Transfer",
    tags: [{ label: "Credit", type: "Credit" }],
    meta: "Yesterday, 23 Oct 2025 • 11:05 IST • Approved by HDFC Settlement Gate",
    ref: "TXN-HDFC-992817260",
    refExtra: "HDFC RTGS",
    amount: "2,00,000.00",
    balance: "5,02,286.29",
    actions: ["Tax Invoice", "UTR Details"],
  },
  {
    type: "debit",
    title: "Flight Booking - Air India AI-995 (BOM → AMD)",
    tags: [{ label: "Business Class", type: "neutral" }, { label: "Debit", type: "Debit" }],
    meta: "22 Oct 2025 • 16:40 IST • Pax: Mr. Sunali Majmudar",
    ref: "F-AI995-VT8038057",
    refExtra: "PNR: AI-VT-441029",
    amount: "23,000.00",
    balance: "3,02,286.29",
    actions: ["Receipt PDF"],
  },
  {
    type: "refund",
    title: "Cancelled Flight Fare Refund - Air India AI-102 (CCU → BOM)",
    tags: [{ label: "Refunded", type: "Refunded" }],
    meta: "21 Oct 2025 • 18:15 IST • Deduction ₹1,500 airline fee reversed to wallet",
    ref: "REF-AI102-VT6104423",
    refExtra: "ARN: REF-992144",
    amount: "9,850.00",
    balance: "3,25,286.29",
    actions: ["Credit Slip"],
  },
  {
    type: "debit",
    title: "Flight Booking - Air India Express IX-196 (DEL → DXB)",
    tags: [{ label: "Seat 4F Legroom + UAE 30D OTB", type: "neutral" }, { label: "Debit", type: "Debit" }],
    meta: "20 Oct 2025 • 09:12 IST • Pax: Mrs. Kavita Patel",
    ref: "F-IX196-VT5530091",
    refExtra: "PNR: IX-DXB-77189",
    amount: "9,743.50",
    balance: "3,15,436.29",
    actions: ["Receipt PDF"],
  },
  {
    type: "debit",
    title: "Consulate Visa Clearance Fee - UAE 30-Day Express E-Visa",
    tags: [{ label: "Visa Approved", type: "Refunded" }, { label: "Debit", type: "Debit" }],
    meta: "19 Oct 2025 • 13:45 IST • Applicant: Kavita Patel",
    ref: "VISA-UAE-2025-7718",
    refExtra: "Visa Gateway",
    amount: "7,250.00",
    balance: "3,25,179.79",
    actions: ["Receipt PDF"],
  },
];

const typeStyle = {
  debit: { icon: FiArrowUpRight, bg: "bg-red-50", color: "text-red-500" },
  credit: { icon: FiArrowDownLeft, bg: "bg-emerald-50", color: "text-emerald-600" },
  refund: { icon: FiRefreshCcw, bg: "bg-emerald-50", color: "text-emerald-600" },
};

const tagStyle = {
  Debit: "bg-red-50 text-red-500",
  Credit: "bg-emerald-50 text-emerald-600",
  Refunded: "bg-emerald-50 text-emerald-600",
  neutral: "bg-gray-100 text-gray-600",
};

const WalletTransactionCard = ({ tx }) => {
  const { icon: Icon, bg, color } = typeStyle[tx.type];
  const isCredit = tx.type !== "debit";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4">
      <span className={`w-10 h-10 rounded-full ${bg} ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon size={16} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm sm:text-base font-bold text-blue-950">{tx.title}</p>
          {tx.tags.map((tag) => (
            <span key={tag.label} className={`text-[10px] font-semibold px-2 py-1 rounded-full ${tagStyle[tag.type] || tagStyle.neutral}`}>
              {tag.label}
            </span>
          ))}
        </div>

        <p className="mt-1 text-xs text-gray-400">{tx.meta}</p>

        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span>
            <span className="font-bold text-gray-700">Ref:</span> {tx.ref}{" "}
            <FiCopy className="inline text-gray-400" size={11} />
          </span>
          {tx.refExtra && <span className="font-semibold text-gray-500">{tx.refExtra}</span>}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0 w-full sm:w-auto">
        <div className="text-right">
          <p className={`text-lg font-bold ${isCredit ? "text-emerald-600" : "text-red-500"}`}>
            {isCredit ? "+" : "-"} ₹ {tx.amount}
          </p>
          <p className="text-[11px] text-gray-400">Bal: ₹{tx.balance}</p>
        </div>
        <div className="flex items-center gap-2">
          {tx.actions.map((action) => (
            <button key={action} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const WalletHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;
  const [filters, setFilters] = useState({ query: "", method: "All Methods: Wallet, NetBanking" });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/user/wallet/search?${params}`);
      await response.json();
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    

        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Wallet History</h1>
                <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-2.5 py-1 rounded-full">(148 Records)</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 max-w-xl">
                Real-time agent credit ledger, automated ticket debit reconciliations, and instant top-up audit
                trail synchronized with fintech gateway.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiCalendar size={14} /> Last 30 Days (01 Oct - 31 Oct 2025) <FiChevronDown size={12} />
              </button>
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiDownload size={14} /> Export Statement <FiChevronDown size={12} />
              </button>
              <button className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiPlus size={14} /> Top Up Wallet
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">CURRENT AVAILABLE BALANCE</p>
                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <FiCreditCard size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">₹ 4,85,250.00</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-600">↑ +₹1,24,500 this week</p>
                <button className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">+ Recharge</button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">TOTAL RECHARGED (CREDITS)</p>
                <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <FiPlusCircle size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">₹ 12,48,000.00</p>
              <p className="mt-2 text-xs text-gray-500">
                <span className="font-semibold text-emerald-600">14 Recharges</span> · via NetBanking/NEFT
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">TOTAL DEBITS (BOOKINGS)</p>
                <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                  <FiMinusCircle size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">₹ 8,42,750.00</p>
              <p className="mt-2 text-xs text-gray-500">
                <span className="font-semibold text-red-500">126 Flight &amp; Visa</span> · auto-debits
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full flex items-center gap-2 text-sm text-gray-400">
              <FiSearch size={15} />
              <input
                type="text"
                name="query"
                value={filters.query}
                onChange={handleFilterChange}
                placeholder="Search transactions..."
                className="flex-1 focus:outline-none text-gray-600"
              />
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">⌘K</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto">
              <FiCreditCard className="text-gray-400" size={15} />
              <select name="method" value={filters.method} onChange={handleFilterChange} className="flex-1 bg-transparent focus:outline-none">
                <option>All Methods: Wallet, NetBanking</option>
                <option>Wallet Only</option>
                <option>NetBanking Only</option>
                <option>RTGS / Bank Transfer</option>
              </select>
              <FiChevronDown className="text-gray-400" size={13} />
            </div>
          </form>

          <div className="space-y-4">
            {transactions.map((tx) => (
              <WalletTransactionCard key={tx.ref} tx={tx} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              Showing 1 to 6 of 148 transactions
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">6 per page</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg"
              >
                <FiChevronLeft size={14} />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                    page === currentPage ? "bg-blue-900 text-white" : "border border-gray-200 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-400 text-xs">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                  currentPage === totalPages ? "bg-blue-900 text-white" : "border border-gray-200 text-gray-600"
                }`}
              >
                {totalPages}
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="bg-[#0B1120] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                <FiLock size={18} />
              </span>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">Cliqkar Escrow &amp; Encrypted FinTech Vault</p>
                <p className="mt-1 text-xs text-gray-400 max-w-lg">
                  All agency wallet deductions are protected by dual-tokenized NDC escrow and daily automated 06:00
                  IST bank reconciliations.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <button className="bg-white text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap">
                Download Monthly Tax Invoice
              </button>
              <button className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap">
                Bank Reconciliation Statement
              </button>
            </div>
          </div>
        </div>
      
  );
};

export default WalletHistory;