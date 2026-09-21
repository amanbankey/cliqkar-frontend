import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FiShield,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiCopy,
  FiCheck,
  FiHeadphones,
  FiRefreshCw,
  FiPrinter,
  FiDownload,
  FiEye,
  FiFileText,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDownloadCloud,
  FiPlus,
  FiClock,
  FiUser,
  FiHash,
  FiMapPin,
  FiGlobe,
  FiX,
} from "react-icons/fi";
import { MdFlight } from "react-icons/md";

import api from "../../api/axios";

/* =====================================================
   CONSTANTS
===================================================== */

const ITEMS_PER_PAGE = 4;

/* Notch cutouts isi colour ke hote hain jo page background hai (layout mein bg-[#F7F8FA]) */
const PAGE_BG = "bg-[#F7F8FA]";

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15 active:translate-y-0";

const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15";

/* Page numbers with ellipses (1 ... 4 5 6 ... 12) */
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

/* Page load par ek orchestrated sequence + sirf "in progress" cheezon par motion */
const styles = `
@keyframes ot-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes ot-ping {
  0%   { transform: scale(1);   opacity: .55; }
  100% { transform: scale(2.2); opacity: 0; }
}
.ot-rise { animation: ot-rise .6s cubic-bezier(.22,1,.36,1) backwards; }
.ot-ping { animation: ot-ping 2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .ot-rise, .ot-ping { animation: none !important; }
}
`;

/* =====================================================
   HELPERS
===================================================== */

const formatDate = (date) => {
  if (!date) return "—";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    return "—";
  }
};

const formatDateTime = (date) => {
  if (!date) return "—";

  try {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "—";
  }
};

const getStatusDetails = (status) => {
  switch (status) {
    case "Approved":
      return {
        label: "OTB Confirmed",
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        strip: "bg-emerald-500",
        icon: FiCheckCircle,
      };

    case "Rejected":
      return {
        label: "Rejected",
        badge: "bg-red-50 text-red-700 ring-red-100",
        strip: "bg-red-400",
        icon: FiXCircle,
      };

    case "In Process":
      return {
        label: "Carrier Review in Progress",
        badge: "bg-blue-50 text-blue-700 ring-blue-100",
        strip: "bg-blue-500",
        pulse: true,
      };

    default:
      return {
        label: "Pending",
        badge: "bg-blue-50 text-blue-700 ring-blue-100",
        strip: "bg-blue-400",
        icon: FiClock,
      };
  }
};

const getFirstTraveler = (application) => application?.travelers?.[0] || null;

const getPassportDocumentName = (traveler) => {
  if (!traveler) return "Passport document not available";

  if (traveler?.passportFront?.originalName) {
    return traveler.passportFront.originalName;
  }

  if (traveler?.passportBack?.originalName) {
    return traveler.passportBack.originalName;
  }

  return "Passport document uploaded";
};

/* =====================================================
   SMALL PIECES
===================================================== */

const InfoBlock = ({ icon: Icon, label, children, sub, subClass }) => (
  <div className="min-w-0">
    <p className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
      <Icon size={12} className="flex-shrink-0" />
      {label}
    </p>

    <div className="mt-1 text-[13px] font-semibold leading-snug text-gray-900">
      {children}
    </div>

    <p className={`mt-0.5 text-[11px] leading-snug ${subClass || "text-gray-400"}`}>
      {sub}
    </p>
  </div>
);

const SelectBox = ({ icon: Icon, value, onChange, children }) => (
  <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
    <Icon className="flex-shrink-0 text-gray-400" size={15} />

    <select
      value={value}
      onChange={onChange}
      className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 focus:outline-none"
    >
      {children}
    </select>

    <FiChevronDown
      className="pointer-events-none absolute right-3 text-gray-400"
      size={13}
    />
  </div>
);

/* =====================================================
   PAGE
===================================================== */

const AppliedOTBHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [carrier, setCarrier] = useState("All");
  const [country, setCountry] = useState("All");
  const [copiedPnr, setCopiedPnr] = useState("");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const searchRef = useRef(null);

  const isMac =
    typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

  // =========================================================
  // FETCH LOGGED-IN USER'S OTB APPLICATIONS
  // =========================================================

  const fetchMyOTBApplications = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.get("/otb/my-applications");

      const data = response?.data?.data || [];

      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch my OTB applications:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          "Failed to load your OTB applications."
      );

      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyOTBApplications();
  }, [fetchMyOTBApplications]);

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

  // =========================================================
  // COPY PNR
  // =========================================================

  const copyPNR = async (pnr) => {
    if (!pnr) return;

    try {
      await navigator.clipboard.writeText(pnr);
      setCopiedPnr(pnr);
      setTimeout(() => setCopiedPnr(""), 1500);
    } catch (error) {
      console.error("Failed to copy PNR:", error);
    }
  };

  // =========================================================
  // FILTER OPTIONS (data se bante hain)
  // =========================================================

  const carrierOptions = useMemo(
    () => [
      ...new Set(applications.map((a) => a?.airlineName).filter(Boolean)),
    ],
    [applications]
  );

  const countryOptions = useMemo(
    () => [
      ...new Set(applications.map((a) => a?.countryName).filter(Boolean)),
    ],
    [applications]
  );

  // =========================================================
  // FILTER + SEARCH
  // =========================================================

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    // Confirmed tab
    if (activeTab === "confirmed") {
      data = data.filter((item) => item.status === "Approved");
    }

    if (carrier !== "All") {
      data = data.filter((item) => item.airlineName === carrier);
    }

    if (country !== "All") {
      data = data.filter((item) => item.countryName === country);
    }

    const searchValue = query.trim().toLowerCase();

    if (!searchValue) {
      return data;
    }

    return data.filter((application) => {
      const travelers = application?.travelers || [];

      const searchableValues = [
        application?.referenceNumber,
        application?.airlineName,
        application?.countryName,
        application?.status,
        application?.paymentStatus,
        application?.applicantEmail,
        application?.applicantPhone,

        ...travelers.flatMap((traveler) => [
          traveler?.fullName,
          traveler?.pnr,
          traveler?.dob,
          traveler?.passportFront?.originalName,
          traveler?.passportBack?.originalName,
        ]),
      ];

      return searchableValues
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchValue));
    });
  }, [applications, activeTab, carrier, country, query]);

  const isFiltering =
    query.trim() !== "" ||
    activeTab !== "all" ||
    carrier !== "All" ||
    country !== "All";

  const clearFilters = () => {
    setQuery("");
    setActiveTab("all");
    setCarrier("All");
    setCountry("All");
  };

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / ITEMS_PER_PAGE)
  );

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApplications, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, query, carrier, country]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================================================
  // COUNTS
  // =========================================================

  const totalApplications = applications.length;

  const confirmedApplications = applications.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedApplications = applications.filter(
    (item) => item.status === "Rejected"
  ).length;

  const inReviewApplications = Math.max(
    0,
    totalApplications - confirmedApplications - rejectedApplications
  );

  const needActionApplications = applications.filter(
    (item) =>
      item.status === "Pending" ||
      item.status === "In Process" ||
      item.status === "Rejected"
  ).length;

  const confirmedPct =
    totalApplications > 0
      ? (confirmedApplications / totalApplications) * 100
      : 0;

  const pctOfTotal = (value) =>
    totalApplications > 0 ? `${(value / totalApplications) * 100}%` : "0%";

  const barSegments = [
    {
      label: "Confirmed",
      value: confirmedApplications,
      bar: "bg-emerald-400",
    },
    {
      label: "In Review",
      value: inReviewApplications,
      bar: "bg-sky-400",
    },
    {
      label: "Rejected",
      value: rejectedApplications,
      bar: "bg-red-400",
    },
  ];

  const showingFrom =
    filteredApplications.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const showingTo = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredApplications.length
  );

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{styles}</style>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="ot-rise flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Applied OTB History
            </h1>

            <span className="rounded-full bg-[#0B1120] px-3 py-1 text-sm font-semibold tabular-nums text-white">
              {totalApplications} Records
            </span>

            {needActionApplications > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
                <FiAlertTriangle size={12} />
                {needActionApplications} Need Action
              </span>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Carrier-synced Ok-To-Board validation, GCC immigration clearance,
            and real-time application status for your submitted OTB requests.
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15"
          >
            <FiDownloadCloud size={14} />
            Export Manifest (CSV)
          </button>

          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/20"
          >
            <FiPlus size={14} />
            Apply New OTB
          </button>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* TOTAL (dark, segmented bar) */}
        <div
          className="ot-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 text-white shadow-xl shadow-slate-900/15"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-blue-600/25 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-200 ring-1 ring-white/15">
                <FiShield size={16} />
              </span>
              <p className="text-sm font-medium text-slate-300">
                Total Clearances
              </p>
            </div>

            <p className="mt-4 text-3xl font-bold tabular-nums">
              {totalApplications}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your submitted applications
            </p>

            <div className="mt-4 flex h-2.5 gap-1 overflow-hidden rounded-full bg-white/10">
              {barSegments.map((seg) => (
                <span
                  key={seg.label}
                  className={`h-full rounded-full ${seg.bar}`}
                  style={{
                    width: pctOfTotal(seg.value),
                    transition: "width 1.1s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {barSegments.map((seg) => (
                <span
                  key={seg.label}
                  className="flex items-center gap-1.5 text-xs text-slate-300"
                >
                  <span className={`h-2 w-2 rounded-full ${seg.bar}`} />
                  <span className="font-semibold text-white">{seg.value}</span>
                  {seg.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONFIRMED (progress ring) */}
        <div
          className="ot-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiCheckCircle size={16} />
            </span>
            <p className="text-sm font-medium text-gray-500">
              Confirmed / Cleared
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-bold tabular-nums text-gray-900">
                {confirmedApplications}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                of {totalApplications} applications cleared
              </p>
            </div>

            <div className="relative h-16 w-16 flex-shrink-0">
              <svg
                viewBox="0 0 64 64"
                className="h-full w-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="32"
                  cy="32"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#ecfdf5"
                  strokeWidth="6"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE * (1 - confirmedPct / 100)}
                  style={{
                    transition:
                      "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </svg>

              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums text-emerald-700">
                {Math.round(confirmedPct)}%
              </span>
            </div>
          </div>
        </div>

        {/* ATTENTION */}
        <div
          className={`ot-rise rounded-2xl border p-5 shadow-sm ${
            rejectedApplications > 0
              ? "border-red-200 bg-red-50/30"
              : "border-gray-200 bg-white"
          }`}
          style={{ animationDelay: "0.24s" }}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                rejectedApplications > 0
                  ? "bg-red-50 text-red-500 ring-1 ring-red-100"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {rejectedApplications > 0 ? (
                <FiAlertTriangle size={16} />
              ) : (
                <FiCheckCircle size={16} />
              )}
            </span>
            <p className="text-sm font-medium text-gray-500">
              Attention / Rejected
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <p
              className={`text-3xl font-bold tabular-nums ${
                rejectedApplications > 0 ? "text-red-500" : "text-gray-900"
              }`}
            >
              {rejectedApplications}
            </p>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                rejectedApplications > 0
                  ? "bg-red-50 text-red-600 ring-1 ring-red-100"
                  : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
              }`}
            >
              {rejectedApplications > 0 ? "Urgent" : "All clear"}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {rejectedApplications > 0
              ? "Applications needing attention. Please take action."
              : "No applications need attention right now."}
          </p>
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER
      ===================================================== */}

      <form
        onSubmit={handleSearch}
        className="ot-rise flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm xl:flex-row xl:items-center"
        style={{ animationDelay: "0.3s" }}
      >
        {/* tabs */}
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {[
            { key: "all", label: `All (${totalApplications})` },
            { key: "confirmed", label: `Confirmed (${confirmedApplications})` },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 xl:flex-none ${
                activeTab === tab.key
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* search */}
        <div className="group flex flex-1 items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
          <FiSearch
            size={16}
            className="flex-shrink-0 text-gray-400 transition-colors group-focus-within:text-blue-900"
          />

          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PNR, Ref, Passenger, Passport..."
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

        {/* carrier */}
        <SelectBox
          icon={MdFlight}
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
        >
          <option value="All">All Carriers</option>
          {carrierOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectBox>

        {/* destination */}
        <SelectBox
          icon={FiGlobe}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="All">All Destinations</option>
          {countryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectBox>
      </form>

      {/* =====================================================
          LOADING (skeleton)
      ===================================================== */}

      {loading && (
        <div className="space-y-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="animate-pulse space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-200/70" />
                    <div className="space-y-2">
                      <div className="h-4 w-40 rounded bg-slate-200/70" />
                      <div className="h-3 w-56 rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="h-6 w-28 rounded-full bg-slate-200/70" />
                </div>
                <div className="h-20 rounded-xl bg-slate-100" />
                <div className="h-12 rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && errorMessage && (
        <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <FiAlertTriangle
              className="mt-0.5 flex-shrink-0 text-red-500"
              size={16}
            />

            <div>
              <p className="text-sm font-bold text-red-600">
                Unable to load OTB history
              </p>

              <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchMyOTBApplications}
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-red-600 ring-1 ring-red-100 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <FiRefreshCw size={13} />
            Try again
          </button>
        </div>
      )}

      {/* =====================================================
          APPLICATION CARDS
      ===================================================== */}

      {!loading && !errorMessage && paginatedApplications.length > 0 && (
        <div className="space-y-5">
          {paginatedApplications.map((application, index) => {
            const traveler = getFirstTraveler(application);
            const status = getStatusDetails(application?.status);
            const StatusIcon = status.icon;

            const travelerCount = application?.travelers?.length || 0;

            const airlineCode = application?.airline?.code
              ? application.airline.code
              : "";

            const airlineDisplay = airlineCode
              ? `${airlineCode} ${application?.airlineName || ""}`
              : application?.airlineName || "Airline";

            const paymentTone =
              application?.status === "Approved"
                ? "text-emerald-600"
                : application?.status === "Rejected"
                ? "text-red-500"
                : "text-blue-600";

            return (
              <div
                key={application?._id || application?.referenceNumber}
                className="ot-rise relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
                style={{ animationDelay: `${0.05 + index * 0.07}s` }}
              >
                {/* status strip */}
                <div className={`h-1 ${status.strip}`} />

                <div className="p-5">
                  {/* =========================================
                      CARD HEADER
                  ========================================= */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 ring-1 ring-blue-100">
                        <MdFlight size={20} className="rotate-90" />
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 sm:text-base">
                          <span className="mr-1.5 text-xs font-medium text-gray-400">
                            Ref
                          </span>
                          #{application?.referenceNumber || "—"}
                        </p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                            {airlineDisplay}
                          </span>

                          <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                            <FiMapPin size={12} className="text-gray-400" />
                            To:{" "}
                            {application?.countryName ||
                              "Destination not available"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`flex flex-shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 sm:self-center ${status.badge}`}
                    >
                      {status.pulse ? (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="ot-ping absolute inset-0 rounded-full bg-blue-500" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-blue-500" />
                        </span>
                      ) : (
                        <StatusIcon size={12} />
                      )}
                      {status.label}
                    </span>
                  </div>

                  {/* =========================================
                      TICKET PERFORATION
                  ========================================= */}

                  <div className="relative -mx-5 my-5 border-t border-dashed border-gray-300">
                    <span
                      className={`absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-gray-200 ${PAGE_BG}`}
                    />
                    <span
                      className={`absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full border border-gray-200 ${PAGE_BG}`}
                    />
                  </div>

                  {/* =========================================
                      DETAILS GRID
                  ========================================= */}

                  <div className="grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-2 lg:grid-cols-4">
                    <InfoBlock
                      icon={FiUser}
                      label="Passenger Name"
                      sub={`DOB: ${
                        traveler?.dob ? formatDate(traveler.dob) : "—"
                      }${
                        travelerCount > 1 ? ` • ${travelerCount} Travelers` : ""
                      }`}
                    >
                      {traveler?.fullName || "—"}
                    </InfoBlock>

                    <InfoBlock
                      icon={FiHash}
                      label="Airline PNR"
                      sub={application?.airlineName || "Airline"}
                    >
                      <span className="flex items-center gap-1.5">
                        {traveler?.pnr || "—"}

                        {traveler?.pnr && (
                          <button
                            type="button"
                            onClick={() => copyPNR(traveler.pnr)}
                            className="flex items-center gap-0.5 rounded text-gray-400 transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900/30"
                            title="Copy PNR"
                            aria-label={`Copy PNR ${traveler.pnr}`}
                          >
                            {copiedPnr === traveler.pnr ? (
                              <span className="flex items-center gap-0.5 text-[11px] font-medium text-emerald-600">
                                <FiCheck size={11} />
                                Copied
                              </span>
                            ) : (
                              <FiCopy size={11} />
                            )}
                          </button>
                        )}
                      </span>
                    </InfoBlock>

                    <InfoBlock
                      icon={FiFileText}
                      label="Passport Details"
                      sub="Passport document"
                    >
                      <span className="block truncate">
                        {getPassportDocumentName(traveler)}
                      </span>
                    </InfoBlock>

                    <InfoBlock
                      icon={FiClock}
                      label="Submitted On"
                      sub={`Payment: ${application?.paymentStatus || "Pending"}`}
                      subClass={`font-medium ${paymentTone}`}
                    >
                      {formatDateTime(application?.createdAt)}
                    </InfoBlock>
                  </div>

                  {/* =========================================
                      STATUS / NOTE BOX
                  ========================================= */}

                  {application?.status === "Rejected" ? (
                    <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border-l-4 border-red-400 bg-red-50/70 p-3.5 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-2">
                        <FiAlertTriangle
                          className="mt-0.5 flex-shrink-0 text-red-500"
                          size={13}
                        />

                        <p className="text-xs leading-relaxed text-red-700">
                          <span className="font-bold">
                            Application Rejected:
                          </span>{" "}
                          {application?.adminNote ||
                            "Your OTB application was rejected. Please review the application and required documents."}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="flex-shrink-0 whitespace-nowrap rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                      >
                        View Application
                      </button>
                    </div>
                  ) : application?.status === "Approved" ? (
                    <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-3.5 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-2">
                        <FiShield
                          className="mt-0.5 flex-shrink-0 text-emerald-600"
                          size={13}
                        />

                        <p className="text-xs leading-relaxed text-emerald-700">
                          <span className="font-bold">
                            OTB Application Approved
                          </span>{" "}
                          - Your application has been marked as approved.
                          {application?.adminNote
                            ? ` ${application.adminNote}`
                            : ""}
                        </p>
                      </div>

                      <span className="flex-shrink-0 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-emerald-700 shadow-sm">
                        OTB Status: Approved
                      </span>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border-l-4 border-blue-400 bg-blue-50/70 p-3.5 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-2">
                        <FiRefreshCw
                          className="mt-0.5 flex-shrink-0 text-blue-600"
                          size={13}
                        />

                        <p className="text-xs leading-relaxed text-blue-700">
                          <span className="font-bold">
                            Application Status:
                          </span>{" "}
                          Your OTB application is currently{" "}
                          <span className="font-semibold">
                            {application?.status || "Pending"}
                          </span>
                          .
                          {application?.adminNote
                            ? ` ${application.adminNote}`
                            : ""}
                        </p>
                      </div>

                      <span className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-blue-700 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Status Active
                      </span>
                    </div>
                  )}

                  {/* =========================================
                      INFORMATION LINE + BUTTONS
                  ========================================= */}

                  <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                      {application?.status === "Approved" ? (
                        <>
                          <FiCheckCircle
                            size={12}
                            className="text-emerald-500"
                          />
                          OTB application successfully cleared
                        </>
                      ) : application?.status === "Rejected" ? (
                        <>
                          <FiXCircle size={12} className="text-red-500" />
                          Application requires attention
                        </>
                      ) : (
                        <>
                          <FiClock size={12} />
                          Application submitted on{" "}
                          {formatDate(application?.createdAt)}
                        </>
                      )}
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      {application?.status === "Rejected" ? (
                        <>
                          <button type="button" className={btnGhost}>
                            <FiHeadphones size={13} />
                            Contact Helpdesk
                          </button>

                          <button type="button" className={btnPrimary}>
                            <FiRefreshCw size={13} />
                            Re-Submit OTB
                          </button>
                        </>
                      ) : application?.status === "Approved" ? (
                        <>
                          <button type="button" className={btnGhost}>
                            <FiPrinter size={13} />
                            Print Boarding Sticker
                          </button>

                          <button type="button" className={btnPrimary}>
                            <FiDownload size={13} />
                            Download Clearance Slip (PDF)
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className={btnGhost}>
                            <FiEye size={13} />
                            View Application
                          </button>

                          <button type="button" className={btnPrimary}>
                            <FiSearch size={13} />
                            Track Application
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =====================================================
          NO APPLICATIONS
      ===================================================== */}

      {!loading && !errorMessage && paginatedApplications.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
            <FiFileText size={20} />
          </span>

          <p className="mt-4 text-base font-semibold text-gray-900">
            No OTB applications found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {query
              ? "No application matches your search."
              : isFiltering
              ? "No application matches the selected filters."
              : "You haven't submitted any OTB applications yet."}
          </p>

          {isFiltering && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-5 py-2 text-sm font-medium text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {!loading && !errorMessage && filteredApplications.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-gray-500">
            Showing {showingFrom} to {showingTo} of{" "}
            {filteredApplications.length} OTB clearances
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
              {ITEMS_PER_PAGE} per page
            </span>
          </p>

          {totalPages > 1 && (
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
                    type="button"
                    key={page}
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
              >
                <FiChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppliedOTBHistory;