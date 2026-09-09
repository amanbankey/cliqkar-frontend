
 
import { FiCheckCircle, FiRefreshCw, FiDownload } from "react-icons/fi";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  User,
  Ticket,
  Calendar,
  UploadCloud,
  X,
  ChevronDown,
  Search,
  Globe2,
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  IndianRupee,
  Wallet,
  Zap,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileCheck2,
  Trash2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
 
const API_BASE = "/api";
 
const FALLBACK_COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Singapore",
  "Thailand",
  "Malaysia",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Indonesia",
  "Nepal",
  "Sri Lanka",
  "Vietnam",
  "Japan",
  "South Korea",
];
 
const FALLBACK_AIRLINES = [
  "IndiGo",
  "Air India",
  "Vistara",
  "SpiceJet",
  "Emirates",
  "Qatar Airways",
  "Etihad Airways",
  "Air India Express",
  "AirAsia",
  "Singapore Airlines",
  "Malaysia Airlines",
  "Thai Airways",
];

const steps = ["SUBMITTED", "REVIEW", "CARRIER DCS", "CLEARED"];



function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
 
async function fetchList(endpoint, fallback) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    if (Array.isArray(data) && data.length) return data;
    return fallback;
  } catch {
    return fallback;
  }
}
 
async function submitOtbApplication(payload) {
  const formData = new FormData();
  formData.append("goingTo", payload.goingTo);
  formData.append("airline", payload.airline);
  formData.append("totalAmount", payload.totalAmount);
  formData.append("paymentMethod", payload.paymentMethod);
  formData.append("travelers", JSON.stringify(
    payload.travelers.map(({ passportFront, passportBack, visa, fromTicket, toTicket, ...rest }) => rest)
  ));
  payload.travelers.forEach((traveler, idx) => {
    if (traveler.passportFront) formData.append(`traveler_${idx}_passportFront`, traveler.passportFront);
    if (traveler.passportBack) formData.append(`traveler_${idx}_passportBack`, traveler.passportBack);
    if (traveler.visa) formData.append(`traveler_${idx}_visa`, traveler.visa);
    if (traveler.fromTicket) formData.append(`traveler_${idx}_fromTicket`, traveler.fromTicket);
    if (traveler.toTicket) formData.append(`traveler_${idx}_toTicket`, traveler.toTicket);
  });
 
  const res = await fetch(`${API_BASE}/otb/apply`, {
    method: "POST",
    body: formData,
  });
 
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || "Something went wrong while submitting");
  }
  return res.json();
}
 
function FieldLabel({ children, required }) {
  return (
    <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-slate-600">
      {children}
      {required && <span className="text-orange-500">*</span>}
    </label>
  );
}
 
function TextInput({ label, icon, placeholder, value, onChange, required, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div
        className={`flex items-center gap-2.5 rounded-xl border-[1.5px] bg-white px-3.5 py-3 transition-all duration-200 ${
          focused
            ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
            : value
            ? "border-orange-300"
            : "border-orange-200 hover:border-orange-400"
        }`}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
            focused || value ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-400"
          }`}
        >
          {icon}
        </span>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full flex-1 bg-transparent text-[15px] font-medium text-blue-950 outline-none placeholder:font-normal placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
 
function DateInput({ label, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  return (
    <div className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>
      <button
        type="button"
        onClick={() => inputRef.current?.showPicker?.() || inputRef.current?.focus()}
        className={`flex w-full items-center gap-2.5 rounded-xl border-[1.5px] bg-white px-3.5 py-3 text-left transition-all duration-200 ${
          focused
            ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
            : value
            ? "border-orange-300"
            : "border-orange-200 hover:border-orange-400"
        }`}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
            focused || value ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-400"
          }`}
        >
          <Calendar size={16} />
        </span>
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full flex-1 bg-transparent text-[15px] font-medium text-blue-950 outline-none [&::-webkit-calendar-picker-indicator]:opacity-0"
        />
      </button>
    </div>
  );
}
 
