import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit2, FiShare2, FiChevronDown } from "react-icons/fi";
import { FaPlane } from "react-icons/fa";

const flights = [
  {
    airline: "Air India",
    flightNos: "AI-1804, AI-1745",
    departTime: "22:00",
    departCity: "Pune, PNQ",
    departTerminal: "Terminal 2",
    duration: "9h 20m",
    layover: "4h 35m layover in DEL",
    arriveTime: "07:20",
    arriveDayOffset: "+1",
    arriveCity: "Mumbai, BOM",
    arriveTerminal: "Terminal 2",
    stops: "1 stop",
    baggage: "15KG",
    price: "AED 641",
    seatsLeft: "9 seat(s) left",
  },
  {
    airline: "Air India",
    flightNos: "AI-2548, AI-1745",
    departTime: "20:30",
    departCity: "Pune, PNQ",
    departTerminal: "Terminal 2",
    duration: "10h 50m",
    layover: "6h layover in DEL",
    layoverExtra: "Terminal Change In DEL",
    arriveTime: "07:20",
    arriveDayOffset: "+1",
    arriveCity: "Mumbai, BOM",
    arriveTerminal: "Terminal 2",
    stops: "1 stop",
    baggage: "15KG",
    price: "AED 641",
    seatsLeft: "9 seat(s) left",
  },
];

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchForm = location.state || {
    from: "Pune",
    fromCode: "PNQ",
    to: "Mumbai",
    toCode: "BOM",
    departure: "Mon, 7 September",
  };
  const [sortBy, setSortBy] = useState("Recommended");

  const handleSelect = async (flight) => {
    try {
      const response = await fetch("/api/flights/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flight, searchForm }),
      });
      await response.json();
    } catch (error) {
      console.error("Failed to select flight", error);
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Search for Flights</h1>

        <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <span className="text-sm font-semibold text-gray-800">
              {searchForm.fromCode} - {searchForm.from}
            </span>
            <FaPlane className="text-blue-600 rotate-45 hidden sm:block" size={14} />
            <span className="text-sm font-semibold text-gray-800">
              {searchForm.toCode} - {searchForm.to}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-700">
              📅 {searchForm.departure}
            </span>
          </div>
          <button
            onClick={() => navigate("/flight")}
            className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap"
          >
            <FiEdit2 size={13} /> Modify
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">1 adult</p>

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg">
            <FiShare2 size={14} /> Share Flights
          </button>
        </div>

        <div className="mt-4 bg-[#0B1120] text-white text-sm font-semibold px-5 py-3 rounded-t-2xl">
          Select flight
        </div>

        <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold text-gray-900">
              {searchForm.from} <FaPlane className="text-blue-600 rotate-45" size={14} />{" "}
              {searchForm.to}{" "}
              <span className="text-sm font-normal text-gray-400">Monday, September 7</span>
            </p>
            <div className="mt-1 flex items-center gap-4 text-sm text-blue-600 font-semibold">
              <button>&laquo; Prev Day</button>
              <button>Next Day &raquo;</button>
            </div>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 w-fit">
            Sort: {sortBy}
            <FiChevronDown size={13} className="text-gray-400" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl overflow-hidden divide-y divide-gray-100">
          {flights.map((flight, i) => (
            <div key={i} className="p-5 flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-3 lg:w-40 flex-shrink-0">
                <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FaPlane size={14} />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{flight.airline}</p>
                  <p className="text-xs text-gray-400">{flight.flightNos}</p>
                </div>
              </div>

              <div className="lg:w-28 flex-shrink-0">
                <p className="text-lg font-bold text-gray-900">{flight.departTime}</p>
                <p className="text-sm text-gray-600">{flight.departCity}</p>
                <p className="text-xs text-gray-400">{flight.departTerminal}</p>
              </div>

              <div className="flex-1 text-center min-w-[140px]">
                <p className="text-sm font-semibold text-gray-800">{flight.duration}</p>
                <div className="my-1 h-px bg-gray-200 relative">
                  <span className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <p className="text-xs text-gray-400">{flight.layover}</p>
                {flight.layoverExtra && <p className="text-xs text-gray-400">{flight.layoverExtra}</p>}
              </div>

              <div className="lg:w-28 flex-shrink-0">
                <p className="text-lg font-bold text-gray-900">
                  {flight.arriveTime} <sup className="text-red-500 text-xs">{flight.arriveDayOffset}</sup>
                </p>
                <p className="text-sm text-gray-600">{flight.arriveCity}</p>
                <p className="text-xs text-gray-400">{flight.arriveTerminal}</p>
              </div>

              <div className="lg:w-24 flex-shrink-0">
                <p className="text-sm font-semibold text-gray-800">{flight.stops}</p>
                <p className="text-xs text-gray-400">🧳 {flight.baggage}</p>
              </div>

              <div className="lg:w-40 flex-shrink-0 text-left lg:text-right">
                <p className="text-lg font-bold text-gray-900">{flight.price}</p>
                <p className="text-xs text-red-500">{flight.seatsLeft}</p>
              </div>

              <div className="flex flex-col items-start lg:items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleSelect(flight)}
                  className="bg-blue-950 hover:bg-blue-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg"
                >
                  Select
                </button>
                <button className="text-xs text-blue-600 font-medium">Flight Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;