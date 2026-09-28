import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiCreditCard,
  FiPlusCircle,
  FiMinusCircle,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiRefreshCcw,
} from "react-icons/fi";

import { getMyAgentWallet } from "../../api/agentApi";
import {
  agentPageStyles,
  PageHeader,
  StatCard,
  SearchBar,
  LoadingSkeleton,
  ErrorState,
  EmptyState,
  inr,
} from "./agentPageHelpers";

const typeStyle = {
  debit: { icon: FiArrowUpRight, tile: "bg-red-50 text-red-500 ring-red-100", amount: "text-red-500", sign: "-" },
  credit: { icon: FiArrowDownLeft, tile: "bg-emerald-50 text-emerald-600 ring-emerald-100", amount: "text-emerald-600", sign: "+" },
  refund: { icon: FiRefreshCcw, tile: "bg-sky-50 text-sky-600 ring-sky-100", amount: "text-emerald-600", sign: "+" },
};

const TransactionRow = ({ tx, index }) => {
  const cfg = typeStyle[tx.type] || typeStyle.debit;
  const Icon = cfg.icon;

  return (
    <div
      className="agp-rise flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      style={{ animationDelay: `${0.15 + index * 0.06}s` }}
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${cfg.tile}`}>
          <Icon size={16} />
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{tx.title}</p>
          <p className="text-xs text-gray-400">
            {new Date(tx.createdAt).toLocaleString("en-IN", {
              day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
            })}
            {tx.reference ? ` · Ref: ${tx.reference}` : ""}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 sm:text-right">
        <p className={`text-lg font-bold tabular-nums ${cfg.amount}`}>
          {cfg.sign} ₹ {inr(tx.amount)}
        </p>
        <p className="text-[11px] text-gray-400 tabular-nums">Balance after: ₹{inr(tx.balanceAfter)}</p>
      </div>
    </div>
  );
};

const AgentWalletHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ currentBalance: 0, totalCredit: 0, totalDebit: 0 });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const fetchWallet = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getMyAgentWallet();
      setTransactions(Array.isArray(data?.data) ? data.data : []);
      setSummary({
        currentBalance: data?.currentBalance || 0,
        totalCredit: data?.totalCredit || 0,
        totalDebit: data?.totalDebit || 0,
      });
    } catch (error) {
      console.error("Failed to fetch agent wallet:", error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to load your wallet history."
      );
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;

    return transactions.filter((tx) =>
      [tx.title, tx.reference].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [transactions, query]);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{agentPageStyles}</style>

      <PageHeader
        title="Wallet History"
        count={`${transactions.length} Records`}
        subtitle="Your agent wallet balance and every credit, debit and refund."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard dark icon={FiCreditCard} label="Current Balance" value={`₹ ${inr(summary.currentBalance)}`} delay={0.08} />
        <StatCard icon={FiPlusCircle} tone="emerald" label="Total Credited" value={`₹ ${inr(summary.totalCredit)}`} delay={0.14} />
        <StatCard icon={FiMinusCircle} tone="red" label="Total Debited" value={`₹ ${inr(summary.totalDebit)}`} delay={0.2} />
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by title or reference..."
        delay={0.26}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={fetchWallet} />
      ) : filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((tx, index) => (
            <TransactionRow key={tx._id} tx={tx} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FiCreditCard}
          title={query ? "No transactions match your search" : "No wallet activity yet"}
          message={
            query
              ? "Try a different title or reference."
              : "Recharges, booking debits and refunds will show up here."
          }
          isFiltering={!!query}
          onClear={() => setQuery("")}
        />
      )}
    </div>
  );
};

export default AgentWalletHistory;