function SearchDropdown({ label, icon, placeholder, value, onChange, options, required }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
 
  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
 
  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
 
  return (
    <div className="w-full" ref={wrapRef}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`group flex w-full items-center gap-2.5 rounded-xl border-[1.5px] bg-white px-3.5 py-3 text-left transition-all duration-200 ${
            open
              ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
              : value
              ? "border-orange-300"
              : "border-orange-200 hover:border-orange-400"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
              open || value ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-400"
            }`}
          >
            {icon}
          </span>
          <span className={`flex-1 truncate text-[15px] ${value ? "font-semibold text-blue-950" : "text-slate-400"}`}>
            {value || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-orange-500" : ""}`}
          />
        </button>
 
        {open && (
          <div className="absolute z-20 mt-2 w-full origin-top animate-[dropIn_0.15s_ease-out] rounded-xl border border-orange-200 bg-white p-2 shadow-xl shadow-orange-900/10">
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 focus-within:border-orange-400">
              <Search size={15} className="text-orange-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="text-slate-400 hover:text-orange-500">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="max-h-48 overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-track]:bg-transparent">
              {filtered.length === 0 && <p className="px-2 py-3 text-center text-sm text-slate-400">No matches found</p>}
              {filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    value === opt ? "bg-orange-50 font-semibold text-orange-600" : "text-slate-600 hover:bg-blue-50 hover:text-blue-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
function FileDropZone({ label, file, onFileSelect, onRemove, required }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
 
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onFileSelect(f);
    },
    [onFileSelect]
  );
 
  return (
    <div className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 text-center transition-all duration-200 ${
          dragging
            ? "scale-[1.01] border-orange-500 bg-orange-50 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
            : file
            ? "border-orange-300 bg-orange-50/60"
            : "border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 hover:border-orange-400 hover:bg-orange-50/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
        />
        {!file ? (
          <>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-900 text-white transition-transform duration-200 group-hover:scale-105">
              <UploadCloud size={20} />
            </span>
            <p className="text-sm font-semibold text-blue-950">Drag & Drop files here</p>
            <p className="text-xs text-slate-500">or click to browse from your device</p>
          </>
        ) : (
          <>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
              <FileCheck2 size={20} />
            </span>
            <p className="max-w-[90%] truncate text-sm font-semibold text-blue-950">{file.name}</p>
            <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
 
function TravelerCard({ traveler, index, onUpdate, onRemove, canRemove }) {
  return (
    <div className="animate-[fadeUp_0.25s_ease-out] rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-xs font-bold text-white">
            {index + 1}
          </span>
          <h3 className="text-base font-bold text-blue-950">Traveler {index + 1}</h3>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 transition-colors duration-150 hover:bg-red-50"
          >
            <Trash2 size={13} />
            Remove
          </button>
        )}
      </div>
 
      <div className="space-y-5">
        <TextInput
          label="Full Name"
          icon={<User size={16} />}
          placeholder="Enter your full name"
          value={traveler.fullName}
          onChange={(v) => onUpdate("fullName", v)}
          required
        />
 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextInput
            label="PNR"
            icon={<Ticket size={16} />}
            placeholder="Enter your PNR"
            value={traveler.pnr}
            onChange={(v) => onUpdate("pnr", v)}
            required
          />
          <DateInput label="Date of Birth" value={traveler.dob} onChange={(v) => onUpdate("dob", v)} required />
        </div>
 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FileDropZone
            label="Upload Passport Front Page"
            file={traveler.passportFront}
            onFileSelect={(f) => onUpdate("passportFront", f)}
            onRemove={() => onUpdate("passportFront", null)}
            required
          />
          <FileDropZone
            label="Upload Passport Back Page"
            file={traveler.passportBack}
            onFileSelect={(f) => onUpdate("passportBack", f)}
            onRemove={() => onUpdate("passportBack", null)}
            required
          />
        </div>
 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FileDropZone
            label="Upload Visa"
            file={traveler.visa}
            onFileSelect={(f) => onUpdate("visa", f)}
            onRemove={() => onUpdate("visa", null)}
            required
          />
          <FileDropZone
            label="Upload From Ticket"
            file={traveler.fromTicket}
            onFileSelect={(f) => onUpdate("fromTicket", f)}
            onRemove={() => onUpdate("fromTicket", null)}
            required
          />
        </div>
 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FileDropZone
            label="Upload To Ticket"
            file={traveler.toTicket}
            onFileSelect={(f) => onUpdate("toTicket", f)}
            onRemove={() => onUpdate("toTicket", null)}
            required
          />
        </div>
      </div>
    </div>
  );
}
 
function createEmptyTraveler(id) {
  return {
    id,
    fullName: "",
    pnr: "",
    dob: "",
    passportFront: null,
    passportBack: null,
    visa: null,
    fromTicket: null,
    toTicket: null,
  };
}
 

function OTBApplyForm() {
  const [travelers, setTravelers] = useState([createEmptyTraveler(1)]);
  const [nextId, setNextId] = useState(2);
  const [goingTo, setGoingTo] = useState("");
  const [airline, setAirline] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [countries, setCountries] = useState(FALLBACK_COUNTRIES);
  const [airlines, setAirlines] = useState(FALLBACK_AIRLINES);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
 
  useEffect(() => {
    fetchList("/countries", FALLBACK_COUNTRIES).then(setCountries);
    fetchList("/airlines", FALLBACK_AIRLINES).then(setAirlines);
  }, []);
 
  function updateTraveler(id, field, value) {
    setTravelers((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }
 
  function addTraveler() {
    setTravelers((prev) => [...prev, createEmptyTraveler(nextId)]);
    setNextId((n) => n + 1);
  }
 
  function removeTraveler(id) {
    setTravelers((prev) => prev.filter((t) => t.id !== id));
  }
 
  const isFormReady =
    confirmSubmit &&
    goingTo &&
    airline &&
    totalAmount &&
    travelers.every(
      (t) =>
        t.fullName &&
        t.pnr &&
        t.dob &&
        t.passportFront &&
        t.passportBack &&
        t.visa &&
        t.fromTicket &&
        t.toTicket
    );
 
  async function handleSubmit() {
    if (!isFormReady || status === "loading") return;
    setStatus("loading");
    setStatusMessage("");
    try {
      await submitOtbApplication({ goingTo, airline, totalAmount, paymentMethod, travelers });
      setStatus("success");
      setStatusMessage("Your OTB application has been submitted successfully.");
    } catch (err) {
      setStatus("error");
      setStatusMessage(err.message || "Submission failed. Please try again.");
    }
  }
 
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 p-3 sm:p-6">
      <style>{`
        @keyframes dropIn { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(var(--rot)); } 50% { transform: translateY(-10px) rotate(var(--rot)); } }
        @keyframes dashMove { to { stroke-dashoffset: -40; } }
        .float-plane { animation: floatSlow 4.5s ease-in-out infinite; }
      `}</style>
 
      <div className="mx-auto flex max-h-[94vh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl border border-orange-200/50 bg-white shadow-2xl shadow-blue-950/20 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-track]:bg-orange-50">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 px-6 py-9 sm:px-10 sm:py-11">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl" />
 
          <span
            className="float-plane absolute left-6 top-8 text-orange-400/70 sm:left-12"
            style={{ "--rot": "-18deg" }}
          >
            <PlaneTakeoff size={30} />
          </span>
          <span
            className="float-plane absolute right-6 top-10 text-orange-400/70 sm:right-14"
            style={{ "--rot": "18deg", animationDelay: "1.2s" }}
          >
            <PlaneLanding size={30} />
          </span>
 
          <div className="relative flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500">
              <ShieldCheck size={18} className="text-white" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              Secure &amp; verified processing
            </span>
          </div>
 
          <h1 className="relative mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            <span className="text-orange-400">OTB</span> Apply
          </h1>
          <p className="relative mt-1.5 max-w-md text-sm text-blue-200 sm:text-base">
            Submit your onward travel documents and get your booking confirmed in minutes.
          </p>
        </div>
 
        <div className="flex items-center gap-2 border-b border-blue-100 bg-blue-50/60 px-6 py-4 sm:px-10">
          <Plane size={16} className="text-blue-900" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-blue-950">Traveler Details</h2>
        </div>
 
        <div className="space-y-5 px-4 py-6 sm:px-10 sm:py-8">
          {travelers.map((traveler, idx) => (
            <TravelerCard
              key={traveler.id}
              traveler={traveler}
              index={idx}
              onUpdate={(field, value) => updateTraveler(traveler.id, field, value)}
              onRemove={() => removeTraveler(traveler.id)}
              canRemove={travelers.length > 1}
            />
          ))}
 
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addTraveler}
              className="flex items-center gap-2 rounded-xl border-2 border-orange-400 bg-white px-5 py-2.5 text-sm font-semibold text-orange-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-200/60"
            >
              <UserPlus size={16} />
              Add Another Traveler
            </button>
          </div>
        </div>
 
        <div className="flex items-center gap-2 border-y border-blue-100 bg-blue-50/60 px-6 py-4 sm:px-10">
          <Globe2 size={16} className="text-blue-900" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-blue-950">Trip &amp; Payment</h2>
        </div>
 
        <div className="space-y-6 px-4 py-6 sm:px-10 sm:py-8">
          <SearchDropdown
            label="Going To"
            icon={<Globe2 size={16} />}
            placeholder="Select destination country"
            value={goingTo}
            onChange={setGoingTo}
            options={countries}
            required
          />
 
          <SearchDropdown
            label="Select Airlines"
            icon={<Plane size={16} />}
            placeholder="Select your airline"
            value={airline}
            onChange={setAirline}
            options={airlines}
            required
          />
 
          <TextInput
            label="Total Amount"
            icon={<IndianRupee size={16} />}
            placeholder="0"
            value={totalAmount}
            onChange={(v) => setTotalAmount(v.replace(/[^0-9.]/g, ""))}
            required
          />
 
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
            <span
              onClick={() => setConfirmSubmit((c) => !c)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                confirmSubmit ? "border-orange-500 bg-orange-500" : "border-slate-300 bg-white hover:border-orange-400"
              }`}
            >
              {confirmSubmit && <CheckCircle2 size={13} className="text-white" />}
            </span>
            <span onClick={() => setConfirmSubmit((c) => !c)}>Confirm and submit</span>
          </label>
 
          <div className="border-t border-dashed border-orange-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-blue-950">Choose Payment Method</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-8 ${
                    paymentMethod === "online"
                      ? "border-orange-500 bg-orange-50 text-orange-600 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
                      : "border-slate-200 text-slate-500 hover:border-orange-300"
                  }`}
                >
                  <Zap size={16} className={paymentMethod === "online" ? "text-orange-500" : "text-slate-400"} />
                  Online
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-8 ${
                    paymentMethod === "wallet"
                      ? "border-orange-500 bg-orange-50 text-orange-600 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
                      : "border-slate-200 text-slate-500 hover:border-orange-300"
                  }`}
                >
                  <Wallet size={16} className={paymentMethod === "wallet" ? "text-orange-500" : "text-slate-400"} />
                  Wallet
                </button>
              </div>
 
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormReady || status === "loading"}
                className={`flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 ${
                  isFormReady && status !== "loading"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-orange-500/50 active:translate-y-0"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ChevronRight size={16} />
                )}
                Apply Now
              </button>
            </div>
          </div>
 
          {status === "success" && (
            <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 animate-[fadeUp_0.25s_ease-out]">
              <CheckCircle2 size={18} />
              {statusMessage}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 animate-[fadeUp_0.25s_ease-out]">
              <AlertCircle size={18} />
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
 


const LiveStatusSimulation = () => {
  return (
    <section className="bg-white">
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-600">REAL-TIME DISPATCH CONSOLE</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">Live OTB Status Verification Simulation</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">
            Observe live dispatch state transitions between active carrier queue transmission and finalized digital
            boarding stamps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE CLEARANCE</p>
                <p className="text-base font-bold text-gray-900">Arjun Mehta</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> PROCESSING
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                PNR: <span className="font-semibold text-gray-800">IX-4891B2</span> · Air India Express
              </span>
              <span className="font-semibold text-gray-800">DEL → DXB</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs border-t border-gray-100 pt-4">
              <div>
                <p className="text-gray-400">Carrier Flight</p>
                <p className="font-semibold text-gray-800">IX-141</p>
              </div>
              <div>
                <p className="text-gray-400">Depart Date</p>
                <p className="font-semibold text-gray-800">18 May 2026</p>
              </div>
              <div>
                <p className="text-gray-400">Arrival Hub</p>
                <p className="font-semibold text-gray-800">DXB Terminal 2</p>
              </div>
              <div>
                <p className="text-gray-400">Ticket Class</p>
                <p className="font-semibold text-gray-800">Economy (Y)</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">E-Visa Legitimacy Check (UAE GDRFA/ICP)</span>
                <span className="font-semibold text-emerald-600">Passed (Score 100%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Airline GDS Sector &amp; PNR Match</span>
                <span className="font-semibold text-emerald-600">Verified</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Direct Carrier Clearance Handshake</span>
                <span className="font-semibold text-blue-600">Transmitting DCS...</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-blue-500 rounded-full" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-1">
              {steps.map((step, i) => (
                <div key={step} className="text-center">
                  <div className={`h-1 rounded-full mb-1.5 ${i <= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
                  <p className={`text-[9px] font-semibold ${i === 2 ? "text-blue-600" : "text-gray-400"}`}>{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Queue Priority: Standard Web</span>
              <button className="flex items-center gap-1.5 text-blue-600 font-semibold">
                <FiRefreshCw size={12} /> Refresh Status
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 tracking-wide">AIRLINE CLEARANCE</p>
                <p className="text-base font-bold text-gray-900">Rohit Sharma</p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <FiCheckCircle size={11} /> VERIFIED
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                PNR: <span className="font-semibold text-gray-800">EK-9824A1</span> · Emirates Official
              </span>
              <span className="font-semibold text-gray-800">BOM → DOH</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs border-t border-gray-100 pt-4">
              <div>
                <p className="text-gray-400">Carrier Flight</p>
                <p className="font-semibold text-gray-800">EK-501</p>
              </div>
              <div>
                <p className="text-gray-400">Depart Date</p>
                <p className="font-semibold text-gray-800">14 May 2026</p>
              </div>
              <div>
                <p className="text-gray-400">Arrival Hub</p>
                <p className="font-semibold text-gray-800">DOH Hamad Intl</p>
              </div>
              <div>
                <p className="text-gray-400">Passenger Class</p>
                <p className="font-semibold text-gray-800">Business (J)</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">E-Visa Legitimacy Check</span>
                <span className="font-semibold text-emerald-600">Authenticated</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Airline System PNR Validation</span>
                <span className="font-semibold text-emerald-600">Matched &amp; Ticketed</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Direct Carrier Clearance Stamp</span>
                <span className="font-semibold text-emerald-600">Approved &amp; Synced</span>
              </div>
            </div>

            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <FiCheckCircle size={13} /> OK TO BOARD CONFIRMED
              </p>
              <p className="mt-1 text-[11px] text-emerald-700 leading-relaxed">
                Cleared in Airline DCS (Departure Control System) with Digital Stamp #CLQ-77821. Physical airport
                counter clearance guaranteed.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">VERIFIED 28 MIN AGO</span>
              <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg">
                <FiDownload size={13} /> Download OTB Slip (PDF)
              </button>
            </div>
          </div>
        </div>
      </div> */}
    
     {/* <VisaSearchForm />  */}
      <OTBApplyForm />
    </section>
  );
};

export default LiveStatusSimulation;
