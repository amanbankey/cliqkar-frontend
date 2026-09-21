import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  FiCopy,
  FiCheck,
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiEye,
  FiFileText,
  FiMapPin,
  FiShield,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiPlus,
  FiGlobe,
  FiUser,
  FiClipboard,
  FiX,
  FiTrendingUp,
} from "react-icons/fi";

/* =====================================================
   DATA
===================================================== */

const dossiers = [
  {
    ref: "803746190",
    flag: "🇦🇪",
    title: "UAE 30-Day Express Tourist Visa",
    category: "Individual",
    status: "hold",
    fields: [
      { label: "Applicant Name", value: "SANTOSH KUMAR VERMA" },
      { label: "Passport No.", value: "AF734301", sub: "(Exp: 14 Aug 2031)" },
      { label: "PAN & Nationality", value: "ASDFG1234F", sub: "· Indian" },
      { label: "Submission Timestamp", value: "Sep 26, 2025 • 05:33 PM IST" },
    ],
    note: {
      icon: FiAlertTriangle,
      bold: "Consulate Requirement:",
      text: "High-resolution passport front/back bio-page re-upload requested by Dubai GDRFA clearance desk due to scan glare on MRZ string.",
    },
    actions: [
      { label: "Resolve & Re-upload", icon: FiRefreshCw, variant: "primary" },
      { label: "View Application", icon: FiEye, variant: "default" },
    ],
  },
  {
    ref: "252244745",
    flag: "🇫🇷",
    title: "Schengen Short-Stay Tourist Visa (France)",
    category: "Family (3 Pax)",
    status: "draft",
    fields: [
      { label: "Lead Applicant", value: "Vikramaditya Rathore" },
      { label: "Passport No.", value: "V8829103", sub: "(Lead Pax)" },
      { label: "Co-Applicants", value: "2 Dependents", sub: "(Spouse + Child)" },
      { label: "Last Edited", value: "Oct 24, 2025 • 11:15 AM IST" },
    ],
    progress: {
      step: "Step 2 of 4:",
      text: "Travel Medical Insurance (€30,000 cover) & Confirmed Hotel Vouchers missing",
      percent: 50,
    },
    actions: [
      { label: "Complete Draft", icon: FiEdit, variant: "primary" },
      { label: "Discard Draft", icon: FiTrash2, variant: "danger" },
    ],
  },
  {
    ref: "719171304",
    flag: "🇸🇦",
    title: "Saudi Tourist eVisa (Multiple Entry - 1 Year)",
    category: "Individual",
    status: "approved",
    fields: [
      { label: "Applicant Name", value: "MRS. KAVITA PATEL" },
      { label: "Passport No.", value: "Z4928104", sub: "· Indian" },
      { label: "Visa Grant Number", value: "MOFA-SA-992140" },
      { label: "Approval Timestamp", value: "Oct 19, 2025 • 13:45 IST" },
    ],
    note: {
      icon: FiCheckCircle,
      bold: "Validity Granted:",
      text: "18 Oct 2025 → 17 Oct 2026 (Max 90 days stay per visit • Medical coverage included under KSA CCHI).",
    },
    actions: [
      { label: "Download eVisa PDF", icon: FiDownload, variant: "primary" },
      { label: "View Dossier", icon: FiEye, variant: "default" },
    ],
  },
  {
    ref: "917613806",
    flag: "🇬🇧",
    title: "UK Standard Visitor Visa (6 Months Single/Multiple)",
    category: "Corporate Express",
    status: "processing",
    fields: [
      { label: "Applicant Name", value: "MR. SUNALI MAJMUDAR" },
      { label: "Passport No.", value: "T4410298", sub: "· PAN: AAACM5512L" },
      { label: "VFS Global File Ref", value: "VFS-LON-DEL-8821" },
      { label: "Submission Date", value: "Oct 15, 2025 • 09:20 AM IST" },
    ],
    note: {
      icon: FiMapPin,
      text: "Biometrics Cleared at VFS Shivaji Stadium, New Delhi. Under Home Office review.",
      right: "Estimated Clearance: 3 Working Days",
    },
    actions: [
      { label: "Track VFS Status", icon: FiRefreshCw, variant: "primary" },
      { label: "View Dossier", icon: FiFileText, variant: "default" },
    ],
  },
  {
    ref: "338192055",
    flag: "🇸🇬",
    title: "Singapore SGAC & E-Visa (Single Entry)",
    category: "Individual",
    status: "approved",
    fields: [
      { label: "Applicant Name", value: "MR. UMESH TAGLANI" },
      { label: "Passport No.", value: "VT850247", sub: "· Indian" },
      { label: "ICA Singapore Ref", value: "ICA-SIN-091823" },
      { label: "Approval Timestamp", value: "Oct 22, 2025 • 16:30 IST" },
    ],
    note: {
      icon: FiShield,
      text: "Electronic pass verified: Changi Automated Clearance (Automated Gates eligible). SG Arrival Card submitted.",
    },
    actions: [
      { label: "Download E-Visa PDF", icon: FiDownload, variant: "primary" },
      { label: "View Dossier", icon: FiEye, variant: "default" },
    ],
  },
  {
    ref: "640192841",
    flag: "🇴🇲",
    title: "Oman Royal Police (ROP) Tourist Visa 10-Day",
    category: "Individual",
    status: "draft",
    fields: [
      { label: "Lead Applicant", value: "Pending Primary Pax Entry", muted: true },
      { label: "Passport No.", value: "Pending Upload", muted: true },
      { label: "Nationality", value: "Indian (Selected)" },
      { label: "Created Timestamp", value: "Oct 25, 2025 • 08:40 AM IST" },
    ],
    progress: {
      step: "Step 1 of 3:",
      text: "Applicant Demographics & Travel Dates pending entry.",
      percent: 15,
    },
    actions: [
      { label: "Complete Application", icon: FiEdit, variant: "primary" },
      { label: "Delete", icon: FiTrash2, variant: "danger" },
    ],
  },
];

