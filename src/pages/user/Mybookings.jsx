import React, { useEffect, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/userComponent/SideBar";
//import TopBar from "../../components/userComponent/Topbar";
import {
  FiCreditCard,
  FiSend,
  FiCopy,
  FiCheck,
  FiX,
  FiRefreshCw,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiHeadphones,
  FiSearch,
  FiUser,
  FiHash,
  FiBriefcase,
  FiClock,
  FiActivity,
  FiTag,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { MdOutlineQrCode2, MdFlight } from "react-icons/md";

/* =====================================================
   DATA
===================================================== */

const bookings = [
  {
    code: "6E",
    airline: "IndiGo",
    flightNo: "6E-8502",
    ref: "VT8502478",
    status: "Success",
    departure: { time: "08:30", code: "JAI", airport: "Jaipur Intl, T2" },
    arrival: { time: "10:45", code: "MAA", airport: "Chennai Intl, T1" },
    stopLabel: "Non-stop",
    duration: "2h 15m",
    aircraft: "Airbus A320",
    passenger: { name: "Mr. Umesh Taglani", type: "Adult (1 Pax)" },
    col2: {
      icon: FiHash,
      label: "PNR & Seat",
      value: "VT-6E-902341",
      sub: "Seat 14A (Window)",
    },
    col3: {
      icon: FiBriefcase,
      label: "Cabin / Baggage",
      value: "Economy Flex",
      color: "text-blue-600",
      sub: "15 Kg + 7 Kg",
    },
    price: "17,036.29",
    priceExtra: "1,186.29",
    priceExtraLabel: "Net Profit",
    priceNote: "Agent Cost: ₹15,850.00",
    actions: [
      { label: "Show Ticket", icon: FiFileText, variant: "primary" },
      { label: "QR", icon: MdOutlineQrCode2, variant: "default" },
      { label: "", icon: FiX, variant: "danger", aria: "Cancel booking" },
    ],
  },
  {
    code: "AI",
    airline: "Air India",
    flightNo: "AI-995",
    ref: "VT8038057",
    status: "Success",
    departure: { time: "14:15", code: "BOM", airport: "Mumbai CSMI, T2" },
    arrival: { time: "15:35", code: "AMD", airport: "Ahmedabad SVPI, T1" },
    stopLabel: "Non-stop",
    duration: "1h 20m",
    aircraft: "Airbus A350-900",
    passenger: { name: "Mr. Sunali Majmudar", type: "Adult (1 Pax)" },
    col2: {
      icon: FiHash,
      label: "PNR & Seat",
      value: "AI-VT-441029",
      sub: "Seat 2B (Aisle)",
    },
    col3: {
      icon: FiBriefcase,
      label: "Cabin & Perks",
      value: "Business Class",
      color: "text-blue-600",
      sub: "Lounge • AVML Confirmed",
    },
    price: "23,000.00",
    priceExtra: "1,800.00",
    priceExtraLabel: "Net Profit",
    priceNote: "Agent Cost: ₹21,200.00",
    actions: [
      { label: "Show Ticket", icon: FiFileText, variant: "primary" },
      { label: "QR", icon: MdOutlineQrCode2, variant: "default" },
      { label: "", icon: FiX, variant: "danger", aria: "Cancel booking" },
    ],
  },
  {
    code: "IX",
    airline: "Air India Express",
    flightNo: "IX-196",
    ref: "VT5530091",
    status: "Success",
    departure: { time: "20:45", code: "DEL", airport: "Delhi IGI, T3" },
    arrival: { time: "23:25", code: "DXB", airport: "Dubai Intl, T2" },
    stopLabel: "Non-stop",
    duration: "3h 40m",
    aircraft: "Boeing 737-MAX",
    passenger: { name: "Mrs. Kavita Patel", type: "Adult (1 Pax)" },
    col2: {
      icon: FiHash,
      label: "PNR & Seat",
      value: "IX-DXB-77189",
      sub: "Seat 4F (Legroom)",
    },
    col3: {
      icon: FiShield,
      label: "Visa & OTB",
      value: "OTB Cleared",
      color: "text-emerald-600",
      sub: "UAE 30D Approved",
    },
    price: "9,743.50",
    priceExtra: "753.50",
    priceExtraLabel: "Net Profit",
    priceNote: "Agent Cost: ₹8,990.00",
    actions: [
      { label: "Show Ticket", icon: FiFileText, variant: "primary" },
      { label: "QR", icon: MdOutlineQrCode2, variant: "default" },
      { label: "", icon: FiX, variant: "danger", aria: "Cancel booking" },
    ],
  },
  {
    code: "6E",
    airline: "IndiGo",
    flightNo: "6E-2041",
    ref: "VT9214482",
    status: "Processing",
    departure: { time: "06:10", code: "BLR", airport: "Kempegowda T2" },
    arrival: { time: "08:55", code: "DEL", airport: "Indira Gandhi T1" },
    stopLabel: "Queued",
    duration: "2h 45m",
    aircraft: "Airbus A321neo",
    passenger: { name: "Dr. Vikramaditya R.", type: "Adult (1 Pax)" },
    col2: {
      icon: FiActivity,
      label: "Status / PNR",
      value: "GDS Queued",
      color: "text-amber-600",
      sub: "Allocation in progress",
    },
    col3: {
      icon: FiClock,
      label: "SLA Timer",
      value: "< 90s remaining",
      color: "text-amber-600",
      sub: "Auto-issuance active",
    },
    price: "12,450.00",
    priceExtra: "870.00",
    priceExtraLabel: "Margin",
    priceNote: "Agent Cost: ₹11,580.00",
    actions: [
      { label: "Track Status", icon: FiRefreshCw, variant: "primary" },
      { label: "GDS Resync", icon: FiRefreshCw, variant: "default" },
    ],
  },
  {
    code: "SG",
    airline: "SpiceJet",
    flightNo: "SG-8120",
    ref: "VT7721095",
    status: "Success",
    departure: { time: "11:20", code: "JAI", airport: "Jaipur Intl, T2" },
    arrival: { time: "13:10", code: "GOI", airport: "Goa Dabolim" },
    stopLabel: "Non-stop",
    duration: "1h 50m",
    aircraft: "Boeing 737-800",
    passenger: { name: "Ms. Ananya Sharma", type: "Adult (1 Pax)" },
    col2: {
      icon: FiHash,
      label: "PNR & Seat",
      value: "SG-VT-661298",
      sub: "Seat 1C (Front Row)",
    },
    col3: {
      icon: FiBriefcase,
      label: "Cabin Tier",
      value: "SpiceMax",
      color: "text-red-500",
      sub: "Priority Boarding + Snack",
    },
    price: "8,920.00",
    priceExtra: "670.00",
    priceExtraLabel: "Margin",
    priceNote: "Agent Cost: ₹8,250.00",
    actions: [
      { label: "Show Ticket", icon: FiFileText, variant: "primary" },
      { label: "QR", icon: MdOutlineQrCode2, variant: "default" },
      { label: "", icon: FiX, variant: "danger", aria: "Cancel booking" },
    ],
  },
  {
    code: "AI",
    airline: "Air India",
    flightNo: "AI-102",
    ref: "VT6104423",
    status: "Cancelled",
    departure: { time: "16:50", code: "CCU", airport: "Kolkata NSCB, T2" },
    arrival: { time: "19:10", code: "BOM", airport: "Mumbai CSMI, T2" },
    stopLabel: "Non-stop",
    duration: "2h 20m",
    aircraft: "A320neo (Voided)",
    passenger: { name: "Mr. Rajesh Sengupta", type: "Adult (1 Pax)" },
    col2: {
      icon: FiCreditCard,
      label: "Refund Status",
      value: "Credited to Wallet",
      color: "text-emerald-600",
      sub: "ARN: REF-992144",
    },
    col3: {
      icon: FiTag,
      label: "Original Fare",
      value: "₹9,850.00",
      color: "text-gray-800",
      sub: "₹11,350.00 Reclaimed",
    },
    price: "9,850.00",
    priceNote: "Deduction: ₹1,500.00 Airline fee",
    actions: [
      { label: "Credit Note", icon: FiCreditCard, variant: "default" },
      { label: "Refund Audit", icon: FiFileText, variant: "default" },
    ],
  },
];

/* Summary numbers (sample data) */
const ticketStats = { confirmed: 62, queued: 5, inAir: 3 };
const ticketTotal =
  ticketStats.confirmed + ticketStats.queued + ticketStats.inAir;

/* Gross card sparkline (decorative sample trend) */
const trend = [38, 44, 41, 52, 49, 60, 57, 68, 72, 84];
const SPARK_W = 240;
const SPARK_H = 72;

const sparkPoints = (() => {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const pad = 6;

  return trend.map((value, i) => [
    (i / (trend.length - 1)) * SPARK_W,
    SPARK_H - pad - ((value - min) / (max - min)) * (SPARK_H - pad * 2),
  ]);
})();

const sparkLine = sparkPoints
  .map(([x, y], i) => {
    if (i === 0) return `M${x.toFixed(1)} ${y.toFixed(1)}`;
    const [px, py] = sparkPoints[i - 1];
    const mx = ((px + x) / 2).toFixed(1);
    return `C${mx} ${py.toFixed(1)}, ${mx} ${y.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(" ");

const sparkArea = `${sparkLine} L${SPARK_W} ${SPARK_H} L0 ${SPARK_H} Z`;

const statusFilters = ["All", "Success", "Processing", "Cancelled"];

const statusConfig = {
  Success: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    dot: "bg-emerald-500",
    strip: "bg-emerald-500",
  },
  Processing: {
    badge: "bg-amber-50 text-amber-700 ring-amber-100",
    dot: "bg-amber-500",
    strip: "bg-amber-400",
  },
  Cancelled: {
    badge: "bg-red-50 text-red-700 ring-red-100",
    dot: "bg-red-500",
    strip: "bg-red-400",
  },
};

const airlineTone = {
  "6E": "bg-indigo-50 text-indigo-700 ring-indigo-100",
  AI: "bg-red-50 text-red-700 ring-red-100",
  IX: "bg-orange-50 text-orange-700 ring-orange-100",
  SG: "bg-yellow-50 text-yellow-700 ring-yellow-200",
};

/* Notch cutouts isi colour ke hote hain jo page background hai (wrapper mein bg-[#F7F8FA]) */
const PAGE_BG = "bg-[#F7F8FA]";

/* =====================================================
   STYLES (page load par ek orchestrated sequence)
===================================================== */

const styles = `
@keyframes bk-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes bk-draw {
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
}
@keyframes bk-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes bk-travel {
  0%   { left: 2%;  opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { left: 96%; opacity: 0; }
}
@keyframes bk-ping {
  0%   { transform: scale(1);   opacity: .55; }
  100% { transform: scale(2.1); opacity: 0; }
}
.bk-rise   { animation: bk-rise .6s cubic-bezier(.22,1,.36,1) backwards; }
.bk-draw   { stroke-dasharray: 1; animation: bk-draw 1.6s cubic-bezier(.22,1,.36,1) .5s backwards; }
.bk-fade   { animation: bk-fade 1s ease-out 1s backwards; }
.bk-travel { animation: bk-travel 2.6s ease-in-out infinite; }
.bk-ping   { animation: bk-ping 2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .bk-rise, .bk-draw, .bk-fade, .bk-travel, .bk-ping { animation: none !important; }
}
`;

/* =====================================================
   SMALL PIECES
===================================================== */

const InfoBlock = ({ icon: Icon, label, value, sub, valueClass }) => (
  <div className="min-w-0">
    <p className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
      <Icon size={12} className="flex-shrink-0" />
      {label}
    </p>

    <p
      className={`mt-1 text-[13px] font-semibold leading-snug ${
        valueClass || "text-gray-800"
      }`}
    >
      {value}
    </p>

    <p className="mt-0.5 text-[11px] leading-snug text-gray-400">{sub}</p>
  </div>
);

const actionClass = {
  primary:
    "bg-gradient-to-r from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-950/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30",
  default:
    "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
  danger:
    "border border-red-100 bg-red-50 text-red-600 hover:bg-red-100",
};

/* =====================================================
   BOOKING CARD
===================================================== */

const BookingCard = ({ booking, index }) => {
  const [copied, setCopied] = useState(false);

  const isCancelled = booking.status === "Cancelled";
  const isProcessing = booking.status === "Processing";
  const status = statusConfig[booking.status];

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(booking.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const timeClass = isCancelled
    ? "text-gray-400 line-through"
    : "text-gray-900";

  return (
    <div
      className={`bk-rise relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 ${
        isProcessing
          ? "border-amber-200 bg-amber-50/30"
          : "border-gray-200 bg-white"
      }`}
      style={{ animationDelay: `${0.35 + index * 0.07}s` }}
    >
      {/* status strip */}
      <div className={`h-1 ${status.strip}`} />

      <div className="p-5">
        {/* ---------- HEADER ---------- */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold ring-1 ${
                airlineTone[booking.code] ||
                "bg-gray-100 text-gray-700 ring-gray-200"
              }`}
            >
              {booking.code}
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900">
                {booking.airline} • {booking.flightNo}
              </p>

              <button
                type="button"
                onClick={copyRef}
                className="group/copy mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-400 transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900/30 rounded"
                aria-label={`Copy reference ${booking.ref}`}
              >
                Ref: {booking.ref}
                {copied ? (
                  <span className="flex items-center gap-0.5 font-medium text-emerald-600">
                    <FiCheck size={11} />
                    Copied
                  </span>
                ) : (
                  <FiCopy size={11} />
                )}
              </button>
            </div>
          </div>

          <span
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${status.badge}`}
          >
            <span className="relative flex h-1.5 w-1.5">
              {isProcessing && (
                <span
                  className={`bk-ping absolute inset-0 rounded-full ${status.dot}`}
                />
              )}
              <span
                className={`relative h-1.5 w-1.5 rounded-full ${status.dot}`}
              />
            </span>
            {booking.status}
          </span>
        </div>

        {/* ---------- ROUTE ---------- */}
        <div className="mt-5 flex items-center gap-3">
          <div className="min-w-0">
            <p className={`text-2xl font-bold tabular-nums ${timeClass}`}>
              {booking.departure.time}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {booking.departure.code}
            </p>
            <p className="text-[11px] text-gray-400">
              {booking.departure.airport}
            </p>
          </div>

          <div className="min-w-0 flex-1 px-1">
            <div className="mb-2 flex justify-center">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
                {booking.stopLabel} • {booking.duration}
              </span>
            </div>

            <div className="relative flex items-center">
              <span
                className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                  isCancelled ? "bg-red-400" : "bg-blue-500"
                }`}
              />

              <span
                className={`flex-1 border-t border-dashed ${
                  isCancelled ? "border-red-200" : "border-blue-200"
                }`}
              />

              <span
                className={`mx-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                  isCancelled
                    ? "bg-red-50 text-red-500"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {isCancelled ? (
                  <FiX size={14} />
                ) : (
                  <MdFlight size={16} className="rotate-90" />
                )}
              </span>

              <span
                className={`flex-1 border-t border-dashed ${
                  isCancelled ? "border-red-200" : "border-blue-200"
                }`}
              />

              <span
                className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                  isCancelled ? "bg-red-400" : "bg-blue-500"
                }`}
              />

              {/* sirf Processing booking par: line par chalta hua dot */}
              {isProcessing && (
                <span className="bk-travel absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber-500" />
              )}
            </div>

            <p className="mt-2 truncate text-center text-[11px] text-gray-400">
              {booking.aircraft}
            </p>
          </div>

          <div className="min-w-0 text-right">
            <p className={`text-2xl font-bold tabular-nums ${timeClass}`}>
              {booking.arrival.time}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {booking.arrival.code}
            </p>
            <p className="text-[11px] text-gray-400">
              {booking.arrival.airport}
            </p>
          </div>
        </div>

        {/* ---------- TICKET PERFORATION ---------- */}
        <div className="relative -mx-5 my-5 border-t border-dashed border-gray-300">
          <span
            className={`absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-gray-200 ${PAGE_BG}`}
          />
          <span
            className={`absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full border border-gray-200 ${PAGE_BG}`}
          />
        </div>

        {/* ---------- DETAILS ---------- */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-3">
          <InfoBlock
            icon={FiUser}
            label="Passenger"
            value={booking.passenger.name}
            sub={booking.passenger.type}
          />
          <InfoBlock
            icon={booking.col2.icon}
            label={booking.col2.label}
            value={booking.col2.value}
            valueClass={booking.col2.color}
            sub={booking.col2.sub}
          />
          <InfoBlock
            icon={booking.col3.icon}
            label={booking.col3.label}
            value={booking.col3.value}
            valueClass={booking.col3.color}
            sub={booking.col3.sub}
          />
        </div>

        {/* ---------- PRICE + ACTIONS ---------- */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`text-xl font-bold tabular-nums ${
                  isCancelled ? "text-gray-400" : "text-gray-900"
                }`}
              >
                ₹ {booking.price}
              </p>

              {booking.priceExtra && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  <FiTrendingUp size={11} />+₹{booking.priceExtra}{" "}
                  {booking.priceExtraLabel}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-[11px] text-gray-400">
              {booking.priceNote}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {booking.actions.map((action, i) => (
              <button
                key={`${action.label}-${i}`}
                type="button"
                aria-label={action.aria || action.label}
                title={action.aria || action.label}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/15 active:translate-y-0 ${
                  actionClass[action.variant]
                }`}
              >
                <action.icon size={14} />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   PAGE CONTENT
===================================================== */

export const MyBookingsContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ready, setReady] = useState(false);
  const searchRef = useRef(null);

  const totalPages = 12;

  const isMac =
    typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

  // stat bar ko load ke baad fill karna
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

    return bookings.filter((b) => {
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      if (!q) return true;

      return [
        b.airline,
        b.flightNo,
        b.ref,
        b.passenger.name,
        b.departure.code,
        b.arrival.code,
        b.departure.airport,
        b.arrival.airport,
        b.col2.value,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, statusFilter]);

  const isFiltering = query.trim() !== "" || statusFilter !== "All";

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
  };

  const barSegments = [
    {
      label: "Confirmed",
      value: ticketStats.confirmed,
      bar: "bg-emerald-500",
      text: "text-gray-700",
    },
    {
      label: "In-Queue",
      value: ticketStats.queued,
      bar: "bg-amber-500",
      text: "text-amber-600",
    },
    {
      label: "In-Air",
      value: ticketStats.inAir,
      bar: "bg-blue-500",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{styles}</style>

      {/* ---------- TITLE ---------- */}
      <div className="bk-rise">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Bookings
          </h1>

          <span className="rounded-full bg-[#0B1120] px-3 py-1 text-sm font-semibold tabular-nums text-white">
            70
          </span>
        </div>

        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Real-time GDS ticket manifest, digital vouchers, and instant PNR
          issuance synchronized with Amadeus &amp; Sabre NDC.
        </p>
      </div>

      {/* ---------- STATS ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* gross (dark, sparkline) */}
        <div
          className="bk-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 text-white shadow-xl shadow-slate-900/15"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-blue-600/25 blur-3xl" />

          <svg
            viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 right-0 h-20 w-3/5"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="bk-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bk-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>

            <path d={sparkArea} fill="url(#bk-area)" className="bk-fade" />

            <path
              d={sparkLine}
              pathLength="1"
              fill="none"
              stroke="url(#bk-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="bk-draw"
            />
          </svg>

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-200 ring-1 ring-white/15">
                <FiCreditCard size={16} />
              </span>
              <p className="text-sm font-medium text-slate-300">
                Total Booked Gross
              </p>
            </div>

            <p className="mt-4 text-3xl font-bold tabular-nums">₹ 84,92,400</p>

            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              <FiTrendingUp size={12} />
              14.2% vs last month
            </p>
          </div>
        </div>

        {/* active tickets (segmented bar) */}
        <div
          className="bk-rise rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <FiSend size={16} />
            </span>
            <p className="text-sm font-medium text-gray-500">Active Tickets</p>
          </div>

          <p className="mt-4 text-3xl font-bold tabular-nums text-gray-900">
            {ticketTotal} Flights
          </p>

          {/* proportional bar */}
          <div className="mt-4 flex h-2.5 gap-1 overflow-hidden rounded-full bg-gray-100">
            {barSegments.map((seg) => (
              <span
                key={seg.label}
                className={`h-full rounded-full ${seg.bar}`}
                style={{
                  width: ready ? `${(seg.value / ticketTotal) * 100}%` : "0%",
                  transition: "width 1.1s cubic-bezier(.22,1,.36,1)",
                }}
              />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {barSegments.map((seg) => (
              <span
                key={seg.label}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <span className={`h-2 w-2 rounded-full ${seg.bar}`} />
                <span className={`font-semibold ${seg.text}`}>
                  {seg.value}
                </span>
                {seg.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- SEARCH + FILTER ---------- */}
      <div
        className="bk-rise flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm lg:flex-row lg:items-center"
        style={{ animationDelay: "0.24s" }}
      >
        <div className="group flex flex-1 items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-all duration-200 focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-900/10">
          <FiSearch
            size={16}
            className="flex-shrink-0 text-gray-400 transition-colors group-focus-within:text-blue-900"
          />

          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by flight, PNR, passenger or airport..."
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

        <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {statusFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`flex-1 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 lg:flex-none ${
                statusFilter === option
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- BOOKINGS ---------- */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((booking, index) => (
            <BookingCard key={booking.ref} booking={booking} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
            <FiSearch size={20} />
          </span>

          <p className="mt-4 text-base font-semibold text-gray-900">
            No bookings found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try a different flight number, passenger name or airport code.
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
                filtered.length === 1 ? "booking" : "bookings"
              }`
            : "Showing 1 to 6 of 70 bookings"}

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

            {[1, 2, 3].map((page) => (
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
            ))}

            <span className="px-1 text-xs text-gray-400">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`h-9 w-9 rounded-xl text-xs font-semibold transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gradient-to-br from-blue-800 to-[#0B1120] text-white shadow-md shadow-blue-900/25"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {totalPages}
            </button>

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

      {/* ---------- SUPPORT BANNER ---------- 
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#16255a] p-5 shadow-xl shadow-slate-900/15 sm:p-6">
        <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
              <span className="bk-ping absolute inset-0 rounded-2xl ring-1 ring-sky-300/50" />
              <FiHeadphones size={20} />
            </span>

            <div>
              <p className="text-sm font-bold text-white sm:text-base">
                Need urgent GDS voucher re-issuance or date amendment?
              </p>

              <p className="mt-1 max-w-lg text-xs text-slate-400">
                Direct Amadeus / NDC PNR bridge is operating at 38ms latency.
                Dedicated 24/7 Agent Desk active for Vivan Travels.
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-gray-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Contact GDS Desk
            </button>

            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
            >
              Direct NDC Bridge
            </button>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

/* =====================================================
   LAYOUT WRAPPER (unchanged)
===================================================== */

const MyBookings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="min-h-screen">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="lg:ml-80">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;