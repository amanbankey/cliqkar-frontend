import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiRepeat,
  FiCalendar,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCreditCard,
  FiClock,
  FiCheck,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { TbPlaneDeparture, TbWallet } from "react-icons/tb";
import { MdEventSeat } from "react-icons/md";
import { Plus, Trash2 } from "lucide-react";
import FlightImg from "../../assets/image/img2.png";
import api from "../../api/axios";
import { getAirlines } from "../../api/airlineApi";

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
  open: "bg-white border-[#d9e2ee] text-[#b6c1cf] hover:border-[#356ae6] hover:text-[#356ae6] cursor-pointer",
  selected: "bg-[#356ae6] border-[#356ae6] text-white cursor-pointer shadow-[0_5px_14px_rgba(53,106,230,0.25)]",
  occupied: "bg-[#eef1f5] border-[#dfe4ea] text-[#aab3bf] cursor-not-allowed",
  blocked: "bg-[#fff0f1] border-[#f3c6ca] text-[#e35d6a] cursor-not-allowed",
  other: "bg-[#eef9f2] border-[#c8ead5] text-[#48a86b] cursor-not-allowed",
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

const airlineTheme = {
  INDIGO: {
    logo: "6E",
    bg: "bg-[#eef4ff]",
    text: "text-[#356ae6]",
    border: "border-[#dbe7ff]",
  },
  "Air India": {
    logo: "AI",
    bg: "bg-[#fff1f1]",
    text: "text-[#d84f58]",
    border: "border-[#f5d8da]",
  },
};

const barcodePattern = [2, 1, 3, 1, 2, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 3, 2, 1];

const AIRPORT_API_URL = `${import.meta.env.VITE_API_URL || "https://cliqkar-backend.onrender.com/api"}/airports`;

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://cliqkar-backend.onrender.com/api";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

const resolveAssetUrl = (path) => {
  if (!path) return "";

  const value = String(path).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  return `${API_ORIGIN}/${value.replace(/^\/+/, "")}`;
};

const normalizeAirlineKey = (value) =>
  String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

const getAirlineLogoFromMap = (airlineMap, flight) => {
  if (!airlineMap || !flight) return "";

  const code = normalizeAirlineKey(
    firstValue(flight.airlineCode, flight.Airline_Code)
  );

  const name = normalizeAirlineKey(flight.airline);

  return (
    airlineMap.byCode?.[code]?.logo ||
    airlineMap.byName?.[name]?.logo ||
    ""
  );
};


const FLIGHT_SEARCH_API_URL = "/flights/search";

/* =========================================================
   AIRPORT AUTOCOMPLETE
========================================================= */

