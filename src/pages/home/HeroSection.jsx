import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiRepeat,
  FiCalendar,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";
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
  { value: "50K+", label: "Happy Travelers" },
  { value: "120+", label: "Global Destinations" },
  { value: "500+", label: "Verified Agents" },
  { value: "24/7", label: "Travel Support Concierge" },
];

const orbitChips = [
  { label: "Dubai (DXB)", position: "-left-6 top-4", delay: "0s", duration: "3s" },
  { label: "Zurich (ZRH)", position: "-right-8 bottom-8", delay: "1s", duration: "3.6s" },
  { label: "Maldives (MLE)", position: "left-1/2 -translate-x-1/2 -bottom-4", delay: "0.5s", duration: "4s" },
];

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

        <div className="absolute inset-0" style={{ animation: "cliqkar-spin 12s linear infinite" }}>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/40">
            <FaPlane className="text-slate-900 text-sm -rotate-45" />
          </span>
        </div>

        {orbitChips.map((chip) => (
          <div
            key={chip.label}
            className={`absolute ${chip.position} bg-white/5 border border-white/10 backdrop-blur rounded-xl px-3 py-2 shadow-lg`}
            style={{ animation: `cliqkar-float ${chip.duration} ease-in-out infinite`, animationDelay: chip.delay }}
          >
            <p className="text-white text-xs font-semibold whitespace-nowrap">{chip.label}</p>
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
    setSearchForm((prev) => ({ ...prev, [field]: value }));
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...searchForm, tripType, fareClass }),
      });
      const data = await response.json();
      console.log("search results", data);
    } catch (error) {
      console.log("search error", error);
    }
  };

  return (
    <section className="relative bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f33] via-[#0a1628] to-[#0a1628]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-10 sm:pb-14">
        

        <div className="mt-6 sm:mt-10 flex flex-col lg:flex-row lg:items-center gap-10">
          <div className="w-full lg:max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wide">
                SMART TRAVEL · GLOBAL MOBILITY · VERIFIED PARTNERS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.1] mb-6">
              Stitch Your Journey.
              <br />
              Travel Without Friction.
            </h1>

            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-md px-3 py-1.5 mb-5">
              <IoShieldCheckmarkOutline className="text-blue-400" />
              <span className="text-blue-300 text-xs sm:text-sm font-medium">
                Flights. Visas. OTB. All Together.
              </span>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Discover competitive flights, simplify visa applications,
              connect with verified travel experts and complete your
              boarding requirements — all through one intelligent travel
              platform.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={() => navigate("/flight")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors"
              >
                Search Flights <FiArrowRight />
              </button>
              <button className="flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors">
                <MdOutlineVerifiedUser /> Explore Visa Services
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <MdFlight className="text-amber-400" />
                <span className="text-slate-400 text-xs font-medium tracking-wide">
                  TRENDING IN-FLIGHT ROUTES HANDLED BY CLIQKAR
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {trendingRoutes.map((route) => (
                  <div
                    key={route.city}
                    className="bg-white/5 border border-white/10 rounded-lg h-16 sm:h-20 flex flex-col justify-end p-2 sm:p-3"
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

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
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

          <FlightGlobeAnimation />
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-white text-2xl sm:text-3xl font-extrabold">
                {stat.value}
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