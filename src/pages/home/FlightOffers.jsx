import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import { PiSuitcaseRolling } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  Luggage,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import aero from "../../assets/image/aero.png"
const filters = [
  "All",
  "Domestic",
  "International",
  "Student",
   
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
 
function BorderBeamCard({ flight, children }) {
  return (
    <div className="group relative mx-auto h-[560px] w-full max-w-[340px] overflow-visible transition-all duration-500 hover:-translate-y-1">
      <div className="absolute inset-0 rounded-[90px] bg-slate-950 shadow-2xl shadow-slate-900/50 transition-all duration-500 group-hover:shadow-[0_25px_70px_rgba(245,158,11,0.18)]" />

 
      <div className="absolute inset-[10px] overflow-hidden rounded-[82px]">
  <img
    src={aero}
    alt={`${flight.airline} flight`}
    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/15 to-slate-950/90" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.18),transparent_48%)]" />

  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-[-20%] top-[45%] animate-[cardPlane_9s_linear_infinite]">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-amber-300/20 blur-xl" />

        <div className="relative text-lg text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
          ✈
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[90px]">
        <span className="beam-white absolute left-[-25%] top-[-25%] h-[160%] w-[55px] rotate-[18deg] bg-white opacity-0 blur-[30px] group-hover:animate-[orangeSweep_700ms_ease-out]" />
      </div>
      

      <div className="pointer-events-none absolute inset-0 rounded-[90px] border-[11px] border-slate-900/95 shadow-[inset_0_0_35px_rgba(255,255,255,0.10),0_0_0_1px_rgba(255,255,255,0.08)]" />

      <div className="pointer-events-none absolute inset-[15px] rounded-[85px] border border-white/10" />

      <div className="pointer-events-none absolute inset-[23px] rounded-[75px] bg-gradient-to-br from-white/10 via-transparent to-transparent" />

      

      <div className="relative z-10 flex h-full flex-col px-9 py-10">
        <div className="flex justify-center">
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-slate-950/55 px-3 py-2 backdrop-blur-xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-extrabold text-slate-900 shadow-lg">
              {flight.logo}
            </div>

            <div>
              <p className="text-xs font-bold leading-tight text-white">
                {flight.airline}
              </p>

              <p className="mt-0.5 text-[9px] leading-tight text-slate-300">
                {flight.flightInfo}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-3">
          <div className="mx-auto max-w-[260px] rounded-3xl border border-white/15 bg-slate-950/45 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-[0.15em] text-slate-300">
                  Departure
                </p>

                <p className="mt-1 text-2xl font-extrabold leading-none text-white">
                  {flight.departCode}
                </p>

                <p className="mt-1 truncate text-[9px] text-slate-300">
                  {flight.departCity}
                </p>

                <p className="mt-1 text-xs font-bold text-white">
                  {flight.departTime}
                </p>
              </div>

              <div className="flex min-w-[62px] flex-1 flex-col items-center">
                <p className="mb-1 text-[8px] text-slate-300">
                  {flight.duration}
                </p>

                <div className="flex w-full items-center">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/70" />

                  <div className="mx-1 flex h-6 w-6 shrink-0 rotate-90 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/15">
                    <Plane size={11} className="text-amber-300" />
                  </div>

                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/70" />
                </div>

                <p className="mt-1 text-[8px] font-semibold text-amber-300">
                  {flight.stops}
                </p>
              </div>

              <div className="min-w-0 text-right">
                <p className="text-[8px] uppercase tracking-[0.15em] text-slate-300">
                  Arrival
                </p>

                <p className="mt-1 text-2xl font-extrabold leading-none text-white">
                  {flight.arriveCode}
                </p>

                <p className="mt-1 truncate text-[9px] text-slate-300">
                  {flight.arriveCity}
                </p>

                <p className="mt-1 text-xs font-bold text-white">
                  {flight.arriveTime}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-2 flex max-w-[260px] items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 backdrop-blur-xl">
            <Luggage size={13} className="shrink-0 text-amber-300" />

            <span className="truncate text-[9px] text-slate-200">
              {flight.baggage}
            </span>
          </div>
        </div>

        {/* <div className="mx-auto flex w-full max-w-[260px] items-end justify-between rounded-2xl border border-white/10 bg-slate-950/65 p-3 backdrop-blur-xl">
          <div>
            <p className="text-[9px] text-slate-400 line-through">
              {flight.oldPrice}
            </p>

            <p className="text-xl font-extrabold leading-tight text-white">
              {flight.price}
            </p>

           
          </div>

          <button className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-900 transition-all duration-300 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20">
            Book
            <ArrowRight size={13} />
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default function FlightOffers() {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate()

  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-slate-900 text-xs sm:text-sm font-semibold tracking-wide mb-2">
              CURATED AVIATION SAVINGS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Fly More. Pay Less.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Exclusive flight offers curated for your next journey.
            </p>
          </div>
      
        </div>

        {/* <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
               
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-900 text-xl font-extrabold">
                    {flight.departTime}
                  </p>
                  <p className="text-slate-900 text-xs font-semibold">
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
                  <p className="text-slate-900 text-[11px] font-semibold mt-1">
                    {flight.stops}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 text-xl font-extrabold">
                    {flight.arriveTime}
                  </p>
                  <p className="text-slate-900 text-xs font-semibold">
                    {flight.arriveCode}
                  </p>
                  <p className="text-slate-900 text-[11px]">
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
                   
                  </p>
                </div>
                <button className="flex items-center gap-1.5 bg-slate-900 text-white hover:shadow-lg  text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                  Book Now <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div> */}

             {/* <div className="h-full w-full rounded-2xl bg-[#eef1f8] px-4 py-10 sm:px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
              {flights.map((flight) => (
                <BorderBeamCard
                  key={flight.flightInfo}
                  flight={flight}
                />
              ))}
            </div>
          </div> */}

          <div className="h-full w-full rounded-2xl bg-[#eef1f8] px-4 py-10 sm:px-8">
  <div className="relative mx-auto max-w-6xl">
    <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
      <div className="absolute left-[8%] top-[48%] animate-[flyPlane_7s_linear_infinite]">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-amber-300/30 blur-xl" />

          <div className="relative text-xl text-slate-900 drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
            ✈
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {flights.map((flight) => (
        <BorderBeamCard
          key={flight.flightInfo}
          flight={flight}
        />
      ))}
    </div>
  </div>
</div>

      {/* Rotating Border Glow Card */}
      <div className="relative mt-10 rounded-2xl p-[4px] overflow-hidden">

      

        <div className="group relative overflow-hidden rounded-2xl bg-[#0a1628] p-8 sm:p-12">

  {/* Deep Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/20" />

  {/* Animated Atmospheric Glow */}
  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-[escapeGlow_6s_ease-in-out_infinite] rounded-full bg-blue-500/20 blur-[90px]" />

  <div className="pointer-events-none absolute -bottom-32 right-20 h-64 w-64 animate-[escapeGlow_8s_ease-in-out_infinite_reverse] rounded-full bg-cyan-400/10 blur-[100px]" />

  {/* Tiny Stars */}
  <div className="pointer-events-none absolute inset-0">
    <span className="absolute left-[55%] top-[20%] h-1 w-1 animate-pulse rounded-full bg-white/60" />
    <span className="absolute left-[72%] top-[35%] h-1 w-1 animate-pulse rounded-full bg-blue-300/70 delay-300" />
    <span className="absolute left-[85%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/40 delay-700" />
    <span className="absolute left-[65%] top-[70%] h-1 w-1 animate-pulse rounded-full bg-cyan-300/60 delay-500" />
    <span className="absolute right-[8%] bottom-[20%] h-1 w-1 animate-pulse rounded-full bg-white/50 delay-200" />
  </div>

  {/* Flight Route */}
  <svg
    className="pointer-events-none absolute right-[-5%] top-[5%] h-[110%] w-[65%] overflow-visible opacity-40 transition-all duration-700 group-hover:opacity-80"
    viewBox="0 0 600 500"
    fill="none"
  >
    <path
      d="M40 410 C150 280 180 400 280 250 C370 115 450 200 560 55"
      stroke="url(#routeGradient)"
      strokeWidth="2"
      strokeDasharray="8 10"
      className="animate-[routeDash_8s_linear_infinite]"
    />

    <path
      d="M40 410 C150 280 180 400 280 250 C370 115 450 200 560 55"
      stroke="white"
      strokeWidth="1"
      strokeDasharray="2 18"
      opacity="0.5"
    />

    <defs>
      <linearGradient
        id="routeGradient"
        x1="40"
        y1="410"
        x2="560"
        y2="55"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f59e0b" />
        <stop offset="0.45" stopColor="#38bdf8" />
        <stop offset="1" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
  </svg>

  {/* Moving Flight Dot */}
  <div className="pointer-events-none absolute right-[12%] top-[15%] h-3 w-3 animate-[flightDot_6s_ease-in-out_infinite]">
    <span className="absolute -inset-3 animate-ping rounded-full bg-cyan-400/20" />
    <span className="relative block h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />
  </div>

  {/* Radar Rings */}
  <div className="pointer-events-none absolute right-[10%] top-[18%] h-32 w-32">
    <span className="absolute inset-0 animate-[radarRing_3s_ease-out_infinite] rounded-full border border-cyan-400/30" />
    <span className="absolute inset-0 animate-[radarRing_3s_ease-out_1s_infinite] rounded-full border border-blue-400/20" />
    <span className="absolute inset-0 animate-[radarRing_3s_ease-out_2s_infinite] rounded-full border border-white/10" />
  </div>

  {/* Right Side Destination Glow */}
  <div className="pointer-events-none absolute right-[7%] top-[11%] flex h-16 w-16 items-center justify-center">
    <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/10 blur-xl" />

    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-[#0d243b]/80 backdrop-blur-sm">
      <span className="text-lg">✈</span>
    </div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-lg">

    {/* Label */}
    <div className="mb-3 flex items-center gap-2">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

      <p className="text-xs font-bold tracking-[0.18em] text-amber-400">
        FEATURED GETAWAY
      </p>
    </div>

    {/* Heading */}
    <h3 className="mb-3 text-3xl font-extrabold tracking-tight text-white transition-all duration-500 group-hover:translate-x-1 sm:text-4xl">
      Escape Special
    </h3>

    {/* Description */}
    <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">
      Direct flights from Delhi &amp; Mumbai starting at just ₹12,499.
      Save up to 20% on combined flight + 30-day tourist visa bundles.
    </p>

    {/* Route Status */}
    <div className="mb-6 flex flex-wrap items-center gap-3">

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/10">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className="text-[10px] font-semibold tracking-wide text-slate-300">
          FLIGHTS ACTIVE
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-500/10">
        <span className="text-[10px] font-semibold tracking-wide text-slate-300">
          VISA BUNDLE
        </span>
      </div>

    </div>

    {/* CTA */}
    <button
      onClick={() => navigate("flight")}
      className="group/btn relative flex items-center gap-2 overflow-hidden rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(255,255,255,0.15)] active:scale-95"
    >

      {/* Button Shine */}
      <span className="absolute -left-20 top-0 h-full w-10 rotate-[20deg] bg-blue-200/70 transition-all duration-700 group-hover/btn:left-[130%]" />

      <span className="relative z-10">
        Explore Flights
      </span>

      <FiArrowRight
        className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1.5"
      />

    </button>
  </div>

  {/* Bottom Flight Status */}
  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/5 px-8 py-3 sm:px-12">
    <span className="text-[9px] font-semibold tracking-[0.15em] text-slate-500">
      DEL → DXB · BOM → DXB
    </span>

    <span className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.15em] text-emerald-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      LIVE FARE
    </span>
  </div>

  {/* Bottom Moving Light */}
  <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
    <div className="h-full w-1/4 animate-[escapeProgress_3s_linear_infinite] bg-gradient-to-r from-transparent via-amber-400 to-cyan-400" />
  </div>

</div>

      </div>
      </div>
    </section>
  );
}