const statusTabs = [
  { key: "all", label: "All", count: 64 },
  { key: "approved", label: "Approved", count: 48, dot: "bg-emerald-500" },
  { key: "processing", label: "In Processing", count: 12, dot: "bg-blue-500" },
  { key: "hold", label: "On Hold", count: 4, dot: "bg-red-500" },
  { key: "draft", label: "Drafts", count: 8, dot: "bg-gray-400" },
];

const statusConfig = {
  hold: {
    label: "On Hold",
    icon: FiAlertTriangle,
    badge: "bg-red-50 text-red-700 ring-red-100",
    accent: "bg-red-500",
    callout: "border-red-400 bg-red-50/70",
    calloutText: "text-red-700",
    calloutIcon: "text-red-500",
  },
  draft: {
    label: "Draft",
    icon: FiEdit,
    badge: "bg-gray-100 text-gray-600 ring-gray-200",
    accent: "bg-gray-300",
  },
  approved: {
    label: "Approved",
    icon: FiCheckCircle,
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    accent: "bg-emerald-500",
    callout: "border-emerald-400 bg-emerald-50/70",
    calloutText: "text-emerald-700",
    calloutIcon: "text-emerald-600",
  },
  processing: {
    label: "In Processing",
    icon: FiRefreshCw,
    badge: "bg-blue-50 text-blue-700 ring-blue-100",
    accent: "bg-blue-500",
    callout: "border-blue-400 bg-blue-50/70",
    calloutText: "text-blue-700",
    calloutIcon: "text-blue-600",
  },
};

const actionClass = {
  primary:
    "bg-gradient-to-r from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-950/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30",
  default:
    "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
  danger: "border border-red-100 bg-red-50 text-red-600 hover:bg-red-100",
};

const categories = ["All", ...new Set(dossiers.map((d) => d.category))];

