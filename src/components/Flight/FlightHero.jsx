import React, { useMemo, useState } from "react";
import { FiRepeat, FiCalendar, FiUsers, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const tripTypes = ["One way", "Round-trip", "Multi-City"];
const classTypes = ["ECONOMY", "PREMIUM ECONOMY", "BUSINESS", "FIRST"];

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

const FlightResultCard = ({ flight, isSelected, onToggleSelect }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreFares, setShowMoreFares] = useState(false);

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
              onChange={() => onToggleSelect(flight.id)}
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

const FlightFilterSidebar = ({ filters, setFilters }) => {
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
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden sticky top-4">
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
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filters, setFilters] = useState({ airlines: [], fareType: "", stop: "" });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
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
    <div>
      <section className="bg-[#0A1628] px-4 sm:px-8 lg:px-16 py-10 sm:py-14">
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

            <form onSubmit={handleSubmit}>
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

              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-xl"
                >
                  Search Flight <TbPlaneDeparture size={17} />
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
                    />
                  ))
                )}
              </div>

              <FlightFilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightHero;