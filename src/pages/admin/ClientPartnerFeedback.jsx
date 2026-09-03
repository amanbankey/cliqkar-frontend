import React, { useState } from "react";
import { FiSearch, FiBell, FiHelpCircle, FiMenu, FiTrash2, FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Sidebar from "../../components/adminComponent/Sidebar";

const feedbackEntries = [
  {
    id: "#89",
    status: "Published",
    initials: "RS",
    name: "Rajvender Singh",
    role: "CEO & Founder, Astha Travels",
    verified: true,
    rating: 5.0,
    message:
      "Extremely WoW Trip — Cliqkar made my Foreign Customer Trip a Very Amaze & Memorable Trip. Special thanks to the operations team for making this journey fantastic.",
  },
  {
    id: "#86",
    status: "Published",
    initials: "MP",
    name: "Mousumi Pathak",
    role: "Operations Lead, Travel Vista",
    verified: true,
    rating: 5.0,
    message:
      "This was my first work with Cliqkar. The Sikkim and Darjeeling trip was handled exceptionally well. The operations team was very cooperative and checked in every evening. Nathula pass visit was at its best, and our customer had the best experience.",
  },
];

const ClientPartnerFeedback = ({ setSidebarOpen, sidebarOpen }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(feedbackEntries);

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 min-w-0 min-h-screen bg-gray-50">
        <div className="flex items-center justify-between gap-4 bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 flex-shrink-0">
              <FiMenu size={20} />
            </button>
            <div className="relative w-full max-w-xs">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search operations..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-gray-400 hover:text-gray-600">
              <FiBell size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <FiHelpCircle size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Client & Partner Feedback</h1>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Review B2B partner testimonials, operational feedback, and service ratings across travel
              bookings.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">ID / STATUS</th>
                    <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">PARTNER DETAILS</th>
                    <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">RATING</th>
                    <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400">FEEDBACK MESSAGE</th>
                    <th className="px-5 py-3 text-[10px] font-bold tracking-wide text-gray-400 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-50 last:border-0 align-top">
                      <td className="px-5 py-4">
                        <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded">
                          {entry.id}
                        </span>
                        <p className="text-[11px] font-semibold text-blue-600 mt-1.5">{entry.status}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {entry.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900">{entry.name}</p>
                            <p className="text-xs text-gray-400">{entry.role}</p>
                            {entry.verified && (
                              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded mt-1.5">
                                <FiCheckCircle size={10} />
                                VERIFIED PARTNER
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar key={i} size={11} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{entry.rating.toFixed(1)}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500 italic leading-relaxed max-w-sm">
                        "{entry.message}"
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing 1-{entries.length} of {entries.length} Feedback Entries
              </p>
              <div className="flex items-center gap-1.5">
                <button className="text-gray-300 p-1 rounded hover:bg-gray-50" disabled>
                  <FiChevronLeft size={16} />
                </button>
                <button className="w-6 h-6 rounded bg-blue-700 text-white text-xs font-semibold">1</button>
                <button className="text-gray-300 p-1 rounded hover:bg-gray-50" disabled>
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPartnerFeedback;