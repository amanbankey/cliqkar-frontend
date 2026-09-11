import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiRepeat,
  FiCalendar,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";
import aero from "../../assets/image/aero.png";
import {
  MdFlight,
  MdOutlineVerifiedUser,
  MdOutlineDashboard,
} from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaPlane } from "react-icons/fa";

const trendingRoutes = [
  { city: "Dubai (DXB)", tag: "98% Visa Clear" },
  { city: "Maldives (MLE)", tag: "Luxury Flights" },
  { city: "Zurich (ZRH)", tag: "Alpine Express" },
];

const stats = [
  { value: 50, suffix: "K+", label: "Happy Travelers" },
  { value: 120, suffix: "+", label: "Global Destinations" },
  { value: 500, suffix: "+", label: "Verified Agents" },
  { value: "24/7", suffix: "", label: "Travel Support Concierge" },
];

const orbitChips = [
  {
    label: "Dubai (DXB)",
    position: "-left-6 top-4",
    delay: "0s",
    duration: "3s",
  },
  {
    label: "Zurich (ZRH)",
    position: "-right-8 bottom-8",
    delay: "1s",
    duration: "3.6s",
  },
  {
    label: "Maldives (MLE)",
    position: "left-1/2 -translate-x-1/2 -bottom-4",
    delay: "0.5s",
    duration: "4s",
  },
];

