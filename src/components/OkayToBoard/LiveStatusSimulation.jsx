import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  User,
  Ticket,
  Calendar,
  Upload,
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
  FileText,
  CircleCheck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  LockKeyhole,
  CloudUpload,
  Users,
  ClipboardCheck,
  Eye,
  RefreshCw,
  Check,
  MapPin,
  Receipt,
} from "lucide-react";

const API_BASE = "/api";

/* =========================================================
   FALLBACK DATA
========================================================= */

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

/* =========================================================
   HELPERS
========================================================= */

function formatBytes(bytes) {
  if (!bytes) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(1)} MB`;
}

function getTravelerCompletion(traveler) {
  const fields = [
    traveler.fullName,
    traveler.pnr,
    traveler.dob,
    traveler.passportFront,
    traveler.passportBack,
    traveler.visa,
    traveler.fromTicket,
    traveler.toTicket,
  ];

  const completed = fields.filter(Boolean).length;

  return {
    completed,
    total: fields.length,
    percentage: Math.round((completed / fields.length) * 100),
  };
}

async function fetchList(endpoint, fallback) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);

    if (!res.ok) {
      throw new Error("Bad response");
    }

    const data = await res.json();

    if (Array.isArray(data) && data.length) {
      return data;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

/* =========================================================
   API SUBMIT
========================================================= */

async function submitOtbApplication(payload) {
  const formData = new FormData();

  formData.append("goingTo", payload.goingTo);
  formData.append("airline", payload.airline);
  formData.append("totalAmount", payload.totalAmount);
  formData.append("paymentMethod", payload.paymentMethod);

  formData.append(
    "travelers",
    JSON.stringify(
      payload.travelers.map(
        ({
          passportFront,
          passportBack,
          visa,
          fromTicket,
          toTicket,
          ...rest
        }) => rest
      )
    )
  );

  payload.travelers.forEach((traveler, idx) => {
    if (traveler.passportFront) {
      formData.append(
        `traveler_${idx}_passportFront`,
        traveler.passportFront
      );
    }

    if (traveler.passportBack) {
      formData.append(
        `traveler_${idx}_passportBack`,
        traveler.passportBack
      );
    }

    if (traveler.visa) {
      formData.append(
        `traveler_${idx}_visa`,
        traveler.visa
      );
    }

    if (traveler.fromTicket) {
      formData.append(
        `traveler_${idx}_fromTicket`,
        traveler.fromTicket
      );
    }

    if (traveler.toTicket) {
      formData.append(
        `traveler_${idx}_toTicket`,
        traveler.toTicket
      );
    }
  });

  const res = await fetch(`${API_BASE}/otb/apply`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));

    throw new Error(
      errBody.message || "Something went wrong while submitting"
    );
  }

  return res.json();
}

/* =========================================================
   FIELD LABEL
========================================================= */

function FieldLabel({ children, required }) {
  return (
    <label className="mb-2 flex items-center gap-1 text-[12px] font-bold uppercase tracking-wide text-slate-500">
      {children}

      {required && (
        <span className="text-blue-600">*</span>
      )}
    </label>
  );
}

/* =========================================================
   TEXT INPUT
========================================================= */

function TextInput({
  label,
  icon,
  placeholder,
  value,
  onChange,
  required,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>

      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${
          focused
            ? "border-blue-500 bg-white shadow-[0_0_0_4px_rgba(59,130,246,0.10)]"
            : value
            ? "border-blue-200 bg-blue-50/30"
            : "border-slate-200 bg-white hover:border-blue-300"
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            focused || value
              ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
              : "bg-slate-100 text-slate-400"
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
          className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:font-normal placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

/* =========================================================
   DATE INPUT
========================================================= */

function DateInput({
  label,
  value,
  onChange,
  required,
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>

      <div
        onClick={() => {
          inputRef.current?.showPicker?.();
          inputRef.current?.focus();
        }}
        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
          focused
            ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.10)]"
            : value
            ? "border-blue-200 bg-blue-50/30"
            : "border-slate-200 bg-white hover:border-blue-300"
        }`}
      >
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            focused || value
              ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <Calendar size={17} />
        </span>

        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-700 outline-none"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH DROPDOWN
========================================================= */

