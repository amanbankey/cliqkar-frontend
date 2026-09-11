import React, { useEffect, useMemo, useState } from "react";
import {
  FiRepeat,
  FiCalendar,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCreditCard,
} from "react-icons/fi";
import { TbPlaneDeparture, TbWallet } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import aero from "../../assets/image/aeroplane.jfif";
import {
  Plus,
  Trash2,
} from "lucide-react";

const tripTypes = ["One way", "Round-trip", "Multi-City"];
const classTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const SEAT_ROWS = 24;
const SEAT_COLS = ["A", "B", "C", "D", "E", "F"];
const SEAT_PRICE = 500;

const dummySeatStatus = {
  "2A": "occupied",
  "2B": "occupied",
  "2C": "blocked",
  "4D": "occupied",
  "4E": "occupied",
  "4F": "other",
  "6A": "other",
  "6B": "occupied",
  "9C": "blocked",
  "9D": "blocked",
  "12A": "occupied",
  "12B": "occupied",
  "12C": "occupied",
  "15E": "other",
  "15F": "occupied",
  "18B": "blocked",
  "18C": "occupied",
};

const seatStyles = {
  open: "bg-white border-gray-300 text-gray-300 hover:border-blue-400 hover:text-blue-400 cursor-pointer",
  selected: "bg-blue-600 border-blue-600 text-white cursor-pointer",
  occupied: "bg-gray-800 border-gray-800 text-gray-500 cursor-not-allowed",
  blocked: "bg-red-500 border-red-500 text-white cursor-not-allowed",
  other: "bg-green-500 border-green-500 text-white cursor-not-allowed",
};

const sampleFlights = [
  {
    id: 1,
    airline: "INDIGO",
    flightNo: "6E 6171",
    depTime: "05:40",
    depCode: "DEL",
    arrTime: "07:25",
    arrCode: "HSR",
    duration: "1h 45m",
    stops: "Non Stop",
    price: 5874,
    fareType: "Refundable",
    date: "26 September 2026",
    moreFares: 1,
  },
  {
    id: 2,
    airline: "INDIGO",
    flightNo: "6E 6983",
    depTime: "15:35",
    depCode: "DEL",
    arrTime: "17:15",
    arrCode: "HSR",
    duration: "1h 40m",
    stops: "Non Stop",
    price: 5874,
    fareType: "Refundable",
    date: "26 September 2026",
    moreFares: 1,
  },
  {
    id: 3,
    airline: "Air India",
    flightNo: "AI 2846",
    depTime: "09:10",
    depCode: "DEL",
    arrTime: "13:05",
    arrCode: "HSR",
    duration: "3h 55m",
    stops: "1 Stop",
    price: 6320,
    fareType: "NON Refundable",
    date: "26 September 2026",
    moreFares: 2,
  },
  {
    id: 4,
    airline: "Air India",
    flightNo: "AI 4021",
    depTime: "18:20",
    depCode: "DEL",
    arrTime: "20:05",
    arrCode: "HSR",
    duration: "1h 45m",
    stops: "Non Stop",
    price: 6120,
    fareType: "Refundable",
    date: "26 September 2026",
    moreFares: 1,
  },
];

const airlineColors = {
  INDIGO: "bg-blue-700",
  "Air India": "bg-red-600",
};

/* fixed bar-width pattern so the decorative barcode never reflows on re-render */
const barcodePattern = [2, 1, 3, 1, 2, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 3, 2, 1];

/* =========================================================
   OLD BOOKING MODAL
   ========================================================= */

