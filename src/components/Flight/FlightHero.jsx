import React, { useMemo, useState } from "react";
import { FiRepeat, FiCalendar, FiUsers, FiChevronDown, FiChevronUp, FiX , FiCreditCard  } from "react-icons/fi";
import { TbPlaneDeparture , TbWallet } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import aero from "../../assets/image/aero.png"
import {
  Plus,
  Trash2,   ArrowLeftRight,
  CalendarDays,
  Users,
  PlaneTakeoff,
} from "lucide-react";
const tripTypes = ["One way", "Round-trip", "Multi-City"];
const classTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

const SEAT_ROWS = 24;
const SEAT_COLS = ["A", "B", "C", "D", "E", "F"];
const SEAT_PRICE = 500;

const dummySeatStatus = {
  "2A": "occupied", "2B": "occupied", "2C": "blocked",
  "4D": "occupied", "4E": "occupied", "4F": "other",
  "6A": "other", "6B": "occupied",
  "9C": "blocked", "9D": "blocked",
  "12A": "occupied", "12B": "occupied", "12C": "occupied",
  "15E": "other", "15F": "occupied",
  "18B": "blocked", "18C": "occupied",
};

const seatStyles = {
  open: "bg-white border-gray-300 text-gray-300 hover:border-blue-400 hover:text-blue-400 cursor-pointer",
  selected: "bg-orange-500 border-orange-500 text-white cursor-pointer",
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


const FlightBookingModal = ({ flight, onClose, showPassengerModal, setShowPassengerModal }) => {

  return (
    <> 
     
    <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white font-bold text-base">Your Selected Booking Details</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white flex-shrink-0"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${airlineColors[flight.airline] || "bg-gray-700"} flex items-center justify-center flex-shrink-0`}>
                  <TbPlaneDeparture className="text-white" size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">{flight.airline}</p>
                    <span className="text-xs text-gray-400 font-medium">{flight.flightNo}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{flight.fareType}</p>
                </div>
              </div>
              <button className="text-xs font-bold text-orange-600 hover:text-orange-700 flex-shrink-0">
                Show Rules
              </button>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div>
                <p className="text-xs text-gray-400 font-medium">{flight.date}</p>
                <p className="text-lg font-bold text-gray-900">{flight.depTime}</p>
                <p className="text-xs text-gray-500">{flight.depCode}</p>
              </div>

              <div className="flex flex-col items-center px-2">
                <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">{flight.duration}</p>
                <div className="flex items-center gap-1 w-16 sm:w-20">
                  <span className="h-px flex-1 border-t border-dashed border-orange-400" />
                  <TbPlaneDeparture className="text-orange-500 rotate-90 flex-shrink-0" size={14} />
                  <span className="h-px flex-1 border-t border-dashed border-orange-400" />
                </div>
                <p className="text-xs font-semibold text-blue-600 mt-1 whitespace-nowrap">{flight.stops}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">{flight.date}</p>
                <p className="text-lg font-bold text-gray-900">{flight.arrTime}</p>
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
              <span className="font-semibold text-gray-800">{flight.airline}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400">Total price</p>
            <p className="text-xl font-bold text-gray-900">₹{flight.price.toFixed(2)}</p>
          </div>
          <button
           onClick={() => setShowPassengerModal(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
     
    </>
  );
};

const FlightResultCard = ({ flight, isSelected, onToggleSelect, setShowBookingModal, showBookingModal }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreFares, setShowMoreFares] = useState(false);
  // 

  const handleCheckboxClick = () => {
    onToggleSelect(flight.id);
    setShowBookingModal(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 mb-3 overflow-hidden">
      <div className="px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-lg ${airlineColors[flight.airline] || "bg-gray-700"} flex items-center justify-center flex-shrink-0`}>
              <TbPlaneDeparture className="text-white" size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{flight.airline}</p>
              <p className="text-xs text-gray-400">{flight.flightNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="text-center">
              <p className="text-base font-bold text-gray-900">{flight.depTime}</p>
              <p className="text-xs text-gray-500">{flight.depCode}</p>
            </div>
            <div className="flex-1 min-w-[110px] text-center">
              <p className="text-xs text-gray-500">{flight.duration}</p>
              <div className="flex items-center gap-1 my-1">
                <span className="h-px flex-1 border-t border-dashed border-orange-300" />
                <TbPlaneDeparture className="text-orange-400 rotate-90" size={14} />
                <span className="h-px flex-1 border-t border-dashed border-orange-300" />
              </div>
              <p className="text-xs font-semibold text-gray-600">{flight.stops}</p>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-gray-900">{flight.arrTime}</p>
              <p className="text-xs text-gray-500">{flight.arrCode}</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
            <p className="text-lg font-bold text-gray-900">₹{flight.price.toFixed(2)}</p>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxClick}
              className="accent-blue-600 w-4 h-4"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-t border-gray-50">
        <p className="text-xs text-gray-500">{flight.date}</p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          {showDetails ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
          View More Details
        </button>
      </div>

      {showDetails && (
        <div className="px-4 sm:px-6 py-3 bg-gray-50 text-xs text-gray-500 leading-relaxed border-t border-gray-100">
          Fare type: <span className="font-semibold text-gray-700">{flight.fareType}</span> · Cabin baggage
          7KG · Check-in baggage 15KG · Operated by {flight.airline}.
        </div>
      )}

      <button
        onClick={() => setShowMoreFares(!showMoreFares)}
        className="w-full flex items-center gap-1.5 justify-start px-4 sm:px-6 py-2.5 bg-blue-50 text-xs font-semibold text-blue-600 hover:bg-blue-100"
      >
        {showMoreFares ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
        View More Fares (+{flight.moreFares})
      </button>

      {showMoreFares && (
        <div className="px-4 sm:px-6 py-3 border-t border-blue-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {flight.fareType === "Refundable" ? "NON Refundable" : "Refundable"} fare
            </span>
            <span className="font-bold text-gray-900">₹{(flight.price - 400).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};


const SeatSelectionModal = ({ flight, selectedSeat, onConfirm, onClose }) => {
  const [tempSeat, setTempSeat] = useState(selectedSeat);

  const handleSeatClick = (seatId, status) => {
    if (status === "occupied" || status === "blocked" || status === "other") return;
    setTempSeat(tempSeat === seatId ? null : seatId);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-900 text-base">Select Seat for</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-[200px_1fr]">
          <div className="px-5 py-4 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-100 flex-shrink-0">
            <p className="text-lg font-bold text-blue-700">{flight.depCode} - {flight.arrCode}</p>
            <p className="text-xs text-gray-500 mb-3">{flight.date}</p>

            <p className="text-xs text-gray-500">Selected Seat</p>
            <p className="text-base font-bold text-gray-900 mb-2">{tempSeat || "-"}</p>

            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-orange-600 mb-4">₹{tempSeat ? SEAT_PRICE.toFixed(2) : "0.00"}</p>

            <p className="text-xs font-bold text-gray-700 mb-2">Pax(s) Details</p>
            <div className="space-y-2">
              {[
                { label: "Open Seat", color: "bg-white border border-gray-300" },
                { label: "Selected Seat", color: "bg-orange-500" },
                { label: "Occupied Seat", color: "bg-gray-800" },
                { label: "Block Seat", color: "bg-red-500" },
                { label: "Selected for other passenger", color: "bg-green-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded ${item.color} flex-shrink-0`} />
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 py-5 overflow-x-auto">
            <div className="inline-flex flex-col gap-2 min-w-[280px]">
              {Array.from({ length: SEAT_ROWS }, (_, i) => i + 1).map((row) => (
                <div key={row} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-4 text-right flex-shrink-0">{row}</span>
                  <div className="flex items-center gap-1.5">
                    {SEAT_COLS.slice(0, 3).map((col) => {
                      const seatId = `${row}${col}`;
                      const status = tempSeat === seatId ? "selected" : dummySeatStatus[seatId] || "open";
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId, dummySeatStatus[seatId] || "open")}
                          className={`w-7 h-7 rounded-md border flex items-center justify-center ${seatStyles[status]}`}
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
                      const status = tempSeat === seatId ? "selected" : dummySeatStatus[seatId] || "open";
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId, dummySeatStatus[seatId] || "open")}
                          className={`w-7 h-7 rounded-md border flex items-center justify-center ${seatStyles[status]}`}
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
            <p className="text-lg font-bold text-gray-900">₹{tempSeat ? SEAT_PRICE.toFixed(2) : "0.00"}</p>
          </div>
          <button
            onClick={() => { onConfirm(tempSeat); onClose(); }}
            disabled={!tempSeat}
            className="bg-gradient-to-r from-orange-500 to-orange-400 disabled:from-gray-300 disabled:to-gray-300 hover:from-orange-600 hover:to-orange-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-200 disabled:shadow-none"
          >
            Confirm Seat
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="">
      <div className="bg-white w-full sm:max-w-7xl rounded-t-3xl sm:rounded-3xl  flex flex-col mx-auto  ">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white font-bold text-base">Enter Your Details</h3>
    
        </div>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">
          <div className="px-5 py-5 space-y-4">
            <p className="text-sm font-bold text-gray-800">Passenger 1</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Passenger Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Adult</option>
                  <option>Child</option>
                  <option>Infant</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Select Title</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Title</option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">First Name</label>
                <input placeholder="First Name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Last Name</label>
                <input placeholder="Last Name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <input placeholder="Email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Select Nationality</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Select Nationality</option>
                  <option>Indian</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Passenger Mobile Number</label>
                <input placeholder="Passenger Mobile Number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Date of Birth</label>
                <input type="date" placeholder="dd-MM-yyyy" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Passport Number</label>
                <input placeholder="Passport Number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Select Passport Issuing Country</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>Select Passport Issuing Country</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Passport Expiry</label>
                <input placeholder="Passport Expiry" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400" />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2">
                Special Service Request For Trip <span className="font-bold text-gray-700">{flight.depCode} - {flight.arrCode}</span>
              </p>
              <p className="text-sm font-semibold text-blue-600 mb-3">
                {flight.depCode} - {flight.arrCode}
              </p>
              <button
                onClick={() => setShowSeatModal(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg"
              >
                <MdEventSeat size={16} />
                SEAT
              </button>

              <div className="mt-3">
                <label className="text-xs text-gray-500 mb-1 block">Selected Seat for {flight.depCode} - {flight.arrCode}</label>
                <input readOnly value={selectedSeat || ""} placeholder="Seat" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 bg-gray-50" />
              </div>
            </div>

            <label className="flex items-center gap-2 pt-2">
              <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">I Confirm That I Want To Proceed With The Booking</span>
            </label>

            <div className="pt-2">
              <p className="text-sm font-bold text-gray-800 mb-2">Choose Payment Method</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold ${
                    paymentMethod === "online" ? "border-orange-500 text-orange-600 bg-orange-50" : "border-gray-200 text-gray-500"
                  }`}
                >
                  <FiCreditCard size={16} />
                  Online
                </button>
                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold ${
                    paymentMethod === "wallet" ? "border-orange-500 text-orange-600 bg-orange-50" : "border-gray-200 text-gray-500"
                  }`}
                >
                  <TbWallet size={16} />
                  Wallet
                </button>
                <button
                 
                  className="sm:ml-auto bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 px-5 py-5 lg:sticky lg:top-0 lg:self-start">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-lg ${airlineColors[flight.airline] || "bg-gray-700"} flex items-center justify-center flex-shrink-0`}>
                <TbPlaneDeparture className="text-white" size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{flight.airline}</p>
                  <span className="text-xs text-gray-400">{flight.flightNo}</span>
                </div>
                <p className="text-xs text-gray-500">Saver (S): {flight.fareType?.slice(0, 4).toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-4">
              <div>
                <p className="text-xs text-gray-400">{flight.date}</p>
                <p className="text-base font-bold text-gray-900">{flight.depTime}</p>
                <p className="text-xs text-gray-500">{flight.depCode}</p>
              </div>
              <div className="flex flex-col items-center px-1">
                <p className="text-[10px] text-gray-400 mb-1 whitespace-nowrap">{flight.duration}</p>
                <div className="flex items-center gap-1 w-10">
                  <span className="h-px flex-1 border-t border-dashed border-orange-400" />
                  <TbPlaneDeparture className="text-orange-500 rotate-90 flex-shrink-0" size={12} />
                  <span className="h-px flex-1 border-t border-dashed border-orange-400" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{flight.date}</p>
                <p className="text-base font-bold text-gray-900">{flight.arrTime}</p>
                <p className="text-xs text-gray-500">{flight.arrCode}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
              <p className="font-bold text-gray-700">Base Fare Details</p>
              <div className="flex justify-between text-gray-600">
                <span>Adult(s) Amount:</span>
                <span>(1 x {baseFare.toFixed(2)}) = ₹{baseFare.toFixed(2)}</span>
              </div>
              <p className="font-bold text-gray-700 pt-1">Airport Taxes</p>
              <div className="flex justify-between text-gray-600">
                <span>Airport tax:</span>
                <span>₹{airportTax}</span>
              </div>
              <p className="font-bold text-gray-700 pt-1">Additional Charges</p>
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
                <span>₹{(subTotal + seatCharge).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 bg-gray-700 text-white rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Total Amount:</span>
              <span className="text-sm font-bold">₹{totalAmount.toFixed(2)}</span>
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

const InlineBookingCard = ({ flight, setShowPassengerModal }) => {

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 flex items-center justify-between">
        <h3 className="text-white font-bold text-base">Your Selected Booking Details</h3>
      </div>

      {/* Flight Info */}
      <div className="px-5 py-5">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${airlineColors[flight.airline] || "bg-gray-700"} flex items-center justify-center flex-shrink-0`}>
                <TbPlaneDeparture className="text-white" size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{flight.airline}</p>
                  <span className="text-xs text-gray-400 font-medium">{flight.flightNo}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{flight.fareType}</p>
              </div>
            </div>
            <button className="text-xs font-bold text-orange-600 hover:text-orange-700 flex-shrink-0">
              Show Rules
            </button>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div>
              <p className="text-xs text-gray-400 font-medium">{flight.date}</p>
              <p className="text-lg font-bold text-gray-900">{flight.depTime}</p>
              <p className="text-xs text-gray-500">{flight.depCode}</p>
            </div>
            <div className="flex flex-col items-center px-2">
              <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">{flight.duration}</p>
              <div className="flex items-center gap-1 w-16">
                <span className="h-px flex-1 border-t border-dashed border-orange-400" />
                <TbPlaneDeparture className="text-orange-500 rotate-90 flex-shrink-0" size={14} />
                <span className="h-px flex-1 border-t border-dashed border-orange-400" />
              </div>
              <p className="text-xs font-semibold text-blue-600 mt-1 whitespace-nowrap">{flight.stops}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">{flight.date}</p>
              <p className="text-lg font-bold text-gray-900">{flight.arrTime}</p>
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
            <span className="font-semibold text-gray-800">{flight.airline}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">Total price</p>
          <p className="text-xl font-bold text-gray-900">₹{flight.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => setShowPassengerModal(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const FlightFilterSidebar = ({ filters, setFilters, setShowBookingModal, showBookingModal, flight, setShowPassengerModal }) => {
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
    setFilters((prev) => ({ ...prev, fareType: prev.fareType === fareType ? "" : fareType }));
  };

  const setStop = (stop) => {
    setFilters((prev) => ({ ...prev, stop: prev.stop === stop ? "" : stop }));
  };

  return (
    <div> 
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden top-4">
      <div className="flex items-center justify-between bg-blue-50 px-5 py-4">
        <p className="text-sm font-bold text-gray-900">Filter Search</p>
        <button
          onClick={() => setFilters({ airlines: [], fareType: "", stop: "" })}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Clear
        </button>
      </div>

      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-3">Airlines</p>
        <div className="space-y-2.5">
          {Object.entries(airlineCounts).map(([airline, count]) => (
            <label key={airline} className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="passengers"
                  checked={filters.airlines.includes(airline)}
                  onChange={() => toggleAirline(airline)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-sm text-gray-700">{airline}</span>
              </span>
              <span className="text-xs text-gray-400">({count})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-3">Fare Type</p>
        <div className="space-y-2.5">
          {Object.entries(fareTypeCounts).map(([fareType, count]) => (
            <label key={fareType} className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fareType"
                  checked={filters.fareType === fareType}
                  onChange={() => setFareType(fareType)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-sm text-gray-700">{fareType}</span>
              </span>
              <span className="text-xs text-gray-400">{count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-sm font-bold text-gray-900 mb-3">Stop</p>
        <div className="space-y-2.5">
          {Object.entries(stopCounts).map(([stop, count]) => (
            <label key={stop} className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stop"
                  checked={filters.stop === stop}
                  onChange={() => setStop(stop)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-sm text-gray-700">{stop}</span>
              </span>
              <span className="text-xs text-gray-400">{count}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    {showBookingModal && flight && (
      <InlineBookingCard flight={flight} onClose={() => setShowBookingModal(false)} setShowPassengerModal={setShowPassengerModal} />
    )}
      
    </div>
  );
};

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
  const [filters, setFilters] = useState({ airlines: [], fareType: "", stop: "" });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false) 
   const [showPassengerModal, setShowPassengerModal] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFlightChange = (index, field, value) => {
  setForm((prev) => ({
    ...prev,
    flights: prev.flights.map((flight, i) =>
      i === index ? { ...flight, [field]: value } : flight
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

const handleCommonChange = (field, value) => {
  setForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleCityChange = (index, field, value) => {
  setForm((prev) => ({
    ...prev,
    cities: prev.cities.map((city, i) =>
      i === index ? { ...city, [field]: value } : city
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
    cities: prev.cities.filter((_, i) => i !== index),
  }));
};

  const handleSwap = () => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ airlines: [], fareType: "", stop: "" });
    setHasSearched(true);
  };

  const toggleSelect = (id) => {
    const flight = sampleFlights.find((f) => f.id === id);
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    setSelectedFlight((prev) => (prev && prev.id === id ? null : flight));
  };

  const filteredFlights = useMemo(() => {
    return sampleFlights.filter((flight) => {
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;
      if (filters.fareType && flight.fareType !== filters.fareType) return false;
      if (filters.stop && flight.stops !== filters.stop) return false;
      return true;
    });
  }, [filters]);

  const isRoundTrip = tripType === "Round-trip";

  return (
    <div className="">

     { !showPassengerModal && ( <div> 
      <section className="bg-[#0A1628] px-4 sm:px-8 lg:px-16 py-10 sm:py-14" style={{ backgroundImage: `url(${aero})` }}
 >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-6">Book Your Flight</h1>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-5">
              {tripTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === type}
                    onChange={() => setTripType(type)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className={`text-sm font-medium ${tripType === type ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>

            {/* <form onSubmit={handleSubmit}>
              <div className="bg-blue-50 rounded-xl p-4 sm:p-5">
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    isRoundTrip ? "lg:grid-cols-6" : "lg:grid-cols-5"
                  } gap-4 lg:gap-3 items-end relative`}
                >
                  <div className="lg:col-span-1">
                    <p className="text-[11px] font-semibold text-gray-500 mb-1">From</p>
                    <input
                      type="text"
                      value={form.from}
                      onChange={(e) => handleChange("from", e.target.value)}
                      placeholder="From"
                      className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none border-b border-transparent"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSwap}
                    className="hidden lg:flex absolute left-[12%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-blue-200 rounded-full items-center justify-center shadow"
                  >
                    <FiRepeat className="text-blue-600" size={14} />
                  </button>

                  <div className="lg:col-span-1">
                    <p className="text-[11px] font-semibold text-gray-500 mb-1">To</p>
                    <input
                      type="text"
                      value={form.to}
                      onChange={(e) => handleChange("to", e.target.value)}
                      placeholder="To"
                      className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none border-b border-transparent "
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                      <FiCalendar size={11} /> Departure
                    </p>
                    <input
                      type="date"
                      value={form.departure}
                      onChange={(e) => handleChange("departure", e.target.value)}
                      className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                    />
                  </div>

                  {isRoundTrip && (
                    <div className="lg:col-span-1">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                        <FiCalendar size={11} /> Return
                      </p>
                      <input
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => handleChange("returnDate", e.target.value)}
                        className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                      />
                    </div>
                  )}

                  <div className="lg:col-span-1">
                    <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                      <FiUsers size={11} /> Passengers No.
                    </p>
                    <select
                      value={form.passengers}
                      onChange={(e) => handleChange("passengers", Number(e.target.value))}
                      className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Passenger{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-1">
                    <p className="text-[11px] font-semibold text-gray-500 mb-1">Class Type</p>
                    <select
                      value={form.classType}
                      onChange={(e) => handleChange("classType", e.target.value)}
                      className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                    >
                      {classTypes.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-5">
                {tripType === "Multi-City" && (<button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-xl">
                     Add City
                   </button>)
                }
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-xl"
                >
                  Search Flight <TbPlaneDeparture size={17} />
                </button>
              </div>
            </form> */}

          <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            
            <div className="bg-blue-50 rounded-xl p-4 sm:p-5">
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  isRoundTrip ? "lg:grid-cols-6" : "lg:grid-cols-5"
                } gap-4 lg:gap-3 items-end relative`}
              >
                <div className="lg:col-span-1">
                  <p className="text-[11px] font-semibold text-gray-500 mb-1">
                    From
                  </p>

                  <input
                    type="text"
                    value={form.from}
                    onChange={(e) => handleChange("from", e.target.value)}
                    placeholder="From"
                    className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none border-b border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSwap}
                  className="hidden lg:flex absolute left-[12%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-blue-200 rounded-full items-center justify-center shadow"
                >
                  <FiRepeat className="text-blue-600" size={14} />
                </button>

                <div className="lg:col-span-1">
                  <p className="text-[11px] font-semibold text-gray-500 mb-1">
                    To
                  </p>

                  <input
                    type="text"
                    value={form.to}
                    onChange={(e) => handleChange("to", e.target.value)}
                    placeholder="To"
                    className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none border-b border-transparent"
                  />
                </div>

                <div className="lg:col-span-1">
                  <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                    <FiCalendar size={11} />
                    Departure
                  </p>

                  <input
                    type="date"
                    value={form.departure}
                    onChange={(e) =>
                      handleChange("departure", e.target.value)
                    }
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                  />
                </div>

                {isRoundTrip && (
                  <div className="lg:col-span-1">
                    <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                      <FiCalendar size={11} />
                      Return
                    </p>

                    <input
                      type="date"
                      value={form.returnDate}
                      onChange={(e) =>
                        handleChange("returnDate", e.target.value)
                      }
                      className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                    />
                  </div>
                )}

                <div className="lg:col-span-1">
                  <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                    <FiUsers size={11} />
                    Passengers No.
                  </p>

                  <select
                    value={form.passengers}
                    onChange={(e) =>
                      handleChange("passengers", Number(e.target.value))
                    }
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Passenger{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-1">
                  <p className="text-[11px] font-semibold text-gray-500 mb-1">
                    Class Type
                  </p>

                  <select
                    value={form.classType}
                    onChange={(e) =>
                      handleChange("classType", e.target.value)
                    }
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                  >
                    {classTypes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            
            {tripType === "Multi-City" &&
              form.cities.map((city, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-4 sm:p-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 items-end relative">
                    <div className="lg:col-span-1">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1">
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
                        className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none border-b border-transparent"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCitySwap(index)}
                      className="hidden lg:flex absolute left-[16%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-blue-200 rounded-full items-center justify-center shadow"
                    >
                      <FiRepeat
                        className="text-blue-600"
                        size={14}
                      />
                    </button>

                    <div className="lg:col-span-1">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1">
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
                        className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none border-b border-transparent"
                      />
                    </div>

                    <div className="lg:col-span-1">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
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
                        className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none border-b border-transparent focus:border-blue-400 pb-1"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveCity(index)}
                      className="absolute right-0 top-0 w-8 h-8 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                      title="Remove city"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center justify-end gap-3 mt-5">
            {tripType === "Multi-City" && (
              <button
                type="button"
                onClick={handleAddCity}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-xl"
              >
                <Plus size={17} />
                Add City
              </button>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-xl"
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

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
              <div>
                {filteredFlights.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-sm text-gray-500">
                    No flights match the selected filters. Try clearing a filter.
                  </div>
                ) : (
                  filteredFlights.map((flight) => (
                    <FlightResultCard
                      key={flight.id}
                      flight={flight}
                      isSelected={selectedIds.includes(flight.id)}
                      onToggleSelect={toggleSelect}
                      setShowBookingModal={setShowBookingModal} 
                      showBookingModal={showBookingModal}

                    />
                  ))
                )}
              </div>

              <FlightFilterSidebar filters={filters}  setFilters={setFilters}  setShowBookingModal={setShowBookingModal}   showBookingModal={showBookingModal} flight={selectedFlight} 
              setShowPassengerModal={setShowPassengerModal} showPassengerModal={showPassengerModal}
              />
            </div>
          </div>
        </div>
      )}
      </div> )}

       {showPassengerModal && (<PassengerDetails flight={selectedFlight} onClose={() => setShowPassengerModal(false)} />)}
    </div>
  );
};

export default FlightHero;