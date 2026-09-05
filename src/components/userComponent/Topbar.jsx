import React, { useState } from "react";
import {
  FiSearch,
  FiHeadphones,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

const profile = {
  name: "Aarav V. Singhania",
  tier: "Platinum Partner",
  initials: "AS",
};

const TopBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/user/bookings/search?pnr=${encodeURIComponent(query)}`
      );

      await response.json();
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <header className="w-full h-[58px] flex items-center px-4 sm:px-6 border-b border-gray-200 bg-white flex-shrink-0">
      
      {/* Search */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[510px] flex-shrink flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-[32px]"
      >
        <FiSearch
          className="text-gray-400 flex-shrink-0"
          size={16}
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Global PNR / Booking ID..."
          className="flex-1 min-w-0 bg-transparent text-sm text-gray-600 focus:outline-none"
        />
      </form>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-5 flex-shrink-0">

        {/* Currency */}
        <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
          INR ₹
          <FiChevronDown size={13} />
        </div>

        {/* Concierge */}
        <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 whitespace-nowrap">
          <FiHeadphones size={17} />
          Concierge
        </div>

        {/* Notification */}
        <button
          type="button"
          className="relative flex-shrink-0 text-gray-500 p-1"
        >
          <FiBell size={19} />

          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            {profile.initials}
          </span>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight whitespace-nowrap">
              {profile.name}
            </p>

            <p className="text-[11px] text-gray-400 leading-tight whitespace-nowrap">
              {profile.tier}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default TopBar;