const CountUp = ({ end, suffix = "", duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return `${count}${suffix}`;
};

function FlightGlobeAnimation() {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[380px]">
      <div className="relative w-80 h-80">
        <div
          className="absolute inset-0 rounded-full border border-dashed border-blue-500/30"
          style={{ animation: "cliqkar-spin 26s linear infinite" }}
        />

        <div
          className="absolute inset-8 rounded-full border border-blue-400/20"
          style={{ animation: "cliqkar-spin-reverse 18s linear infinite" }}
        />

        <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-600/30 to-transparent blur-2xl animate-pulse" />

        <div className="absolute inset-20 rounded-full bg-[#0d1f33] border border-blue-500/20 flex items-center justify-center shadow-2xl">
          <FiGlobe className="text-blue-400" size={44} />
        </div>

        <div
          className="absolute inset-0"
          style={{ animation: "cliqkar-spin 12s linear infinite" }}
        >
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/40">
            <FaPlane className="text-slate-900 text-sm -rotate-45" />
          </span>
        </div>

        {orbitChips.map((chip) => (
          <div
            key={chip.label}
            className={`absolute ${chip.position} bg-white/5 border border-white/10 backdrop-blur rounded-xl px-3 py-2 shadow-lg`}
            style={{
              animation: `cliqkar-float ${chip.duration} ease-in-out infinite`,
              animationDelay: chip.delay,
            }}
          >
            <p className="text-white text-xs font-semibold whitespace-nowrap">
              {chip.label}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes cliqkar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cliqkar-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes cliqkar-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

const windowShape = "46% 46% 40% 40% / 62% 62% 34% 34%";

function ProgressRing({ value }) {
  return (
    <div
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#fbbf24 ${value}%, rgba(255,255,255,0.18) ${value}%)`,
      }}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900">
        <span className="text-[9px] font-bold text-amber-300">
          {value}%
        </span>
      </div>
    </div>
  );
}

function HudBox({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-amber-300/25 bg-slate-950/60 px-2.5 py-2 backdrop-blur-sm ${className}`}
    >
      {title && (
        <p className="mb-1.5 text-[8px] font-bold tracking-[0.15em] text-slate-300">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

function PlaneWindow({ flight }) {
  const aircraft =
    flight.flightInfo.split("·")[1]?.trim() || flight.flightInfo;

  return (
    <div
      className="relative mx-auto w-full max-w-[290px]"
      style={{ aspectRatio: "4 / 5" }}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: windowShape,
          background:
            "linear-gradient(155deg, #4a6280 0%, #223349 45%, #101c2b 100%)",
          boxShadow:
            "0 25px 45px -15px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      />

      <div
        className="absolute"
        style={{
          inset: "11px",
          borderRadius: windowShape,
          boxShadow:
            "inset 0 0 22px 6px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.12)",
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.06), rgba(0,0,0,0.1))",
        }}
      />

      <div
        className="absolute overflow-hidden"
        style={{
          inset: "19px",
          borderRadius: windowShape,
          boxShadow: "0 0 0 2px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1763455892848-39bbc7ca90a0?fm=jpg&q=70&w=900&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/40" />

        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, transparent 22%, transparent 78%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        <div className="relative flex h-full flex-col justify-between p-2.5">
          <HudBox title="ROUTE MAP">
            <div className="flex items-center gap-1">
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-extrabold text-amber-300">
                  {flight.departCode}
                </span>
                <MapPin size={9} className="text-amber-300" />
              </div>

              <div className="mx-1 flex flex-1 items-center gap-0.5">
                <span className="h-px flex-1 border-t border-dashed border-amber-300/60" />
                <Plane
                  size={10}
                  className="rotate-90 text-amber-300"
                />
                <span className="h-px flex-1 border-t border-dashed border-amber-300/60" />
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[10px] font-extrabold text-amber-300">
                  {flight.arriveCode}
                </span>
                <MapPin size={9} className="text-amber-300" />
              </div>
            </div>
          </HudBox>

          <div className="flex justify-end">
            <HudBox title="FLIGHT STATUS">
              <div className="flex items-center gap-2">
                <Plane size={11} className="text-amber-300" />
                <span className="text-[9px] font-bold text-white">
                  EN ROUTE
                </span>
              </div>

              <div className="mt-1.5 flex items-center gap-2">
                <div>
                  <p className="text-[7px] text-slate-300">ETA</p>
                  <p className="text-[10px] font-bold text-white">
                    {flight.duration}
                  </p>
                </div>

                <ProgressRing value={flight.progress} />
              </div>
            </HudBox>
          </div>

          <HudBox title="FLIGHT DETAILS" className="w-[64%]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Plane size={9} className="text-amber-300" />
                <span className="text-[9px] font-semibold text-white">
                  {aircraft}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Route size={9} className="text-amber-300" />
                <span className="text-[9px] font-semibold text-white">
                  {flight.distance}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock size={9} className="text-amber-300" />
                <span className="text-[9px] font-semibold text-white">
                  {flight.duration}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Mountain size={9} className="text-amber-300" />
                <span className="text-[9px] font-semibold text-white">
                  {flight.altitude}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Gauge size={9} className="text-amber-300" />
                <span className="text-[9px] font-semibold text-white">
                  {flight.speed}
                </span>
              </div>
            </div>
          </HudBox>

          <HudBox>
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-extrabold text-amber-300">
                  {flight.departCode}
                </span>
                <span className="text-[7px] text-slate-300">
                  {flight.departCity}
                </span>
              </div>

              <div className="mx-1 flex flex-1 flex-col items-center">
                <span className="text-[7px] text-slate-300">
                  {flight.distance}
                </span>

                <div className="flex w-full items-center gap-0.5">
                  <span className="h-px flex-1 border-t border-dashed border-amber-300/60" />
                  <Plane size={9} className="text-amber-300" />
                  <span className="h-px flex-1 border-t border-dashed border-amber-300/60" />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[9px] font-extrabold text-amber-300">
                  {flight.arriveCode}
                </span>
                <span className="text-[7px] text-slate-300">
                  {flight.arriveCity}
                </span>
              </div>
            </div>
          </HudBox>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[-6px] h-8 w-[52%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, #5c7999 0%, #2a3f57 70%, #1a2837 100%)",
          boxShadow:
            "0 6px 10px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.25)",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("Round Trip");
  const [activeTab, setActiveTab] = useState("Flights");
  const [fareClass, setFareClass] = useState("Exclusive Offer");

  const [searchForm, setSearchForm] = useState({
    fromCode: "DEL",
    fromCity: "New Delhi, IGI Intl",
    toCode: "DXB",
    toCity: "Dubai, Dubai Intl",
    departureDate: "2026-10-24",
    returnDate: "2026-10-31",
    adults: 1,
    cabinClass: "First / Business",
    tripType: "Round Trip",
    fareClass: "Exclusive Offer",
  });

  const handleFieldChange = (field, value) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const swapLocations = () => {
    setSearchForm((prev) => ({
      ...prev,
      fromCode: prev.toCode,
      fromCity: prev.toCity,
      toCode: prev.fromCode,
      toCity: prev.fromCity,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...searchForm,
          tripType,
          fareClass,
        }),
      });

      const data = await response.json();

      console.log("search results", data);
    } catch (error) {
      console.log("search error", error);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${aero})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-5 pb-5 sm:pb-7">

        {/* Hero Content */}
        <div className="mt-3 sm:mt-5 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="w-full lg:max-w-3xl">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />

              <span className="text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wide">
                SMART TRAVEL · GLOBAL MOBILITY · VERIFIED PARTNERS
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-white leading-[1.05] mb-4">
              Your Journey.
              <br />
              Travel Without Friction.
            </h1>

            {/* Service Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-md px-3 py-1.5 mb-3">
              <IoShieldCheckmarkOutline className="text-blue-400" />

              <span className="text-blue-300 text-xs sm:text-sm font-medium">
                Flights. Visas. OTB. All Together.
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 max-w-md">
              Discover competitive flights, simplify visa applications,
              connect with verified travel experts and complete your
              boarding requirements — all through one intelligent travel
              platform.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={() => navigate("/flight")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors"
              >
                Search Flights
                <FiArrowRight />
              </button>

              <button
                onClick={() => navigate("/visa")}
                className="flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors"
              >
                <MdOutlineVerifiedUser />
                Explore Visa Services
              </button>
            </div>

            {/* Trending Routes */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MdFlight className="text-amber-400" />

                <span className="text-slate-400 text-xs font-medium tracking-wide">
                  TRENDING IN-FLIGHT ROUTES HANDLED BY CLIQKAR
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                {trendingRoutes.map((route) => (
                  <div
                    key={route.city}
                    className="bg-white/5 border border-white/10 rounded-lg h-14 sm:h-16 flex flex-col justify-end p-2 sm:p-3"
                  >
                    <p className="text-white text-[11px] sm:text-xs font-semibold">
                      {route.city}
                    </p>

                    <p className="text-slate-400 text-[9px] sm:text-[10px]">
                      {route.tag}
                    </p>
                  </div>
                ))}
              </div>

              {/* Concierge */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                  <MdOutlineDashboard className="text-blue-400" />
                </div>

                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">
                    1-on-1 Concierge Consultation
                  </p>

                  <p className="text-slate-400 text-[10px] sm:text-xs">
                    Private lounge document &amp; itinerary curation with
                    licensed agents
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Globe intentionally hidden */}
          {/* <FlightGlobeAnimation /> */}
        </div>

        {/* Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center sm:text-left"
            >
              <p className="text-white text-2xl sm:text-3xl font-extrabold">
                {typeof stat.value === "number" ? (
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                  />
                ) : (
                  stat.value
                )}
              </p>

              <p className="text-slate-400 text-xs sm:text-sm mt-1 flex items-center justify-center sm:justify-start gap-1">
                <HiOutlineSparkles className="text-amber-400" />
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}