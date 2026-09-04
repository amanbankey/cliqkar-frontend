import { useState } from "react";
import {
  FiArrowRight,
  FiRepeat,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";
import {
  MdFlight,
  MdOutlineHotel,
  MdOutlineVerifiedUser,
  MdOutlineDashboard,
} from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BsCheckCircleFill } from "react-icons/bs";

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

export default function HeroSection() {
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
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/70 text-[10px] sm:text-xs font-medium tracking-wide">
              AVIATION VISTA SYNC: DXB · MLE · ZRH
            </span>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 flex flex-col lg:flex-row items-start gap-10 lg:gap-8">
          <div className="w-full lg:w-1/2">
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
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors">
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

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <MdFlight className="text-slate-700 text-lg" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-slate-900 text-xs sm:text-sm font-bold">
                        FIRST CLASS CABIN
                      </p>
                      <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        GDS LIVE
                      </span>
                    </div>
                    <p className="text-slate-500 text-[10px] sm:text-xs flex items-center gap-1">
                      <BsCheckCircleFill className="text-emerald-500" />
                      Electrochromic Smart Dimmer Active
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">
                  Tint Level 1
                </span>
              </div>

              <div className="grid grid-cols-3 bg-slate-100 rounded-lg p-1 mb-4">
                {[
                  { name: "Flights", icon: <MdFlight /> },
                  { name: "Hotels", icon: <MdOutlineHotel /> },
                  { name: "Visas", icon: <MdOutlineVerifiedUser /> },
                ].map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors ${
                      activeTab === tab.name
                        ? "bg-blue-600 text-white"
                        : "text-slate-500"
                    }`}
                  >
                    {tab.icon} {tab.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-5 mb-5">
                {["One Way", "Round Trip", "Multi City"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === type}
                      onChange={() => setTripType(type)}
                      className="accent-blue-600 w-3.5 h-3.5"
                    />
                    <span className="text-slate-700 text-xs sm:text-sm">
                      {type}
                    </span>
                  </label>
                ))}
              </div>

              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-2 gap-3 mb-3 relative">
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                      FROM ORIGIN
                    </p>
                    <input
                      value={searchForm.fromCode}
                      onChange={(e) =>
                        handleFieldChange("fromCode", e.target.value)
                      }
                      className="text-slate-900 font-bold text-lg outline-none w-full"
                    />
                    <input
                      value={searchForm.fromCity}
                      onChange={(e) =>
                        handleFieldChange("fromCity", e.target.value)
                      }
                      className="text-slate-500 text-xs outline-none w-full"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={swapLocations}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow z-10"
                  >
                    <FiRepeat className="text-xs" />
                  </button>

                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                      TO DESTINATION
                    </p>
                    <input
                      value={searchForm.toCode}
                      onChange={(e) =>
                        handleFieldChange("toCode", e.target.value)
                      }
                      className="text-slate-900 font-bold text-lg outline-none w-full"
                    />
                    <input
                      value={searchForm.toCity}
                      onChange={(e) =>
                        handleFieldChange("toCity", e.target.value)
                      }
                      className="text-slate-500 text-xs outline-none w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1 flex items-center gap-1">
                      <FiCalendar /> DEPARTURE
                    </p>
                    <input
                      type="date"
                      value={searchForm.departureDate}
                      onChange={(e) =>
                        handleFieldChange("departureDate", e.target.value)
                      }
                      className="text-slate-900 font-bold text-sm outline-none w-full"
                    />
                  </div>
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1 flex items-center gap-1">
                      <FiCalendar /> RETURN
                    </p>
                    <input
                      type="date"
                      value={searchForm.returnDate}
                      onChange={(e) =>
                        handleFieldChange("returnDate", e.target.value)
                      }
                      className="text-slate-900 font-bold text-sm outline-none w-full"
                    />
                  </div>
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1 flex items-center gap-1">
                      <FiUsers /> CABIN &amp; SEATS
                    </p>
                    <select
                      value={searchForm.cabinClass}
                      onChange={(e) =>
                        handleFieldChange("cabinClass", e.target.value)
                      }
                      className="text-blue-600 font-bold text-sm outline-none w-full bg-transparent"
                    >
                      <option>First / Business</option>
                      <option>Economy</option>
                      <option>Premium Economy</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px] font-semibold tracking-wide">
                      FARE CLASS:
                    </span>
                    {["Exclusive Offer", "Student", "Flexi"].map((fare) => (
                      <button
                        type="button"
                        key={fare}
                        onClick={() => setFareClass(fare)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                          fareClass === fare
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-500"
                        }`}
                      >
                        {fare}
                      </button>
                    ))}
                  </div>
                  <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                    <BsCheckCircleFill /> Best Fare Guarantee
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Search Live Availability <FiArrowRight />
                </button>
              </form>
            </div>
          </div>
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