function SearchDropdown({
  label,
  icon,
  placeholder,
  value,
  onChange,
  options,
  required,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={wrapRef} className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
            open
              ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.10)]"
              : value
              ? "border-blue-200 bg-blue-50/30"
              : "border-slate-200 bg-white hover:border-blue-300"
          }`}
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              open || value
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {icon}
          </span>

          <span
            className={`flex-1 truncate text-sm ${
              value
                ? "font-semibold text-slate-700"
                : "text-slate-400"
            }`}
          >
            {value || placeholder}
          </span>

          <ChevronDown
            size={18}
            className={`text-slate-400 transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
              <Search
                size={16}
                className="text-blue-500"
              />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm outline-none"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                >
                  <X
                    size={16}
                    className="text-slate-400"
                  />
                </button>
              )}
            </div>

            <div className="max-h-56 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="py-5 text-center text-sm text-slate-400">
                  No results found
                </p>
              )}

              {filtered.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center rounded-xl px-3 py-3 text-left text-sm transition ${
                    value === option
                      ? "bg-blue-50 font-bold text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option}

                  {value === option && (
                    <Check
                      size={16}
                      className="ml-auto text-blue-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FILE DROP ZONE
========================================================= */

function FileDropZone({
  label,
  file,
  onFileSelect,
  onRemove,
  required,
}) {
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();

      setDragging(false);

      const selectedFile = e.dataTransfer.files?.[0];

      if (selectedFile) {
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="w-full">
      <FieldLabel required={required}>{label}</FieldLabel>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : file
            ? "border-blue-200 bg-blue-50/60"
            : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];

            if (selectedFile) {
              onFileSelect(selectedFile);
            }
          }}
        />

        {!file ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600">
              <CloudUpload size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-700">
                Upload document
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PDF, JPG or PNG supported
              </p>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
            >
              Browse
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FileCheck2 size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-700">
                {file.name}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {formatBytes(file.size)}
                </span>

                <span className="flex items-center gap-1 text-xs font-bold text-blue-900">
                  <CheckCircle2 size={13} />
                  Uploaded
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
              title="Replace file"
            >
              <RefreshCw size={16} />
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
              title="Remove file"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY TRAVELER
========================================================= */

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

/* =========================================================
   PREMIUM STEP HEADER
========================================================= */

function Stepper({ currentStep }) {
  const steps = [
    {
      number: 1,
      title: "Travelers",
      icon: Users,
    },
    {
      number: 2,
      title: "Documents",
      icon: FileText,
    },
    {
      number: 3,
      title: "Trip Details",
      icon: Plane,
    },
    {
      number: 4,
      title: "Review",
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="border-b border-slate-100 bg-white px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = currentStep > step.number;
          const active = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 ${
                    completed
                      ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                      : active
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {completed ? (
                    <Check size={19} />
                  ) : (
                    <Icon size={19} />
                  )}
                </div>

                <p
                  className={`mt-2 hidden text-[11px] font-bold sm:block ${
                    active
                      ? "text-blue-600"
                      : completed
                      ? "text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div className="mx-2 h-[2px] flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentStep > step.number
                        ? "w-full bg-blue-400"
                        : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATION SUMMARY
========================================================= */

function ApplicationSummary({
  travelers,
  goingTo,
  airline,
  totalAmount,
  currentStep,
}) {
  const totalDocuments = travelers.length * 5;

  const uploadedDocuments = travelers.reduce(
    (total, traveler) => {
      return (
        total +
        [
          traveler.passportFront,
          traveler.passportBack,
          traveler.visa,
          traveler.fromTicket,
          traveler.toTicket,
        ].filter(Boolean).length
      );
    },
    0
  );

  const percentage =
    totalDocuments > 0
      ? Math.round(
          (uploadedDocuments / totalDocuments) * 100
        )
      : 0;

  return (
    <aside className="sticky top-6 space-y-5">
      <div className="overflow-hidden rounded-[28px] bg-[#0a1628] p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              Application
            </p>

            <h3 className="mt-2 text-xl font-bold">
              Live Summary
            </h3>
          </div>

          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles
              size={19}
              className="text-cyan-300"
            />
          </span>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Application progress</span>

              <span className="font-bold text-white">
                Step {currentStep}/4
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500"
                style={{
                  width: `${currentStep * 25}%`,
                }}
              />
            </div>
          </div>

          <div className="border-t border-white/10" />

          <SummaryRow
            icon={<Users size={16} />}
            label="Travelers"
            value={`${travelers.length}`}
          />

          <SummaryRow
            icon={<Globe2 size={16} />}
            label="Destination"
            value={goingTo || "Not selected"}
          />

          <SummaryRow
            icon={<Plane size={16} />}
            label="Airline"
            value={airline || "Not selected"}
          />

          <SummaryRow
            icon={<IndianRupee size={16} />}
            label="Amount"
            value={
              totalAmount
                ? `₹${totalAmount}`
                : "Not entered"
            }
          />

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">
                Documents
              </span>

              <span className="text-xs font-bold text-cyan-300">
                {uploadedDocuments}/{totalDocuments}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <p className="mt-2 text-[11px] text-slate-400">
              {percentage}% documents completed
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-blue-100 bg-blue-50/70 p-5">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ShieldCheck size={18} />
          </span>

          <div>
            <p className="text-sm font-bold text-slate-700">
              Secure Application
            </p>

            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Your personal information and travel
              documents are securely protected.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-blue-300">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[11px] text-slate-400">
          {label}
        </p>

        <p className="truncate text-sm font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TRAVELER PERSONAL DETAILS
========================================================= */

function TravelerDetailsStep({
  travelers,
  updateTraveler,
  addTraveler,
  removeTraveler,
}) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <Users size={20} />
            </span>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Traveler Details
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Add passenger information for your journey
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={addTraveler}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-600"
        >
          <UserPlus size={17} />
          Add Traveler
        </button>
      </div>

      <div className="space-y-5">
        {travelers.map((traveler, index) => {
          const completion =
            getTravelerCompletion(traveler);

          return (
            <div
              key={traveler.id}
              className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50 px-5 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
                      {index + 1}
                    </span>

                    <div>
                      <h3 className="font-bold text-slate-700">
                        Traveler {index + 1}
                      </h3>

                      <p className="text-xs text-slate-400">
                        Personal information
                      </p>
                    </div>
                  </div>

                  {travelers.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeTraveler(traveler.id)
                      }
                      className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-400">
                      Profile completion
                    </span>

                    <span className="font-bold text-blue-600">
                      {completion.percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                      style={{
                        width: `${completion.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <TextInput
                    label="Full Name"
                    icon={<User size={17} />}
                    placeholder="Enter full name"
                    value={traveler.fullName}
                    onChange={(value) =>
                      updateTraveler(
                        traveler.id,
                        "fullName",
                        value
                      )
                    }
                    required
                  />
                </div>

                <TextInput
                  label="PNR Number"
                  icon={<Ticket size={17} />}
                  placeholder="Enter PNR"
                  value={traveler.pnr}
                  onChange={(value) =>
                    updateTraveler(
                      traveler.id,
                      "pnr",
                      value
                    )
                  }
                  required
                />

                <DateInput
                  label="Date of Birth"
                  value={traveler.dob}
                  onChange={(value) =>
                    updateTraveler(
                      traveler.id,
                      "dob",
                      value
                    )
                  }
                  required
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   DOCUMENTS STEP
========================================================= */

function DocumentsStep({
  travelers,
  updateTraveler,
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
            <FileText size={20} />
          </span>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Travel Documents
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Upload required documents for verification
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {travelers.map((traveler, index) => {
          const docs = [
            traveler.passportFront,
            traveler.passportBack,
            traveler.visa,
            traveler.fromTicket,
            traveler.toTicket,
          ];

          const uploaded = docs.filter(Boolean).length;

          return (
            <div
              key={traveler.id}
              className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="font-bold text-slate-700">
                      {traveler.fullName ||
                        `Traveler ${index + 1}`}
                    </h3>

                    <p className="text-xs text-slate-400">
                      {uploaded}/5 documents uploaded
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    uploaded === 5
                      ? "bg-emerald-100 text-blue-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {uploaded === 5
                    ? "Complete"
                    : `${uploaded}/5 Complete`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                <FileDropZone
                  label="Passport Front Page"
                  file={traveler.passportFront}
                  onFileSelect={(file) =>
                    updateTraveler(
                      traveler.id,
                      "passportFront",
                      file
                    )
                  }
                  onRemove={() =>
                    updateTraveler(
                      traveler.id,
                      "passportFront",
                      null
                    )
                  }
                  required
                />

                <FileDropZone
                  label="Passport Back Page"
                  file={traveler.passportBack}
                  onFileSelect={(file) =>
                    updateTraveler(
                      traveler.id,
                      "passportBack",
                      file
                    )
                  }
                  onRemove={() =>
                    updateTraveler(
                      traveler.id,
                      "passportBack",
                      null
                    )
                  }
                  required
                />

                <FileDropZone
                  label="Visa"
                  file={traveler.visa}
                  onFileSelect={(file) =>
                    updateTraveler(
                      traveler.id,
                      "visa",
                      file
                    )
                  }
                  onRemove={() =>
                    updateTraveler(
                      traveler.id,
                      "visa",
                      null
                    )
                  }
                  required
                />

                <FileDropZone
                  label="From Ticket"
                  file={traveler.fromTicket}
                  onFileSelect={(file) =>
                    updateTraveler(
                      traveler.id,
                      "fromTicket",
                      file
                    )
                  }
                  onRemove={() =>
                    updateTraveler(
                      traveler.id,
                      "fromTicket",
                      null
                    )
                  }
                  required
                />

                <FileDropZone
                  label="To Ticket"
                  file={traveler.toTicket}
                  onFileSelect={(file) =>
                    updateTraveler(
                      traveler.id,
                      "toTicket",
                      file
                    )
                  }
                  onRemove={() =>
                    updateTraveler(
                      traveler.id,
                      "toTicket",
                      null
                    )
                  }
                  required
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   TRIP DETAILS STEP
========================================================= */

function TripDetailsStep({
  goingTo,
  setGoingTo,
  airline,
  setAirline,
  totalAmount,
  setTotalAmount,
  countries,
  airlines,
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
            <PlaneTakeoff size={20} />
          </span>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Trip Details
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Tell us about your upcoming journey
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white to-blue-50/40 p-5 shadow-sm sm:p-7">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SearchDropdown
            label="Destination Country"
            icon={<Globe2 size={17} />}
            placeholder="Select destination"
            value={goingTo}
            onChange={setGoingTo}
            options={countries}
            required
          />

          <SearchDropdown
            label="Airline"
            icon={<Plane size={17} />}
            placeholder="Select airline"
            value={airline}
            onChange={setAirline}
            options={airlines}
            required
          />

          <div className="md:col-span-2">
            <TextInput
              label="Total Amount"
              icon={<IndianRupee size={17} />}
              placeholder="Enter total amount"
              value={totalAmount}
              onChange={(value) =>
                setTotalAmount(
                  value.replace(/[^0-9.]/g, "")
                )
              }
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <MapPin size={18} />
        </span>

        <div>
          <p className="font-bold text-slate-700">
            Journey Information
          </p>

          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Please ensure your destination and airline details
            match your uploaded travel documents.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REVIEW STEP
========================================================= */

function ReviewStep({
  travelers,
  goingTo,
  airline,
  totalAmount,
  paymentMethod,
  setPaymentMethod,
  confirmSubmit,
  setConfirmSubmit,
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
            <ClipboardCheck size={20} />
          </span>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Review & Payment
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Review your application before submission
            </p>
          </div>
        </div>
      </div>

      {/* TRIP SUMMARY */}

      <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-700">
          Application Summary
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReviewItem
            icon={<Users size={17} />}
            label="Travelers"
            value={`${travelers.length} Passenger${
              travelers.length > 1 ? "s" : ""
            }`}
          />

          <ReviewItem
            icon={<Globe2 size={17} />}
            label="Destination"
            value={goingTo || "-"}
          />

          <ReviewItem
            icon={<Plane size={17} />}
            label="Airline"
            value={airline || "-"}
          />

          <ReviewItem
            icon={<IndianRupee size={17} />}
            label="Total Amount"
            value={totalAmount ? `₹${totalAmount}` : "-"}
          />
        </div>
      </div>

      {/* PAYMENT */}

      <div className="mt-7">
        <h3 className="mb-4 font-bold text-slate-700">
          Select Payment Method
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPaymentMethod("online")}
            className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition ${
              paymentMethod === "online"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-white hover:border-blue-200"
            }`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                paymentMethod === "online"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Zap size={20} />
            </span>

            <div className="flex-1">
              <p className="font-bold text-slate-700">
                Online Payment
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Pay securely online
              </p>
            </div>

            {paymentMethod === "online" && (
              <CheckCircle2
                size={20}
                className="text-blue-600"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("wallet")}
            className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition ${
              paymentMethod === "wallet"
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 bg-white hover:border-indigo-200"
            }`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                paymentMethod === "wallet"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Wallet size={20} />
            </span>

            <div className="flex-1">
              <p className="font-bold text-slate-700">
                Wallet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Pay using wallet balance
              </p>
            </div>

            {paymentMethod === "wallet" && (
              <CheckCircle2
                size={20}
                className="text-indigo-600"
              />
            )}
          </button>
        </div>
      </div>

      {/* CONFIRM */}

      <button
        type="button"
        onClick={() =>
          setConfirmSubmit((prev) => !prev)
        }
        className={`mt-7 flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition ${
          confirmSubmit
            ? "border-blue-300 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-200"
        }`}
      >
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 ${
            confirmSubmit
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white"
          }`}
        >
          {confirmSubmit && <Check size={15} />}
        </span>

        <span>
          <span className="block text-sm font-bold text-slate-700">
            Confirm application details
          </span>

          <span className="mt-1 block text-xs leading-relaxed text-slate-500">
            I confirm that all information provided and all
            uploaded documents are accurate and correct.
          </span>
        </span>
      </button>
    </div>
  );
}

function ReviewItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon}
      </span>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN FORM
========================================================= */

function OTBApplyForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [travelers, setTravelers] = useState([
    createEmptyTraveler(1),
  ]);

  const [nextId, setNextId] = useState(2);

  const [goingTo, setGoingTo] = useState("");
  const [airline, setAirline] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("online");

  const [confirmSubmit, setConfirmSubmit] =
    useState(false);

  const [countries, setCountries] =
    useState(FALLBACK_COUNTRIES);

  const [airlines, setAirlines] =
    useState(FALLBACK_AIRLINES);

  const [status, setStatus] = useState("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  /* FETCH DATA */

  useEffect(() => {
    fetchList(
      "/countries",
      FALLBACK_COUNTRIES
    ).then(setCountries);

    fetchList(
      "/airlines",
      FALLBACK_AIRLINES
    ).then(setAirlines);
  }, []);

  /* TRAVELER FUNCTIONS */

  function updateTraveler(id, field, value) {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? {
              ...traveler,
              [field]: value,
            }
          : traveler
      )
    );
  }

  function addTraveler() {
    setTravelers((prev) => [
      ...prev,
      createEmptyTraveler(nextId),
    ]);

    setNextId((prev) => prev + 1);
  }

  function removeTraveler(id) {
    setTravelers((prev) =>
      prev.filter(
        (traveler) => traveler.id !== id
      )
    );
  }

  /* STEP VALIDATION */

  const travelersValid = travelers.every(
    (traveler) =>
      traveler.fullName &&
      traveler.pnr &&
      traveler.dob
  );

  const documentsValid = travelers.every(
    (traveler) =>
      traveler.passportFront &&
      traveler.passportBack &&
      traveler.visa &&
      traveler.fromTicket &&
      traveler.toTicket
  );

  const tripValid =
    goingTo &&
    airline &&
    totalAmount;

  const isFormReady =
    travelersValid &&
    documentsValid &&
    tripValid &&
    confirmSubmit;

  function canContinue() {
    if (currentStep === 1) return travelersValid;

    if (currentStep === 2) return documentsValid;

    if (currentStep === 3) return tripValid;

    return true;
  }

  function nextStep() {
    if (!canContinue()) {
      setStatusMessage(
        "Please complete all required fields before continuing."
      );

      setStatus("error");

      return;
    }

    setStatus("idle");
    setStatusMessage("");

    setCurrentStep((prev) =>
      Math.min(prev + 1, 4)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function previousStep() {
    setStatus("idle");
    setStatusMessage("");

    setCurrentStep((prev) =>
      Math.max(prev - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* SUBMIT */

  async function handleSubmit() {
    if (!isFormReady || status === "loading") {
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      await submitOtbApplication({
        goingTo,
        airline,
        totalAmount,
        paymentMethod,
        travelers,
      });

      setStatus("success");

      setStatusMessage(
        "Your OTB application has been submitted successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setStatus("error");

      setStatusMessage(
        error.message ||
          "Submission failed. Please try again."
      );
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb] py-6 sm:py-10">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[400px] h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-100/50 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4">

        {/* HERO */}

        <div className="overflow-hidden rounded-[32px] bg-[#081525] shadow-[0_30px_100px_rgba(15,23,42,0.18)]">

          <div className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">

            <div className="absolute inset-0 bg-gradient-to-br from-[#102d50] via-[#0a1d35] to-[#06111f]" />

            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

           {/* Animated Flight Path */}

{/* =====================================================
    ANIMATED FLIGHT
===================================================== */}

<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* FLIGHT PATH */}

  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 1200 400"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d="M-80 300 C180 120, 430 380, 700 230 S1050 100, 1280 70"
      stroke="rgba(96,165,250,0.38)"
      strokeWidth="2"
      strokeDasharray="12 14"
      className="otb-flight-path"
    />

    {/* Small glowing dots */}

    <circle
      cx="180"
      cy="150"
      r="3"
      fill="rgba(96,165,250,0.7)"
      className="otb-star otb-star-one"
    />

    <circle
      cx="850"
      cy="150"
      r="2.5"
      fill="rgba(129,140,248,0.7)"
      className="otb-star otb-star-two"
    />

    <circle
      cx="1050"
      cy="100"
      r="2"
      fill="rgba(125,211,252,0.8)"
      className="otb-star otb-star-three"
    />
  </svg>


  {/* MOVING PLANE */}

  <div className="otb-moving-plane">

    <div className="relative">

      {/* Plane glow */}

      <div className="absolute inset-0 scale-150 rounded-full bg-blue-400/20 blur-xl" />

      <PlaneTakeoff
        size={42}
        strokeWidth={1.8}
        className="relative text-blue-300 drop-shadow-[0_0_18px_rgba(96,165,250,0.9)]"
      />

    </div>

  </div>


  {/* CLOUD EFFECT */}

  <div className="otb-cloud otb-cloud-one" />

  <div className="otb-cloud otb-cloud-two" />

</div>

            <div className="relative max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur">
                <ShieldCheck
                  size={15}
                  className="text-blue-300"
                />

                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100">
                  Secure Travel Verification
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Okay To{" "}

                <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                  Board
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Complete your application in a few simple steps.
                Submit your travel details and documents securely
                for verification.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-slate-300">
                  <LockKeyhole
                    size={14}
                    className="text-blue-300"
                  />

                  Encrypted Documents
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-slate-300">
                  <Sparkles
                    size={14}
                    className="text-cyan-300"
                  />

                  Fast Verification
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN APPLICATION */}

        <div className="mt-6 overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">

          <Stepper currentStep={currentStep} />

          <div className="grid grid-cols-1 gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">

            {/* LEFT CONTENT */}

            <div>

              {status === "error" && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                  <AlertCircle size={19} />

                  {statusMessage}
                </div>
              )}

              {status === "success" && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-700">
                  <CheckCircle2 size={19} />

                  {statusMessage}
                </div>
              )}

              {/* STEP 1 */}

              {currentStep === 1 && (
                <TravelerDetailsStep
                  travelers={travelers}
                  updateTraveler={updateTraveler}
                  addTraveler={addTraveler}
                  removeTraveler={removeTraveler}
                />
              )}

              {/* STEP 2 */}

              {currentStep === 2 && (
                <DocumentsStep
                  travelers={travelers}
                  updateTraveler={updateTraveler}
                />
              )}

              {/* STEP 3 */}

              {currentStep === 3 && (
                <TripDetailsStep
                  goingTo={goingTo}
                  setGoingTo={setGoingTo}
                  airline={airline}
                  setAirline={setAirline}
                  totalAmount={totalAmount}
                  setTotalAmount={setTotalAmount}
                  countries={countries}
                  airlines={airlines}
                />
              )}

              {/* STEP 4 */}

              {currentStep === 4 && (
                <ReviewStep
                  travelers={travelers}
                  goingTo={goingTo}
                  airline={airline}
                  totalAmount={totalAmount}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  confirmSubmit={confirmSubmit}
                  setConfirmSubmit={setConfirmSubmit}
                />
              )}

              {/* NAVIGATION */}

              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                <button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 1}
                  className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                    currentStep === 1
                      ? "cursor-not-allowed text-slate-300"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ArrowLeft size={17} />

                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    Continue

                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      !isFormReady ||
                      status === "loading"
                    }
                    className={`group flex items-center justify-center gap-3 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition ${
                      isFormReady &&
                      status !== "loading"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 hover:-translate-y-1 hover:shadow-xl"
                        : "cursor-not-allowed bg-slate-300"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application

                        <ArrowRight
                          size={18}
                          className="transition group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT SUMMARY */}

            <ApplicationSummary
              travelers={travelers}
              goingTo={goingTo}
              airline={airline}
              totalAmount={totalAmount}
              currentStep={currentStep}
            />
          </div>

          {/* FOOTER */}

          <div className="border-t border-slate-100 bg-slate-50 px-5 py-5">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck size={14} />
              </span>

              Your documents are securely encrypted and protected.
            </div>
          </div>
        </div>
      </div>

      <style>{`

/* =====================================
   MOVING PLANE
===================================== */

.otb-moving-plane {
  position: absolute;
  left: -80px;
  top: 72%;
  z-index: 20;

  animation: otb-fly-across 9s ease-in-out infinite;

  filter: drop-shadow(
    0 0 12px rgba(96,165,250,0.5)
  );
}


@keyframes otb-fly-across {

  0% {
    left: -80px;
    top: 72%;
    opacity: 0;
    transform: rotate(-8deg) scale(0.85);
  }

  6% {
    opacity: 1;
  }

  20% {
    left: 15%;
    top: 48%;
    transform: rotate(-18deg) scale(1);
  }

  40% {
    left: 35%;
    top: 60%;
    transform: rotate(8deg) scale(1);
  }

  58% {
    left: 55%;
    top: 48%;
    transform: rotate(-16deg) scale(1.05);
  }

  76% {
    left: 75%;
    top: 34%;
    transform: rotate(-12deg) scale(1);
  }

  92% {
    opacity: 1;
  }

  100% {
    left: 110%;
    top: 20%;
    opacity: 0;
    transform: rotate(-10deg) scale(0.9);
  }

}


/* =====================================
   FLIGHT PATH
===================================== */

.otb-flight-path {
  animation: otb-path-glow 3s ease-in-out infinite;
}


@keyframes otb-path-glow {

  0% {
    opacity: 0.35;
    stroke-dashoffset: 0;
  }

  50% {
    opacity: 0.8;
    stroke-dashoffset: -26;
  }

  100% {
    opacity: 0.35;
    stroke-dashoffset: -52;
  }

}


/* =====================================
   TWINKLING STARS
===================================== */

.otb-star {
  animation: otb-twinkle 2.5s ease-in-out infinite;
}

.otb-star-two {
  animation-delay: 0.8s;
}

.otb-star-three {
  animation-delay: 1.5s;
}


@keyframes otb-twinkle {

  0%,
  100% {
    opacity: 0.25;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.5);
  }

}


/* =====================================
   CLOUDS
===================================== */

.otb-cloud {
  position: absolute;

  width: 130px;
  height: 35px;

  border-radius: 999px;

  background: rgba(147,197,253,0.06);

  filter: blur(18px);

  animation: otb-cloud-move 12s linear infinite;
}


.otb-cloud-one {
  left: 20%;
  top: 28%;
}


.otb-cloud-two {
  right: 10%;
  bottom: 22%;

  animation-delay: -6s;
}


@keyframes otb-cloud-move {

  0% {
    transform: translateX(-40px);
    opacity: 0.2;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    transform: translateX(100px);
    opacity: 0.2;
  }

}


/* =====================================
   MOBILE
===================================== */

@media (max-width: 640px) {

  .otb-moving-plane {
    animation-duration: 7s;
  }

}

`}</style>

    </div>
  
  
  
  );

  
}

/* =========================================================
   EXPORT
========================================================= */

const LiveStatusSimulation = () => {
  return (
    <section className="w-full">
      <OTBApplyForm />
    </section>
  );
};



export default LiveStatusSimulation;