const AirportAutocomplete = ({
  label,
  value = "",
  selectedAirport = null,
  onChange,
  onSelect,
  placeholder = "City or airport",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (selectedAirport) {
      setQuery(
        `${selectedAirport.cityName || selectedAirport.airportName} (${selectedAirport.airportCode})`
      );
    } else {
      setQuery(value || "");
    }
  }, [value, selectedAirport]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const search = query.trim();

    // Do not load the complete airport list just by focusing the field.
    if (!open || !search) {
      setAirports([]);
      setLoading(false);
      return undefined;
    }

    const currentRequestId = ++requestIdRef.current;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          status: "Active",
          limit: "10",
          page: "1",
          search,
        });

        const response = await fetch(`${AIRPORT_API_URL}?${params.toString()}`);
        const result = await response.json();

        if (currentRequestId !== requestIdRef.current) return;

        if (!response.ok || !result?.success) {
          throw new Error(result?.message || "Failed to load airports");
        }

        setAirports(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        if (currentRequestId === requestIdRef.current) {
          console.error("Airport search error:", error);
          setAirports([]);
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query, open]);

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);
    setOpen(true);
    onChange(nextValue);
  };

  const handleSelect = (airport) => {
    setQuery(
      `${airport.cityName || airport.airportName} (${airport.airportCode})`
    );
    setAirports([]);
    setOpen(false);
    onSelect(airport);
  };

  const handleClear = () => {
    setQuery("");
    setAirports([]);
    setOpen(false);
    onChange("");
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3]">
        {label}
      </p>

      <div className="flex items-center gap-2 mt-1.5">
        <FiMapPin size={14} className="text-[#356ae6] flex-shrink-0" />

        <input
          type="text"
          value={query}
          onFocus={() => setOpen(Boolean(query.trim()))}
          onChange={handleInputChange}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full min-w-0 bg-transparent text-[13px] font-semibold text-[#263445] placeholder:text-[#a0abb8] focus:outline-none"
        />

        {loading && (
          <span className="h-3.5 w-3.5 rounded-full border-2 border-[#dbe5f5] border-t-[#356ae6] animate-spin flex-shrink-0" />
        )}

        {!loading && query && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            className="h-5 w-5 rounded-full flex items-center justify-center text-[#9aa5b3] hover:bg-[#f1f4f8] hover:text-[#526174] transition flex-shrink-0"
            aria-label={`Clear ${label}`}
          >
            <FiX size={11} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 top-[calc(100%+12px)] z-[9999] w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#e3e9f1] bg-white shadow-[0_18px_50px_rgba(19,37,63,0.16)]">
          <div className="px-3.5 pt-3 pb-2 border-b border-[#f0f3f7]">
            <p className="text-[9px] uppercase tracking-[0.14em] font-bold text-[#9aa5b3]">
              {loading ? "Searching airports" : "Airport suggestions"}
            </p>
          </div>

          <div className="max-h-[250px] overflow-y-auto overscroll-contain p-1.5">
            {loading && airports.length === 0 && (
              <div className="px-4 py-6 flex items-center justify-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-[#dbe5f5] border-t-[#356ae6] animate-spin" />
                <span className="text-[11px] font-medium text-[#7c8898]">
                  Finding airports...
                </span>
              </div>
            )}

            {!loading && airports.length === 0 && (
              <div className="px-4 py-6 text-center">
                <div className="mx-auto h-9 w-9 rounded-xl bg-[#f4f7fb] border border-[#e8edf3] flex items-center justify-center">
                  <FiMapPin size={15} className="text-[#8e9bab]" />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#526174]">
                  No airport found
                </p>
                <p className="text-[9px] text-[#9aa5b3] mt-1">
                  Try a city name, airport name or code
                </p>
              </div>
            )}

            {airports.map((airport) => (
              <button
                key={airport._id || airport.airportCode}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(airport)}
                className="group w-full text-left rounded-xl px-2.5 py-2 hover:bg-[#f5f8fd] active:bg-[#eef4ff] transition flex items-center gap-3"
              >
                <span className="h-9 w-9 rounded-xl bg-[#f2f6ff] border border-[#dfe8fa] flex items-center justify-center flex-shrink-0">
                  <TbPlaneDeparture className="text-[#356ae6]" size={15} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="text-[12px] font-bold text-[#263445] truncate">
                      {airport.cityName || airport.airportName}
                    </span>
                    <span className="rounded-md bg-[#102a43] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white flex-shrink-0">
                      {airport.airportCode}
                    </span>
                  </span>

                  <span className="block text-[9px] text-[#8b97a6] truncate mt-0.5">
                    {airport.airportName}
                    {airport.countryName ? ` • ${airport.countryName}` : ""}
                  </span>
                </span>

                <span className="text-[#c0c9d4] group-hover:text-[#356ae6] transition flex-shrink-0">
                  <FiChevronDown size={13} className="-rotate-90" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AirlineBadge = ({
  airline,
  airlineCode,
  logo,
  large = false,
}) => {
  const theme = airlineTheme[airline] || airlineTheme.INDIGO;

  const fallbackCode =
    airlineCode ||
    theme.logo ||
    airline?.slice(0, 2)?.toUpperCase() ||
    "FL";

  return (
    <div
      className={`${
        large ? "h-10 w-10 rounded-xl" : "h-9 w-9 rounded-lg"
      } ${theme.bg} ${theme.border} border flex items-center justify-center flex-shrink-0 overflow-hidden bg-white`}
      title={`${airline || "Airline"}${
        airlineCode ? ` (${airlineCode})` : ""
      }`}
    >
      {logo ? (
        <img
          src={logo}
          alt={airline || "Airline"}
          className="h-full w-full object-contain p-1.5"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            const fallback = event.currentTarget.nextElementSibling;
            if (fallback) fallback.style.display = "flex";
          }}
        />
      ) : null}

      <span
        className={`${theme.text} ${
          large ? "text-[12px]" : "text-[10px]"
        } font-extrabold ${
          logo ? "hidden" : "flex"
        } h-full w-full items-center justify-center`}
      >
        {fallbackCode}
      </span>
    </div>
  );
};

/* =========================================================
   BOOKING SUMMARY MODAL
========================================================= */

const FlightBookingModal = ({ flight, onClose, setShowPassengerModal }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-[#152238]/35 backdrop-blur-[5px] px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-[500px] rounded-t-[28px] sm:rounded-[28px] overflow-hidden max-h-[90vh] shadow-[0_30px_90px_rgba(19,37,63,0.18)] border border-white">
        <div className="px-6 py-5 border-b border-[#edf1f5] flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8c99a8]">
              Selected flight
            </p>
            <h3 className="text-[18px] font-semibold text-[#1f2d3d] mt-1">
              Booking details
            </h3>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-[#f4f6f9] hover:bg-[#e9edf3] flex items-center justify-center text-[#657286] transition"
          >
            <FiX size={17} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="rounded-[22px] border border-[#e4ebf3] bg-[#fbfcfe] p-5">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <AirlineBadge airline={flight.airline} large />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold text-[#253244]">{flight.airline}</p>
                    <span className="text-[11px] text-[#8793a2]">{flight.flightNo}</span>
                  </div>
                  <span className="inline-flex mt-1 rounded-full bg-[#edf7f1] px-2 py-1 text-[9px] font-bold text-[#3b9660]">
                    {flight.fareType}
                  </span>
                </div>
              </div>

              <button className="text-[11px] font-semibold text-[#356ae6] hover:underline">
                Fare rules
              </button>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-[10px] text-[#9aa5b3] mb-1">{flight.date}</p>
                <p className="text-[24px] leading-none font-bold text-[#1f2d3d]">{flight.depTime}</p>
                <p className="text-[12px] font-semibold text-[#637185] mt-1">{flight.depCode}</p>
              </div>

              <div className="flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] text-[#8995a5] mb-2">{flight.duration}</span>
                <div className="flex items-center w-full gap-1">
                  <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                  <TbPlaneDeparture className="text-[#356ae6] rotate-90" size={14} />
                  <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                </div>
                <span className="mt-2 text-[10px] font-bold text-[#356ae6]">{flight.stops}</span>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-[#9aa5b3] mb-1">{flight.date}</p>
                <p className="text-[24px] leading-none font-bold text-[#1f2d3d]">{flight.arrTime}</p>
                <p className="text-[12px] font-semibold text-[#637185] mt-1">{flight.arrCode}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              ["Cabin", "7 KG"],
              ["Check-in", "15 KG"],
              ["Operated by", flight.airline],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[#e9eef4] bg-white p-3">
                <p className="text-[9px] uppercase tracking-wide text-[#9aa5b3]">{label}</p>
                <p className="text-[11px] font-bold text-[#344255] mt-1 truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 border-t border-[#edf1f5] flex items-center justify-between bg-[#fcfdff]">
          <div>
            <p className="text-[10px] text-[#8d99a8]">Total fare</p>
            <p className="text-[22px] font-bold text-[#1f2d3d]">₹{Number(flight.price || 0).toFixed(0)}</p>
          </div>

          <button
            onClick={() => setShowPassengerModal(true)}
            className="rounded-xl bg-[#102a43] hover:bg-[#183b5d] text-white text-[13px] font-semibold px-7 py-3.5 shadow-[0_10px_24px_rgba(16,42,67,0.16)] transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};


/* =========================================================
   BACKEND FLIGHT -> UI FLIGHT NORMALIZER
========================================================= */

const firstValue = (...values) =>
  values.find((value) => value !== undefined && value !== null && value !== "");

const getFlightNumber = (flight) => {
  const numbers = firstValue(
    flight?.flight_numbers,
    flight?.flightNumbers,
    flight?.Flight_Numbers,
    flight?.segments?.map?.((segment) => segment?.flight_number),
    flight?.Segments?.map?.(
      (segment) =>
        `${segment?.Airline_Code || ""} ${segment?.Flight_Number || ""}`.trim()
    )
  );

  if (Array.isArray(numbers)) {
    return numbers.filter(Boolean).join(" / ") || "Flight";
  }

  return String(numbers || "Flight").trim();
};

const getAirlineCode = (flight) =>
  String(
    firstValue(
      flight?.Airline_Code,
      flight?.airline_code,
      flight?.airlineCode,
      flight?.segments?.[0]?.airline_code,
      flight?.Segments?.[0]?.Airline_Code,
      ""
    )
  ).trim().toUpperCase();

const getAirlineName = (flight) => {
  const code = getAirlineCode(flight);

  const codeNames = {
    "6E": "INDIGO",
    AI: "Air India",
    UK: "Vistara",
    SG: "SpiceJet",
    IX: "Air India Express",
    G8: "Go First",
    AK: "AirAsia",
  };

  return String(
    firstValue(
      flight?.airline,
      flight?.Airline,
      flight?.airline_name,
      flight?.Airline_Name,
      codeNames[code],
      code || "Airline"
    )
  ).trim();
};

const getDateTime = (flight, type) => {
  const isDeparture = type === "departure";

  return firstValue(
    isDeparture ? flight?.departure_datetime : flight?.arrival_datetime,
    isDeparture ? flight?.departureDateTime : flight?.arrivalDateTime,
    isDeparture ? flight?.Departure_DateTime : flight?.Arrival_DateTime,
    isDeparture ? flight?.departure_datetime_local : flight?.arrival_datetime_local,
    isDeparture
      ? flight?.segments?.[0]?.departure_datetime
      : flight?.segments?.[flight?.segments?.length - 1]?.arrival_datetime,
    isDeparture
      ? flight?.Segments?.[0]?.Departure_DateTime
      : flight?.Segments?.[flight?.Segments?.length - 1]?.Arrival_DateTime,
    ""
  );
};

const getTime = (dateTime) => {
  if (!dateTime) return "--:--";

  const value = String(dateTime).trim();
  const match = value.match(/(?:T|\s)(\d{1,2}):(\d{2})(?::\d{2})?/);

  if (match) {
    return `${String(match[1]).padStart(2, "0")}:${match[2]}`;
  }

  const timeOnly = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);

  if (timeOnly) {
    return `${String(timeOnly[1]).padStart(2, "0")}:${timeOnly[2]}`;
  }

  return "--:--";
};

const getDisplayDate = (dateTime) => {
  if (!dateTime) return "Date unavailable";

  const value = String(dateTime).trim();
  const datePart = value.split(/[T ]/)[0];

  let day;
  let month;
  let year;

  let match = datePart.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (match) {
    month = Number(match[1]);
    day = Number(match[2]);
    year = Number(match[3]);
  } else {
    match = datePart.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (match) {
      year = Number(match[1]);
      month = Number(match[2]);
      day = Number(match[3]);
    }
  }

  if (!day || !month || !year) return datePart;

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getDuration = (flight, departureDateTime, arrivalDateTime) => {
  const rawDuration = firstValue(
    flight?.duration,
    flight?.Duration,
    flight?.segments?.[0]?.duration,
    flight?.Segments?.[0]?.Duration
  );

  if (rawDuration !== undefined && rawDuration !== null && rawDuration !== "") {
    const value = String(rawDuration).trim();

    if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(value)) {
      const parts = value.split(":");
      return `${Number(parts[0])}h ${Number(parts[1])}m`;
    }

    return value;
  }

  if (departureDateTime && arrivalDateTime) {
    const departure = new Date(String(departureDateTime).replace(" ", "T"));
    const arrival = new Date(String(arrivalDateTime).replace(" ", "T"));

    if (!Number.isNaN(departure.getTime()) && !Number.isNaN(arrival.getTime())) {
      const diff = Math.max(0, arrival.getTime() - departure.getTime());
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return `${hours}h ${remainingMinutes}m`;
    }
  }

  return "Duration unavailable";
};

const getPrice = (flight) => {
  const price = flight?.price;

  const value = firstValue(
    typeof price === "number" ? price : null,
    typeof price === "string" ? price : null,
    price?.isisnetfare,
    price?.isisNetFare,
    price?.Without_Net_Fare,
    price?.withoutNetFare,
    flight?.total_price,
    flight?.Total_Amount,
    flight?.totalAmount,
    flight?.fare
  );

  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const getFareType = (flight) =>
  String(
    firstValue(
      flight?.fare_type,
      flight?.fareType,
      flight?.Fare_Type,
      flight?.other_fare?.Fare_Type,
      "Fare"
    )
  );

const getBaggage = (flight) => {
  const baggage = flight?.baggage || flight?.Baggage;

  if (!baggage) return "7 KG + 15 KG";

  const checkIn = firstValue(
    baggage?.Check_In_Baggage,
    baggage?.checkInBaggage,
    baggage?.check_in_baggage
  );

  const hand = firstValue(
    baggage?.Hand_Baggage,
    baggage?.handBaggage,
    baggage?.hand_baggage
  );

  if (checkIn && hand) return `${hand} + ${checkIn}`;
  if (checkIn) return String(checkIn);
  if (hand) return String(hand);

  return "7 KG + 15 KG";
};

const normalizeFlightForUI = (flight, index) => {
  const safeFlight = flight || {};

  const segments =
    Array.isArray(safeFlight.segments) && safeFlight.segments.length
      ? safeFlight.segments
      : Array.isArray(safeFlight.Segments)
        ? safeFlight.Segments
        : [];

  const departureDateTime = getDateTime(safeFlight, "departure");
  const arrivalDateTime = getDateTime(safeFlight, "arrival");

  const airlineCode = getAirlineCode(safeFlight);
  const airline = getAirlineName(safeFlight);

  const firstSegment = segments[0] || {};
  const lastSegment = segments[segments.length - 1] || {};

  const depCode = String(
    firstValue(
      safeFlight.origin,
      safeFlight.Origin,
      firstSegment.origin,
      firstSegment.Origin,
      "—"
    )
  ).toUpperCase();

  const arrCode = String(
    firstValue(
      safeFlight.destination,
      safeFlight.Destination,
      lastSegment.destination,
      lastSegment.Destination,
      "—"
    )
  ).toUpperCase();

  const flightNo = getFlightNumber(safeFlight);

  const rawId = firstValue(
    safeFlight.id,
    safeFlight._id,
    safeFlight.flight_id,
    safeFlight.Flight_Id,
    safeFlight.key
  );

  // Provider can return the same Flight_Id for different fare options.
  // Keep the cards separate, but make the UI id unique for React + selection.
  const fareType = getFareType(safeFlight);
  const price = getPrice(safeFlight);

  const stableId = `${
    rawId !== undefined && rawId !== null && rawId !== ""
      ? String(rawId)
      : `${airlineCode || airline}-${flightNo}-${departureDateTime}-${arrivalDateTime}`
  }__${String(fareType || "").trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_")}__${String(price || "").trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_")}__${index}`;

  const stopoversValue = firstValue(
    safeFlight.stopovers,
    safeFlight.stops,
    safeFlight.numberOfStops,
    safeFlight.Number_Of_Stops
  );

  const stopsCount =
    typeof stopoversValue === "number"
      ? stopoversValue
      : Number.isFinite(Number(stopoversValue))
        ? Number(stopoversValue)
        : Math.max(0, segments.length - 1);

  return {
    ...safeFlight,
    id: stableId,
    airline,
    airlineCode,
    flightNo,
    depTime: getTime(departureDateTime),
    arrTime: getTime(arrivalDateTime),
    depCode,
    arrCode,
    duration: getDuration(safeFlight, departureDateTime, arrivalDateTime),
    stops:
      stopsCount === 0
        ? "Non Stop"
        : `${stopsCount} Stop${stopsCount > 1 ? "s" : ""}`,
    price,
    fareType,
    date: getDisplayDate(departureDateTime),
    moreFares: Array.isArray(safeFlight.other_fares)
      ? safeFlight.other_fares.length
      : 0,
    baggage: getBaggage(safeFlight),
    refundable:
      typeof safeFlight.refundable === "boolean"
        ? safeFlight.refundable
        : null,
    rawFlight: safeFlight,
  };
};

/* =========================================================
   FLIGHT RESULT CARD — LIGHT PREMIUM TICKET
========================================================= */

const FlightResultCard = ({
  flight,
  isSelected,
  onToggleSelect,
  setShowBookingModal,
  index = 0,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreFares, setShowMoreFares] = useState(false);

  const handleSelect = () => {
    onToggleSelect(flight.id);
    setShowBookingModal(true);
  };

  return (
    <article
      className={`group relative mb-3 overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        isSelected
          ? "border-[#a9c3f8] shadow-[0_12px_32px_rgba(53,106,230,0.10)]"
          : "border-[#e4e9ef] shadow-[0_5px_18px_rgba(26,43,65,0.035)] hover:-translate-y-0.5 hover:border-[#d3deed] hover:shadow-[0_14px_30px_rgba(26,43,65,0.07)]"
      }`}
    >
      {/* subtle ticket edge */}
      <span className="hidden lg:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-[#f7f9fc] border border-[#e4e9ef] z-10" />
      <span className="hidden lg:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-[#f7f9fc] border border-[#e4e9ef] z-10" />

      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#356ae6] to-[#9db9f3]" />

      {/* top airline strip */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 border-b border-[#f0f3f7]">
        <div className="flex items-center gap-2.5 min-w-0">
          <AirlineBadge
            airline={flight.airline}
            airlineCode={flight.airlineCode}
            logo={flight.airlineLogo}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[12px] font-bold text-[#263445] truncate">
                {flight.airline || "Airline"}
              </p>
              <span className="rounded bg-[#f4f6f9] px-1.5 py-0.5 text-[9px] font-semibold text-[#7c8999]">
                {flight.flightNo || flight.airlineCode || "—"}
              </span>
            </div>
            <p className="text-[9px] text-[#9aa5b3] mt-0.5">
              Economy • {flight.fareType || "Standard"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#f4f8ff] px-2 py-1 text-[9px] font-semibold text-[#356ae6]">
            <FiShield size={10} />
            Secure fare
          </span>
          <span className="text-[9px] text-[#a0a9b5]">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* main compact ticket body */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_145px]">
        <div className="px-4 sm:px-5 py-3.5">
          <div className="grid grid-cols-[minmax(72px,0.8fr)_minmax(100px,1fr)_minmax(72px,0.8fr)] items-center gap-3 sm:gap-5">
            {/* departure */}
            <div className="min-w-0">
              <p className="text-[8px] uppercase tracking-[0.14em] font-semibold text-[#a0a9b5]">
                Departure
              </p>
              <p className="text-[19px] sm:text-[21px] leading-none font-bold text-[#1f2d3d] mt-1">
                {flight.depTime || "—"}
              </p>
              <p className="text-[12px] font-bold text-[#526174] mt-1">
                {flight.depCode || "—"}
              </p>
            </div>

            {/* route */}
            <div className="flex min-w-0 flex-col items-center">
              <div className="flex items-center gap-1.5 text-[9px] text-[#929dab] mb-1.5 whitespace-nowrap">
                <span>{flight.duration || "Duration unavailable"}</span>
              </div>

              <div className="w-full flex items-center gap-1">
                <span className="h-px flex-1 bg-[#dbe2eb]" />
                <span className="h-6 w-6 rounded-full bg-[#f1f6ff] border border-[#dce8fc] flex items-center justify-center flex-shrink-0">
                  <TbPlaneDeparture
                    className="text-[#356ae6] -rotate-45"
                    size={12}
                  />
                </span>
                <span className="h-px flex-1 bg-[#dbe2eb]" />
              </div>

              <span className="mt-1.5 rounded-full bg-[#f1f8f4] px-2 py-0.5 text-[8px] font-bold text-[#4a9868] whitespace-nowrap">
                {flight.stops || "Non-stop"}
              </span>
            </div>

            {/* arrival */}
            <div className="text-right min-w-0">
              <p className="text-[8px] uppercase tracking-[0.14em] font-semibold text-[#a0a9b5]">
                Arrival
              </p>
              <p className="text-[19px] sm:text-[21px] leading-none font-bold text-[#1f2d3d] mt-1">
                {flight.arrTime || "—"}
              </p>
              <p className="text-[12px] font-bold text-[#526174] mt-1">
                {flight.arrCode || "—"}
              </p>
            </div>
          </div>

          {/* important details kept visible without increasing card height */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-dashed border-[#edf1f5] pt-2.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[8px] uppercase tracking-wide font-semibold text-[#a2acb8]">
                Date
              </span>
              <span className="text-[9px] font-semibold text-[#5b6879] truncate">
                {flight.date || "—"}
              </span>
            </div>

            <span className="h-3 w-px bg-[#e5eaf0] hidden sm:block" />

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[8px] uppercase tracking-wide font-semibold text-[#a2acb8]">
                Baggage
              </span>
              <span className="text-[9px] font-semibold text-[#5b6879] truncate">
                {flight.baggage || "Not specified"}
              </span>
            </div>

            <span className="h-3 w-px bg-[#e5eaf0] hidden sm:block" />

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[8px] uppercase tracking-wide font-semibold text-[#a2acb8]">
                Fare
              </span>
              <span className="text-[9px] font-semibold text-[#5b6879] truncate">
                {flight.fareType || "Standard"}
              </span>
            </div>
          </div>
        </div>

        {/* price + CTA */}
        <div className="relative border-t lg:border-t-0 lg:border-l border-dashed border-[#dce3eb] bg-[#fbfcfe] px-4 py-3 flex flex-row lg:flex-col items-center lg:items-stretch justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-[0.14em] font-bold text-[#9ba6b4]">
              Starting from
            </p>
            <p className="text-[19px] leading-none font-bold text-[#1f2d3d] mt-1">
              ₹{Number(flight.price || 0).toFixed(0)}
            </p>
            <p className="text-[8px] text-[#9aa5b3] mt-1">
              per passenger
            </p>
          </div>

          <div className="flex lg:flex-col items-center lg:items-stretch gap-2">
            <button
              type="button"
              onClick={handleSelect}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-[10px] font-bold transition ${
                isSelected
                  ? "bg-[#356ae6] text-white shadow-[0_7px_16px_rgba(53,106,230,0.18)]"
                  : "bg-[#102a43] text-white hover:bg-[#183b5d]"
              }`}
            >
              {isSelected ? "Selected" : "Select Flight"}
            </button>

            <label className="flex items-center justify-center gap-1.5 cursor-pointer text-[9px] font-semibold text-[#6d7b8d] whitespace-nowrap">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
                className="h-3.5 w-3.5 accent-[#356ae6]"
              />
              Compare
            </label>
          </div>
        </div>
      </div>

      {/* bottom actions */}
      <div className="border-t border-[#eef2f6]">
        <div className="flex items-center justify-between gap-2 px-4 sm:px-5 py-2">
          <span className="text-[8px] text-[#a0a9b5]">
            Flight ID #{String(flight.id || "").padStart(6, "0")}
          </span>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#536b8d] hover:text-[#356ae6] transition"
            >
              {showDetails ? (
                <FiChevronUp size={11} />
              ) : (
                <FiChevronDown size={11} />
              )}
              Flight details
            </button>

            <button
              type="button"
              onClick={() => setShowMoreFares(!showMoreFares)}
              className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#356ae6] hover:text-[#285bd0] transition"
            >
              {showMoreFares ? (
                <FiChevronUp size={11} />
              ) : (
                <FiChevronDown size={11} />
              )}
              +{flight.moreFares || 0} fare
              {Number(flight.moreFares || 0) > 1 ? "s" : ""}
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="px-4 sm:px-5 pb-3">
            <div className="rounded-lg bg-[#f8fafc] border border-[#edf1f5] px-3 py-2 text-[9px] leading-4 text-[#758294]">
              Fare type:{" "}
              <span className="font-semibold text-[#4e5c70]">
                {flight.fareType || "Standard"}
              </span>
              {" "}• Baggage {flight.baggage || "Not specified"} • Operated by{" "}
              {flight.airline || "Airline"}.
            </div>
          </div>
        )}

        {showMoreFares && (
          <div className="px-4 sm:px-5 pb-3">
            <div className="flex items-center justify-between rounded-lg bg-[#f4f8ff] border border-[#dfe9fb] px-3 py-2 text-[10px]">
              <span className="text-[#617087]">
                {flight.fareType === "Refundable"
                  ? "Non Refundable"
                  : "Refundable"}{" "}
                fare
              </span>
              <span className="font-bold text-[#263445]">
                ₹{Math.max(Number(flight.price || 0) - 400, 0).toFixed(0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

/* =========================================================
   SEAT SELECTION MODAL
========================================================= */

const SeatSelectionModal = ({ flight, selectedSeat, onConfirm, onClose }) => {
  const [tempSeat, setTempSeat] = useState(selectedSeat);

  const handleSeatClick = (seatId, status) => {
    if (status !== "open") return;
    setTempSeat(tempSeat === seatId ? null : seatId);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-[#152238]/35 backdrop-blur-[5px] px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-3xl rounded-t-[28px] sm:rounded-[28px] overflow-hidden max-h-[92vh] shadow-[0_30px_90px_rgba(19,37,63,0.20)]">
        <div className="px-6 py-5 border-b border-[#edf1f5] flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8c99a8]">Seat selection</p>
            <h3 className="text-[18px] font-semibold text-[#1f2d3d] mt-1">
              Choose your preferred seat
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-[#f4f6f9] hover:bg-[#e9edf3] flex items-center justify-center text-[#657286]"
          >
            <FiX size={17} />
          </button>
        </div>

        <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-[210px_1fr] max-h-[65vh]">
          <div className="px-6 py-6 bg-[#fbfcfe] border-b sm:border-b-0 sm:border-r border-[#edf1f5]">
            <p className="text-[20px] font-bold text-[#25364a]">{flight.depCode} <span className="text-[#a0acb9]">→</span> {flight.arrCode}</p>
            <p className="text-[10px] text-[#929eac] mt-1">{flight.date}</p>

            <div className="mt-6 rounded-2xl border border-[#e7edf4] bg-white p-4">
              <p className="text-[9px] uppercase tracking-wide text-[#9aa5b3]">Selected seat</p>
              <p className="text-[20px] font-bold text-[#263445] mt-1">{tempSeat || "—"}</p>
              <div className="mt-3 pt-3 border-t border-[#eef2f6] flex justify-between items-end">
                <span className="text-[10px] text-[#8d99a8]">Seat charge</span>
                <span className="text-[16px] font-bold text-[#356ae6]">₹{tempSeat ? SEAT_PRICE : 0}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {[
                ["Open", "bg-white border border-[#d9e2ee]"],
                ["Selected", "bg-[#356ae6]"],
                ["Occupied", "bg-[#eef1f5] border border-[#dfe4ea]"],
                ["Blocked", "bg-[#fff0f1] border border-[#f3c6ca]"],
                ["Other passenger", "bg-[#eef9f2] border border-[#c8ead5]"],
              ].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={`h-4 w-4 rounded ${color}`} />
                  <span className="text-[10px] text-[#667487]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-7 overflow-x-auto">
            <div className="inline-flex flex-col gap-2 min-w-[310px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4" />
                {SEAT_COLS.map((col) => (
                  <span key={col} className={`w-8 text-center text-[9px] font-bold text-[#9aa5b3] ${col === "D" ? "ml-3" : ""}`}>
                    {col}
                  </span>
                ))}
              </div>

              {Array.from({ length: SEAT_ROWS }, (_, i) => i + 1).map((row) => (
                <div key={row} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#a1acb8] w-4 text-right">{row}</span>

                  {SEAT_COLS.map((col, colIndex) => {
                    const seatId = `${row}${col}`;
                    const rawStatus = dummySeatStatus[seatId] || "open";
                    const status = tempSeat === seatId ? "selected" : rawStatus;

                    return (
                      <React.Fragment key={seatId}>
                        {colIndex === 3 && <span className="w-3" />}
                        <button
                          type="button"
                          onClick={() => handleSeatClick(seatId, rawStatus)}
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${seatStyles[status]}`}
                          title={seatId}
                        >
                          <MdEventSeat size={14} />
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#edf1f5] bg-[#fcfdff] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#8d99a8]">Seat total</p>
            <p className="text-[19px] font-bold text-[#263445]">₹{tempSeat ? SEAT_PRICE : 0}</p>
          </div>

          <button
            onClick={() => {
              onConfirm(tempSeat);
              onClose();
            }}
            disabled={!tempSeat}
            className="rounded-xl bg-[#102a43] hover:bg-[#183b5d] disabled:bg-[#d8dee7] text-white text-[12px] font-semibold px-7 py-3.5 transition"
          >
            Confirm Seat
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PASSENGER DETAILS
========================================================= */

const PassengerDetails = ({ flight, onBack }) => {
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const baseFare = flight.price;
  const airportTax = Math.round(flight.price * 0.35);
  const subTotal = baseFare + airportTax;
  const seatCharge = selectedSeat ? SEAT_PRICE : 0;
  const totalAmount = subTotal + seatCharge;

  const inputClass =
    "w-full h-11 rounded-xl border border-[#e1e7ef] bg-white px-3.5 text-[12px] text-[#445268] placeholder:text-[#a1acb8] outline-none transition focus:border-[#9eb8eb] focus:ring-4 focus:ring-[#356ae6]/[0.06]";

  return (
    <div className="w-full">
      <div className="rounded-[24px] border border-[#e4eaf1] bg-white shadow-[0_12px_38px_rgba(26,43,65,0.06)] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#edf1f5] flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8d99a8]">Step 2 of 2</p>
            <h3 className="text-[19px] font-semibold text-[#1f2d3d] mt-1">Passenger details</h3>
          </div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-[#dfe6ee] bg-white px-4 py-2.5 text-[10px] font-bold text-[#617087] hover:bg-[#f7f9fc] transition"
            >
              Back to flight
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#f1f6ff] px-3 py-1.5 text-[10px] font-semibold text-[#356ae6]">
            <FiCheck size={12} />
            Flight selected
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px]">
          <div className="px-5 sm:px-7 py-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-bold text-[#263445]">Passenger 1</p>
                <p className="text-[10px] text-[#929eac] mt-1">Enter details exactly as shown on the travel document.</p>
              </div>
              <span className="rounded-full bg-[#f7f9fc] border border-[#e8edf3] px-3 py-1 text-[9px] font-semibold text-[#758294]">Adult</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Passenger Type", "select", ["Adult", "Child", "Infant"]],
                ["Select Title", "select", ["Title", "Mr", "Mrs", "Ms"]],
                ["First Name", "input", "First Name"],
                ["Last Name", "input", "Last Name"],
                ["Email", "input", "Email"],
                ["Select Nationality", "select", ["Select Nationality", "Indian"]],
                ["Passenger Mobile Number", "input", "Passenger Mobile Number"],
                ["Date of Birth", "date", ""],
                ["Passport Number", "input", "Passport Number"],
                ["Select Passport Issuing Country", "select", ["Select Passport Issuing Country"]],
                ["Passport Expiry", "input", "Passport Expiry"],
              ].map(([label, type, options]) => (
                <div key={label}>
                  <label className="block mb-1.5 text-[10px] font-semibold text-[#647286]">{label}</label>
                  {type === "select" ? (
                    <select className={inputClass}>
                      {options.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input type={type === "date" ? "date" : "text"} placeholder={type === "date" ? undefined : options} className={inputClass} />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-[#e8edf3] bg-[#fbfcfe] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wide font-bold text-[#8d99a8]">Special service request</p>
                  <p className="text-[13px] font-bold text-[#344255] mt-1">{flight.depCode} → {flight.arrCode}</p>
                </div>

                <button
                  onClick={() => setShowSeatModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#dce5f0] hover:border-[#9db8e8] hover:bg-[#f5f8fd] px-4 py-2.5 text-[11px] font-bold text-[#356ae6] transition"
                >
                  <MdEventSeat size={16} />
                  {selectedSeat ? `Seat ${selectedSeat}` : "Choose seat"}
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[10px] text-[#8591a0]">
                <FiCheck className="text-[#4da46e]" />
                Seat selection is optional
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 accent-[#356ae6]" />
              <span className="text-[11px] leading-5 text-[#667487]">
                I confirm that the passenger information is correct and I want to proceed with this booking.
              </span>
            </label>

            <div className="mt-7 pt-6 border-t border-[#edf1f5]">
              <p className="text-[13px] font-bold text-[#344255] mb-3">Choose payment method</p>

              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-[11px] font-bold transition ${
                    paymentMethod === "online"
                      ? "border-[#9db8ed] bg-[#f2f6ff] text-[#356ae6]"
                      : "border-[#e1e7ef] bg-white text-[#748093]"
                  }`}
                >
                  <FiCreditCard size={15} />
                  Online payment
                </button>

                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-[11px] font-bold transition ${
                    paymentMethod === "wallet"
                      ? "border-[#9db8ed] bg-[#f2f6ff] text-[#356ae6]"
                      : "border-[#e1e7ef] bg-white text-[#748093]"
                  }`}
                >
                  <TbWallet size={16} />
                  Wallet
                </button>

                <button className="sm:ml-auto rounded-xl bg-[#102a43] hover:bg-[#183b5d] text-white text-[12px] font-bold px-8 py-3.5 shadow-[0_10px_24px_rgba(16,42,67,0.14)] transition">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <aside className="bg-[#fbfcfe] border-t xl:border-t-0 xl:border-l border-[#edf1f5] px-5 sm:px-6 py-6">
            <div className="rounded-[20px] bg-white border border-[#e5ebf2] p-5">
              <div className="flex items-center gap-3">
                <AirlineBadge airline={flight.airline} large />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-bold text-[#263445]">{flight.airline}</p>
                    <span className="text-[10px] text-[#8b97a6]">{flight.flightNo}</span>
                  </div>
                  <p className="text-[10px] text-[#929eac] mt-1">Economy • {flight.fareType}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <div>
                  <p className="text-[9px] text-[#9aa5b3]">{flight.date}</p>
                  <p className="text-[18px] font-bold text-[#263445] mt-1">{flight.depTime}</p>
                  <p className="text-[11px] font-semibold text-[#617087]">{flight.depCode}</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-[#9aa5b3]">{flight.duration}</span>
                  <div className="flex items-center gap-1 w-14 my-2">
                    <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                    <TbPlaneDeparture className="text-[#356ae6] -rotate-45" size={12} />
                    <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                  </div>
                  <span className="text-[9px] font-bold text-[#4a9868]">{flight.stops}</span>
                </div>

                <div className="text-right">
                  <p className="text-[9px] text-[#9aa5b3]">{flight.date}</p>
                  <p className="text-[18px] font-bold text-[#263445] mt-1">{flight.arrTime}</p>
                  <p className="text-[11px] font-semibold text-[#617087]">{flight.arrCode}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[20px] bg-white border border-[#e5ebf2] p-5">
              <p className="text-[12px] font-bold text-[#344255]">Fare summary</p>

              <div className="mt-4 space-y-3 text-[10px]">
                <div className="flex justify-between text-[#758294]">
                  <span>Base fare</span>
                  <span className="font-semibold text-[#526174]">₹{baseFare.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[#758294]">
                  <span>Airport taxes</span>
                  <span className="font-semibold text-[#526174]">₹{airportTax}</span>
                </div>
                <div className="flex justify-between text-[#758294]">
                  <span>Service fee</span>
                  <span className="font-semibold text-[#526174]">₹0</span>
                </div>
                {selectedSeat && (
                  <div className="flex justify-between text-[#758294]">
                    <span>Seat ({selectedSeat})</span>
                    <span className="font-semibold text-[#526174]">₹{SEAT_PRICE}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-[#edf1f5] flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#9aa5b3]">Total amount</p>
                  <p className="text-[25px] leading-none font-bold text-[#1f2d3d] mt-1">₹{totalAmount.toFixed(0)}</p>
                </div>
                <span className="rounded-full bg-[#edf8f1] px-2 py-1 text-[9px] font-bold text-[#479767]">Secure</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-[#8b97a6]">
              <FiShield className="text-[#4b9b6b]" size={13} />
              Your payment information is securely handled.
            </div>
          </aside>
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
   SELECTED FLIGHT SUMMARY
========================================================= */

const InlineBookingCard = ({ flight, onNext }) => {
  return (
    <div className="mt-6 rounded-[24px] border border-[#e4eaf1] bg-white shadow-[0_12px_38px_rgba(26,43,65,0.06)] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#edf1f5] flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8d99a8]">Step 1 of 2</p>
          <h3 className="text-[19px] font-semibold text-[#1f2d3d] mt-1">Review your flight</h3>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#edf8f1] px-3 py-1.5 text-[10px] font-bold text-[#4b9868]">
          <FiCheck size={12} />
          Selected
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <div className="rounded-[22px] border border-[#e3eaf2] bg-[#fbfcfe] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <AirlineBadge airline={flight.airline} large />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-bold text-[#263445]">{flight.airline}</p>
                  <span className="text-[11px] text-[#8995a4]">{flight.flightNo}</span>
                </div>
                <p className="text-[10px] text-[#929eac] mt-1">{flight.fareType} • Economy</p>
              </div>
            </div>

            <button className="text-[10px] font-bold text-[#356ae6] hover:underline">View fare rules</button>
          </div>

          <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div>
              <p className="text-[10px] text-[#9aa5b3]">{flight.date}</p>
              <p className="text-[25px] leading-none font-bold text-[#1f2d3d] mt-1">{flight.depTime}</p>
              <p className="text-[12px] font-bold text-[#5d6c80] mt-1">{flight.depCode}</p>
            </div>

            <div className="flex flex-col items-center min-w-[110px]">
              <p className="text-[10px] text-[#929eac]">{flight.duration}</p>
              <div className="w-full flex items-center gap-1.5 my-2">
                <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                <span className="h-7 w-7 rounded-full bg-[#f1f6ff] border border-[#dce8fc] flex items-center justify-center">
                  <TbPlaneDeparture className="text-[#356ae6] -rotate-45" size={13} />
                </span>
                <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
              </div>
              <span className="rounded-full bg-[#edf8f1] px-2 py-1 text-[9px] font-bold text-[#4a9868]">{flight.stops}</span>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-[#9aa5b3]">{flight.date}</p>
              <p className="text-[25px] leading-none font-bold text-[#1f2d3d] mt-1">{flight.arrTime}</p>
              <p className="text-[12px] font-bold text-[#5d6c80] mt-1">{flight.arrCode}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            [FiClock, "Duration", flight.duration],
            [FiMapPin, "Route", `${flight.depCode} → ${flight.arrCode}`],
            [FiShield, "Baggage", "7 KG + 15 KG"],
          ].map(([Icon, label, value]) => (
            <div key={label} className="rounded-xl border border-[#e8edf3] bg-white px-4 py-3 flex items-center gap-3">
              <span className="h-8 w-8 rounded-lg bg-[#f4f7fb] flex items-center justify-center text-[#6e7d91]">
                <Icon size={14} />
              </span>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#9aa5b3]">{label}</p>
                <p className="text-[11px] font-bold text-[#526174] mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-7 py-5 border-t border-[#edf1f5] bg-[#fcfdff] flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#8d99a8]">Total fare</p>
          <p className="text-[23px] font-bold text-[#1f2d3d]">₹{Number(flight.price || 0).toFixed(0)}</p>
        </div>

        <button
          onClick={onNext}
          className="rounded-xl bg-[#102a43] hover:bg-[#183b5d] text-white text-[12px] font-bold px-8 py-3.5 shadow-[0_10px_24px_rgba(16,42,67,0.14)] transition"
        >
          Continue to passenger details
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   FILTER BAR
========================================================= */

const FlightFilterBar = ({ filters, setFilters, flights = [] }) => {
  const airlineCounts = flights.reduce((acc, f) => {
    acc[f.airline] = (acc[f.airline] || 0) + 1;
    return acc;
  }, {});

  const fareTypeCounts = flights.reduce((acc, f) => {
    acc[f.fareType] = (acc[f.fareType] || 0) + 1;
    return acc;
  }, {});

  const stopCounts = flights.reduce((acc, f) => {
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
      fareType: prev.fareType === fareType ? "" : fareType,
    }));
  };

  const setStop = (stop) => {
    setFilters((prev) => ({
      ...prev,
      stop: prev.stop === stop ? "" : stop,
    }));
  };

  return (
    <div className="mb-5 rounded-[20px] border border-[#e5ebf2] bg-white shadow-[0_6px_24px_rgba(26,43,65,0.035)] px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#8d99a8]">Airlines</span>
          {Object.entries(airlineCounts).map(([airline, count]) => (
            <label key={airline} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
                className="h-3.5 w-3.5 accent-[#356ae6]"
              />
              <span className="text-[11px] font-medium text-[#59687b]">{airline}</span>
              <span className="text-[9px] text-[#a1acb8]">({count})</span>
            </label>
          ))}
        </div>

        <span className="hidden md:block w-px h-6 bg-[#edf1f5]" />

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#8d99a8]">Fare</span>
          {Object.entries(fareTypeCounts).map(([fareType, count]) => (
            <label key={fareType} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fareType"
                checked={filters.fareType === fareType}
                onChange={() => setFareType(fareType)}
                className="h-3.5 w-3.5 accent-[#356ae6]"
              />
              <span className="text-[11px] font-medium text-[#59687b]">{fareType}</span>
              <span className="text-[9px] text-[#a1acb8]">({count})</span>
            </label>
          ))}
        </div>

        <span className="hidden md:block w-px h-6 bg-[#edf1f5]" />

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#8d99a8]">Stops</span>
          {Object.entries(stopCounts).map(([stop, count]) => (
            <label key={stop} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stop"
                checked={filters.stop === stop}
                onChange={() => setStop(stop)}
                className="h-3.5 w-3.5 accent-[#356ae6]"
              />
              <span className="text-[11px] font-medium text-[#59687b]">{stop}</span>
              <span className="text-[9px] text-[#a1acb8]">({count})</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => setFilters({ airlines: [], fareType: "", stop: "" })}
          className="md:ml-auto text-[10px] font-bold text-[#356ae6] hover:text-[#285bd0]"
        >
          Clear all
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
  const [form, setForm] = useState({ from:"", to:"", departure:"", returnDate:"", passengers:1, adults:1, children:0, infants:0, classType:"ECONOMY", cities:[] });
  const [fromAirport,setFromAirport]=useState(null);
  const [toAirport,setToAirport]=useState(null);
  const [hasSearched,setHasSearched]=useState(false);
  const [flights,setFlights]=useState([]);
  const [selectedIds,setSelectedIds]=useState([]);
  const [selectedFlight,setSelectedFlight]=useState(null);
  const [filters,setFilters]=useState({airlines:[],fareType:"",stop:""});
  const [airlineMap, setAirlineMap] = useState({
    byCode: {},
    byName: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const FLIGHTS_PER_PAGE = 8;
  const [showBookingModal,setShowBookingModal]=useState(false);
  const [bookingStep,setBookingStep]=useState(0);
  const [searching,setSearching]=useState(false);
  const [searchError,setSearchError]=useState("");
  const [showPassengerPicker,setShowPassengerPicker]=useState(false);
  const passengerRef=useRef(null);
  useEffect(()=>{const f=e=>{if(passengerRef.current&&!passengerRef.current.contains(e.target))setShowPassengerPicker(false)};document.addEventListener("mousedown",f);return()=>document.removeEventListener("mousedown",f)},[]);

  useEffect(() => {
    let cancelled = false;

    const loadAirlines = async () => {
      try {
        const response = await getAirlines({
          status: "Active",
          page: 1,
          limit: 1000,
        });

        const list = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];

        if (cancelled) return;

        const byCode = {};
        const byName = {};

        list.forEach((airline) => {
          if (!airline) return;

          const item = {
            ...airline,
            logo: resolveAssetUrl(airline.logo),
          };

          const codeKey = normalizeAirlineKey(airline.code);
          const nameKey = normalizeAirlineKey(airline.name);

          if (codeKey) byCode[codeKey] = item;
          if (nameKey) byName[nameKey] = item;
        });

        setAirlineMap({ byCode, byName });
        console.log("AIRLINE LOGOS LOADED:", list.length);
      } catch (error) {
        console.error("Airline logo fetch error:", error);
      }
    };

    loadAirlines();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalPassengers=Number(form.adults)+Number(form.children)+Number(form.infants);
  const handleChange=(field,value)=>setForm(p=>({...p,[field]:value}));
  const updatePassengerCount=(type,delta)=>setForm(p=>{const n={adults:Number(p.adults),children:Number(p.children),infants:Number(p.infants)};n[type]=Math.max(0,n[type]+delta);if(n.adults<1)n.adults=1;if(n.infants>n.adults)n.infants=n.adults;const total=n.adults+n.children+n.infants;if(total>9)return p;return {...p,...n,passengers:total}});
  const handleCitySwap=i=>setForm(p=>({...p,cities:p.cities.map((c,j)=>j===i?{...c,from:c.to,to:c.from}:c)}));
  const handleCityChange=(i,field,value)=>setForm(p=>({...p,cities:p.cities.map((c,j)=>j===i?{...c,[field]:value}:c)}));
  const handleAddCity=()=>setForm(p=>({...p,cities:[...p.cities,{from:p.cities.length?p.cities[p.cities.length-1].to:p.to,to:"",departure:""}]}));
  const handleRemoveCity=i=>setForm(p=>({...p,cities:p.cities.filter((_,j)=>j!==i)}));
  const handleSwap=()=>{setForm(p=>({...p,from:p.to,to:p.from}));setFromAirport(toAirport);setToAirport(fromAirport)};
  const validateSearch=()=>{if(!fromAirport?.airportCode)return "Please select a departure airport.";if(!toAirport?.airportCode)return "Please select an arrival airport.";if(form.from===form.to)return "Departure and arrival airports cannot be the same.";if(!form.departure)return "Please select a departure date.";if(tripType==="Round-trip"){if(!form.returnDate)return "Please select a return date.";if(form.returnDate<form.departure)return "Return date cannot be before departure date."}if(form.adults<1)return "At least one adult passenger is required.";if(form.infants>form.adults)return "Infants cannot be more than adults.";if(tripType==="Multi-City"&&form.cities.some(c=>!c.from||!c.to||!c.departure))return "Please complete all multi-city routes.";return ""};
  const handleSubmit=async e=>{e.preventDefault();const err=validateSearch();if(err){setSearchError(err);setHasSearched(true);return}setSearchError("");setSearching(true);setHasSearched(true);setFlights([]);setFilters({airlines:[],fareType:"",stop:""});setSelectedIds([]);setSelectedFlight(null);setShowBookingModal(false);setBookingStep(0);try{const payload={
  tripType,
  origin: form.from,
  destination: form.to,
  departureDate: form.departure,
  returnDate: tripType === "Round-trip" ? form.returnDate : "",
  adults: Number(form.adults),
  children: Number(form.children),
  infants: Number(form.infants),
  passengers: totalPassengers,
  classType: form.classType,
  cities: tripType === "Multi-City" ? form.cities : [],
};const r=await api.post(FLIGHT_SEARCH_API_URL,payload);
const result=r?.data;

console.log("========== FRONTEND FLIGHT SEARCH RESPONSE ==========");
console.log("API STATUS:", r?.status);
console.log("API RESPONSE:", result);
console.log("TOTAL FLIGHTS FROM API:", result?.total_flights);
console.log("FLIGHTS ARRAY:", result?.flights);
console.log("====================================================");

if(!result?.success){
  throw new Error(result?.message || "Flight search failed.");
}

// Current backend response keeps flights directly at result.flights.
// The fallbacks keep this component compatible with wrapped responses too.
const rawFlights =
  Array.isArray(result?.flights)
    ? result.flights
    : Array.isArray(result?.data?.flights)
      ? result.data.flights
      : Array.isArray(result?.data)
        ? result.data
        : [];

const data = rawFlights.map((flight, index) => {
    const normalized = normalizeFlightForUI(flight, index);

    return {
      ...normalized,
      airlineLogo: getAirlineLogoFromMap(airlineMap, normalized),
    };
  });

console.log("RAW FLIGHT COUNT:", rawFlights.length);
console.log("FIRST RAW FLIGHT:", rawFlights[0]);
console.log("FIRST UI FLIGHT:", data[0]);
console.log("NORMALIZED FRONTEND FLIGHTS:", data);
console.log("NORMALIZED FLIGHT COUNT:", data.length);

setFlights(data);

if(!data.length){
  setSearchError(result?.message || "No flights found for this route.");
}}catch(error){console.error("Flight search error:",error);setFlights([]);setSearchError(error?.response?.data?.message||error?.message||"Unable to search flights right now.")}finally{setSearching(false);setTimeout(()=>document.getElementById("flight-results")?.scrollIntoView({behavior:"smooth",block:"start"}),100)}};

  useEffect(() => {
    if (!flights.length) return;

    setFlights((currentFlights) =>
      currentFlights.map((flight) => ({
        ...flight,
        airlineLogo: getAirlineLogoFromMap(airlineMap, flight),
      }))
    );
  }, [airlineMap]);

  const toggleSelect=id=>{
  const flight=flights.find(f=>String(f.id)===String(id));
  if(!flight)return;

  const flightId=String(flight.id);

  // Only one flight can be selected at a time.
  // Clicking another card simply moves the selection to that card.
  setSelectedIds([flightId]);
  setSelectedFlight(flight);
  setBookingStep(0);
};
  const handleNextToPassenger=()=>{setBookingStep(1);setTimeout(()=>document.getElementById("booking-flow")?.scrollIntoView({behavior:"smooth",block:"start"}),50)};
  const filteredFlights=useMemo(()=>flights.filter(f=>{if(filters.airlines.length&&!filters.airlines.includes(f.airline))return false;if(filters.fareType&&f.fareType!==filters.fareType)return false;if(filters.stop&&f.stops!==filters.stop)return false;return true}),[flights,filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFlights.length / FLIGHTS_PER_PAGE)
  );

  const paginatedFlights = useMemo(() => {
    const start = (currentPage - 1) * FLIGHTS_PER_PAGE;
    return filteredFlights.slice(start, start + FLIGHTS_PER_PAGE);
  }, [filteredFlights, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, flights.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = end - maxVisible + 1;
    }

    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
  }, [currentPage, totalPages]);

  const isRoundTrip = tripType === "Round-trip";

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#263445]">
      <section className="relative overflow-visible px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src={FlightImg} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-white/58" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/35 to-[#f7f9fc]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#52657d] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ca36b]" />
              Smart flight booking
            </span>

            <h1 className="mt-5 text-[36px] sm:text-[54px] leading-[1.04] font-bold tracking-[-0.035em] text-[#132238]">
              Find your next flight
              <span className="block text-[#356ae6]">with less effort.</span>
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-[13px] sm:text-[15px] leading-6 text-[#657286]">
              Compare airlines, explore fares and choose your journey from one simple booking experience.
            </p>
          </div>

          <div className="relative mt-10 max-w-6xl mx-auto">
            <div className="rounded-[28px] border border-white/80 bg-white/76 backdrop-blur-xl shadow-[0_24px_70px_rgba(31,58,91,0.12)] p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="inline-flex items-center gap-1 rounded-full bg-[#f1f4f8] p-1">
                  {tripTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className={`rounded-full px-4 py-2 text-[11px] font-bold transition ${
                        tripType === type
                          ? "bg-white text-[#1f2d3d] shadow-[0_3px_12px_rgba(31,45,61,0.08)]"
                          : "text-[#7b8797] hover:text-[#344255]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-[#8995a4]">
                  <FiShield size={12} className="text-[#4da46e]" />
                  Secure booking experience
                </span>
              </div>

              <form onSubmit={handleSubmit}>
              <div className="relative z-40 rounded-[20px] border border-[#e1e7ef] bg-white overflow-visible shadow-[0_5px_20px_rgba(26,43,65,0.035)]">
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      isRoundTrip ? "lg:grid-cols-6" : "lg:grid-cols-5"
                    }`}
                  >
                   <div className="relative z-[80] px-4 py-4 border-b sm:border-b-0 sm:border-r border-[#edf1f5] hover:bg-[#fbfcfe] transition">
                      <AirportAutocomplete
                        label="From"
                        value={form.from}
                        selectedAirport={fromAirport}
                        onChange={(value) => {
                          setFromAirport(null);
                          handleChange("from", value);
                        }}
                        onSelect={(airport) => {
                          setFromAirport(airport);
                          handleChange("from", airport.airportCode);
                        }}
                      />

                      <button
                        type="button"
                        onClick={handleSwap}
                        className="hidden lg:flex absolute z-10 -right-4 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-white border border-[#dfe6ee] shadow-[0_5px_16px_rgba(26,43,65,0.10)] hover:border-[#9fb8e7] hover:rotate-180 transition"
                      >
                        <FiRepeat size={13} className="text-[#356ae6]" />
                      </button>
                    </div>

                    <div className="relative z-[80] px-4 py-4 border-b ml-6 sm:border-b-0 lg:border-r border-[#edf1f5] hover:bg-[#fbfcfe] transition">
                      <AirportAutocomplete
                        label="To"
                        value={form.to}
                        selectedAirport={toAirport}
                        onChange={(value) => {
                          setToAirport(null);
                          handleChange("to", value);
                        }}
                        onSelect={(airport) => {
                          setToAirport(airport);
                          handleChange("to", airport.airportCode);
                        }}
                      />
                    </div>

                    <div className="px-4 py-4 border-b sm:border-b-0 sm:border-r lg:border-r border-[#edf1f5] hover:bg-[#fbfcfe] transition">
                      <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3] flex items-center gap-1.5">
                        <FiCalendar size={11} />
                        Departure
                      </p>
                      <input
                        type="date"
                        value={form.departure}
                        onChange={(e) => handleChange("departure", e.target.value)}
                        className="w-full mt-1.5 bg-transparent text-[12px] font-semibold text-[#263445] focus:outline-none"
                      />
                    </div>

                    {isRoundTrip && (
                      <div className="px-4 py-4 border-b sm:border-b-0 sm:border-r border-[#edf1f5] hover:bg-[#fbfcfe] transition">
                        <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3] flex items-center gap-1.5">
                          <FiCalendar size={11} />
                          Return
                        </p>
                        <input
                          type="date"
                          value={form.returnDate}
                          min={form.departure || undefined}
                          onChange={(e) => handleChange("returnDate", e.target.value)}
                          className="w-full mt-1.5 bg-transparent text-[12px] font-semibold text-[#263445] focus:outline-none"
                        />
                      </div>
                    )}

                    <div
                      ref={passengerRef}
                      className="relative z-[90] px-4 py-4 border-b sm:border-b-0 sm:border-r border-[#edf1f5] hover:bg-[#fbfcfe] transition"
                    >
                      <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3] flex items-center gap-1.5">
                        <FiUsers size={11} />
                        Passengers
                      </p>

                      <button
                        type="button"
                        onClick={() => setShowPassengerPicker((v) => !v)}
                        className="w-full mt-1.5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="text-[12px] font-semibold text-[#263445]">
                          {totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""}
                        </span>
                        {showPassengerPicker ? (
                          <FiChevronUp size={13} />
                        ) : (
                          <FiChevronDown size={13} />
                        )}
                      </button>

                      {showPassengerPicker && (
                        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[9999] rounded-2xl border border-[#e1e7ef] bg-white p-3 shadow-[0_18px_45px_rgba(19,37,63,0.16)]">
                          {[
                            ["adults", "Adults", "12+ years"],
                            ["children", "Children", "2–11 years"],
                            ["infants", "Infants", "Under 2 years"],
                          ].map(([key, label, hint]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between gap-3 py-2.5"
                            >
                              <div>
                                <p className="text-[11px] font-bold text-[#344255]">
                                  {label}
                                </p>
                                <p className="text-[9px] text-[#9aa5b3] mt-0.5">
                                  {hint}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updatePassengerCount(key, -1)}
                                  disabled={
                                    key === "adults"
                                      ? form.adults <= 1
                                      : form[key] <= 0
                                  }
                                  className="h-7 w-7 rounded-full border border-[#dfe6ee] text-[#59687b] hover:border-[#9eb8eb] hover:text-[#356ae6] disabled:opacity-35 disabled:cursor-not-allowed"
                                >
                                  −
                                </button>

                                <span className="w-5 text-center text-[11px] font-bold text-[#263445]">
                                  {form[key]}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updatePassengerCount(key, 1)}
                                  disabled={
                                    totalPassengers >= 9 ||
                                    (key === "infants" &&
                                      form.infants >= form.adults)
                                  }
                                  className="h-7 w-7 rounded-full border border-[#dfe6ee] text-[#59687b] hover:border-[#9eb8eb] hover:text-[#356ae6] disabled:opacity-35 disabled:cursor-not-allowed"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}

                          <div className="mt-2 pt-2.5 border-t border-[#edf1f5] flex items-center justify-between">
                            <span className="text-[9px] text-[#8d99a8]">
                              Maximum 9 passengers
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowPassengerPicker(false)}
                              className="text-[10px] font-bold text-[#356ae6]"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-4 hover:bg-[#fbfcfe] transition">
                      <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3]">Class</p>
                      <select
                        value={form.classType}
                        onChange={(e) => handleChange("classType", e.target.value)}
                        className="w-full mt-1.5 bg-transparent text-[12px] font-semibold text-[#263445] focus:outline-none"
                      >
                        {classTypes.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {tripType === "Multi-City" && (
                  <div className="mt-3 space-y-3">
                    {form.cities.map((city, index) => (
                      <div key={index} className="relative z-20 rounded-[18px] border border-[#e1e7ef] bg-white overflow-visible">
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                          <div className="px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-[#edf1f5]">
                            <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3]">From</p>
                            <AirportAutocomplete
                              label="From"
                              value={city.from}
                              onChange={(value) => handleCityChange(index, "from", value)}
                              onSelect={(airport) => handleCityChange(index, "from", airport.airportCode)}
                              placeholder="From"
                            />
                          </div>

                          <div className="relative px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-[#edf1f5]">
                            <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3]">To</p>
                            <AirportAutocomplete
                              label="To"
                              value={city.to}
                              onChange={(value) => handleCityChange(index, "to", value)}
                              onSelect={(airport) => handleCityChange(index, "to", airport.airportCode)}
                              placeholder="To"
                            />
                            <button
                              type="button"
                              onClick={() => handleCitySwap(index)}
                              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white border border-[#dfe6ee] items-center justify-center shadow-sm hover:rotate-180 transition"
                            >
                              <FiRepeat size={13} className="text-[#356ae6]" />
                            </button>
                          </div>

                          <div className="px-4 py-3.5">
                            <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#9aa5b3]">Departure</p>
                            <input
                              type="date"
                              value={city.departure}
                              onChange={(e) => handleCityChange(index, "departure", e.target.value)}
                              className="w-full mt-1.5 bg-transparent text-[12px] font-semibold text-[#263445] focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveCity(index)}
                          className="absolute right-2 top-2 h-7 w-7 rounded-lg bg-[#fff2f2] text-[#df6570] hover:bg-[#df6570] hover:text-white flex items-center justify-center transition"
                          title="Remove city"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                  {tripType === "Multi-City" && (
                    <button
                      type="button"
                      onClick={handleAddCity}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#dfe6ee] bg-white hover:bg-[#f8fafc] px-5 py-3 text-[11px] font-bold text-[#526174] transition"
                    >
                      <Plus size={15} />
                      Add city
                    </button>
                  )}

                  <button type="submit" disabled={searching} className="inline-flex items-center gap-2 rounded-xl bg-[#102a43] hover:bg-[#183b5d] disabled:bg-[#718096] disabled:cursor-not-allowed text-white px-7 py-3.5 text-[12px] font-bold shadow-[0_10px_24px_rgba(16,42,67,0.15)] transition hover:-translate-y-0.5">{searching?"Searching...":"Search flights"}{searching?<span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>:<TbPlaneDeparture size={16}/>}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {hasSearched && (
        <section id="flight-results" className="bg-[#f7f9fc] px-4 sm:px-8 lg:px-16 pb-14">
          <div className="w-full lg:w-[88%] xl:w-[84%] max-w-6xl mx-auto">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#9aa5b3]">Available flights</p>
                <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1f2d3d] mt-1">
                  {fromAirport?.cityName || form.from || "Origin"} <span className="text-[#9aa5b3]">→</span> {toAirport?.cityName || form.to || "Destination"}
                </h2>
              </div>

              <div className="rounded-full bg-white border border-[#e6ebf1] px-3 py-1.5 text-[10px] font-semibold text-[#758294]">
                {filteredFlights.length} flights found
              </div>
            </div>

            <FlightFilterBar filters={filters} setFilters={setFilters} flights={flights} />

            {searching ? (
              <div className="rounded-[22px] border border-[#e5ebf2] bg-white p-12 text-center shadow-sm"><span className="mx-auto h-8 w-8 rounded-full border-[3px] border-[#dbe5f5] border-t-[#356ae6] animate-spin block"/><p className="text-[14px] font-semibold text-[#4d5b6e] mt-4">Searching available flights</p><p className="text-[11px] text-[#929eac] mt-1">Checking airlines for {form.from} → {form.to}</p></div>
            ) : filteredFlights.length === 0 ? (
              <div className="rounded-[22px] border border-[#e5ebf2] bg-white p-12 text-center shadow-sm"><div className="mx-auto h-12 w-12 rounded-2xl bg-[#f4f7fb] border border-[#e8edf3] flex items-center justify-center"><TbPlaneDeparture size={20} className="text-[#8e9bab]"/></div><p className="text-[14px] font-semibold text-[#4d5b6e] mt-4">{searchError || "No flights found"}</p><p className="text-[11px] text-[#929eac] mt-1">Try another date, route or clear one of the filters.</p></div>
            ) : (
              paginatedFlights.map((flight,index)=><FlightResultCard key={flight.id || `${flight.flightNo}-${index}`} flight={flight} index={(currentPage - 1) * FLIGHTS_PER_PAGE + index} isSelected={selectedIds.includes(String(flight.id))} onToggleSelect={toggleSelect} setShowBookingModal={setShowBookingModal}/> )
            )}

            {!searching && filteredFlights.length > 0 && (
              <div className="mt-5 rounded-2xl border border-[#e5eaf0] bg-white px-3 sm:px-4 py-3 shadow-[0_4px_16px_rgba(26,43,65,0.025)]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[10px] text-[#7d8998]">
                    Showing{" "}
                    <span className="font-bold text-[#526174]">
                      {(currentPage - 1) * FLIGHTS_PER_PAGE + 1}
                    </span>{" "}
                    –{" "}
                    <span className="font-bold text-[#526174]">
                      {Math.min(currentPage * FLIGHTS_PER_PAGE, filteredFlights.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-[#526174]">
                      {filteredFlights.length}
                    </span>{" "}
                    flights
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      className="h-8 w-8 rounded-lg border border-[#e1e7ee] bg-white text-[#617087] flex items-center justify-center transition hover:bg-[#f5f8fc] disabled:opacity-35 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <FiChevronLeft size={14} />
                    </button>

                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 min-w-8 px-2 rounded-lg text-[10px] font-bold transition ${
                          currentPage === page
                            ? "bg-[#102a43] text-white shadow-[0_5px_12px_rgba(16,42,67,0.16)]"
                            : "border border-[#e1e7ee] bg-white text-[#617087] hover:bg-[#f5f8fc]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      className="h-8 w-8 rounded-lg border border-[#e1e7ee] bg-white text-[#617087] flex items-center justify-center transition hover:bg-[#f5f8fc] disabled:opacity-35 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <FiChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showBookingModal && selectedFlight && (
              <div id="booking-flow" className="scroll-mt-8">
                {bookingStep === 0 ? (
                  <InlineBookingCard flight={selectedFlight} onNext={handleNextToPassenger} />
                ) : (
                  <PassengerDetails flight={selectedFlight} onBack={() => setBookingStep(0)} />
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default FlightHero;
