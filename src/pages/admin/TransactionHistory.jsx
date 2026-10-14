
import React, { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  Search,
  Grid3x3,
  Plus,
  RefreshCw,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { TopBarActions } from "../../components/adminComponent/TopBarActions";
import { Breadcrumb } from "../../components/adminComponent/BreadCrumb";
import { StatCard } from "../../components/adminComponent/StatCard";
import { getAdminWalletTransactions } from "../../api/walletApi";

const inr = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

const FilterBar = ({ children }) => (
  <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
    {children}
  </div>
);

export const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    credits: 0,
    debits: 0,
  });

  const [query, setQuery] = useState("");
  const [reference, setReference] = useState("");
  const [type, setType] = useState("all");
  const [method, setMethod] = useState("all");
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminWalletTransactions({
        q: [query.trim(), reference.trim()].filter(Boolean).join(" "),
        type,
        method,
        status,
        page: 1,
        limit: 200,
      });

      const rows = Array.isArray(result?.data) ? result.data : [];

      setTransactions(rows);

      const totals = Array.isArray(result?.totals)
        ? result.totals
        : [];

      setSummary({
        total: Number(result?.total ?? rows.length),
        credits: totals
          .filter((item) =>
            ["credit", "refund"].includes(item._id)
          )
          .reduce((sum, item) => sum + Number(item.amount || 0), 0),
        debits: totals
          .filter((item) => item._id === "debit")
          .reduce((sum, item) => sum + Number(item.amount || 0), 0),
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Transactions load nahi ho sakin. Admin login aur API check karein."
      );
      setTransactions([]);
      setSummary({ total: 0, credits: 0, debits: 0 });
    } finally {
      setLoading(false);
    }
  }, [query, reference, type, method, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTransactions();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadTransactions]);

  const filteredTransactions = transactions.filter((tx) => {
    const searchText = [
      tx.reference,
      tx.gatewayTransactionId,
      tx._id,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return !reference.trim() ||
      searchText.includes(reference.trim().toLowerCase());
  });

  return (
    <div className="min-h-full w-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-gray-200 bg-white px-6 py-4 sm:flex-row sm:items-center">
        <Breadcrumb
          items={[
            "Finance",
            "Wallets & Ledgers",
            "Transaction History",
          ]}
          badge={`${summary.total} Records`}
        />

        <TopBarActions>
          <button
            type="button"
            onClick={loadTransactions}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-[#0B1E3E] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            title="Dashboard view"
            className="text-gray-400 hover:text-gray-600"
          >
            <Grid3x3 size={18} />
          </button>
        </TopBarActions>
      </div>

      <div className="px-6 py-6">
        {/* Summary cards */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="TOTAL TRANSACTIONS"
            value={String(summary.total)}
          />

          <StatCard
            label="TOTAL CREDITS"
            value={`₹${inr(summary.credits)}`}
            valueClass="text-emerald-600"
          />

          <StatCard
            label="TOTAL DEBITS"
            value={`₹${inr(summary.debits)}`}
            valueClass="text-red-500"
          />

          <StatCard
            label="ACTIVE BALANCE"
            value="—"
            dark
          />
        </div>

        <p className="mb-4 text-xs text-gray-500">
          Active Balance tab tak available nahi hai jab tak backend
          aggregate wallet balances return na kare.
        </p>

        {/* Filters */}
        <FilterBar>
          <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search user or agent..."
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="flex min-w-[160px] flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <input
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Transaction ID / PNR"
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-600 outline-none"
            >
              <option value="all">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="refund">Refund</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-600 outline-none"
            >
              <option value="all">All Channels</option>
              <option value="Wallet">Wallet</option>
              <option value="Easebuzz">Easebuzz</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-600 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </FilterBar>

        {/* API errors */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Transactions table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-4">
            <Wallet size={18} className="text-gray-500" />
            <h2 className="font-semibold text-gray-900">
              All Transactions
            </h2>

            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {filteredTransactions.length} loaded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-[11px] font-semibold tracking-wide text-gray-400">
                  <th className="px-4 py-3">Transaction</th>
                  <th className="px-4 py-3">User / Agent</th>
                  <th className="px-4 py-3">Reference & Purpose</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Balance</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      Loading transactions...
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => {
                    const isCredit =
                      tx.type === "credit" || tx.type === "refund";

                    return (
                      <tr
                        key={tx._id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">
                            #{String(tx._id || "").slice(-8)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(tx.createdAt)}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">
                            {tx.userName || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {tx.userEmail || "—"}
                          </p>
                          <span className="text-xs capitalize text-gray-500">
                            {tx.role || "user"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">
                              {tx.reference ||
                                tx.gatewayTransactionId ||
                                "—"}
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                              {tx.title || tx.service || "Transaction"}
                            </span>
                          </div>
                          <p className="mt-1 text-xs capitalize text-gray-400">
                            {String(tx.service || "other").replaceAll("_", " ")}
                          </p>
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {tx.method || "—"}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              tx.status === "success"
                                ? "bg-emerald-50 text-emerald-700"
                                : ["pending", "processing"].includes(tx.status)
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-red-50 text-red-600"
                            }`}
                          >
                            {tx.status || "unknown"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <p
                            className={`font-semibold ${
                              isCredit
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                          >
                            {isCredit ? "+" : "-"}₹{inr(tx.amount)}
                          </p>
                          <p
                            className={`flex items-center gap-1 text-xs ${
                              isCredit
                                ? "text-emerald-500"
                                : "text-red-400"
                            }`}
                          >
                            {isCredit ? (
                              <ArrowDownRight size={11} />
                            ) : (
                              <ArrowUpRight size={11} />
                            )}
                            {isCredit ? "Credit" : "Debit"}
                          </p>
                        </td>

                        <td className="px-4 py-3 font-medium text-gray-800">
                          {tx.balanceAfter != null
                            ? `₹${inr(tx.balanceAfter)}`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
