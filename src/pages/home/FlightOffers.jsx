import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import { PiSuitcaseRolling } from "react-icons/pi";

const filters = [
  "All",
  "Domestic",
  "International",
  "Student",
  "Family",
  "Business",
  "Weekend",
];

const flights = [
  {
    logo: "6E",
    airline: "IndiGo",
    flightInfo: "Flight 6E 2145 · A320neo",
    tag: "LIMITED OFFER",
    tagColor: "bg-amber-100 text-amber-700",
    departTime: "06:15",
    departCode: "DEL",
    departCity: "New Delhi",
    duration: "2h 30m",
    stops: "Non-stop",
    arriveTime: "08:45",
    arriveCode: "GOI",
    arriveCity: "Goa Dabolim",
    baggage: "15kg Check-in Baggage Included",
    oldPrice: "₹6,249",
    price: "₹4,899",
    save: "SAVE ₹1,350",
  },
  {
    logo: "AI",
    airline: "Air India",
    flightInfo: "Flight AI 995 · B787 Dreamliner",
    tag: "POPULAR",
    tagColor: "bg-blue-100 text-blue-700",
    departTime: "20:20",
    departCode: "DEL",
    departCity: "New Delhi",
    duration: "3h 55m",
    stops: "Non-stop",
    arriveTime: "22:45",
    arriveCode: "DXB",
    arriveCity: "Dubai Intl",
    baggage: "25kg Check-in + Complimentary Meal",
    oldPrice: "₹15,400",
    price: "₹12,199",
    save: "SAVE ₹3,201",
  },
  {
    logo: "SQ",
    airline: "Singapore Airlines",
    flightInfo: "Flight SQ 403 · A350-900",
    tag: "BEST RATED",
    tagColor: "bg-amber-100 text-amber-700",
    departTime: "09:50",
    departCode: "DEL",
    departCity: "New Delhi",
    duration: "5h 50m",
    stops: "Non-stop",
    arriveTime: "18:10",
    arriveCode: "SIN",
    arriveCity: "Singapore Changi",
    baggage: "30kg Check-in + KrisWorld In-Flight Ent.",
    oldPrice: "₹28,900",
    price: "₹22,450",
    save: "SAVE ₹6,450",
  },
];

export default function FlightOffers() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-2">
              CURATED AVIATION SAVINGS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Fly More. Pay Less.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Exclusive flight offers curated for your next journey.
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm shrink-0">
            View All Offers <FiArrowRight />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {flights.map((flight) => (
            <div
              key={flight.flightInfo}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                    {flight.logo}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">
                      {flight.airline}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {flight.flightInfo}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${flight.tagColor}`}
                >
                  {flight.tag}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-900 text-xl font-extrabold">
                    {flight.departTime}
                  </p>
                  <p className="text-blue-600 text-xs font-semibold">
                    {flight.departCode}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {flight.departCity}
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-center px-3">
                  <p className="text-slate-400 text-[11px] mb-1">
                    {flight.duration}
                  </p>
                  <div className="w-full flex items-center gap-1">
                    <span className="h-px flex-1 bg-slate-300" />
                    <MdFlight className="text-slate-400 rotate-90" />
                    <span className="h-px flex-1 bg-slate-300" />
                  </div>
                  <p className="text-blue-600 text-[11px] font-semibold mt-1">
                    {flight.stops}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 text-xl font-extrabold">
                    {flight.arriveTime}
                  </p>
                  <p className="text-blue-600 text-xs font-semibold">
                    {flight.arriveCode}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {flight.arriveCity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 mb-4">
                <PiSuitcaseRolling className="text-slate-400 shrink-0" />
                <span className="text-slate-600 text-xs">
                  {flight.baggage}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-slate-400 text-xs line-through">
                    {flight.oldPrice}
                  </p>
                  <p className="text-slate-900 text-xl font-extrabold">
                    {flight.price}
                    <span className="text-emerald-600 text-[11px] font-bold ml-2">
                      {flight.save}
                    </span>
                  </p>
                </div>
                <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  Book Now <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 rounded-2xl overflow-hidden bg-[#0a1628] p-8 sm:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/70 to-transparent" />
          <div className="relative max-w-lg">
            <p className="text-amber-400 text-xs font-bold tracking-wide mb-3">
              FEATURED GETAWAY
            </p>
            <h3 className="text-white text-3xl sm:text-4xl font-extrabold mb-3">
              Dubai Escape Special
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Direct flights from Delhi &amp; Mumbai starting at just
              ₹12,499. Save up to 20% on combined flight + 30-day tourist
              visa bundles.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-5 py-2.5 rounded-lg text-sm">
                Explore Dubai Flights <FiArrowRight />
              </button>
              <span className="text-slate-300 text-xs sm:text-sm">
                Valid for travel through Dec 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}