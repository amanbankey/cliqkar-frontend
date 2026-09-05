import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/userComponent/SideBar";
import TopBar from "../../components/userComponent/Topbar";
import {
  FiCreditCard,
  FiSend,
  FiCopy,
  FiX,
  FiRefreshCw,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiHeadphones,
} from "react-icons/fi";
import { MdOutlineQrCode2 } from "react-icons/md";

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
      label: "PNR & SEAT",
      value: "VT-6E-902341",
      sub: "Seat 14A (Window)",
    },
    col3: {
      label: "CABIN / BAGGAGE",
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
      { label: "", icon: FiX, variant: "danger" },
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
      label: "PNR & SEAT",
      value: "AI-VT-441029",
      sub: "Seat 2B (Aisle)",
    },
    col3: {
      label: "CABIN & PERKS",
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
      { label: "", icon: FiX, variant: "danger" },
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
      label: "PNR & SEAT",
      value: "IX-DXB-77189",
      sub: "Seat 4F (Legroom)",
    },
    col3: {
      label: "VISA & OTB",
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
      { label: "", icon: FiX, variant: "danger" },
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
      label: "STATUS / PNR",
      value: "GDS Queued",
      color: "text-amber-600",
      sub: "Allocation in progress",
    },
    col3: {
      label: "SLA TIMER",
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
      label: "PNR & SEAT",
      value: "SG-VT-661298",
      sub: "Seat 1C (Front Row)",
    },
    col3: {
      label: "CABIN TIER",
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
      { label: "", icon: FiX, variant: "danger" },
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
      label: "REFUND STATUS",
      value: "Credited to Wallet",
      color: "text-emerald-600",
      sub: "ARN: REF-992144",
    },
    col3: {
      label: "ORIGINAL FARE",
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

const statusStyle = {
  Success: "bg-emerald-50 text-emerald-600",
  Processing: "bg-amber-50 text-amber-600",
  Cancelled: "bg-red-50 text-red-600",
};

const BookingCard = ({ booking }) => {
  const isCancelled = booking.status === "Cancelled";
  const isProcessing = booking.status === "Processing";

  return (
    <div
      className={`border rounded-2xl p-5 ${
        isProcessing
          ? "bg-amber-50/40 border-amber-100"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {booking.code}
          </span>

          <div>
            <p className="text-sm font-bold text-gray-900">
              {booking.airline} • {booking.flightNo}
            </p>

            <p className="flex items-center gap-1 text-[11px] text-gray-400">
              Ref: {booking.ref} <FiCopy size={11} />
            </p>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[booking.status]}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCancelled
                ? "bg-red-500"
                : isProcessing
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
          />
          {booking.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div>
          <p
            className={`text-xl font-bold text-gray-900 ${
              isCancelled ? "line-through text-gray-400" : ""
            }`}
          >
            {booking.departure.time}
          </p>

          <p className="text-sm font-semibold text-gray-800">
            {booking.departure.code}
          </p>

          <p className="text-[11px] text-gray-400">
            {booking.departure.airport}
          </p>
        </div>

        <div className="flex-1 text-center">
          <p className="text-[10px] text-gray-400 mb-1">
            {booking.stopLabel} • {booking.duration}
          </p>

          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCancelled ? "bg-red-400" : "bg-blue-400"
              }`}
            />

            <span
              className={`flex-1 h-px ${
                isCancelled ? "bg-red-200" : "bg-gray-300"
              }`}
            />

            {isCancelled ? (
              <FiX className="text-red-400" size={13} />
            ) : (
              <span className="text-blue-500 text-xs">✈</span>
            )}

            <span
              className={`flex-1 h-px ${
                isCancelled ? "bg-red-200" : "bg-gray-300"
              }`}
            />

            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCancelled ? "bg-red-400" : "bg-blue-400"
              }`}
            />
          </div>

          <p className="text-[10px] text-gray-400 mt-1">
            {booking.aircraft}
          </p>
        </div>

        <div className="text-right">
          <p
            className={`text-xl font-bold text-gray-900 ${
              isCancelled ? "line-through text-gray-400" : ""
            }`}
          >
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

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 tracking-wide">
            PASSENGER
          </p>

          <p className="text-xs font-semibold text-gray-800 mt-1">
            {booking.passenger.name}
          </p>

          <p className="text-[11px] text-gray-400">
            {booking.passenger.type}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-gray-400 tracking-wide">
            {booking.col2.label}
          </p>

          <p
            className={`text-xs font-semibold mt-1 ${
              booking.col2.color || "text-gray-800"
            }`}
          >
            {booking.col2.value}
          </p>

          <p className="text-[11px] text-gray-400">
            {booking.col2.sub}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-gray-400 tracking-wide">
            {booking.col3.label}
          </p>

          <p
            className={`text-xs font-semibold mt-1 ${
              booking.col3.color || "text-gray-800"
            }`}
          >
            {booking.col3.value}
          </p>

          <p className="text-[11px] text-gray-400">
            {booking.col3.sub}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 flex-wrap gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">
            ₹ {booking.price}

            {booking.priceExtra && (
              <span className="ml-1.5 text-xs font-semibold text-emerald-600">
                +₹{booking.priceExtra} {booking.priceExtraLabel}
              </span>
            )}
          </p>

          <p className="text-[11px] text-gray-400">
            {booking.priceNote}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {booking.actions.map((action, index) => (
            <button
              key={`${action.label}-${index}`}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg ${
                action.variant === "primary"
                  ? "bg-blue-900 text-white"
                  : action.variant === "danger"
                  ? "text-red-500 bg-red-50"
                  : "bg-gray-100 text-gray-600"
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

export const MyBookingsContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Bookings
          </h1>

          <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-2.5 py-1 rounded-full">
            70
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500 max-w-xl">
          Real-time GDS ticket manifest, digital vouchers, and instant PNR
          issuance synchronized with Amadeus &amp; Sabre NDC.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-400 tracking-wide">
              TOTAL BOOKED GROSS
            </p>

            <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <FiCreditCard size={14} />
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-gray-900">
            ₹ 84,92,400
          </p>

          <p className="mt-1 text-xs font-semibold text-emerald-600">
            ↑ 14.2% vs last month
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-400 tracking-wide">
              ACTIVE TICKETS
            </p>

            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <FiSend size={14} />
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-gray-900">
            70 Flights
          </p>

          <p className="mt-1 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">
              62 Confirmed
            </span>{" "}
            ·{" "}
            <span className="font-semibold text-amber-600">
              5 In-Queue
            </span>{" "}
            ·{" "}
            <span className="font-semibold text-blue-600">
              3 In-Air
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-between text-sm text-gray-400">
        <span>Search bookings...</span>

        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
          ⌘K
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {bookings.map((booking) => (
          <BookingCard key={booking.ref} booking={booking} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          Showing 1 to 6 of 70 bookings

          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            6 per page
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg"
          >
            <FiChevronLeft size={14} />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                page === currentPage
                  ? "bg-blue-900 text-white"
                  : "border border-gray-200 text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-400 text-xs">...</span>

          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`w-8 h-8 text-xs font-semibold rounded-lg ${
              currentPage === totalPages
                ? "bg-blue-900 text-white"
                : "border border-gray-200 text-gray-600"
            }`}
          >
            {totalPages}
          </button>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg"
          >
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="bg-[#0B1120] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center flex-shrink-0">
            <FiHeadphones size={18} />
          </span>

          <div>
            <p className="text-sm sm:text-base font-bold text-white">
              Need urgent GDS voucher re-issuance or date amendment?
            </p>

            <p className="mt-1 text-xs text-gray-400 max-w-lg">
              Direct Amadeus / NDC PNR bridge is operating at 38ms latency.
              Dedicated 24/7 Agent Desk active for Vivan Travels.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="bg-white text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-lg">
            Contact GDS Desk
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
            Direct NDC Bridge
          </button>
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F8FA]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <TopBar />

        <Outlet />
      </div>
    </div>
  );
};

export default MyBookings;