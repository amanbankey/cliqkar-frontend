import React, { useEffect, useRef, useState } from "react";

import {
  Search,
  ChevronDown,
  Plane,
  Home,
  CalendarDays,
  Map,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   VISA DATA
========================================================= */

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




/* =========================================================
   FILTER DROPDOWN
========================================================= */

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

        {/* ICON */}

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


        {/* TEXT */}

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


      {/* DROPDOWN */}

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


      {/* SELECT */}

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


/* =========================================================
   VISA CARD
========================================================= */

function VisaCard({ visa }) {

  const [hovered, setHovered] = useState(false);

  return (

    <div className="group">

      {/* CARD */}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          relative
          h-[425px]
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


        {/* EXTRA OVERLAY */}

      {/* HOVER DARK + BLUR OVERLAY */}

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
            absolute
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

          <div className="mb-4  flex justify-center">

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-md">
              {visa.flag}
            </span>

          </div>


          {/* COUNTRY */}

          <h3 className="whitespace-pre-line text-center  text-[22px] font-semibold tracking-wide text-white">

            {visa.country}

          </h3>


          {/* LINE */}

          <div className="my-5 h-px bg-white/15" />


          {/* VISA DETAILS */}

          <div
            className={`
              grid
              ${
                visa.fees
                  ? "grid-cols-3"
                  : "grid-cols-2"
              }
              gap-
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


        {/* =====================================================
            HOVER DETAILS
        ===================================================== */}

        <div
          className={`
            absolute
            inset-x-0
            bottom-0
            z-30
            px-6
            pb-14
            
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

          <div className="border-t border-white/20 pt-4">

            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
              DOCUMENTS NEEDED:
            </p>


            <div className="mt-2 flex items-center justify-between">

              <p className="text-[14px] font-semibold text-white">
                {visa.documents?.join(", ")}
              </p>


              {/* <button
                className="
                  rounded-md
                  bg-white/0
                  px-1
                  py
                  text-[10px]
                  ml-3
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white
                "
              >
                Apply for {visa.searchName || visa.country.replace("\n", " ")} Visa
              </button> */}

            </div>


            {/* EMERGENCY */}

            {/* <div
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1.5
                text-[11px]
                font-medium
                text-white/80
                backdrop-blur-md
              "
            >

              <span className="h-2 w-2 animate-pulse rounded-full border border-white/60" />

              Get emergency assistance

            </div> */}

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

    <div className={align === "right" ? "text-right" : ""}>

      <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">
        {label}
      </p>

      <p className="mt-1 text-[12px] font-bold tracking-[0.12em] text-white">
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

  const [openFilter, setOpenFilter] =
    useState(null);

    const [citizenOf, setCitizenOf] = useState("India");

    const [goingTo, setGoingTo] = useState("");
    
    const [travelDate, setTravelDate] = useState("");
    
    const [returnDate, setReturnDate] = useState("");

  const [view, setView] =
    useState("grid");


  /* =====================================================
     FILTER OPTIONS
  ===================================================== */

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
          TOP HEADER
      ===================================================== */}
{/* =====================================================
    PREMIUM VISA PAGE HEADER
===================================================== */}

    



      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

   {/* =====================================================
    VISA SEARCH SECTION
===================================================== */}

{/* =====================================================
    PREMIUM VISA SEARCH SECTION
===================================================== */}

<div className="relative z-10 px-5 pt-10 lg:px-10 lg:pt-14">

  {/* BACKGROUND GLOW */}

  <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#5665d6]/10 blur-[120px]" />

  <div className="relative mx-auto max-w-[1350px]">

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
        Select your nationality, destination and travel dates to discover
        the best visa options for your next adventure.
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
          open={openFilter === "citizen"}
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
          value={goingTo || "Select destination"}
          icon={Plane}
          options={destinationOptions}
          open={openFilter === "destination"}
          onToggle={() =>
            setOpenFilter(
              openFilter === "destination"
                ? null
                : "destination"
            )
          }
          onSelect={setGoingTo}
        />


        {/* TRAVEL DATE */}

        <div>

          <label className="mb-2.5 flex items-center gap-2 text-[12px] font-bold tracking-wide text-slate-600">

            <span>
              Travel Date
            </span>

            <span className="text-red-500">*</span>

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


            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="
                w-full
                cursor-pointer
                bg-transparent
                text-[14px]
                font-semibold
                text-slate-700
                outline-none
              "
            />

          </div>

        </div>


        {/* RETURN DATE */}

        <div>

          <label className="mb-2.5 flex items-center gap-2 text-[12px] font-bold tracking-wide text-slate-600">

            <span>
              Return Date
            </span>

            <span className="text-red-500">*</span>

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


            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={travelDate}
              className="
                w-full
                cursor-pointer
                bg-transparent
                text-[14px]
                font-semibold
                text-slate-700
                outline-none
              "
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


      {/* FOOTER */}

      <div
        className="
          mt-8
          flex
          flex-col
          gap-3
          border-t
          border-slate-100
          pt-5
          text-[12px]
          text-slate-500
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div className="flex items-center gap-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5665d6]/10">

            <Plane
              size={13}
              className="rotate-[25deg] text-[#5665d6]"
            />

          </div>

          <span>
            Compare visa options and plan your journey with confidence.
          </span>

        </div>


        <div className="flex items-center gap-2">

          <ShieldCheck
            size={15}
            className="text-[#5665d6]"
          />

          <span className="font-medium">
            Trusted visa assistance
          </span>

        </div>

      </div>

    </div>


    {/* SMALL STATS */}

    <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">

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
          pt-14
          lg:px-10
        "
      >


        {/* MOBILE SEARCH */}

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
          FLOATING VIEW SWITCHER
      ===================================================== */}

      



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