import React, { useState } from "react";

import {
  FiShield,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiCopy,
  FiHeadphones,
  FiRefreshCw,
  FiPrinter,
  FiDownload,
  FiEye,
  FiFileText,
  FiSearch,
  FiChevronDown,
  FiDownloadCloud,
  FiPlus,
  FiClock,
  FiRepeat,
} from "react-icons/fi";


const AppliedOTBHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 17;
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/otb-history/search?query=${encodeURIComponent(query)}`);
      await response.json();
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    

        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Applied OTB History</h1>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> 68 Records ·{" "}
                  <span className="text-red-500 font-semibold">3 Need Action</span>
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 max-w-2xl">
                Carrier-synced Ok-To-Board validation, GCC immigration clearance, and real-time direct airline API
                telemetry for IndiGo, Air India Express, SpiceJet, and Air Arabia.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiDownloadCloud size={14} /> Export Manifest (CSV)
              </button>
              <button className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiPlus size={14} /> Apply New OTB
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">TOTAL CLEARANCES</p>
                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <FiShield size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">
                418 <span className="text-sm font-semibold text-emerald-600">↑+24</span>
              </p>
              <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                <span>Processed this month</span>
                <span>99.4% GDS sync</span>
              </div>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gray-800 rounded-full" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">CONFIRMED / CLEARED</p>
                <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <FiCheckCircle size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">
                392 <span className="text-sm font-semibold text-emerald-600">93.8%</span>
              </p>
              <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                <span>Instant GDS OKTB flag</span>
                <span>Zero boarding denials</span>
              </div>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">ATTENTION / REJECTED</p>
                <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                  <FiAlertTriangle size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-red-500">
                3 <span className="text-sm font-semibold text-red-500">Urgent</span>
              </p>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-gray-500">Visa re-scan or PNR name</span>
                <span className="text-red-500 font-semibold">Take action</span>
              </div>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[7%] bg-red-500 rounded-full" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap ${
                  activeTab === "all" ? "bg-blue-950 text-white" : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                All (68)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("confirmed")}
                className={`text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap ${
                  activeTab === "confirmed" ? "bg-blue-950 text-white" : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                Confirmed (61)
              </button>
            </div>

            <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5">
              <FiSearch className="text-gray-400 flex-shrink-0" size={15} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search PNR, Ref, Passenger, Passport..."
                className="flex-1 text-sm text-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 whitespace-nowrap">
              All Carriers (6E, IX, SG) <FiChevronDown size={13} className="text-gray-400" />
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 whitespace-nowrap">
              GCC Emirates / Oman <FiChevronDown size={13} className="text-gray-400" />
            </div>
          </form>

          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-400 font-semibold text-xs">REF</span>
                  <span className="font-bold text-gray-900">#317430953</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                    6E IndiGo 6E-1405
                  </span>
                  <span className="text-gray-700 font-semibold">DEL → AUH (Abu Dhabi, UAE 🇦🇪)</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <FiXCircle size={12} /> Rejected by Airline
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSENGER NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">RAJESH KUMAR</p>
                  <p className="text-[11px] text-gray-400">DOB: 17 Sep 1988 • Male</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE PNR</p>
                  <p className="flex items-center gap-1 text-sm font-bold text-gray-900 mt-1">
                    P848048 <FiCopy size={11} className="text-gray-400" />
                  </p>
                  <p className="text-[11px] text-gray-400">IndiGo Direct NDC API</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT DETAILS</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Z5198024 (Indian Passport)</p>
                  <p className="text-[11px] text-gray-400">Tourist eVisa 30-Day Single</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">TIMESTAMP &amp; TELEMETRY</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Sep 18, 2025 • 02:30 PM IST</p>
                  <p className="text-[11px] text-red-500 font-medium">Denied in 14m 12s by Gatekeeper</p>
                </div>
              </div>

              <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={13} />
                  <p className="text-xs text-red-600 leading-relaxed">
                    <span className="font-bold">Carrier Rejection Reason:</span> Visa copy MRZ string blurred &amp;
                    Tourist eVisa validity date format mismatch with airline ticket return sector (AUH-DEL).
                  </p>
                </div>
                <button className="bg-white text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-lg whitespace-nowrap flex-shrink-0">
                  View Airline Denial Memo
                </button>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <FiShield size={12} /> Pre-departure immigration verification desk: IndiGo Desk Node #04
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiHeadphones size={13} /> Contact 6E Helpdesk
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiRefreshCw size={13} /> Re-Submit OTB with New Scan
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-400 font-semibold text-xs">REF</span>
                  <span className="font-bold text-gray-900">#404362087</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                    IX Air India Express IX-196
                  </span>
                  <span className="text-gray-700 font-semibold">BOM → DXB (Dubai, UAE 🇦🇪)</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <FiCheckCircle size={12} /> OTB Confirmed
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSENGER NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">NASIR NASIR</p>
                  <p className="text-[11px] text-gray-400">DOB: 04 May 1992 • Male</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE PNR</p>
                  <p className="flex items-center gap-1 text-sm font-bold text-gray-900 mt-1">
                    U1EKSL <FiCopy size={11} className="text-gray-400" />
                  </p>
                  <p className="text-[11px] text-gray-400">Air India GDS Host 1A</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT DETAILS</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">V3940182 (Indian Passport)</p>
                  <p className="text-[11px] text-gray-400">Employment Residence Visa Entry</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">TIMESTAMP &amp; TELEMETRY</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Sep 16, 2025 • 11:15 AM IST</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Cleared in 27m via Sabre Gate</p>
                </div>
              </div>

              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <FiShield className="text-emerald-600 mt-0.5 flex-shrink-0" size={13} />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    <span className="font-bold">Carrier Auth Ref: IX-DXB-OTB-98421</span> - Verified by Air India
                    Express GDS Gatekeeper at 11:42 AM IST • Emigration Manifest Synced
                  </p>
                </div>
                <span className="bg-white text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
                  GDS Status: OKTB Active
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <FiCheckCircle size={12} className="text-emerald-500" /> Boarding Gate clearance active for BOM
                Terminal 2
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiPrinter size={13} /> Print Boarding Sticker
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiDownload size={13} /> Download Clearance Slip (PDF)
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-400 font-semibold text-xs">REF</span>
                  <span className="font-bold text-gray-900">#190260084</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                    6E IndiGo 6E-8502
                  </span>
                  <span className="text-gray-700 font-semibold">HYD → SHJ (Sharjah, UAE 🇦🇪)</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <FiCheckCircle size={12} /> OTB Confirmed
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSENGER NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">SUNITA SHARMA</p>
                  <p className="text-[11px] text-gray-400">DOB: 22 Nov 1984 • Female</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE PNR</p>
                  <p className="flex items-center gap-1 text-sm font-bold text-gray-900 mt-1">
                    K928LA <FiCopy size={11} className="text-gray-400" />
                  </p>
                  <p className="text-[11px] text-gray-400">IndiGo Direct NDC API</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT DETAILS</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">W8920194 (Indian Passport)</p>
                  <p className="text-[11px] text-gray-400">Tourist eVisa 60-Day Multiple</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">TIMESTAMP &amp; TELEMETRY</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Sep 15, 2025 • 09:40 AM IST</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Cleared in 16m 40s</p>
                </div>
              </div>

              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <FiRepeat className="text-emerald-600 mt-0.5 flex-shrink-0" size={13} />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    <span className="font-bold">Carrier Auth Ref: 6E-SHJ-77192</span> - Pre-Departure Emigration
                    Pass Active • Automated PNR SSR Remarks Appended
                  </p>
                </div>
                <span className="bg-white text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
                  SSR: OTB OK 6E
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <FiCheckCircle size={12} className="text-emerald-500" /> Digital seal authenticated by Sharjah Civil
                Aviation
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiEye size={13} /> View Application
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiDownload size={13} /> Download Clearance Slip (PDF)
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-400 font-semibold text-xs">REF</span>
                  <span className="font-bold text-gray-900">#78910441</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                    SG SpiceJet SG-8120
                  </span>
                  <span className="text-gray-700 font-semibold">AMD → MCT (Muscat, Oman 🇴🇲)</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Carrier Review in Progress
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSENGER NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">MOHAMMAD FAROOQ</p>
                  <p className="text-[11px] text-gray-400">DOB: 12 Aug 1995 • Male</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE PNR</p>
                  <p className="flex items-center gap-1 text-sm font-bold text-gray-900 mt-1">
                    SG-VT-441029 <FiCopy size={11} className="text-gray-400" />
                  </p>
                  <p className="text-[11px] text-gray-400">SpiceJet Direct B2B API</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT DETAILS</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">T4410298 (Indian Passport)</p>
                  <p className="text-[11px] text-gray-400">Royal Oman Police (ROP) eVisa</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">TIMESTAMP &amp; TELEMETRY</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Today • 14:10 IST</p>
                  <p className="text-[11px] text-blue-600 font-medium">Queue Priority #03</p>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <FiRefreshCw className="text-blue-600 mt-0.5 flex-shrink-0" size={13} />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    <span className="font-bold">Direct API Telemetry: SpiceJet Gulf Immigration Desk</span> - API
                    Ping queued with SpiceJet Gulf Desk. Est. turnaround: 12 mins • ROP verification active
                  </p>
                </div>
                <span className="flex items-center gap-1.5 bg-white text-blue-700 text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Telemetry Active
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <FiClock size={12} /> Real-time webhook will automatically update this record upon carrier
                confirmation
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiFileText size={13} /> Update Ticket Vouchers
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiSearch size={13} /> Track Carrier Queue
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-5">
            <span className="w-11 h-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
              <FiShield size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                Direct Airline Immigration Bridge (ICAO &amp; DGCA Compliant)
              </p>
              <p className="mt-1 text-xs text-gray-500 max-w-lg">
                Automated 256-bit OCR cross-matching, instant PNR reconciliation, and 24/7 Airline Airport Counter
                Escalation Desk for Vivan Travels.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
              {["IndiGo API v4.2", "Air India Express GDS", "SpiceJet Portal"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap">
                  <FiCheckCircle size={12} className="text-emerald-500" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              Showing 1 to 4 of 68 OTB clearances
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">4 per page</span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="text-gray-500 font-medium">
                &lt; Prev
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                    page === currentPage ? "bg-blue-900 text-white" : "border border-gray-200 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-400 text-xs">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                  currentPage === totalPages ? "bg-blue-900 text-white" : "border border-gray-200 text-gray-600"
                }`}
              >
                {totalPages}
              </button>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="text-gray-700 font-semibold">
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      
  );
};

export default AppliedOTBHistory;