const FlightBookingModal = ({
  flight,
  onClose,
  showPassengerModal,
  setShowPassengerModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">

        <div className="bg-gradient-to-r from-blue-900 to-blue-950 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white font-bold text-base">
            Your Selected Booking Details
          </h3>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white flex-shrink-0"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          <div className="bg-blue-100 border border-blue-500 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl ${
                    airlineColors[flight.airline] || "bg-gray-700"
                  } flex items-center justify-center flex-shrink-0`}
                >
                  <TbPlaneDeparture className="text-white" size={20} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      {flight.airline}
                    </p>
                    <span className="text-xs text-gray-400 font-medium">
                      {flight.flightNo}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-0.5">
                    {flight.fareType}
                  </p>
                </div>
              </div>

              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex-shrink-0">
                Show Rules
              </button>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  {flight.date}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {flight.depTime}
                </p>
                <p className="text-xs text-gray-500">{flight.depCode}</p>
              </div>

              <div className="flex flex-col items-center px-2">
                <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">
                  {flight.duration}
                </p>

                <div className="flex items-center gap-1 w-16 sm:w-20">
                  <span className="h-px flex-1 border-t border-dashed border-blue-400" />
                  <TbPlaneDeparture
                    className="text-blue-500 rotate-90 flex-shrink-0"
                    size={14}
                  />
                  <span className="h-px flex-1 border-t border-dashed border-blue-400" />
                </div>

                <p className="text-xs font-semibold text-blue-600 mt-1 whitespace-nowrap">
                  {flight.stops}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">
                  {flight.date}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {flight.arrTime}
                </p>
                <p className="text-xs text-gray-500">{flight.arrCode}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Cabin baggage</span>
              <span className="font-semibold text-gray-800">7 KG</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Check-in baggage</span>
              <span className="font-semibold text-gray-800">15 KG</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Operated by</span>
              <span className="font-semibold text-gray-800">
                {flight.airline}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400">Total price</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{flight.price.toFixed(2)}
            </p>
          </div>

          <button
           onClick={() => setShowPassengerModal(true)}
            className="bg-blue-950 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-200"

          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   FLIGHT RESULT CARD — BOARDING PASS TICKET STYLE
   ========================================================= */

const FlightResultCard = ({
  flight,
  isSelected,
  onToggleSelect,
  setShowBookingModal,
  showBookingModal,
  index = 0,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreFares, setShowMoreFares] = useState(false);

  const handleCheckboxClick = () => {
    onToggleSelect(flight.id);
    setShowBookingModal(true);
  };

  const smooth = "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

  return (
    <div
      className={`group relative rounded-xl border border-gray-100 mb-3.5 overflow-hidden bg-white ${smooth}
      hover:bg-[#0A1628] hover:border-[#0A1628] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-900/30 will-change-transform`}
    >
      {/* outer edge notches, like a torn ticket stub */}
      <span
        className={`hidden sm:block absolute left-[calc(100%-152px)] -top-2 w-4 h-4 rounded-full bg-gray-50 border border-gray-100 z-10 ${smooth} group-hover:bg-[#0A1628] group-hover:border-white/10`}
      />
      <span
        className={`hidden sm:block absolute left-[calc(100%-152px)] -bottom-2 w-4 h-4 rounded-full bg-gray-50 border border-gray-100 z-10 ${smooth} group-hover:bg-[#0A1628] group-hover:border-white/10`}
      />

      {/* Ticket header band — dark navy at rest, not blue */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0A1628]">
        <div className="flex items-center gap-1.5 text-white">
          <TbPlaneDeparture size={14} className="-rotate-45" />
          <span className="font-bold text-[10px] sm:text-xs tracking-widest">
            BOARDING PASS
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-5 h-5 rounded ${airlineColors[flight.airline] || "bg-gray-700"} flex items-center justify-center flex-shrink-0`}
          >
            <TbPlaneDeparture className="text-white" size={10} />
          </div>
          <span className="text-white/90 text-[11px] font-semibold">
            {flight.airline} · {flight.flightNo}
          </span>
        </div>
      </div>

      {/* Ticket body */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_150px]">
        {/* Main stub — route + meta */}
        <div className="px-4 sm:px-5 py-3.5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-0.5 text-gray-400 ${smooth} group-hover:text-slate-400`}>
                FROM
              </p>
              <p className={`text-2xl font-extrabold text-gray-900 ${smooth} group-hover:text-white`}>
                {flight.depCode}
              </p>
              <p className={`text-[11px] font-semibold text-blue-600 mt-0.5 ${smooth} group-hover:text-blue-300`}>
                {flight.depTime}
              </p>
            </div>

            <div className="flex flex-col items-center px-1">
              <TbPlaneDeparture
                className={`text-blue-500 mb-0.5 ${smooth} group-hover:text-blue-300 group-hover:translate-x-1`}
                size={16}
              />
              <div className={`w-10 sm:w-14 border-t border-dashed border-gray-300 ${smooth} group-hover:border-white/20`} />
              <p className={`text-[9px] mt-0.5 whitespace-nowrap text-gray-400 ${smooth} group-hover:text-slate-400`}>
                {flight.duration}
              </p>
            </div>

            <div className="text-right">
              <p className={`text-[9px] font-bold tracking-widest mb-0.5 text-gray-400 ${smooth} group-hover:text-slate-400`}>
                TO
              </p>
              <p className={`text-2xl font-extrabold text-gray-900 ${smooth} group-hover:text-white`}>
                {flight.arrCode}
              </p>
              <p className={`text-[11px] font-semibold text-blue-600 mt-0.5 ${smooth} group-hover:text-blue-300`}>
                {flight.arrTime}
              </p>
            </div>
          </div>

          <p className={`text-[11px] mt-2 text-gray-400 ${smooth} group-hover:text-slate-400`}>
            {flight.date} ·{" "}
            <span className={`font-semibold text-gray-500 ${smooth} group-hover:text-slate-300`}>{flight.stops}</span>
          </p>

          <div
            className={`grid grid-cols-3 gap-2 mt-2.5 pt-2.5 border-t border-dashed border-gray-100 ${smooth} group-hover:border-white/10`}
          >
            <div>
              <p className={`text-[8px] font-bold tracking-widest text-gray-400 ${smooth} group-hover:text-slate-500`}>
                CLASS
              </p>
              <p className={`text-[11px] font-bold text-gray-800 mt-0.5 ${smooth} group-hover:text-white`}>
                ECONOMY
              </p>
            </div>
            <div>
              <p className={`text-[8px] font-bold tracking-widest text-gray-400 ${smooth} group-hover:text-slate-500`}>
                FARE TYPE
              </p>
              <p className={`text-[11px] font-bold text-gray-800 mt-0.5 ${smooth} group-hover:text-white`}>
                {flight.fareType}
              </p>
            </div>
            <div>
              <p className={`text-[8px] font-bold tracking-widest text-gray-400 ${smooth} group-hover:text-slate-500`}>
                BAGGAGE
              </p>
              <p className={`text-[11px] font-bold text-gray-800 mt-0.5 ${smooth} group-hover:text-white`}>
                15 KG
              </p>
            </div>
          </div>
        </div>

        {/* Perforation divider with notches, ticket-style */}
        <div className="hidden sm:block relative">
          <span
            className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-50 border border-gray-100 ${smooth} group-hover:bg-[#0A1628] group-hover:border-white/10`}
          />
          <div className={`h-full border-l-2 border-dashed border-gray-200 ${smooth} group-hover:border-white/15`} />
          <span
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-50 border border-gray-100 ${smooth} group-hover:bg-[#0A1628] group-hover:border-white/10`}
          />
        </div>
        <div className={`sm:hidden border-t-2 border-dashed border-gray-200 mx-4 ${smooth} group-hover:border-white/15`} />

        {/* Right stub — price + checkbox + barcode */}
        <div
          className={`bg-gray-50 ${smooth} group-hover:bg-white/5 px-4 py-3.5 flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-2`}
        >
          <div className="text-left sm:text-right">
            <p className={`text-[8px] font-bold tracking-widest text-gray-400 ${smooth} group-hover:text-slate-500`}>
              PRICE
            </p>
            <p className={`text-lg font-extrabold text-gray-900 ${smooth} group-hover:text-white`}>
              ₹{flight.price.toFixed(0)}
            </p>
            <p className={`text-[9px] mt-0.5 text-gray-400 ${smooth} group-hover:text-slate-400`}>
              +{flight.moreFares} more fare{flight.moreFares > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxClick}
              className="accent-blue-600 w-4 h-4"
            />
            <div className="flex items-end gap-[1.5px] h-4">
              {barcodePattern.map((w, i) => (
                <span
                  key={i}
                  className={`bg-gray-700 ${smooth} group-hover:bg-slate-300`}
                  style={{ width: `${w}px`, height: i % 3 === 0 ? "100%" : "65%" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Date row + view more details */}
      <div className={`flex items-center justify-between px-4 sm:px-5 py-2 border-t border-gray-50 ${smooth} group-hover:border-white/10`}>
        <p className={`text-[11px] text-gray-400 ${smooth} group-hover:text-slate-400`}>
          Ticket ID #{flight.id.toString().padStart(6, "0")}
        </p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:gap-1.5 ${smooth} group-hover:text-blue-300`}
        >
          {showDetails ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
          View More Details
        </button>
      </div>

      <div
        className={`grid overflow-hidden ${smooth} ${
          showDetails ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div
            className={`px-4 sm:px-5 py-2.5 text-[11px] leading-relaxed bg-gray-50 text-gray-500 border-t border-gray-100 ${smooth} group-hover:bg-white/5 group-hover:text-slate-300 group-hover:border-white/10`}
          >
            Fare type: <span className="font-semibold">{flight.fareType}</span> · Cabin
            baggage 7KG · Check-in baggage 15KG · Operated by {flight.airline}.
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowMoreFares(!showMoreFares)}
        className={`w-full flex items-center gap-1.5 justify-start px-4 sm:px-5 py-2 text-[11px] font-semibold bg-blue-50 text-blue-600 hover:gap-2 ${smooth} group-hover:bg-blue-500/10 group-hover:text-blue-300`}
      >
        {showMoreFares ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
        View More Fares (+{flight.moreFares})
      </button>

      <div
        className={`grid overflow-hidden ${smooth} ${
          showMoreFares ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div
            className={`px-4 sm:px-5 py-2.5 border-t border-blue-100 text-gray-600 ${smooth} group-hover:border-blue-400/20 group-hover:text-slate-300`}
          >
            <div className="flex items-center justify-between text-[13px]">
              <span>
                {flight.fareType === "Refundable" ? "NON Refundable" : "Refundable"} fare
              </span>
              <span className={`font-bold text-gray-900 ${smooth} group-hover:text-white`}>
                ₹{(flight.price - 400).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SEAT SELECTION MODAL
   ========================================================= */

const SeatSelectionModal = ({
  flight,
  selectedSeat,
  onConfirm,
  onClose,
}) => {
  const [tempSeat, setTempSeat] = useState(selectedSeat);

  const handleSeatClick = (seatId, status) => {
    if (
      status === "occupied" ||
      status === "blocked" ||
      status === "other"
    ) {
      return;
    }

    setTempSeat(tempSeat === seatId ? null : seatId);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-900 text-base">
            Select Seat for
          </h3>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-[200px_1fr]">
          <div className="px-5 py-4 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-100 flex-shrink-0">
            <p className="text-lg font-bold text-blue-700">
              {flight.depCode} - {flight.arrCode}
            </p>

            <p className="text-xs text-gray-500 mb-3">{flight.date}</p>

            <p className="text-xs text-gray-500">Selected Seat</p>

            <p className="text-base font-bold text-gray-900 mb-2">
              {tempSeat || "-"}
            </p>

            <p className="text-xs text-gray-500">Total</p>

            <p className="text-lg font-bold text-blue-600 mb-4">
              ₹{tempSeat ? SEAT_PRICE.toFixed(2) : "0.00"}
            </p>

            <p className="text-xs font-bold text-gray-700 mb-2">
              Pax(s) Details
            </p>

            <div className="space-y-2">
              {[
                {
                  label: "Open Seat",
                  color: "bg-white border border-gray-300",
                },
                {
                  label: "Selected Seat",
                  color: "bg-blue-600",
                },
                {
                  label: "Occupied Seat",
                  color: "bg-gray-800",
                },
                {
                  label: "Block Seat",
                  color: "bg-red-500",
                },
                {
                  label: "Selected for other passenger",
                  color: "bg-green-500",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`w-4 h-4 rounded ${item.color} flex-shrink-0`}
                  />

                  <span className="text-xs text-gray-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 py-5 overflow-x-auto">
            <div className="inline-flex flex-col gap-2 min-w-[280px]">
              {Array.from(
                { length: SEAT_ROWS },
                (_, i) => i + 1
              ).map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-2"
                >
                  <span className="text-[10px] text-gray-400 w-4 text-right flex-shrink-0">
                    {row}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {SEAT_COLS.slice(0, 3).map((col) => {
                      const seatId = `${row}${col}`;

                      const status =
                        tempSeat === seatId
                          ? "selected"
                          : dummySeatStatus[seatId] || "open";

                      return (
                        <button
                          key={seatId}
                          onClick={() =>
                            handleSeatClick(
                              seatId,
                              dummySeatStatus[seatId] || "open"
                            )
                          }
                          className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all duration-200 ${seatStyles[status]}`}
                        >
                          <MdEventSeat size={14} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-4 flex-shrink-0" />

                  <div className="flex items-center gap-1.5">
                    {SEAT_COLS.slice(3, 6).map((col) => {
                      const seatId = `${row}${col}`;

                      const status =
                        tempSeat === seatId
                          ? "selected"
                          : dummySeatStatus[seatId] || "open";

                      return (
                        <button
                          key={seatId}
                          onClick={() =>
                            handleSeatClick(
                              seatId,
                              dummySeatStatus[seatId] || "open"
                            )
                          }
                          className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all duration-200 ${seatStyles[status]}`}
                        >
                          <MdEventSeat size={14} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400">Seat total</p>

            <p className="text-lg font-bold text-gray-900">
              ₹{tempSeat ? SEAT_PRICE.toFixed(2) : "0.00"}
            </p>
          </div>

          <button
            onClick={() => {
              onConfirm(tempSeat);
              onClose();
            }}
            disabled={!tempSeat}
            className="bg-blue-600 disabled:bg-gray-300 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-200 disabled:shadow-none transition-all duration-300"
          >
            Confirm Seat
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PASSENGER DETAILS - INLINE STEP
   ========================================================= */

const PassengerDetails = ({ flight }) => {
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const baseFare = flight.price;
  const airportTax = Math.round(flight.price * 0.35);
  const subTotal = baseFare + airportTax;
  const seatCharge = selectedSeat ? SEAT_PRICE : 0;
  const totalAmount = subTotal + seatCharge;

  return (
    <div className="w-full">
      <div className="bg-white w-full max-w-7xl rounded-2xl sm:rounded-3xl flex flex-col mx-auto shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white font-bold text-base">
            Enter Your Details
          </h3>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">
          <div className="px-5 py-5 space-y-4">
            <p className="text-sm font-bold text-gray-800">
              Passenger 1
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Passenger Type
                </label>

                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Adult</option>
                  <option>Child</option>
                  <option>Infant</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Select Title
                </label>

                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Title</option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  First Name
                </label>

                <input
                  placeholder="First Name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Last Name
                </label>

                <input
                  placeholder="Last Name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Email
                </label>

                <input
                  placeholder="Email"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Select Nationality
                </label>

                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Select Nationality</option>
                  <option>Indian</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Passenger Mobile Number
                </label>

                <input
                  placeholder="Passenger Mobile Number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Date of Birth
                </label>

                <input
                  type="date"
                  placeholder="dd-MM-yyyy"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Passport Number
                </label>

                <input
                  placeholder="Passport Number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Select Passport Issuing Country
                </label>

                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Select Passport Issuing Country</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Passport Expiry
                </label>

                <input
                  placeholder="Passport Expiry"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2">
                Special Service Request For Trip{" "}
                <span className="font-bold text-gray-700">
                  {flight.depCode} - {flight.arrCode}
                </span>
              </p>

              <p className="text-sm font-semibold text-blue-800 mb-3">
                {flight.depCode} - {flight.arrCode}
              </p>

              <button
                onClick={() => setShowSeatModal(true)}
                className="flex items-center gap-2 bg-blue-950 hover:bg-blue-800 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-all duration-300"
              >
                <MdEventSeat size={16} />
                SEAT
              </button>

              <div className="mt-3">
                <label className="text-xs text-gray-500 mb-1 block">
                  Selected Seat for {flight.depCode} - {flight.arrCode}
                </label>

                <input
                  readOnly
                  value={selectedSeat || ""}
                  placeholder="Seat"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 bg-gray-50"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                defaultChecked
                className="accent-blue-600 w-4 h-4"
              />

              <span className="text-sm text-gray-700">
                I Confirm That I Want To Proceed With The Booking
              </span>
            </label>

            <div className="pt-2">
              <p className="text-sm font-bold text-gray-800 mb-2">
                Choose Payment Method
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "border-blue-600 text-blue-700 bg-blue-50"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <FiCreditCard size={16} />
                  Online
                </button>

                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all duration-300 ${
                    paymentMethod === "wallet"
                      ? "border-blue-600 text-blue-700 bg-blue-50"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <TbWallet size={16} />
                  Wallet
                </button>

                <button className="sm:ml-auto bg-blue-950 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 px-5 py-5 lg:sticky lg:top-0 lg:self-start">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-11 h-11 rounded-lg ${
                  airlineColors[flight.airline] || "bg-gray-700"
                } flex items-center justify-center flex-shrink-0`}
              >
                <TbPlaneDeparture className="text-white" size={18} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">
                    {flight.airline}
                  </p>

                  <span className="text-xs text-gray-400">
                    {flight.flightNo}
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Saver (S):{" "}
                  {flight.fareType?.slice(0, 4).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-4">
              <div>
                <p className="text-xs text-gray-400">
                  {flight.date}
                </p>

                <p className="text-base font-bold text-gray-900">
                  {flight.depTime}
                </p>

                <p className="text-xs text-gray-500">
                  {flight.depCode}
                </p>
              </div>

              <div className="flex flex-col items-center px-1">
                <p className="text-[10px] text-gray-400 mb-1 whitespace-nowrap">
                  {flight.duration}
                </p>

                <div className="flex items-center gap-1 w-10">
                  <span className="h-px flex-1 border-t border-dashed border-blue-400" />

                  <TbPlaneDeparture
                    className="text-blue-500 rotate-90 flex-shrink-0"
                    size={12}
                  />

                  <span className="h-px flex-1 border-t border-dashed border-blue-400" />
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {flight.date}
                </p>

                <p className="text-base font-bold text-gray-900">
                  {flight.arrTime}
                </p>

                <p className="text-xs text-gray-500">
                  {flight.arrCode}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
              <p className="font-bold text-gray-700">
                Base Fare Details
              </p>

              <div className="flex justify-between text-gray-600">
                <span>Adult(s) Amount:</span>
                <span>
                  (1 x {baseFare.toFixed(2)}) = ₹
                  {baseFare.toFixed(2)}
                </span>
              </div>

              <p className="font-bold text-gray-700 pt-1">
                Airport Taxes
              </p>

              <div className="flex justify-between text-gray-600">
                <span>Airport tax:</span>
                <span>₹{airportTax}</span>
              </div>

              <p className="font-bold text-gray-700 pt-1">
                Additional Charges
              </p>

              <div className="flex justify-between text-gray-600">
                <span>Service Fee:</span>
                <span>₹0</span>
              </div>

              {selectedSeat && (
                <div className="flex justify-between text-gray-600">
                  <span>Seat ({selectedSeat}):</span>
                  <span>₹{SEAT_PRICE.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Promo Discount:</span>
                <span>₹0</span>
              </div>

              <div className="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2">
                <span>Sub Total Amount:</span>
                <span>
                  ₹{(subTotal + seatCharge).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-gray-700 text-white rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold">
                Total Amount:
              </span>

              <span className="text-sm font-bold">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSeatModal && (
        <SeatSelectionModal
          flight={flight}
          selectedSeat={selectedSeat}
          onConfirm={setSelectedSeat}
          onClose={() => setShowSeatModal(false)}
        />
      )}
    </div>
  );
};

/* =========================================================
   INLINE BOOKING CARD - STEP 1
   ========================================================= */

const InlineBookingCard = ({ flight, onNext }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 px-5 py-4 flex items-center justify-between">
        <h3 className="text-white font-bold text-base">
          Your Selected Booking Details
        </h3>
      </div>

      <div className="px-5 py-5">
        <div className="bg-blue-100 border border-blue-500 rounded-2xl p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl ${
                  airlineColors[flight.airline] || "bg-gray-700"
                } flex items-center justify-center flex-shrink-0`}
              >
                <TbPlaneDeparture
                  className="text-white"
                  size={20}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">
                    {flight.airline}
                  </p>

                  <span className="text-xs text-gray-400 font-medium">
                    {flight.flightNo}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-0.5">
                  {flight.fareType}
                </p>
              </div>
            </div>

            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex-shrink-0">
              Show Rules
            </button>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div>
              <p className="text-xs text-gray-400 font-medium">
                {flight.date}
              </p>

              <p className="text-lg font-bold text-gray-900">
                {flight.depTime}
              </p>

              <p className="text-xs text-gray-500">
                {flight.depCode}
              </p>
            </div>

            <div className="flex flex-col items-center px-2">
              <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">
                {flight.duration}
              </p>

              <div className="flex items-center gap-1 w-16">
                <span className="h-px flex-1 border-t border-dashed border-blue-400" />

                <TbPlaneDeparture
                  className="text-blue-500 rotate-90 flex-shrink-0"
                  size={14}
                />

                <span className="h-px flex-1 border-t border-dashed border-blue-400" />
              </div>

              <p className="text-xs font-semibold text-blue-600 mt-1 whitespace-nowrap">
                {flight.stops}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">
                {flight.date}
              </p>

              <p className="text-lg font-bold text-gray-900">
                {flight.arrTime}
              </p>

              <p className="text-xs text-gray-500">
                {flight.arrCode}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Cabin baggage
            </span>

            <span className="font-semibold text-gray-800">
              7 KG
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Check-in baggage
            </span>

            <span className="font-semibold text-gray-800">
              15 KG
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Operated by
            </span>

            <span className="font-semibold text-gray-800">
              {flight.airline}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">
            Total price
          </p>

          <p className="text-xl font-bold text-gray-900">
            ₹{flight.price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={onNext}
          className="bg-blue-950 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   FILTER BAR
   ========================================================= */

const FlightFilterBar = ({ filters, setFilters }) => {
  const airlineCounts = sampleFlights.reduce((acc, f) => {
    acc[f.airline] = (acc[f.airline] || 0) + 1;
    return acc;
  }, {});

  const fareTypeCounts = sampleFlights.reduce((acc, f) => {
    acc[f.fareType] = (acc[f.fareType] || 0) + 1;
    return acc;
  }, {});

  const stopCounts = sampleFlights.reduce((acc, f) => {
    acc[f.stops] = (acc[f.stops] || 0) + 1;
    return acc;
  }, {});

  const toggleAirline = (airline) => {
    setFilters((prev) => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter((a) => a !== airline)
        : [...prev.airlines, airline],
    }));
  };

  const setFareType = (fareType) => {
    setFilters((prev) => ({
      ...prev,
      fareType:
        prev.fareType === fareType ? "" : fareType,
    }));
  };

  const setStop = (stop) => {
    setFilters((prev) => ({
      ...prev,
      stop: prev.stop === stop ? "" : stop,
    }));
  };

  return (
    <div className="bg-blue-100 rounded-xl border border-gray-100 mb-4 px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-bold text-gray-800">
            AIRLINES
          </span>

          {Object.entries(airlineCounts).map(
            ([airline, count]) => (
              <label
                key={airline}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={() => toggleAirline(airline)}
                  className="accent-blue-600 w-4 h-4"
                />

                <span className="text-sm text-gray-700">
                  {airline}
                </span>

                <span className="text-xs text-gray-400">
                  ({count})
                </span>
              </label>
            )
          )}
        </div>

        <span className="hidden sm:block w-px h-6 bg-gray-100" />

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-bold text-gray-500">
            FARE TYPE
          </span>

          {Object.entries(fareTypeCounts).map(
            ([fareType, count]) => (
              <label
                key={fareType}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="fareType"
                  checked={filters.fareType === fareType}
                  onChange={() => setFareType(fareType)}
                  className="accent-blue-600 w-4 h-4"
                />

                <span className="text-sm text-gray-700">
                  {fareType}
                </span>

                <span className="text-xs text-gray-400">
                  ({count})
                </span>
              </label>
            )
          )}
        </div>

        <span className="hidden sm:block w-px h-6 bg-gray-100" />

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-bold text-gray-500">
            STOP
          </span>

          {Object.entries(stopCounts).map(
            ([stop, count]) => (
              <label
                key={stop}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="stop"
                  checked={filters.stop === stop}
                  onChange={() => setStop(stop)}
                  className="accent-blue-600 w-4 h-4"
                />

                <span className="text-sm text-gray-700">
                  {stop}
                </span>

                <span className="text-xs text-gray-400">
                  ({count})
                </span>
              </label>
            )
          )}
        </div>

        <button
          onClick={() =>
            setFilters({
              airlines: [],
              fareType: "",
              stop: "",
            })
          }
          className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN FLIGHT HERO
   ========================================================= */

const FlightHero = () => {
  const [tripType, setTripType] = useState("One way");

  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    passengers: 1,
    classType: "ECONOMY",
    cities: [],
  });

  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [filters, setFilters] = useState({
    airlines: [],
    fareType: "",
    stop: "",
  });

  const [showBookingModal, setShowBookingModal] =
    useState(false);

  /*
    0 = Selected Booking Details
    1 = Passenger Details
  */
  const [bookingStep, setBookingStep] = useState(0);

  /*
    Jab Next click hoga aur bookingStep 1 hoga,
    page automatically top par chala jayega.
  */
 

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFlightChange = (
    index,
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      flights: prev.flights.map((flight, i) =>
        i === index
          ? { ...flight, [field]: value }
          : flight
      ),
    }));
  };

  const handleCitySwap = (index) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.map((city, i) =>
        i === index
          ? {
              ...city,
              from: city.to,
              to: city.from,
            }
          : city
      ),
    }));
  };

  const handleCommonChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCityChange = (
    index,
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.map((city, i) =>
        i === index
          ? { ...city, [field]: value }
          : city
      ),
    }));
  };

  const handleAddCity = () => {
    setForm((prev) => ({
      ...prev,
      cities: [
        ...prev.cities,
        {
          from: prev.cities.length
            ? prev.cities[prev.cities.length - 1].to
            : prev.to,
          to: "",
          departure: "",
        },
      ],
    }));
  };

  const handleRemoveCity = (index) => {
    setForm((prev) => ({
      ...prev,
      cities: prev.cities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSwap = () => {
    setForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters({
      airlines: [],
      fareType: "",
      stop: "",
    });

    setHasSearched(true);

    /*
      New search ke baad booking flow ko
      first step par reset karna.
    */
    setBookingStep(0);
    setShowBookingModal(false);
    setSelectedFlight(null);
    setSelectedIds([]);
  };

  const toggleSelect = (id) => {
    const flight = sampleFlights.find(
      (f) => f.id === id
    );

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );

    setSelectedFlight((prev) =>
      prev && prev.id === id ? null : flight
    );

    /*
      Checkbox se naya flight select hone par
      hamesha first booking step se start hoga.
    */
    setBookingStep(0);
  };

  const handleNextToPassenger = () => {
    /*
      Pehle step change hoga.
      useEffect bookingStep change detect karke
      page ko TOP par le jayega.
    */
    setBookingStep(1);
  };

  const filteredFlights = useMemo(() => {
    return sampleFlights.filter((flight) => {
      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(flight.airline)
      ) {
        return false;
      }

      if (
        filters.fareType &&
        flight.fareType !== filters.fareType
      ) {
        return false;
      }

      if (
        filters.stop &&
        flight.stops !== filters.stop
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const isRoundTrip =
    tripType === "Round-trip";

  return (
    <div className="">
      <section className="relative px-4 sm:px-8 lg:px-16 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={aero}
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-white/35" />

          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/85 via-white/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-blue-50" />
        </div>

        <span className="hidden lg:block absolute left-[8%] top-[28%] text-xs italic text-gray-400 -rotate-6">
          Quick Bookings
        </span>

        <svg
          className="hidden lg:block absolute left-[6%] top-[34%] w-28 h-20 text-gray-300"
          viewBox="0 0 120 80"
          fill="none"
        >
          <path
            d="M5 5 C -10 40, 30 70, 60 60"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        </svg>

        <span className="hidden lg:block absolute right-[8%] top-[24%] text-xs italic text-gray-400 rotate-3">
          Trip Planner
        </span>

        <svg
          className="hidden lg:block absolute right-[6%] top-[30%] w-28 h-24 text-gray-300"
          viewBox="0 0 120 90"
          fill="none"
        >
          <path
            d="M115 5 C 130 45, 90 75, 55 65"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        </svg>

        <div className="relative max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Discover Your Flight <br className="hidden sm:block" />
            under <span className="text-gray-300">60</span> seconds
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Compare fares across airlines, pick your seat, and book your trip in minutes — all in one place.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white/30 backdrop-blur rounded-3xl shadow-xl shadow-blue-200/160 border border-gray-500 p-5 sm:p-7">
            <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full p-1 mb-6">
              {tripTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    tripType === type
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {type === "One way" ? (
                    <TbPlaneDeparture size={14} />
                  ) : null}

                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 overflow-hidden">
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      isRoundTrip
                        ? "lg:grid-cols-6"
                        : "lg:grid-cols-5"
                    } divide-y sm:divide-y-0 sm:divide-x divide-gray-100 relative`}
                  >
                    <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                      <p className="text-[11px] font-semibold text-gray-400 mb-1">
                        From
                      </p>

                      <input
                        type="text"
                        value={form.from}
                        onChange={(e) =>
                          handleChange(
                            "from",
                            e.target.value
                          )
                        }
                        placeholder="From"
                        className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSwap}
                      className="hidden lg:flex absolute z-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow transition-all duration-300 hover:border-blue-300 hover:rotate-180"
                      style={{
                        left: `calc(${
                          100 /
                          (isRoundTrip ? 6 : 5)
                        }% - 16px)`,
                      }}
                    >
                      <FiRepeat
                        className="text-blue-600"
                        size={14}
                      />
                    </button>

                    <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                      <p className="text-[11px] font-semibold text-gray-400 mb-1">
                        To
                      </p>

                      <input
                        type="text"
                        value={form.to}
                        onChange={(e) =>
                          handleChange(
                            "to",
                            e.target.value
                          )
                        }
                        placeholder="To"
                        className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none"
                      />
                    </div>

                    <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                      <p className="text-[11px] font-semibold text-gray-400 mb-1 flex items-center gap-1">
                        <FiCalendar size={11} />
                        Departure
                      </p>

                      <input
                        type="date"
                        value={form.departure}
                        onChange={(e) =>
                          handleChange(
                            "departure",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                      />
                    </div>

                    {isRoundTrip && (
                      <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                        <p className="text-[11px] font-semibold text-gray-400 mb-1 flex items-center gap-1">
                          <FiCalendar size={11} />
                          Return
                        </p>

                        <input
                          type="date"
                          value={form.returnDate}
                          onChange={(e) =>
                            handleChange(
                              "returnDate",
                              e.target.value
                            )
                          }
                          className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                        />
                      </div>
                    )}

                    <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                      <p className="text-[11px] font-semibold text-gray-400 mb-1 flex items-center gap-1">
                        <FiUsers size={11} />
                        Passengers No.
                      </p>

                      <select
                        value={form.passengers}
                        onChange={(e) =>
                          handleChange(
                            "passengers",
                            Number(e.target.value)
                          )
                        }
                        className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map(
                          (n) => (
                            <option
                              key={n}
                              value={n}
                            >
                              {n} Passenger
                              {n > 1 ? "s" : ""}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                      <p className="text-[11px] font-semibold text-gray-400 mb-1">
                        Class Type
                      </p>

                      <select
                        value={form.classType}
                        onChange={(e) =>
                          handleChange(
                            "classType",
                            e.target.value
                          )
                        }
                        className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                      >
                        {classTypes.map((c) => (
                          <option
                            key={c}
                            value={c}
                          >
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {tripType === "Multi-City" &&
                  form.cities.map(
                    (city, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-gray-100 bg-gray-50/60 overflow-hidden relative"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                          <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                            <p className="text-[11px] font-semibold text-gray-400 mb-1">
                              From
                            </p>

                            <input
                              type="text"
                              value={city.from}
                              onChange={(e) =>
                                handleCityChange(
                                  index,
                                  "from",
                                  e.target.value
                                )
                              }
                              placeholder="From"
                              className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleCitySwap(index)
                            }
                            className="hidden lg:flex absolute z-10 left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow transition-all duration-300 hover:border-blue-300 hover:rotate-180"
                          >
                            <FiRepeat
                              className="text-blue-600"
                              size={14}
                            />
                          </button>

                          <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                            <p className="text-[11px] font-semibold text-gray-400 mb-1">
                              To
                            </p>

                            <input
                              type="text"
                              value={city.to}
                              onChange={(e) =>
                                handleCityChange(
                                  index,
                                  "to",
                                  e.target.value
                                )
                              }
                              placeholder="To"
                              className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none"
                            />
                          </div>

                          <div className="px-4 py-3.5 transition-colors duration-300 hover:bg-white">
                            <p className="text-[11px] font-semibold text-gray-400 mb-1 flex items-center gap-1">
                              <FiCalendar size={11} />
                              Departure
                            </p>

                            <input
                              type="date"
                              value={city.departure}
                              onChange={(e) =>
                                handleCityChange(
                                  index,
                                  "departure",
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveCity(index)
                          }
                          className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-300"
                          title="Remove city"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )
                  )}
              </div>

              <div className="flex items-center justify-end gap-3 mt-5">
                {tripType === "Multi-City" && (
                  <button
                    type="button"
                    onClick={handleAddCity}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold px-6 py-3 rounded-full transition-all duration-300"
                  >
                    <Plus size={17} />
                    Add City
                  </button>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-sm font-bold px-7 py-3 rounded-full shadow-lg shadow-gray-300/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                >
                  Search Flight
                  <TbPlaneDeparture size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {hasSearched && (
        <div className="bg-gray-50 px-4 sm:px-8 lg:px-16 py-8">
          <div className="max-w-6xl mx-auto">
            {form.from && form.to && (
              <p className="text-sm text-gray-500 mb-4">
                Showing results for{" "}
                <span className="font-bold text-gray-800">
                  {form.from} → {form.to}
                </span>
              </p>
            )}

            <FlightFilterBar
              filters={filters}
              setFilters={setFilters}
            />

            <div>
              {filteredFlights.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-sm text-gray-500">
                  No flights match the selected filters. Try clearing a filter.
                </div>
              ) : (
                filteredFlights.map(
                  (flight, index) => (
                    <FlightResultCard
                      key={flight.id}
                      flight={flight}
                      index={index}
                      isSelected={selectedIds.includes(
                        flight.id
                      )}
                      onToggleSelect={toggleSelect}
                      setShowBookingModal={
                        setShowBookingModal
                      }
                      showBookingModal={
                        showBookingModal
                      }
                    />
                  )
                )
              )}
            </div>

            {showBookingModal && selectedFlight && (
              <div
                id="booking-flow"
                className="mt-6"
              >
                {bookingStep === 0 ? (
                  <InlineBookingCard
                    flight={selectedFlight}
                    onNext={handleNextToPassenger}
                  />
                ) : (
                  <PassengerDetails
                    flight={selectedFlight}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightHero;