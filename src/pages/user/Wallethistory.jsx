
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  FiX,
  FiTrendingUp,
  FiRefreshCw,
} from "react-icons/fi";
import {
  getMyWallet,
  initiateWalletRecharge,
} from "../../api/walletApi";

const PAGE_SIZE = 6;

const inr = (value, decimals = 2) =>
  Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

const typeTabs = [
  { key: "all", label: "All" },
  { key: "credit", label: "Credits" },
  { key: "debit", label: "Debits" },
  { key: "refund", label: "Refunds" },
];

const methodOptions = [
  { value: "All", label: "All Methods" },
  { value: "Wallet", label: "Wallet Only" },
  { value: "Easebuzz", label: "Easebuzz / Online" },
  { value: "NetBanking", label: "NetBanking" },
  { value: "Other", label: "Other" },
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

const getPageList = (current, total) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [
    ...new Set([1, total, current - 1, current, current + 1]),
  ]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result = [];

  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) {
      result.push(`gap-${page}`);
    }

    result.push(page);
  });

  return result;
};

const styles = `
@keyframes wl-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.wl-rise {
  animation: wl-rise .45s ease-out both;
}
@media (prefers-reduced-motion: reduce) {
  .wl-rise { animation: none; }
}
`;

function WalletTransactionCard({ tx, index }) {
  const [copied, setCopied] = useState(false);

  const type = typeStyle[tx.type] || typeStyle.credit;
  const Icon = type.icon;

  const copyRef = async () => {
    if (!tx.reference) return;

    try {
      await navigator.clipboard.writeText(tx.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard permission may be unavailable in some browsers.
    }
  };

  const status = String(tx.status || "success").toLowerCase();

  return (
    <div
      className="wl-rise relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${type.accent}`} />

      <div className="flex flex-col gap-4 p-5 pl-6 sm:flex-row sm:items-start">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${type.tile}`}
        >
          <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-blue-950 sm:text-base">
              {tx.title || "Wallet Transaction"}
            </p>

            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : status === "pending" || status === "processing"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-600"
              }`}
            >
              {status}
            </span>

            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                tx.type === "debit"
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {tx.type || "credit"}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            {formatDate(tx.createdAt)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={copyRef}
              disabled={!tx.reference}
              className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-gray-500 hover:bg-slate-100 disabled:cursor-not-allowed"
            >
              <span className="font-bold text-gray-700">Ref:</span>
              {tx.reference || "Not available"}

              {copied ? (
                <span className="flex items-center gap-1 text-emerald-600">
                  <FiCheck size={11} />
                  Copied
                </span>
              ) : (
                <FiCopy size={11} />
              )}
            </button>

            {tx.service && (
              <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-gray-500">
                {String(tx.service).replace(/_/g, " ")}
              </span>
            )}

            {tx.method && (
              <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-gray-500">
                {tx.method}
              </span>
            )}
          </div>

          {tx.description && (
            <p className="mt-2 text-xs text-gray-500">
              {tx.description}
            </p>
          )}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:items-end">
          <div className="sm:text-right">
            <p
              className={`text-xl font-bold tabular-nums ${
                tx.type === "debit"
                  ? "text-red-500"
                  : "text-emerald-600"
              }`}
            >
              {tx.type === "debit" ? "-" : "+"} ₹{inr(tx.amount)}
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              Balance after: ₹{inr(tx.balanceAfter)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WalletHistory() {
  const [wallet, setWallet] = useState({
    data: [],
    currentBalance: 0,
    totalCredit: 0,
    totalDebit: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [method, setMethod] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState("");
  const [recharging, setRecharging] = useState(false);

  const searchRef = useRef(null);

  const loadWallet = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const result = await getMyWallet();

      if (!result || !Array.isArray(result.data)) {
        throw new Error("Unexpected wallet API response.");
      }

      setWallet({
        data: result.data,
        currentBalance: Number(result.currentBalance || 0),
        totalCredit: Number(result.totalCredit || 0),
        totalDebit: Number(result.totalDebit || 0),
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Unable to load wallet history."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return wallet.data.filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) {
        return false;
      }

      if (method !== "All") {
        const transactionMethod = String(tx.method || "").toLowerCase();
        const selectedMethod = method.toLowerCase();

        if (
          selectedMethod === "other"
            ? ["wallet", "easebuzz", "netbanking"].includes(
                transactionMethod
              )
            : selectedMethod === "easebuzz"
              ? !["easebuzz", "online"].some((item) =>
                  transactionMethod.includes(item)
                )
              : !transactionMethod.includes(selectedMethod)
        ) {
          return false;
        }
      }

      if (!q) return true;

      return [
        tx.title,
        tx.reference,
        tx.method,
        tx.service,
        tx.status,
        tx.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [wallet.data, query, typeFilter, method]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const pageTransactions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, typeFilter, method]);

  const weeklyCredits = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return wallet.data
      .filter(
        (tx) =>
          ["credit", "refund"].includes(tx.type) &&
          String(tx.status || "success").toLowerCase() === "success" &&
          new Date(tx.createdAt).getTime() >= sevenDaysAgo
      )
      .reduce((total, tx) => total + Number(tx.amount || 0), 0);
  }, [wallet.data]);

  const rechargeCount = wallet.data.filter(
    (tx) =>
      tx.service === "wallet_recharge" &&
      String(tx.status || "success").toLowerCase() === "success"
  ).length;

  const debitCount = wallet.data.filter(
    (tx) =>
      tx.type === "debit" &&
      String(tx.status || "success").toLowerCase() === "success"
  ).length;

  const usedPercent =
    wallet.totalCredit > 0
      ? Math.min(
          100,
          Math.round((wallet.totalDebit / wallet.totalCredit) * 100)
        )
      : 0;

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setMethod("All");
    setCurrentPage(1);
  };

  const recharge = async (event) => {
    event.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value < 1 || value > 500000) {
      setError("Recharge amount must be between ₹1 and ₹5,00,000.");
      return;
    }

    try {
      setRecharging(true);
      setError("");

      const result = await initiateWalletRecharge(value);

      if (!result?.success || !result?.accessKey || !result?.paymentUrl) {
        throw new Error(
          result?.message || "Could not start payment."
        );
      }

      window.location.assign(
        `${result.paymentUrl}${result.accessKey}`
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Unable to start recharge."
      );
      setRecharging(false);
    }
  };

  const exportStatement = () => {
    const headers = [
      "Date",
      "Title",
      "Type",
      "Method",
      "Service",
      "Reference",
      "Status",
      "Amount",
      "Balance After",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filtered.map((tx) => [
      formatDate(tx.createdAt),
      tx.title,
      tx.type,
      tx.method,
      tx.service,
      tx.reference,
      tx.status,
      tx.amount,
      tx.balanceAfter,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "wallet-statement.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 bg-slate-50 p-4 sm:p-6">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="wl-rise flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Wallet History
            </h1>

            <span className="rounded-full bg-[#0B1120] px-3 py-1 text-sm font-semibold text-white">
              {wallet.data.length} Records
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Track your wallet balance, recharges, flight bookings,
            visa payments and other transactions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadWallet(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            <FiRefreshCw
              className={refreshing ? "animate-spin" : ""}
              size={14}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={exportStatement}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <FiDownload size={14} />
            Export Statement
          </button>

          <button
            type="button"
            onClick={() => {
              setError("");
              setShowRecharge(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-md"
          >
            <FiPlus size={14} />
            Top Up Wallet
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <FiX size={17} />
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div
          className="wl-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 text-white shadow-xl"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-blue-600/25 blur-3xl" />

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
              ₹ {inr(wallet.currentBalance)}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                <FiTrendingUp size={12} />
                +₹{inr(weeklyCredits, 0)} this week
              </p>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setShowRecharge(true);
                }}
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-900"
              >
                <FiPlus size={12} />
                Recharge
              </button>
            </div>
          </div>
        </div>

        <div
          className="wl-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiPlusCircle size={16} />
            </span>

            <p className="text-sm font-medium text-gray-500">
              Total Credits / Recharges
            </p>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900">
            ₹ {inr(wallet.totalCredit)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            <span className="font-semibold text-emerald-600">
              {rechargeCount} Recharges
            </span>
            {" "}· Successful credits
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <span className="block h-full w-full rounded-full bg-emerald-500" />
          </div>
        </div>

        <div
          className="wl-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.24s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <FiMinusCircle size={16} />
            </span>

            <p className="text-sm font-medium text-gray-500">
              Total Wallet Payments
            </p>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900">
            ₹ {inr(wallet.totalDebit)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            <span className="font-semibold text-red-500">
              {debitCount} Payments
            </span>
            {" "}· {usedPercent}% of credits used
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <span
              className="block h-full rounded-full bg-red-400 transition-all"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <form
        onSubmit={(event) => event.preventDefault()}
        className="wl-rise flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm xl:flex-row xl:items-center"
      >
        <div className="group flex flex-1 items-center gap-3 rounded-xl border border-transparent px-3 py-2 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
          <FiSearch
            size={16}
            className="shrink-0 text-gray-400"
          />

          <input
            ref={searchRef}
            type="text"
            name="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, reference or service..."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />

          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-700"
            >
              <FiX size={15} />
            </button>
          ) : (
            <span className="hidden rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500 sm:block">
              Ctrl K
            </span>
          )}
        </div>

        <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700">
          <FiCreditCard className="shrink-0 text-gray-400" size={15} />

          <select
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 outline-none"
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

        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {typeTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setTypeFilter(tab.key)}
              className={`flex-1 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all xl:flex-none ${
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

      {/* TRANSACTION LIST */}
      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-14 text-center text-sm text-gray-500">
          Loading wallet history...
        </div>
      ) : pageTransactions.length > 0 ? (
        <div className="space-y-4">
          {pageTransactions.map((tx, index) => (
            <WalletTransactionCard
              key={tx._id || tx.reference || `${tx.createdAt}-${index}`}
              tx={tx}
              index={index}
            />
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
            Wallet recharges and payments will appear here.
          </p>

          {(query || typeFilter !== "all" || method !== "All") && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-950 px-5 py-2 text-sm font-medium text-white"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && filtered.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-gray-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} transactions

            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
              {PAGE_SIZE} per page
            </span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 disabled:opacity-40"
            >
              <FiChevronLeft size={15} />
            </button>

            {getPageList(currentPage, totalPages).map((page) =>
              typeof page === "string" ? (
                <span
                  key={page}
                  className="px-1 text-xs text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-xl text-xs font-semibold ${
                    page === currentPage
                      ? "bg-blue-950 text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 disabled:opacity-40"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* RECHARGE MODAL */}
      {showRecharge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-recharge-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="wallet-recharge-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Recharge Wallet
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pay securely using Easebuzz.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRecharge(false)}
                disabled={recharging}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                aria-label="Close recharge dialog"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={recharge} className="mt-5 space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                Recharge amount (INR)

                <input
                  type="number"
                  min="1"
                  max="500000"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Enter amount"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </label>

              <p className="text-xs text-slate-500">
                Your wallet balance will update only after the
                backend verifies a successful payment.
              </p>

              <button
                type="submit"
                disabled={recharging}
                className="w-full rounded-xl bg-blue-950 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {recharging
                  ? "Redirecting to payment..."
                  : "Continue to Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
