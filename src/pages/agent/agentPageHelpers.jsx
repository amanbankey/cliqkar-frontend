import React from "react";
import { FiSearch, FiX, FiAlertTriangle, FiRefreshCw, FiInbox } from "react-icons/fi";

/* Page load par ek hi entrance sequence. Baaki sab hover/action feedback hai. */
export const agentPageStyles = `
@keyframes agp-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
.agp-rise { animation: agp-rise .55s cubic-bezier(.22,1,.36,1) backwards; }
@media (prefers-reduced-motion: reduce) {
  .agp-rise { animation: none !important; }
}
`;

export const inr = (value = 0, decimals = 2) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value || 0);

/* ---------------------------------------------------- */

export const PageHeader = ({ title, count, subtitle }) => (
  <div className="agp-rise">
    <div className="flex flex-wrap items-center gap-3">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>

      <span className="rounded-full bg-[#0B1120] px-3 py-1 text-sm font-semibold tabular-nums text-white">
        {count}
      </span>
    </div>

    <p className="mt-2 max-w-xl text-sm text-gray-500">{subtitle}</p>
  </div>
);

/* ---------------------------------------------------- */

export const StatCard = ({ icon: Icon, label, value, sub, tone = "slate", dark, delay = 0 }) => {
  const toneMap = {
    slate: "bg-slate-100 text-slate-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-500",
    blue: "bg-blue-50 text-blue-700",
  };

  if (dark) {
    return (
      <div
        className="agp-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 text-white shadow-xl shadow-slate-900/15"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-blue-600/25 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-200 ring-1 ring-white/15">
              <Icon size={16} />
            </span>
            <p className="text-sm font-medium text-slate-300">{label}</p>
          </div>

          <p className="mt-4 text-3xl font-bold tabular-nums">{value}</p>

          {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
        </div>
      </div>
    );
  }

  return (
    <div
      className="agp-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneMap[tone]}`}>
          <Icon size={16} />
        </span>
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>

      <p className="mt-4 text-2xl font-bold tabular-nums text-gray-900">{value}</p>

      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  );
};

/* ---------------------------------------------------- */

export const SearchBar = ({ value, onChange, placeholder, delay = 0 }) => (
  <div
    className="agp-rise flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3.5 py-3 shadow-sm transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10"
    style={{ animationDelay: `${delay}s` }}
  >
    <FiSearch size={16} className="flex-shrink-0 text-gray-400" />

    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
    />

    {value && (
      <button
        type="button"
        onClick={() => onChange("")}
        aria-label="Clear search"
        className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-700"
      >
        <FiX size={15} />
      </button>
    )}
  </div>
);

/* ---------------------------------------------------- */

export const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[0, 1, 2].map((i) => (
      <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-slate-200/70" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-slate-200/70" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------------------------------------------- */

export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-start gap-2.5">
      <FiAlertTriangle className="mt-0.5 flex-shrink-0 text-red-500" size={16} />
      <div>
        <p className="text-sm font-bold text-red-600">Unable to load data</p>
        <p className="mt-1 text-xs text-red-500">{message}</p>
      </div>
    </div>

    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-red-600 ring-1 ring-red-100 transition-colors hover:bg-red-50"
      >
        <FiRefreshCw size={13} />
        Try again
      </button>
    )}
  </div>
);

/* ---------------------------------------------------- */

export const EmptyState = ({ icon: Icon = FiInbox, title, message, isFiltering, onClear }) => (
  <div className="agp-rise rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
      <Icon size={20} />
    </span>

    <p className="mt-4 text-base font-semibold text-gray-900">{title}</p>
    <p className="mt-1 text-sm text-gray-500">{message}</p>

    {isFiltering && onClear && (
      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-5 py-2 text-sm font-medium text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      >
        Clear filters
      </button>
    )}
  </div>
);
