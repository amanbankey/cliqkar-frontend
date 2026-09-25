import React, { useEffect, useRef, useState } from "react";
import { UserPlus } from "lucide-react";
import {
  User,
  Globe2,
  MapPin,
  Users,
  VenusAndMars,
  UploadCloud,
  CreditCard,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import {
  
  Plus,
  
  Clock3,
  Ban,
  WalletCards,
} from "lucide-react";

import { 
  Search,
  ChevronDown,
  Plane,
  Home,
  CalendarDays,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TravelerDetails from "./TravelerDetails";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toISO = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const getTodayISO = () => {
  const t = new Date();
  return toISO(t.getFullYear(), t.getMonth(), t.getDate());
};

const parseISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
};

function ThemedDatePicker({ value, onChange, min }) {
  const todayISO = getTodayISO();
  const minISO = min && min > todayISO ? min : todayISO;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const base = parseISO(value || minISO);
    return { y: base.y, m: base.m };
  });
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      const base = parseISO(value || minISO);
      setView({ y: base.y, m: base.m });
    }
    setOpen((o) => !o);
  };

  const shiftMonth = (delta) =>
    setView(({ y, m }) => {
      const next = new Date(y, m + delta, 1);
      return { y: next.getFullYear(), m: next.getMonth() };
    });

  const minParsed = parseISO(minISO);
  const canGoPrev =
    view.y > minParsed.y || (view.y === minParsed.y && view.m > minParsed.m);

  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const label = value
    ? (() => {
        const { y, m, d } = parseISO(value);
        return `${String(d).padStart(2, "0")} ${MONTHS[m].slice(0, 3)} ${y}`;
      })()
    : "Select date";

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={toggle}
        className={`w-full cursor-pointer bg-transparent text-left text-[14px] outline-none ${
          value ? "font-semibold text-slate-700" : "font-normal text-slate-400"
        }`}
      >
        {label}
      </button>

      {open && (
        <div className="absolute -left-14 top-full z-40 mt-5 w-72 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl shadow-[#5665d6]/15">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={!canGoPrev}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-[#5665d6]/10 hover:text-[#5665d6] disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>

            <p className="text-sm font-bold text-slate-900">
              {MONTHS[view.m]} {view.y}
            </p>

            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-[#5665d6]/10 hover:text-[#5665d6]"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center">
            {WEEK_DAYS.map((d) => (
              <span
                key={d}
                className="py-1 text-[11px] font-semibold text-slate-400"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center">
            {cells.map((day, i) => {
              if (!day) return <span key={`e${i}`} />;

              const iso = toISO(view.y, view.m, day);
              const disabled = iso < minISO;
              const selected = iso === value;
              const isToday = iso === todayISO;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    selected
                      ? "bg-[#5665d6] text-white shadow-md shadow-[#5665d6]/30"
                      : disabled
                        ? "cursor-not-allowed text-slate-300 line-through decoration-slate-200"
                        : isToday
                          ? "border border-[#5665d6]/40 text-[#5665d6] hover:bg-[#5665d6]/10"
                          : "text-slate-700 hover:bg-[#5665d6]/10 hover:text-[#5665d6]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


const VISA_COUNTRIES = [
  {
    id: 1,
    country: "THAILAND",
    flag: "🇹🇭",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "90 DAYS",
    guaranteedDate: "10 Sep 2026, 4:33 PM",
    documents: ["Passport", "Photo", "Travel details"],
    fees: null,
  },

  {
    id: 2,
    country: "UNITED ARAB\nEMIRATES",
    searchName: "United Arab Emirates",
    flag: "🇦🇪",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "60 DAYS",
    fees: "₹8,179",
    guaranteedDate: "14 Sep 2026, 5:29 PM",
    documents: ["Passport", "Photo"],
  },

  {
    id: 3,
    country: "SRI LANKA",
    flag: "🇱🇰",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "180 DAYS",
    guaranteedDate: "11 Sep 2026, 3:49 PM",
    documents: ["Passport"],
  },

  {
    id: 4,
    country: "MALAYSIA",
    flag: "🇲🇾",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "30 DAYS",
    guaranteedDate: "10 Sep 2026, 4:21 PM",
    documents: ["Passport"],
    featured: true,
  },

  {
    id: 5,
    country: "VIETNAM",
    flag: "🇻🇳",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "90 DAYS",
    fees: "₹4,373",
    guaranteedDate: "17 Sep 2026, 4:07 AM",
    documents: ["Passport", "Photo"],
  },

  {
    id: 6,
    country: "INDONESIA",
    flag: "🇮🇩",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "60 DAYS",
    guaranteedDate: "12 Sep 2026, 11:30 AM",
    documents: ["Passport"],
  },

  {
    id: 7,
    country: "JAPAN",
    flag: "🇯🇵",
    image: "/malaysia.jpeg",
    type: "STICKER VISA",
    valid: "90 DAYS",
    guaranteedDate: "18 Sep 2026, 2:20 PM",
    documents: ["Passport", "Bank Statement"],
  },

  {
    id: 8,
    country: "TURKEY",
    flag: "🇹🇷",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "30 DAYS",
    guaranteedDate: "15 Sep 2026, 10:00 AM",
    documents: ["Passport"],
  },

  {
    id: 9,
    country: "SINGAPORE",
    flag: "🇸🇬",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "30 DAYS",
    guaranteedDate: "13 Sep 2026, 7:15 PM",
    documents: ["Passport", "Photo"],
  },

  {
    id: 10,
    country: "DUBAI",
    flag: "🇦🇪",
    image: "/malaysia.jpeg",
    type: "E-VISA",
    valid: "60 DAYS",
    guaranteedDate: "14 Sep 2026, 9:00 AM",
    documents: ["Passport"],
  },
];

function FilterDropdown({
  label,
  value,
  icon,
  options,
  open,
  onToggle,
  onSelect,
}) {
  const Icon = icon;

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          gap-3
          px-5
          py-3
          text-left
        "
      >
        <span
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-slate-100
          "
        >
          <Icon size={15} className="text-slate-600" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-slate-500">
            {label}
          </p>

          <p className="truncate text-[14px] font-semibold text-slate-800">
            {value}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-700 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            top-[calc(100%+14px)]
            z-50
            min-w-[340px]
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-white
            p-4
            shadow-[0_25px_70px_rgba(15,23,42,0.18)]
            animate-[dropdownIn_0.25s_ease]
          "
        >
          <div className="space-y-1">
            {options.map((option, index) => (
              <button
                type="button"
                key={option.label}
                onClick={() => {
                  onSelect(option.label);
                  onToggle();
                }}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  transition-all
                  duration-200
                  hover:bg-slate-50
                  ${
                    value === option.label
                      ? "bg-blue-50"
                      : ""
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${
                      index === 0
                        ? "bg-[#4d63d8]"
                        : "bg-slate-300"
                    }
                  `}
                />

                <span className="flex-1 text-[15px] font-medium text-slate-800">
                  {option.label}
                </span>

                {option.count && (
                  <span className="text-sm text-slate-400">
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const TravelerCard = ({
  traveler,
  index,
  updateTraveler,
  updateFile,
  removeFile,
  removeTraveler,
}) => {
  return (
    <div
      className="
        rounded-[22px]
        border border-slate-200
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(15,23,42,0.07)]
        sm:rounded-[26px]
        sm:p-5
        lg:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-5
          flex items-center justify-between
          border-b border-slate-100
          pb-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-slate-900
              text-xs font-extrabold
              text-white
            "
          >
            {index + 1}
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Traveler {index + 1}
            </h3>

            <p className="text-[10px] text-slate-500">
              Passenger details & documents
            </p>
          </div>
        </div>

        {/* SECOND TRAVELER ONWARD CAN BE REMOVED */}

        {index > 0 && (
          <button
            type="button"
            onClick={() => removeTraveler(traveler.id)}
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-red-50
              text-red-500
              transition-all duration-300
              hover:bg-red-500
              hover:text-white
            "
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ========================================================
          PERSONAL INFORMATION
      ========================================================= */}

      <div
        className="
          grid grid-cols-1 gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        <InputField
          label="Traveler First Name"
          required
          icon={<User size={16} />}
          placeholder="Enter first name"
          value={traveler.firstName}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "firstName",
              e.target.value
            )
          }
        />

        <InputField
          label="Last Name"
          icon={<User size={16} />}
          placeholder="Enter last name"
          value={traveler.lastName}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "lastName",
              e.target.value
            )
          }
        />

        <InputField
          label="Passport Number"
          required
          icon={<FileText size={16} />}
          placeholder="A1234567"
          value={traveler.passportNumber}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "passportNumber",
              e.target.value
            )
          }
        />

        <SelectField
          label="Nationality"
          required
          icon={<Globe2 size={16} />}
          placeholder="Nationality"
          value={traveler.nationality}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "nationality",
              e.target.value
            )
          }
          options={[
            "Indian",
            "United Arab Emirates",
            "United States",
            "United Kingdom",
            "Canada",
            "Australia",
            "Other",
          ]}
        />

        <SelectField
          label="Passenger Type"
          required
          icon={<User size={16} />}
          value={traveler.passengerType}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "passengerType",
              e.target.value
            )
          }
          options={[
            "Adult",
            "Child",
            "Infant",
          ]}
        />

        <SelectField
          label="Sex"
          required
          icon={<VenusAndMars size={16} />}
          placeholder="Select Gender"
          value={traveler.sex}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "sex",
              e.target.value
            )
          }
          options={[
            "Male",
            "Female",
            "Other",
          ]}
        />

        <InputField
          label="Date of Birth"
          required
          type="date"
          icon={<CalendarDays size={16} />}
          value={traveler.dateOfBirth}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "dateOfBirth",
              e.target.value
            )
          }
        />

        <InputField
          label="Place of Birth"
          required
          icon={<MapPin size={16} />}
          placeholder="Enter Place of Birth"
          value={traveler.placeOfBirth}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "placeOfBirth",
              e.target.value
            )
          }
        />

        <InputField
          label="Spouse Name"
          icon={<Users size={16} />}
          placeholder="Enter Spouse Name"
          value={traveler.spouseName}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "spouseName",
              e.target.value
            )
          }
        />

        <InputField
          label="Mother Name"
          icon={<User size={16} />}
          placeholder="Enter Mother Name"
          value={traveler.motherName}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "motherName",
              e.target.value
            )
          }
        />

        <InputField
          label="Father Name"
          required
          icon={<User size={16} />}
          placeholder="Enter Father Name"
          value={traveler.fatherName}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "fatherName",
              e.target.value
            )
          }
        />

        <InputField
          label="Travel Date"
          type="date"
          icon={<CalendarDays size={16} />}
          value={traveler.travelDate}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "travelDate",
              e.target.value
            )
          }
        />
      </div>

      {/* ========================================================
          DOCUMENTS
      ========================================================= */}

      <div className="my-6 h-px bg-slate-100" />

      <h4 className="text-sm font-extrabold text-slate-900">
        Required Documents
      </h4>

      <p className="mt-1 text-[10px] text-slate-500">
        Upload clear and readable documents.
      </p>

      {/* SMALL UPLOAD GRID */}

      <div
        className="
          mt-4
          grid grid-cols-1 gap-3
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        <UploadBox
          label="Traveler's Photo"
          required
          file={traveler.files.travelerPhoto}
          onFile={(file) =>
            updateFile(
              traveler.id,
              "travelerPhoto",
              file
            )
          }
          onRemove={() =>
            removeFile(
              traveler.id,
              "travelerPhoto"
            )
          }
        />

        <UploadBox
          label="Front Passport Image"
          required
          file={traveler.files.passportFront}
          onFile={(file) =>
            updateFile(
              traveler.id,
              "passportFront",
              file
            )
          }
          onRemove={() =>
            removeFile(
              traveler.id,
              "passportFront"
            )
          }
        />

        <UploadBox
          label="Back Passport Image"
          required
          file={traveler.files.passportBack}
          onFile={(file) =>
            updateFile(
              traveler.id,
              "passportBack",
              file
            )
          }
          onRemove={() =>
            removeFile(
              traveler.id,
              "passportBack"
            )
          }
        />

        <UploadBox
          label="Traveler's PAN Card"
          required
          file={traveler.files.panCard}
          onFile={(file) =>
            updateFile(
              traveler.id,
              "panCard",
              file
            )
          }
          onRemove={() =>
            removeFile(
              traveler.id,
              "panCard"
            )
          }
        />

        <UploadBox
          label="Hotel Voucher"
          required
          file={traveler.files.hotelVoucher}
          onFile={(file) =>
            updateFile(
              traveler.id,
              "hotelVoucher",
              file
            )
          }
          onRemove={() =>
            removeFile(
              traveler.id,
              "hotelVoucher"
            )
          }
        />

        <UploadBox
          label="Ticket Voucher / Additional Files"
          required
          file={traveler.files.ticketFiles}
          onFile={(file) =>
            updateFile(
              traveler.id,
              "ticketFiles",
              file
            )
          }
          onRemove={() =>
            removeFile(
              traveler.id,
              "ticketFiles"
            )
          }
        />
      </div>

      {/* ========================================================
          PAN + OCCUPATION
      ========================================================= */}

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="India PAN Card Number"
          required
          icon={<CreditCard size={16} />}
          placeholder="ABCDE1234F"
          value={traveler.panNumber}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "panNumber",
              e.target.value.toUpperCase()
            )
          }
        />

        <SelectField
          label="What is the traveler's occupation?"
          icon={<BriefcaseBusiness size={16} />}
          placeholder="Select an item"
          value={traveler.occupation}
          onChange={(e) =>
            updateTraveler(
              traveler.id,
              "occupation",
              e.target.value
            )
          }
          options={[
            "Business",
            "Salaried Employee",
            "Self Employed",
            "Student",
            "Government Employee",
            "Retired",
            "Homemaker",
            "Professional",
            "Other",
          ]}
        />
      </div>
    </div>
  );
};


const VisaInformation = () => {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <h3 className="text-xl font-extrabold text-slate-900">
        Visa Information
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-900">
        Dubai Visa 30 Days Single Entry
      </p>

      <p className="mt-1 text-sm text-slate-900">
        Travel city: India - United Arab Emirates
      </p>

      {/* EXPECTED APPROVAL */}

      <div className="mt-7">
        <h4 className="text-lg font-extrabold text-slate-900">
          Expected Visa Approval
        </h4>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
          <CalendarDays size={17} />

          <span>
            2-5 Business Days , if submitted now!
          </span>
        </div>
      </div>

      {/* KNOW BEFORE YOU PAY */}

      <div className="mt-7">
        <h4 className="text-lg font-extrabold text-slate-900">
          Know Before You Pay
        </h4>

        <div className="mt-4 space-y-4">
          {/* AUTO VALIDATION */}

          <InfoPoint
            icon={<ShieldCheck size={17} />}
            title="Auto-validation upon submission"
            description="performs automated validation after submission. We will let you know if there are any problems with the application."
            type="green"
          />

          {/* PROCESS */}

          <InfoPoint
            icon={<Clock3 size={17} />}
            title="Visa processed within 30 seconds"
            description="automatically processes your visa."
            type="green"
          />

          {/* NON REFUNDABLE */}

          <InfoPoint
            icon={<Ban size={17} />}
            title="Non-refundable after you pay"
            description="If canceled after payment, you will not be refunded."
            type="orange"
          />
        </div>
      </div>
    </div>
  );
};


/* ================================================================
   INFO POINT
================================================================ */

const InfoPoint = ({
  icon,
  title,
  description,
  type,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`
          mt-0.5
          flex h-5 w-5
          shrink-0
          items-center justify-center
          rounded-full
          border-2

          ${
            type === "orange"
              ? "border-orange-400 text-orange-500"
              : "border-emerald-500 text-emerald-600"
          }
        `}
      >
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-900 sm:text-sm">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-5 text-slate-600 sm:text-xs">
          .. {description}
        </p>
      </div>
    </div>
  );
};


/* ================================================================
   INPUT
================================================================ */

const InputField = ({
  label,
  required,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="group relative">
        <div
          className="
            pointer-events-none
            absolute left-3 top-1/2
            -translate-y-1/2
            text-slate-400
            transition-colors
            group-focus-within:text-slate-900
          "
        >
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            h-[46px]
            w-full
            rounded-xl
            border border-slate-200
            bg-white
            pl-10 pr-3
            text-sm
            font-medium
            text-slate-900
            outline-none
            placeholder:text-slate-400
            transition-all duration-200
            hover:border-slate-300
            focus:border-slate-900
            focus:ring-4
            focus:ring-slate-900/5
          "
        />
      </div>
    </div>
  );
};


/* ================================================================
   SELECT
================================================================ */

const SelectField = ({
  label,
  required,
  icon,
  value,
  onChange,
  options,
  placeholder = "Select an item",
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="group relative">
        <div
          className="
            pointer-events-none
            absolute left-3 top-1/2
            z-10
            -translate-y-1/2
            text-slate-400
          "
        >
          {icon}
        </div>

        <select
          value={value}
          onChange={onChange}
          className="
            h-[46px]
            w-full
            appearance-none
            rounded-xl
            border border-slate-200
            bg-white
            pl-10 pr-10
            text-sm
            font-medium
            text-slate-900
            outline-none
            transition-all duration-200
            hover:border-slate-300
            focus:border-slate-900
            focus:ring-4
            focus:ring-slate-900/5
          "
        >
          {!value && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


/* ================================================================
   SMALL UPLOAD BOX
================================================================ */

const UploadBox = ({
  label,
  required,
  file,
  onFile,
  onRemove,
}) => {
  const inputId = `upload-${label
    .replace(/\s/g, "-")
    .toLowerCase()}`;

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        id={inputId}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) =>
          onFile(e.target.files?.[0])
        }
      />

      <label
        htmlFor={inputId}
        className="
          group
          flex
          h-[72px]
          w-full
          max-w-[310px]
          cursor-pointer
          items-center
          justify-center
          rounded-xl
          border-2
          border-dashed
          border-slate-300
          bg-slate-50
          px-3
          transition-all duration-300
          hover:border-slate-900
          hover:bg-slate-100
        "
      >
        {!file ? (
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-lg
                bg-slate-900
                text-white
                transition-transform
                group-hover:-translate-y-0.5
              "
            >
              <UploadCloud size={17} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Drag & Drop
              </p>

              <p className="text-[9px] text-slate-500">
                or click to browse
              </p>

              <p className="text-[8px] text-slate-400">
                JPG, PNG or PDF
              </p>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center gap-2">
            <div
              className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-lg
                bg-slate-900
                text-white
              "
            >
              <FileText size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold text-slate-900">
                {file.name}
              </p>

              <p className="text-[8px] text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }}
              className="
                flex h-7 w-7
                shrink-0
                items-center justify-center
                rounded-full
                bg-red-50
                text-red-500
                transition-all
                hover:bg-red-500
                hover:text-white
              "
            >
              <X size={13} />
            </button>
          </div>
        )}
      </label>
    </div>
  );
};

 
 
const SectionTitle = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          mt-0.5
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-xl
          bg-slate-900
          text-white
          shadow-md
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
          {description}
        </p>
      </div>
    </div>
  );
};
 
function VisaSelect({
  label,
  value,
  icon: Icon,
  options,
  open,
  onToggle,
  onSelect,
}) {
  return (
    <div className="relative w-full">
      {/* LABEL */}

      <label className="mb-2 block text-[13px] font-medium text-slate-600">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      {/* SELECT BUTTON */}

      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3.5
          text-left
          shadow-sm
          transition-all
          duration-300
          hover:border-[#5665d6]/40
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#5665d6]/10
          "
        >
          <Icon
            size={18}
            className="text-[#5665d6]"
          />
        </div>

        <span className="flex-1 text-[14px] font-medium text-slate-700">
          {value}
        </span>

        <ChevronDown
          size={18}
          className={`
            text-slate-400
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute
            left-0
            top-[calc(100%+8px)]
            z-[30]
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-2
            shadow-[0_20px_60px_rgba(15,23,42,0.15)]
          "
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-[14px]
                font-medium
                text-slate-700
                transition
                hover:bg-[#5665d6]/10
                hover:text-[#5665d6]
              "
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

 
function VisaCard({ visa }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false);
  const [show, setShow] = useState(0)
   
  const [showTravelerPopup, setShowTravelerPopup] = useState(false);
  const [travelerFirstName, setTravelerFirstName] = useState("");


  const [photoFile, setPhotoFile] = useState(null);

  const [passportFile, setPassportFile] = useState(null);
  const [showDocumentsPopup, setShowDocumentsPopup] = useState(false);
  return (
    <div className="group">
      {/* CARD */}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          relative
          h-[350px]
          overflow-hidden
          rounded-[30px]
          bg-slate-900
          shadow-sm
          transition-all
          duration-500
          ease-out
          hover:-translate-y-2
          hover:shadow-[0_25px_45px_rgba(15,23,42,0.22)]
        "
      >
        {/* IMAGE */}

        <img
          src={visa.image}
          alt={visa.country}
          className={`
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ${
              hovered
                ? "scale-110"
                : "scale-100"
            }
          `}
        />

        {/* DARK GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/5
            via-black/10
            to-black/95
          "
        />

        {/* HOVER BLUR OVERLAY */}

        <div
          className={`
            absolute
            inset-0
            z-10
            bg-black/35
            backdrop-blur-[1px]
            transition-all
            duration-500
            ${
              hovered
                ? "opacity-100"
                : "opacity-0 backdrop-blur-0"
            }
          `}
        />

        {/* NORMAL CONTENT */}

        <div
          className={`
            absolute group-hover:top-36
            inset-x-0
            bottom-0
            z-20
            p-6
            transition-all
            duration-500
            ${
              hovered
                ? "translate-y-[-125px]"
                : "translate-y-0"
            }
          `}
        >
          {/* FLAG */}

          <div className="mb-1 flex justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-md">
              {visa.flag}
            </span>
          </div>

          {/* COUNTRY */}

          <h3 className="whitespace-pre-line text-center text-[22px] font-semibold tracking-wide text-white">
            {visa.country}
          </h3>


          <div
            className={`
              grid
              ${
                visa.fees
                  ? "grid-cols-3"
                  : "grid-cols-2"
              }
              gap-4
            `}
          >
            <DetailItem
              label="TYPE"
              value={visa.type}
            />

            <DetailItem
              label="VALID"
              value={visa.valid}
              align="right"
            />

            {visa.fees && (
              <DetailItem
                label="FEES"
                value={visa.fees}
                align="right"
              />
            )}
          </div>
        </div>

        {/* HOVER DETAILS */}

        <div
          className={`
            absolute
            inset-x-0
            bottom-0
            z-30
            px-6
            pb-3
            transition-all
            duration-500
            ease-out
            ${
              hovered
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
           <div className="border-t border-white/20  flex items-center justify-between pt-1">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
             Entry:
            </p>

            <div className=" flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">
               Single
              </p>
            </div>
          </div>
          <div className="border-t border-white/20  flex items-center justify-between pt-1">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
              DOCUMENTS:
            </p>

            <div className=" flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">
                {visa.documents?.join(", ")}
              </p>
            </div>
          </div>
         
          <div className="border-t border-white/20  flex items-center justify-between ">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
              Time:
            </p>

            <div className=" flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">
               3 - 4 days
              </p>
            </div>
          </div>
           <div className="border-t border-white/20  flex items-center justify-between ">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
              Duration
            </p>

            <div className=" flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">
              30 days
              </p>
            </div>
          </div>
            <div className="border-t border-white/20  flex items-center justify-between ">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
              Fees
            </p>

            <div className=" flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">
               400 AED
              </p>
            </div>
          </div>
           <div className="border-t border-white/20  flex items-center justify-between ">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
              Desc...
            </p>

            <div className=" flex items-center justify-between">
              <p className="text-[11px] font-semibold text-white">
              abc
              </p>
            </div>
          </div>
          <div className="flex justify-center ">
            <button onClick={() => navigate("/traveler-details")} className="
              group
              relative
              flex
              h-[40px]
              items-center
              justify-center
              gap-2 mt-2
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-[#4d5bd1]
              via-[#5665d6]
              to-[#7180ef]
              px-5
              text-[14px]
              font-bold
              text-white
              shadow-[0_15px_35px_rgba(86,101,214,0.30)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_22px_45px_rgba(86,101,214,0.40)]
              active:translate-y-0 ">Apply now</button>
                    </div>
        </div>
      </div>

      {/* GUARANTEE */}

      <div className="px-6 pt-5">
        <div className="flex items-center gap-2 text-[14px] text-slate-500">
          <ShieldCheck
            size={16}
            className="text-slate-500"
          />

          Guaranteed Visa On
        </div>

        <p className="mt-1 text-[15px] font-bold text-slate-800">
          {visa.guaranteedDate}
        </p>
      </div>


      {/* {show === 1 &&  (
            <div
              className="
                fixed
                inset-0
                z-[999]
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                backdrop-blur-[4px]
              "
              onClick={() => setShowTravelerPopup(false)}
            >
              <div
                className="
                  relative
                  w-full
                  max-w-[460px]
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-[0_30px_100px_rgba(15,23,42,0.25)]
                  sm:p-8
                  animate-[popupIn_0.25s_ease-out]
                "
                onClick={(e) => e.stopPropagation()}
              >

                

                <button
                  type="button"
                  onClick={() => setShow(0)}
                  className="
                    absolute
                    right-5
                    top-5
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-500
                    transition
                    hover:bg-slate-900
                    hover:text-white
                  "
                >
                  ×
                </button>

 

                <div
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-900
                  "
                >
                  <Plane
                    size={21}
                    className="rotate-[25deg] text-white"
                  />
                </div>


                

                <h3 className="text-[24px] font-bold text-slate-900">
                  Enter traveler details
                </h3>

                <p className="mt-2 max-w-[360px] text-[14px] leading-6 text-slate-500">
                  Please enter the traveler's first name to continue
                  with your visa application.
                </p>


           

                <div className="mt-7">

                  <label
                    htmlFor="travelerFirstName"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-semibold
                      text-slate-900
                    "
                  >
                    Traveler first name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="travelerFirstName"
                    type="text"
                    value={travelerFirstName}
                    onChange={(e) =>
                      setTravelerFirstName(e.target.value)
                    }
                    placeholder="Enter first name"
                    autoFocus
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-900
                      bg-white
                      px-4
                      py-3.5
                      text-[14px]
                      font-medium
                      text-slate-900
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      duration-200
                      focus:ring-2
                      focus:ring-slate-900/10
                    "
                  />

                </div>


                 

                <button
                  type="button"
                  disabled={!travelerFirstName.trim()}
                  onClick={() => {
                    if (!travelerFirstName.trim()) return;
                    console.log(
                      "Traveler First Name:",
                      travelerFirstName
                    );
                    setShow(2);
                  }}
                  className="
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-900
                    bg-slate-900
                    px-5
                    py-3.5
                    text-[14px]
                    font-bold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:text-slate-900
                    disabled:cursor-not-allowed
                    disabled:border-slate-300
                    disabled:bg-slate-200
                    disabled:text-slate-400
                  "
                >
                  Continue
                </button>

              </div>
            </div>
          )} */}

      {/* {show === 1 && (
          <TravelerDetails
            setShow={setShow}
            travelers={travelers}
            setTravelers={setTravelers}
            insurance={insurance}
            setInsurance={setInsurance}
          />
        )} */}
        {show === 2  && (
          <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/45 px-4 py-6 backdrop-blur-md"
    onClick={() => setShow(1)}
  >
    <div
      className="relative w-full max-w-[520px] overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_35px_100px_rgba(15,23,42,0.28)] animate-[documentPopupIn_0.35s_ease-out]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#4d5bd1] via-[#7180ef] to-[#5665d6]" />

      <button
        type="button"
        onClick={() => setShow(1)}
        className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
      >
        <X size={17} />
      </button>

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.16)]">
            <FileText size={21} className="text-white" />
          </div>

          <div className="pr-8">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#5665d6]">
              ESSENTIAL DOCUMENTS
            </p>

            <h3 className="mt-1 text-[24px] font-bold tracking-tight text-slate-900">
              Upload your documents
            </h3>

            <p className="mt-1.5 text-[13px] leading-5 text-slate-500">
              Add the required documents to continue your visa application.
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-3">
          <label
            htmlFor="photoUpload"
            className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
              photoFile
                ? "border-emerald-300 bg-emerald-50/50"
                : "border-slate-900 bg-slate-50/50 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                photoFile
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-[#5665d6]/10 text-[#5665d6]"
              }`}
            >
              {photoFile ? (
                <ShieldCheck size={19} />
              ) : (
                <ImageIcon size={19} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-slate-900">
                Photo
                <span className="ml-1 text-red-500">*</span>
              </p>

              <p className="mt-0.5 truncate text-[12px] text-slate-500">
                {photoFile
                  ? photoFile.name
                  : "Upload your recent passport-size photo"}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition group-hover:text-slate-900">
              <Upload size={16} />
            </div>

            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setPhotoFile(e.target.files?.[0] || null);
              }}
            />
          </label>

          <label
            htmlFor="passportUpload"
            className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
              passportFile
                ? "border-emerald-300 bg-emerald-50/50"
                : "border-slate-900 bg-slate-50/50 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                passportFile
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-[#5665d6]/10 text-[#5665d6]"
              }`}
            >
              {passportFile ? (
                <ShieldCheck size={19} />
              ) : (
                <FileText size={19} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-slate-900">
                Passport
                <span className="ml-1 text-red-500">*</span>
              </p>

              <p className="mt-0.5 truncate text-[12px] text-slate-500">
                {passportFile
                  ? passportFile.name
                  : "Upload your valid passport"}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition group-hover:text-slate-900">
              <Upload size={16} />
            </div>

            <input
              id="passportUpload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                setPassportFile(e.target.files?.[0] || null);
              }}
            />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
          <LockKeyhole size={14} className="shrink-0 text-slate-500" />

          <p className="text-[11px] leading-4 text-slate-500">
            Your documents are securely handled and used only for visa processing.
          </p>
        </div>

        <button
          type="button"
          disabled={!photoFile || !passportFile}
          onClick={() => {
            if (!photoFile || !passportFile) return;

            console.log("Photo:", photoFile);
            console.log("Passport:", passportFile);

            setShow(0);
          }}
          className="
            group
            relative
            mt-6
            flex
            h-[54px]
            w-full
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-2xl
            border
            border-slate-900
            bg-slate-900
            text-[14px]
            font-bold
            text-white
            shadow-[0_12px_30px_rgba(15,23,42,0.16)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-white
            hover:text-slate-900
            hover:shadow-[0_18px_35px_rgba(15,23,42,0.14)]
            disabled:cursor-not-allowed
            disabled:border-slate-200
            disabled:bg-slate-100
            disabled:text-slate-400
            disabled:shadow-none
          "
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative">
            Proceed to Checkout
          </span>

          <ArrowRight
            size={17}
            className="relative transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div> </div>
        )}
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
  align = "left",
}) {
  return (
    <div
      className={
        align === "right"
          ? "text-right"
          : ""
      }
    >
      <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-bold tracking-[0.12em] text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MAIN VISA PAGE
========================================================= */


const VisaHero = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] =
    useState(null);

  const [citizenOf, setCitizenOf] =
    useState("India");

  const [goingTo, setGoingTo] =
    useState("");

  const [travelDate, setTravelDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [view, setView] =
    useState("grid");

  /* =====================================================
     VISA FORM OPTIONS
  ===================================================== */

  const citizenOptions = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "United Arab Emirates",
    "Singapore",
  ];

  const destinationOptions = [
    "Thailand",
    "United Arab Emirates",
    "Sri Lanka",
    "Malaysia",
    "Vietnam",
    "Indonesia",
    "Japan",
    "Turkey",
    "Singapore",
  ];

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredCountries =
    VISA_COUNTRIES.filter((visa) => {
      const countryName =
        visa.searchName ||
        visa.country.replace("\n", " ");

      const matchesSearch =
        countryName
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesSearch;
    });

  /* =====================================================
     CLOSE DROPDOWN OUTSIDE
  ===================================================== */

  const pageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pageRef.current &&
        !pageRef.current.contains(event.target)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <section
      ref={pageRef}
      className="
        min-h-screen
        bg-[#f8f9fc]
        pb-16
      "
    >
      {/* =====================================================
          VISA SEARCH SECTION
      ===================================================== */}

      <div className="relative z-10 px-5 pt-10 lg:px-10 lg:pt-14 ">
        {/* BACKGROUND GLOW */}

        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#5665d6]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl ">
          {/* TOP INTRO */}

          <div className="mb-8 text-center">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#5665d6]/15
                bg-[#5665d6]/5
                px-4
                py-2
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5665d6]/40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5665d6]" />
              </span>

              <span className="text-[10px] font-bold tracking-[0.18em] text-[#5665d6]">
                VISA MADE SIMPLE
              </span>
            </div>

            <h2 className="mt-5 text-[32px] font-bold tracking-tight text-slate-900 md:text-[42px]">
              Find the perfect visa for

              <span className="ml-2 bg-gradient-to-r from-[#4d5bd1] via-[#7180ef] to-[#5665d6] bg-clip-text text-transparent">
                your journey
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-6 text-slate-500 md:text-[15px]">
              Select your nationality, destination and travel dates to
              discover the best visa options for your next adventure.
            </p>
          </div>

          {/* MAIN PREMIUM SEARCH CARD */}

          <div
            className="
              relative
              overflow-visible
              rounded-[32px]
              border
              border-white
              bg-white/90
              p-5
              shadow-[0_25px_80px_rgba(15,23,42,0.10)]
              backdrop-blur-2xl
              md:p-7
              lg:p-8
            "
          >
            {/* TOP ACCENT */}

            <div
              className="
                absolute
                left-10
                right-10
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#5665d6]/50
                to-transparent
              "
            />

            {/* CARD HEADER */}

            <div className="mb-7 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#5665d6]
                      to-[#7180ef]
                      shadow-[0_10px_25px_rgba(86,101,214,0.25)]
                    "
                  >
                    <Plane
                      size={20}
                      className="rotate-[25deg] text-white"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] text-[#5665d6]">
                      PLAN YOUR JOURNEY
                    </p>

                    <h3 className="mt-1 text-[20px] font-bold text-slate-900">
                      Where would you like to go?
                    </h3>
                  </div>
                </div>
              </div>

              {/* SAFE BADGE */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  self-start
                  rounded-full
                  border
                  border-emerald-100
                  bg-emerald-50
                  px-4
                  py-2
                  md:self-auto
                "
              >
                <ShieldCheck
                  size={16}
                  className="text-emerald-600"
                />

                <span className="text-[11px] font-semibold text-emerald-700">
                  Fast & Secure Application
                </span>
              </div>
            </div>

            {/* FORM */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                xl:grid-cols-[1.15fr_1.15fr_1fr_1fr_auto]
                xl:items-end
              "
            >
              {/* CITIZEN OF */}

              <VisaSelect
                label="Citizen of"
                value={citizenOf}
                icon={Home}
                options={citizenOptions}
                open={
                  openFilter === "citizen"
                }
                onToggle={() =>
                  setOpenFilter(
                    openFilter === "citizen"
                      ? null
                      : "citizen"
                  )
                }
                onSelect={setCitizenOf}
              />

              {/* GOING TO */}

              <VisaSelect
                label="Going to"
                value={
                  goingTo ||
                  "Select destination"
                }
                icon={Plane}
                options={destinationOptions}
                open={
                  openFilter ===
                  "destination"
                }
                onToggle={() =>
                  setOpenFilter(
                    openFilter ===
                      "destination"
                      ? null
                      : "destination"
                  )
                }
                onSelect={setGoingTo}
              />

              {/* TRAVEL DATE */}

              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[12px] font-bold tracking-wide text-slate-600">
                  <span>Travel Date</span>

                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50/60
                    px-4
                    py-3.5
                    transition-all
                    duration-300
                    hover:border-[#5665d6]/40
                    hover:bg-white
                    hover:shadow-[0_8px_25px_rgba(86,101,214,0.08)]
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#5665d6]/10
                      transition
                      group-hover:bg-[#5665d6]/15
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="text-[#5665d6]"
                    />
                  </div>

                  <ThemedDatePicker
                    value={travelDate}
                    onChange={setTravelDate}
                  />
                </div>
              </div>

              {/* RETURN DATE */}

              <div>
                <label className="mb-2.5 flex items-center gap-2 text-[12px] font-bold tracking-wide text-slate-600">
                  <span>Return Date</span>

                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50/60
                    px-4
                    py-3.5
                    transition-all
                    duration-300
                    hover:border-[#5665d6]/40
                    hover:bg-white
                    hover:shadow-[0_8px_25px_rgba(86,101,214,0.08)]
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#5665d6]/10
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="text-[#5665d6]"
                    />
                  </div>

                  <ThemedDatePicker
                    value={returnDate}
                    onChange={setReturnDate}
                    min={travelDate}
                  />
                </div>
              </div>

              {/* SEARCH BUTTON */}

              <button
                type="button"
                className="
                  group
                  relative
                  flex
                  h-[58px]
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#4d5bd1]
                  via-[#5665d6]
                  to-[#7180ef]
                  px-8
                  text-[14px]
                  font-bold
                  text-white
                  shadow-[0_15px_35px_rgba(86,101,214,0.30)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_22px_45px_rgba(86,101,214,0.40)]
                  active:translate-y-0
                "
              >
                {/* SHINE EFFECT */}

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <Search
                  size={18}
                  className="relative"
                />

                <span className="relative">
                  Search Visa
                </span>
              </button>
            </div>

    
          
          </div>

          {/* SMALL STATS */}

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
            <div>
              <p className="text-lg font-bold text-slate-900">
                150+
              </p>

              <p className="text-[11px] text-slate-500">
                Destinations
              </p>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div>
              <p className="text-lg font-bold text-slate-900">
                Fast
              </p>

              <p className="text-[11px] text-slate-500">
                Processing
              </p>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div>
              <p className="text-lg font-bold text-slate-900">
                Easy
              </p>

              <p className="text-[11px] text-slate-500">
                Application
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          COUNTRY CARDS
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-[1500px]
          px-5
          pt-16
          lg:px-10
        "
      >
       

        <div
          className="
            mb-8
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            md:hidden
          "
        >
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search country"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            gap-x-7
            gap-y-14
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
          "
        >
          {filteredCountries.map((visa) => (
            <VisaCard
              key={visa.id}
              visa={visa}
            />
          ))}
        </div>

        {/* EMPTY */}

        {filteredCountries.length === 0 && (
          <div className="py-24 text-center">
            <Search
              size={35}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 text-lg font-semibold text-slate-600">
              No visa destinations found
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 200% center;
          }
        }

        @keyframes dashMove {
          to {
            stroke-dashoffset: -200;
          }
        }

        @keyframes planeFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(-3deg);
          }

          50% {
            transform: translateY(-14px) rotate(3deg);
          }
        }
      `}</style>
    </section>
  );
};

export default VisaHero;