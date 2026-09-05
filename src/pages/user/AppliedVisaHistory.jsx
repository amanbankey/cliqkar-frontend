import React, { useState } from "react";

import {
  FiCopy,
  FiAlertTriangle,
  FiCheckCircle,
  FiRefreshCw,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiEye,
  FiFileText,
  FiMapPin,
  FiShield,
  FiSearch,
  FiChevronDown,
  FiCalendar,
  FiPlus,
  FiGlobe,
  FiUser,
  FiClipboard,
} from "react-icons/fi";

const user = {
  name: "Vivan Travels",
  email: "mail@vivantravels.com",
  creditBalance: "4,85,250",
};

const profile = {
  name: "Aarav V. Singhania",
  tier: "Platinum Partner",
  initials: "AS",
};

const filterTabs = [
  { label: "All", count: 64, active: true },
  { label: "Approved", count: 48, dot: "bg-emerald-500" },
  { label: "In Processing", count: 12, dot: "bg-blue-500" },
  { label: "On Hold", count: 4, dot: "bg-red-500" },
  { label: "Drafts", count: 8, dot: "bg-gray-400" },
];

const AppliedVisaHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 11;
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/visa-history/search?query=${encodeURIComponent(query)}`);
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Applied Visa History</h1>
                <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-2.5 py-1 rounded-full">64 Records</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> VFS &amp; MOFA Live Telemetry
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 max-w-2xl">
                Consulate e-visa submissions, biometric appointment tracking, and real-time embassy clearance
                telemetry synchronized with VFS Global, Dubai GDRFA, and MOFA portals.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiDownload size={14} /> Export Dossiers <FiChevronDown size={12} />
              </button>
              <button className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiPlus size={14} /> Apply New Visa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">TOTAL VISAS PROCESSED</p>
                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <FiUser size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">342 <span className="text-sm font-medium text-gray-400">Cases</span></p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">↑ +18 processed this calendar month</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">ACTIVE IN PROCESSING</p>
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <FiGlobe size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">19 <span className="text-sm font-medium text-gray-400">Consulates</span></p>
              <p className="mt-1 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">12 Express Track</span> · <span className="font-semibold text-gray-700">7 Standard Review</span>
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 tracking-wide">ACTION REQUIRED / HOLD</p>
                <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                  <FiClipboard size={14} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-red-500">4 <span className="text-sm font-medium text-gray-400">Cases</span></p>
              <p className="mt-1 text-xs text-gray-500">
                <span className="font-semibold text-red-500">● Biometrics &amp; Re-upload</span> flagged by
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.label}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                    tab.active ? "bg-blue-950 text-white" : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {tab.dot && <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />}
                  {tab.label} <span className={tab.active ? "text-white" : "text-gray-400"}>{tab.count}</span>
                </button>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-xs text-gray-400">
              <FiRefreshCw size={12} /> Auto-sync with GDRFA &amp; VFS every 60s
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5">
              <FiSearch className="text-gray-400 flex-shrink-0" size={15} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Ref #, Applicant Name, Passport No..."
                className="flex-1 text-sm text-gray-600 focus:outline-none"
              />
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">⌘K</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
              All Categories <FiChevronDown size={13} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 whitespace-nowrap">
              <FiCalendar size={14} className="text-gray-400" /> 01 Oct - 31 Oct <FiChevronDown size={13} className="text-gray-400" />
            </div>
          </form>

          <div className="space-y-5">
            <div className="bg-white border border-gray-200 border-l-4 border-l-red-500 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  REF #803746190 <FiCopy size={11} />
                </span>
                <p className="text-base font-bold text-gray-900">🇦🇪 UAE 30-Day Express Tourist Visa</p>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Individual</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                <FiAlertTriangle size={12} /> On Hold
              </span>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">APPLICANT NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">SANTOSH KUMAR VERMA</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT NO.</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">AF734301 <span className="font-normal text-gray-400">(Exp: 14 Aug 2031)</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PAN &amp; NATIONALITY</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">ASDFG1234F <span className="font-normal text-gray-400">· Indian</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">SUBMISSION TIMESTAMP</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Sep 26, 2025 • 05:33 PM IST</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiRefreshCw size={13} /> Resolve &amp; Re-upload
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiEye size={13} /> View Application
                </button>
              </div>

              <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-start gap-2">
                <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={13} />
                <p className="text-xs text-red-600 leading-relaxed">
                  <span className="font-bold">Consulate Requirement:</span> High-resolution passport front/back
                  bio-page re-upload requested by Dubai GDRFA clearance desk due to scan glare on MRZ string.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 border-l-4 border-l-gray-300 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  REF #252244745 <FiCopy size={11} />
                </span>
                <p className="text-base font-bold text-gray-900">🇫🇷 Schengen Short-Stay Tourist Visa (France)</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Family (3 Pax)</span>
                <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">
                  <FiEdit size={10} /> Draft
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">LEAD APPLICANT</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Vikramaditya Rathore</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT NO.</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">V8829103 <span className="font-normal text-gray-400">(Lead Pax)</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">CO-APPLICANTS</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">2 Dependents <span className="font-normal text-gray-400">(Spouse + Child)</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">LAST EDITED</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Oct 24, 2025 • 11:15 AM IST</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiEdit size={13} /> Complete Draft
                </button>
                <button className="flex items-center justify-center gap-2 text-red-500 bg-red-50 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiTrash2 size={13} /> Discard Draft
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-xs text-gray-500 flex-1">
                  <span className="font-bold text-gray-700">Step 2 of 4:</span> Travel Medical Insurance (€30,000
                  cover) &amp; Confirmed Hotel Vouchers missing
                </p>
                <div className="flex items-center gap-2 w-full sm:w-40">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-blue-600 rounded-full" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">50%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 border-l-4 border-l-emerald-500 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  REF #719171304 <FiCopy size={11} />
                </span>
                <p className="text-base font-bold text-gray-900">🇸🇦 Saudi Tourist eVisa (Multiple Entry - 1 Year)</p>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Individual</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <FiCheckCircle size={12} /> Approved
              </span>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">APPLICANT NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">MRS. KAVITA PATEL</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT NO.</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Z4928104 <span className="font-normal text-gray-400">· Indian</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">VISA GRANT NUMBER</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">MOFA-SA-992140</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">APPROVAL TIMESTAMP</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Oct 19, 2025 • 13:45 IST</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiDownload size={13} /> Download eVisa PDF
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiEye size={13} /> View Dossier
                </button>
              </div>

              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2">
                <FiCheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={13} />
                <p className="text-xs text-emerald-700 leading-relaxed">
                  <span className="font-bold">Validity Granted:</span> 18 Oct 2025 → 17 Oct 2026 (Max 90 days stay
                  per visit • Medical coverage included under KSA CCHI).
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 border-l-4 border-l-blue-500 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  REF #917613806 <FiCopy size={11} />
                </span>
                <p className="text-base font-bold text-gray-900">🇬🇧 UK Standard Visitor Visa (6 Months Single/Multiple)</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Corporate Express</span>
                <span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-full">
                  <FiRefreshCw size={10} /> In Processing
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">APPLICANT NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">MR. SUNALI MAJMUDAR</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT NO.</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">T4410298 <span className="font-normal text-gray-400">· PAN: AAACM5512L</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">VFS GLOBAL FILE REF</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">VFS-LON-DEL-8821</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">SUBMISSION DATE</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Oct 15, 2025 • 09:20 AM IST</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiRefreshCw size={13} /> Track VFS Status
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiFileText size={13} /> View Dossier
                </button>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-start justify-between gap-3 flex-wrap">
                <p className="flex items-start gap-2 text-xs text-blue-700 leading-relaxed">
                  <FiMapPin className="mt-0.5 flex-shrink-0" size={13} />
                  Biometrics Cleared at VFS Shivaji Stadium, New Delhi. Under Home Office review.
                </p>
                <span className="text-xs font-semibold text-blue-700 whitespace-nowrap">Estimated Clearance: 3 Working Days</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 border-l-4 border-l-emerald-500 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  REF #338192055 <FiCopy size={11} />
                </span>
                <p className="text-base font-bold text-gray-900">🇸🇬 Singapore SGAC &amp; E-Visa (Single Entry)</p>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Individual</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <FiCheckCircle size={12} /> Approved
              </span>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">APPLICANT NAME</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">MR. UMESH TAGLANI</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT NO.</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">VT850247 <span className="font-normal text-gray-400">· Indian</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">ICA SINGAPORE REF</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">ICA-SIN-091823</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">APPROVAL TIMESTAMP</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Oct 22, 2025 • 16:30 IST</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiDownload size={13} /> Download E-Visa PDF
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiEye size={13} /> View Dossier
                </button>
              </div>

              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2">
                <FiShield className="text-emerald-600 mt-0.5 flex-shrink-0" size={13} />
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Electronic pass verified: Changi Automated Clearance (Automated Gates eligible). SG Arrival Card
                  submitted.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 border-l-4 border-l-gray-300 rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  REF #640192841 <FiCopy size={11} />
                </span>
                <p className="text-base font-bold text-gray-900">🇴🇲 Oman Royal Police (ROP) Tourist Visa 10-Day</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Individual</span>
                <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">
                  <FiEdit size={10} /> Draft
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">LEAD APPLICANT</p>
                  <p className="text-sm font-bold italic text-gray-500 mt-1">Pending Primary Pax Entry</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">PASSPORT NO.</p>
                  <p className="text-sm font-medium text-gray-400 mt-1">Pending Upload</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">NATIONALITY</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Indian (Selected)</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wide">CREATED TIMESTAMP</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Oct 25, 2025 • 08:40 AM IST</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiEdit size={13} /> Complete Application
                </button>
                <button className="flex items-center justify-center gap-2 text-red-500 bg-red-50 text-xs font-semibold px-4 py-2.5 rounded-lg">
                  <FiTrash2 size={13} /> Delete
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-gray-700">Step 1 of 3:</span> Applicant Demographics &amp; Travel
                  Dates pending entry.
                </p>
                <span className="text-xs font-semibold text-gray-600">15% completed</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              Showing 1 to 6 of 64 visa dossiers
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">6 per page</span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="text-gray-500 font-medium"
              >
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
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="text-gray-700 font-semibold"
              >
                Next &gt;
              </button>
            </div>
          </div>

          <div className="bg-[#0B1120] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                <FiShield size={18} />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm sm:text-base font-bold text-white">Cliqkar Diplomatic &amp; VFS Verified Gateway</p>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full">ISO 27001 CERTIFIED</span>
                </div>
                <p className="mt-1 text-xs text-gray-400 max-w-lg">
                  Direct consulate API bridge operates with 256-bit zero-knowledge encrypted passport vaults and
                  100% DGCA / ICAO doc-verification compliance standards.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <button className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap">
                Consulate Fee Tariff Matrix
              </button>
              <button className="bg-emerald-400 hover:bg-emerald-300 text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap">
                Emergency Escalation Desk
              </button>
            </div>
          </div>
        </div>
      
  );
};

export default AppliedVisaHistory;