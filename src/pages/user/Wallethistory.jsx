import React, { useEffect, useMemo, useRef, useState } from "react";
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
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
  FiX,
  FiTrendingUp,
} from "react-icons/fi";

/* =====================================================
   DATA
===================================================== */

const transactions = [
  {
    type: "debit",
    method: "Wallet",
    title: "Flight Booking - IndiGo 6E-8502 (JAI → MAA)",
    tags: [
      { label: "IndiGo", type: "neutral" },
      { label: "Debit", type: "Debit" },
    ],
    meta: "Today, 24 Oct 2025 • 14:22 IST • Pax: Mr. Umesh Taglani",
    ref: "F-6E8502-VT8502478",
    refExtra: "PNR: 6E-JAI99",
    amount: "17,036.29",
    balance: "4,85,250.00",
    actions: ["Receipt", "View Ticket"],
  },
  {
    type: "credit",
    method: "RTGS / Bank Transfer",
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
    method: "Wallet",
    title: "Flight Booking - Air India AI-995 (BOM → AMD)",
    tags: [
      { label: "Business Class", type: "neutral" },
      { label: "Debit", type: "Debit" },
    ],
    meta: "22 Oct 2025 • 16:40 IST • Pax: Mr. Sunali Majmudar",
    ref: "F-AI995-VT8038057",
    refExtra: "PNR: AI-VT-441029",
    amount: "23,000.00",
    balance: "3,02,286.29",
    actions: ["Receipt PDF"],
  },
  {
    type: "refund",
    method: "Wallet",
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
    method: "Wallet",
    title: "Flight Booking - Air India Express IX-196 (DEL → DXB)",
    tags: [
      { label: "Seat 4F Legroom + UAE 30D OTB", type: "neutral" },
      { label: "Debit", type: "Debit" },
    ],
    meta: "20 Oct 2025 • 09:12 IST • Pax: Mrs. Kavita Patel",
    ref: "F-IX196-VT5530091",
    refExtra: "PNR: IX-DXB-77189",
    amount: "9,743.50",
    balance: "3,15,436.29",
    actions: ["Receipt PDF"],
  },
  {
    type: "debit",
    method: "Wallet",
    title: "Consulate Visa Clearance Fee - UAE 30-Day Express E-Visa",
    tags: [
      { label: "Visa Approved", type: "Refunded" },
      { label: "Debit", type: "Debit" },
    ],
    meta: "19 Oct 2025 • 13:45 IST • Applicant: Kavita Patel",
    ref: "VISA-UAE-2025-7718",
    refExtra: "Visa Gateway",
    amount: "7,250.00",
    balance: "3,25,179.79",
    actions: ["Receipt PDF"],
  },
];

/* Summary numbers (sample data) */
const summary = {
  balance: 485250,
  weekGain: 124500,
  recharged: 1248000,
  rechargeCount: 14,
  debits: 842750,
  debitCount: 126,
};

const inr = (value, decimals = 2) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

const usedPercent = Math.round((summary.debits / summary.recharged) * 100);

const typeTabs = [
  { key: "all", label: "All" },
  { key: "credit", label: "Credits" },
  { key: "debit", label: "Debits" },
  { key: "refund", label: "Refunds" },
];

const methodOptions = [
  { value: "All", label: "All Methods" },
  { value: "Wallet", label: "Wallet Only" },
  { value: "NetBanking", label: "NetBanking Only" },
  { value: "RTGS / Bank Transfer", label: "RTGS / Bank Transfer" },
];

const typeStyle = {
  debit: {
    icon: FiArrowUpRight,
    tile: "bg-red-50 text-red-500 ring-red-100",
    accent: "bg-red-400",
    amount: "text-red-500",
    sign: "-",
  },
  credit: {
    icon: FiArrowDownLeft,
    tile: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    accent: "bg-emerald-500",
    amount: "text-emerald-600",
    sign: "+",
  },
  refund: {
    icon: FiRefreshCcw,
    tile: "bg-sky-50 text-sky-600 ring-sky-100",
    accent: "bg-sky-400",
    amount: "text-emerald-600",
    sign: "+",
  },
};

const tagStyle = {
  Debit: "bg-red-50 text-red-600 ring-red-100",
  Credit: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Refunded: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  neutral: "bg-gray-100 text-gray-600 ring-gray-200",
};

/* Page numbers with ellipses (1 ... 4 5 6 ... 25) */
const getPageList = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const list = [
    ...new Set([1, total, current - 1, current, current + 1]),
  ]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const out = [];
  list.forEach((p, i) => {
    if (i > 0 && p - list[i - 1] > 1) out.push(`gap-${p}`);
    out.push(p);
  });
  return out;
};

/* =====================================================
   STYLES (page load par ek orchestrated sequence)
===================================================== */

const styles = `
@keyframes wl-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes wl-ping {
  0%   { transform: scale(1);   opacity: .55; }
  100% { transform: scale(2.1); opacity: 0; }
}
.wl-rise { animation: wl-rise .6s cubic-bezier(.22,1,.36,1) backwards; }
.wl-ping { animation: wl-ping 2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .wl-rise, .wl-ping { animation: none !important; }
}
`;

/* =====================================================
   TRANSACTION CARD
===================================================== */

const WalletTransactionCard = ({ tx, index }) => {
  const [copied, setCopied] = useState(false);

  const { icon: Icon, tile, accent, amount, sign } = typeStyle[tx.type];

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(tx.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className="wl-rise relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
      style={{ animationDelay: `${0.3 + index * 0.06}s` }}
    >
      {/* type accent */}
      <span className={`absolute inset-y-0 left-0 w-1 ${accent}`} />

      <div className="flex flex-col gap-4 p-5 pl-6 sm:flex-row sm:items-start">
        <span
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${tile}`}
        >
          <Icon size={18} />
        </span>

        {/* details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-blue-950 sm:text-base">
              {tx.title}
            </p>

            {tx.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                  tagStyle[tag.type] || tagStyle.neutral
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <p className="mt-1 text-xs text-gray-400">{tx.meta}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={copyRef}
              aria-label={`Copy reference ${tx.ref}`}
              className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-slate-100 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900/30"
            >
              <span className="font-bold text-gray-700">Ref:</span> {tx.ref}
              {copied ? (
                <span className="flex items-center gap-0.5 font-medium text-emerald-600">
                  <FiCheck size={11} />
                  Copied
                </span>
              ) : (
                <FiCopy size={11} className="text-gray-400" />
              )}
            </button>

            {tx.refExtra && (
              <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-gray-500">
                {tx.refExtra}
              </span>
            )}
          </div>
        </div>

        {/* amount + actions */}
        <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <div className="sm:text-right">
            <p className={`text-xl font-bold tabular-nums ${amount}`}>
              {sign} ₹ {tx.amount}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-400 tabular-nums">
              Balance after: ₹{tx.balance}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {tx.actions.map((action) => (
              <button
                key={action}
                type="button"
                className="whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   PAGE
===================================================== */

const WalletHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [method, setMethod] = useState("All");
  const [ready, setReady] = useState(false);
  const searchRef = useRef(null);

  const totalPages = 25;

  const isMac =
    typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

  // usage bars ko load ke baad fill karna
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Ctrl / Cmd + K se search focus
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return transactions.filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) return false;
      if (method !== "All" && tx.method !== method) return false;
      if (!q) return true;

      return [
        tx.title,
        tx.meta,
        tx.ref,
        tx.refExtra,
        ...tx.tags.map((t) => t.label),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, typeFilter, method]);

  const isFiltering =
    query.trim() !== "" || typeFilter !== "all" || method !== "All";

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setMethod("All");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search live filter hota hai. Backend search jodna ho to yahan API call karna.
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{styles}</style>

      {/* ---------- HEADER ---------- */}
      <div className="wl-rise flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Wallet History
            </h1>

            <span className="rounded-full bg-[#0B1120] px-3 py-1 text-sm font-semibold tabular-nums text-white">
              148 Records
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Real-time agent credit ledger, automated ticket debit
            reconciliations, and instant top-up audit trail synchronized with
            fintech gateway.
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15"
          >
            <FiCalendar size={14} /> Last 30 Days (01 Oct - 31 Oct 2025)
            <FiChevronDown size={12} />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15"
          >
            <FiDownload size={14} /> Export Statement
            <FiChevronDown size={12} />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/20"
          >
            <FiPlus size={14} /> Top Up Wallet
          </button>
        </div>
      </div>

      {/* ---------- SUMMARY ---------- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* balance (dark) */}
        <div
          className="wl-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 text-white shadow-xl shadow-slate-900/15"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-blue-600/25 blur-3xl" />

          {/* decorative arcs */}
          <svg
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-14 h-56 w-56 text-white/10"
          >
            <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-200 ring-1 ring-white/15">
                <FiCreditCard size={16} />
              </span>
              <p className="text-sm font-medium text-slate-300">
                Current Available Balance
              </p>
            </div>

            <p className="mt-4 text-3xl font-bold tabular-nums">
              ₹ {inr(summary.balance)}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                <FiTrendingUp size={12} />+₹{inr(summary.weekGain, 0)} this week
              </p>

              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                <FiPlus size={12} /> Recharge
              </button>
            </div>
          </div>
        </div>

        {/* recharged */}
        <div
          className="wl-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiPlusCircle size={16} />
            </span>
            <p className="text-sm font-medium text-gray-500">
              Total Recharged (Credits)
            </p>
          </div>

          <p className="mt-4 text-2xl font-bold tabular-nums text-gray-900">
            ₹ {inr(summary.recharged)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            <span className="font-semibold text-emerald-600">
              {summary.rechargeCount} Recharges
            </span>{" "}
            · via NetBanking/NEFT
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <span
              className="block h-full rounded-full bg-emerald-500"
              style={{
                width: ready ? "100%" : "0%",
                transition: "width 1.1s cubic-bezier(.22,1,.36,1)",
              }}
            />
          </div>
        </div>

        {/* debits */}
        <div
          className="wl-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.24s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <FiMinusCircle size={16} />
            </span>
            <p className="text-sm font-medium text-gray-500">
              Total Debits (Bookings)
            </p>
          </div>

          <p className="mt-4 text-2xl font-bold tabular-nums text-gray-900">
            ₹ {inr(summary.debits)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            <span className="font-semibold text-red-500">
              {summary.debitCount} Flight &amp; Visa
            </span>{" "}
            · auto-debits · {usedPercent}% of credits used
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <span
              className="block h-full rounded-full bg-red-400"
              style={{
                width: ready ? `${usedPercent}%` : "0%",
                transition: "width 1.1s cubic-bezier(.22,1,.36,1) .1s",
              }}
            />
          </div>
        </div>
      </div>

      {/* ---------- SEARCH + FILTER ---------- */}
      <form
        onSubmit={handleSearch}
        className="wl-rise flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm xl:flex-row xl:items-center"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="group flex flex-1 items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
          <FiSearch
            size={16}
            className="flex-shrink-0 text-gray-400 transition-colors group-focus-within:text-blue-900"
          />

          <input
            ref={searchRef}
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, reference, PNR or passenger..."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />

          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-700"
              aria-label="Clear search"
            >
              <FiX size={15} />
            </button>
          ) : (
            <span className="hidden flex-shrink-0 rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500 sm:block">
              {isMac ? "⌘K" : "Ctrl K"}
            </span>
          )}
        </div>

        {/* method */}
        <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
          <FiCreditCard className="flex-shrink-0 text-gray-400" size={15} />

          <select
            name="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 focus:outline-none"
          >
            {methodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <FiChevronDown
            className="pointer-events-none absolute right-3 text-gray-400"
            size={13}
          />
        </div>

        {/* type tabs */}
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {typeTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setTypeFilter(tab.key)}
              className={`flex-1 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 xl:flex-none ${
                typeFilter === tab.key
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </form>

      {/* ---------- TRANSACTIONS ---------- */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((tx, index) => (
            <WalletTransactionCard key={tx.ref} tx={tx} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
            <FiSearch size={20} />
          </span>

          <p className="mt-4 text-base font-semibold text-gray-900">
            No transactions found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try a different reference, PNR or payment method.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-5 py-2 text-sm font-medium text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ---------- PAGINATION ---------- */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          {isFiltering
            ? `${filtered.length} matching ${
                filtered.length === 1 ? "transaction" : "transactions"
              }`
            : "Showing 1 to 6 of 148 transactions"}

          {!isFiltering && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
              6 per page
            </span>
          )}
        </p>

        {!isFiltering && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            >
              <FiChevronLeft size={15} />
            </button>

            {getPageList(currentPage, totalPages).map((page) =>
              typeof page === "string" ? (
                <span key={page} className="px-1 text-xs text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    page === currentPage
                      ? "bg-gradient-to-br from-blue-800 to-[#0B1120] text-white shadow-md shadow-blue-900/25"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* ---------- VAULT BANNER ---------- 
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 shadow-xl shadow-slate-900/15 sm:p-6">
        <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
              <span className="wl-ping absolute inset-0 rounded-2xl ring-1 ring-sky-300/50" />
              <FiLock size={20} />
            </span>

            <div>
              <p className="text-sm font-bold text-white sm:text-base">
                Cliqkar Escrow &amp; Encrypted FinTech Vault
              </p>

              <p className="mt-1 max-w-lg text-xs text-slate-400">
                All agency wallet deductions are protected by dual-tokenized NDC
                escrow and daily automated 06:00 IST bank reconciliations.
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              className="whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-gray-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Download Monthly Tax Invoice
            </button>

            <button
              type="button"
              className="whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
            >
              Bank Reconciliation Statement
            </button>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default WalletHistory;