const TOTAL_PAGES = 11;

/* Page numbers with ellipses (1 ... 4 5 6 ... 11) */
const getPageList = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const list = [...new Set([1, total, current - 1, current, current + 1])]
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
@keyframes vs-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes vs-ping {
  0%   { transform: scale(1);   opacity: .55; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes vs-spin {
  to { transform: rotate(360deg); }
}
.vs-rise { animation: vs-rise .6s cubic-bezier(.22,1,.36,1) backwards; }
.vs-ping { animation: vs-ping 2s ease-out infinite; }
.vs-spin { animation: vs-spin 4s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .vs-rise, .vs-ping, .vs-spin { animation: none !important; }
}
`;

/* =====================================================
   DOSSIER CARD
===================================================== */

const DossierCard = ({ dossier, index, ready }) => {
  const [copied, setCopied] = useState(false);
  const cfg = statusConfig[dossier.status];
  const StatusIcon = cfg.icon;
  const NoteIcon = dossier.note?.icon;

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(dossier.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className="vs-rise relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
      style={{ animationDelay: `${0.4 + index * 0.07}s` }}
    >
      {/* status accent */}
      <span className={`absolute inset-y-0 left-0 w-1 ${cfg.accent}`} />

      <div className="p-5 pl-6">
        {/* ---------- HEADER ---------- */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3.5">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl ring-1 ring-gray-200">
              {dossier.flag}
            </span>

            <div className="min-w-0">
              <p className="text-base font-bold text-gray-900">
                {dossier.title}
              </p>

              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={copyRef}
                  aria-label={`Copy reference ${dossier.ref}`}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-gray-500 transition-colors hover:bg-slate-100 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900/30"
                >
                  Ref #{dossier.ref}
                  {copied ? (
                    <span className="flex items-center gap-0.5 font-medium text-emerald-600">
                      <FiCheck size={11} />
                      Copied
                    </span>
                  ) : (
                    <FiCopy size={11} className="text-gray-400" />
                  )}
                </button>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                  {dossier.category}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cfg.badge}`}
          >
            <StatusIcon size={12} />
            {cfg.label}
          </span>
        </div>

        {/* ---------- DETAILS ---------- */}
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {dossier.fields.map((field) => (
            <div key={field.label} className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">
                {field.label}
              </p>

              <p
                className={`mt-1 text-[13px] leading-snug ${
                  field.muted
                    ? "font-medium italic text-gray-400"
                    : "font-semibold text-gray-900"
                }`}
              >
                {field.value}
                {field.sub && (
                  <span className="ml-1 font-normal text-gray-400">
                    {field.sub}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* ---------- NOTE (hold / approved / processing) ---------- */}
        {dossier.note && (
          <div
            className={`mt-4 flex flex-wrap items-start justify-between gap-3 rounded-xl border-l-4 p-3.5 ${cfg.callout}`}
          >
            <p
              className={`flex items-start gap-2 text-xs leading-relaxed ${cfg.calloutText}`}
            >
              <NoteIcon
                className={`mt-0.5 flex-shrink-0 ${cfg.calloutIcon}`}
                size={13}
              />
              <span>
                {dossier.note.bold && (
                  <span className="font-bold">{dossier.note.bold} </span>
                )}
                {dossier.note.text}
              </span>
            </p>

            {dossier.note.right && (
              <span
                className={`whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-semibold ${cfg.calloutText}`}
              >
                {dossier.note.right}
              </span>
            )}
          </div>
        )}

        {/* ---------- PROGRESS (drafts) ---------- */}
        {dossier.progress && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-gray-300 p-3.5 sm:flex-row sm:items-center">
            <p className="flex-1 text-xs leading-relaxed text-gray-500">
              <span className="font-bold text-gray-700">
                {dossier.progress.step}
              </span>{" "}
              {dossier.progress.text}
            </p>

            <div className="flex w-full items-center gap-2.5 sm:w-48">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-blue-700 to-sky-400"
                  style={{
                    width: ready ? `${dossier.progress.percent}%` : "0%",
                    transition: "width 1.1s cubic-bezier(.22,1,.36,1) .2s",
                  }}
                />
              </div>

              <span className="text-xs font-semibold tabular-nums text-gray-600">
                {dossier.progress.percent}%
              </span>
            </div>
          </div>
        )}

        {/* ---------- ACTIONS ---------- */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {dossier.actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15 active:translate-y-0 ${
                actionClass[action.variant]
              }`}
            >
              <action.icon size={13} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   PAGE
===================================================== */

const AppliedVisaHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [category, setCategory] = useState("All");
  const [ready, setReady] = useState(false);
  const searchRef = useRef(null);

  const isMac =
    typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

  // progress bars ko load ke baad fill karna
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 250);
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

    return dossiers.filter((d) => {
      if (statusFilter !== "all" && d.status !== statusFilter) return false;
      if (category !== "All" && d.category !== category) return false;
      if (!q) return true;

      return [
        d.ref,
        d.title,
        d.category,
        ...d.fields.map((f) => `${f.value} ${f.sub || ""}`),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, statusFilter, category]);

  const isFiltering =
    query.trim() !== "" || statusFilter !== "all" || category !== "All";

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("all");
    setCategory("All");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search live filter hota hai. Backend search jodna ho to yahan API call karna.
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{styles}</style>

      {/* ---------- HEADER ---------- */}
      <div className="vs-rise flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Applied Visa History
            </h1>

            <span className="rounded-full bg-[#0B1120] px-3 py-1 text-sm font-semibold tabular-nums text-white">
              64 Records
            </span>

            <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="vs-ping absolute inset-0 rounded-full bg-emerald-500" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              VFS &amp; MOFA Live Telemetry
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Consulate e-visa submissions, biometric appointment tracking, and
            real-time embassy clearance telemetry synchronized with VFS Global,
            Dubai GDRFA, and MOFA portals.
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15"
          >
            <FiDownload size={14} /> Export Dossiers
            <FiChevronDown size={12} />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/20"
          >
            <FiPlus size={14} /> Apply New Visa
          </button>
        </div>
      </div>

      {/* ---------- STATS ---------- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* total (dark) */}
        <div
          className="vs-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 text-white shadow-xl shadow-slate-900/15"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-blue-600/25 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-200 ring-1 ring-white/15">
                <FiUser size={16} />
              </span>
              <p className="text-sm font-medium text-slate-300">
                Total Visas Processed
              </p>
            </div>

            <p className="mt-4 text-3xl font-bold tabular-nums">
              342{" "}
              <span className="text-sm font-medium text-slate-400">Cases</span>
            </p>

            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              <FiTrendingUp size={12} />
              +18 processed this calendar month
            </p>
          </div>
        </div>

        {/* active (segmented bar) */}
        <div
          className="vs-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <FiGlobe size={16} />
            </span>
            <p className="text-sm font-medium text-gray-500">
              Active in Processing
            </p>
          </div>

          <p className="mt-4 text-3xl font-bold tabular-nums text-gray-900">
            19{" "}
            <span className="text-sm font-medium text-gray-400">
              Consulates
            </span>
          </p>

          <div className="mt-4 flex h-2.5 gap-1 overflow-hidden rounded-full bg-gray-100">
            <span
              className="h-full rounded-full bg-blue-600"
              style={{
                width: ready ? `${(12 / 19) * 100}%` : "0%",
                transition: "width 1.1s cubic-bezier(.22,1,.36,1)",
              }}
            />
            <span
              className="h-full rounded-full bg-sky-300"
              style={{
                width: ready ? `${(7 / 19) * 100}%` : "0%",
                transition: "width 1.1s cubic-bezier(.22,1,.36,1) .1s",
              }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="font-semibold text-gray-700">12</span> Express
              Track
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              <span className="font-semibold text-gray-700">7</span> Standard
              Review
            </span>
          </div>
        </div>

        {/* hold */}
        <div
          className="vs-rise rounded-2xl border border-red-200 bg-red-50/30 p-5 shadow-sm"
          style={{ animationDelay: "0.24s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100">
              <FiClipboard size={16} />
            </span>
            <p className="text-sm font-medium text-gray-500">
              Action Required / Hold
            </p>
          </div>

          <p className="mt-4 text-3xl font-bold tabular-nums text-red-500">
            4{" "}
            <span className="text-sm font-medium text-gray-400">Cases</span>
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-red-500">
                Biometrics &amp; Re-upload
              </span>{" "}
              flagged by consulates
            </p>

            <button
              type="button"
              onClick={() => setStatusFilter("hold")}
              className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-red-600 ring-1 ring-red-100 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              Show on-hold
            </button>
          </div>
        </div>
      </div>

      {/* ---------- FILTERS ---------- */}
      <form
        onSubmit={handleSearch}
        className="vs-rise space-y-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
        style={{ animationDelay: "0.3s" }}
      >
        {/* status tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {statusTabs.map((tab) => {
              const active = statusFilter === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-950/20"
                      : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.dot && (
                    <span className={`h-1.5 w-1.5 rounded-full ${tab.dot}`} />
                  )}
                  {tab.label}
                  <span
                    className={`tabular-nums ${
                      active ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            <FiRefreshCw size={12} className="vs-spin" />
            Auto-sync with GDRFA &amp; VFS every 60s
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* search row */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="group flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
            <FiSearch
              size={16}
              className="flex-shrink-0 text-gray-400 transition-colors group-focus-within:text-blue-900"
            />

            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Ref #, Applicant Name, Passport No..."
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

          {/* category */}
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 focus:outline-none"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All Categories" : option}
                </option>
              ))}
            </select>

            <FiChevronDown
              className="pointer-events-none absolute right-3 text-gray-400"
              size={13}
            />
          </div>

          {/* date range */}
          <button
            type="button"
            className="flex items-center justify-between gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15"
          >
            <span className="flex items-center gap-2">
              <FiCalendar size={14} className="text-gray-400" />
              01 Oct - 31 Oct
            </span>
            <FiChevronDown size={13} className="text-gray-400" />
          </button>
        </div>
      </form>

      {/* ---------- DOSSIERS ---------- */}
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((dossier, index) => (
            <DossierCard
              key={dossier.ref}
              dossier={dossier}
              index={index}
              ready={ready}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
            <FiSearch size={20} />
          </span>

          <p className="mt-4 text-base font-semibold text-gray-900">
            No visa dossiers found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try a different reference number, applicant name or passport number.
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
                filtered.length === 1 ? "dossier" : "dossiers"
              }`
            : "Showing 1 to 6 of 64 visa dossiers"}

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

            {getPageList(currentPage, TOTAL_PAGES).map((page) =>
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
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* ---------- GATEWAY BANNER ---------- 
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 shadow-xl shadow-slate-900/15 sm:p-6">
        <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
              <span className="vs-ping absolute inset-0 rounded-2xl ring-1 ring-sky-300/50" />
              <FiShield size={20} />
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-white sm:text-base">
                  Cliqkar Diplomatic &amp; VFS Verified Gateway
                </p>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                  ISO 27001 Certified
                </span>
              </div>

              <p className="mt-1 max-w-lg text-xs text-slate-400">
                Direct consulate API bridge operates with 256-bit zero-knowledge
                encrypted passport vaults and 100% DGCA / ICAO doc-verification
                compliance standards.
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              className="whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
            >
              Consulate Fee Tariff Matrix
            </button>

            <button
              type="button"
              className="whitespace-nowrap rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-semibold text-gray-900 shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40"
            >
              Emergency Escalation Desk
            </button>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default AppliedVisaHistory;