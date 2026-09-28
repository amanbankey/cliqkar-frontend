import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  Plane,
  Home,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getVisas } from "../../api/visaApi";
import { getCountries } from "../../api/countryApi";


/* =========================================================
   VISA SELECT
========================================================= */

function VisaSelect({
  label,
  value,
  icon: Icon,
  options = [],
  open,
  onToggle,
  onSelect,
  placeholder,
}) {
  const getOptionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }

    return (
      option?.label ||
      option?.countryName ||
      option?.value ||
      ""
    );
  };

  const getOptionValue = (option) => {
    if (typeof option === "string") {
      return option;
    }

    return (
      option?.value ||
      option?.countryName ||
      option?.label ||
      ""
    );
  };

  return (
    <div className="relative w-full">

      {label && (
        <label className="mb-2 block text-[13px] font-medium text-slate-600">
          {label}
          <span className="ml-1 text-red-500">*</span>
        </label>
      )}

      {/* SELECT BUTTON */}

      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          min-h-[62px]
          w-full
          items-center
          gap-3
          rounded-[18px]
          border
          border-slate-200
          bg-slate-50/60
          px-4
          py-3
          text-left
          shadow-sm
          transition-all
          duration-300
          hover:border-[#5665d6]/40
          hover:bg-white
          hover:shadow-[0_12px_30px_rgba(86,101,214,0.08)]
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#5665d6]/10
          "
        >
          <Icon
            size={18}
            className="text-[#5665d6]"
          />
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {label || "Country"}
          </p>

          <p
            className={`
              mt-0.5
              truncate
              text-[13px]
              font-bold
              ${
                value &&
                value !== placeholder
                  ? "text-slate-800"
                  : "text-slate-400"
              }
            `}
          >
            {value || placeholder}
          </p>

        </div>

        <ChevronDown
          size={18}
          className={`
            shrink-0
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
            z-[100]
            max-h-[300px]
            w-full
            overflow-y-auto
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-2
            shadow-[0_25px_70px_rgba(15,23,42,0.18)]
          "
        >

          {options.length > 0 ? (

            options.map((option, index) => {

              const optionLabel =
                getOptionLabel(option);

              const optionValue =
                getOptionValue(option);

              return (
                <button
                  key={`${optionValue}-${index}`}
                  type="button"
                  onClick={() => {
                    onSelect(optionValue, option);
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
                    hover:bg-[#5665d6]/10
                    hover:text-[#5665d6]
                    ${
                      value === optionValue
                        ? "bg-[#5665d6]/10 text-[#5665d6]"
                        : "text-slate-700"
                    }
                  `}
                >

                  <span
                    className={`
                      flex
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      ${
                        value === optionValue
                          ? "bg-[#5665d6]"
                          : "bg-slate-300"
                      }
                    `}
                  />

                  <span className="flex-1 text-[13px] font-semibold">
                    {optionLabel}
                  </span>

                  {value === optionValue && (
                    <CheckCircle2
                      size={15}
                      className="text-[#5665d6]"
                    />
                  )}

                </button>
              );
            })

          ) : (

            <div className="px-4 py-6 text-center">

              <p className="text-[12px] font-semibold text-slate-500">
                No countries available
              </p>

            </div>

          )}

        </div>
      )}

    </div>
  );
}


/* =========================================================
   VISA CARD
========================================================= */

function VisaCard({
  visa,
  countryConfig,
  travelDate,
  returnDate,
}) {

  const navigate = useNavigate();

  const [hovered, setHovered] =
    useState(false);

  const [showAllDocuments, setShowAllDocuments] =
    useState(false);


  /* =====================================================
     VISA DATA
  ===================================================== */

  const goingFrom =
    visa?.going_from || "India";

  const goingTo =
    visa?.going_to || "Destination";

  const entry =
    visa?.entry || "—";

  const validity =
    visa?.validity || "—";

  const duration =
    visa?.duration || "—";

  const processingTime =
    visa?.processing_time || "—";

  const amount =
    visa?.amount || "—";

  const childAmount =
    visa?.child_amount || "—";

  const abscondingFees =
    visa?.absconding_fees || "—";

  const description =
    visa?.description || "—";

  const about =
    visa?.about || "";


  /* =====================================================
     DOCUMENTS
  ===================================================== */

  const documents = visa?.documents
    ? String(visa.documents)
        .split(/\s*-\s*/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];


  const visibleDocuments =
    showAllDocuments
      ? documents
      : documents.slice(0, 2);


  const remainingDocuments =
    documents.length > 2
      ? documents.length - 2
      : 0;


  /* =====================================================
     TITLE
  ===================================================== */

  const cardTitle =
    about ||
    `${goingTo} Visa ${duration} ${entry}`;


  /* =====================================================
     APPLY
  ===================================================== */

  const handleApply = () => {

    /*
      IMPORTANT

      countryConfig mein destination country
      ki complete settings hongi.

      Example:

      allowForPassportFront
      allowForPassportFrontRequired
      allowForPanCard
      allowForPanCardRequired
      allowForFirstName
      allowForFirstNameRequired
      allowForPhoto
      allowForPhotoRequired
      etc.
    */

    console.log(
      "========== VISA APPLY =========="
    );

    console.log(
      "Selected Visa:",
      visa
    );

    console.log(
      "Destination Country Config:",
      countryConfig
    );


    navigate(
      "/traveler-details",
      {
        state: {

          /* VISA */

          visa,

          /* ROUTE */

          goingFrom,

          goingTo,

          /* COUNTRY CONFIGURATION */

          countryConfig,

          /* DATES */

          travelDate,

          returnDate,

        },
      }
    );
  };


  return (
    <div className="w-full min-w-0 ml-8">

      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div
        onMouseEnter={() =>
          setHovered(true)
        }

        onMouseLeave={() => {
          setHovered(false);
          setShowAllDocuments(false);
        }}

        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
          shadow-[0_12px_40px_rgba(15,23,42,0.07)]
          transition-all
          duration-500
          hover:-translate-y-1.5
          hover:border-slate-300
          hover:shadow-[0_25px_65px_rgba(15,23,42,0.13)]
        "
      >

        {/* =================================================
            TOP ACCENT
        ================================================= */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[4px]
            bg-gradient-to-r
            from-[#4d5bd1]
            via-[#7180ef]
            to-[#5665d6]
          "
        />


        {/* =================================================
            CARD HEADER
        ================================================= */}

        <div className="px-7 pt-7">

          <div className="flex items-start justify-between gap-4">

            {/* LEFT */}

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <span
                  className="
                    rounded-full
                    bg-[#5665d6]/10
                    px-3
                    py-1.5
                    text-[9px]
                    font-bold
                    tracking-[0.18em]
                    text-[#5665d6]
                  "
                >
                  VISA
                </span>


                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-[9px]
                    font-bold
                    text-emerald-600
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  Active

                </span>

              </div>


              {/* ROUTE */}

              <div className="mt-5 flex items-center gap-2">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                  "
                >
                  <Plane
                    size={15}
                    className="text-slate-600"
                  />
                </div>


                <p
                  className="
                    truncate
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >

                  {goingFrom}

                  <span className="mx-2 text-[#5665d6]">
                    →
                  </span>

                  {goingTo}

                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              TITLE
          ================================================= */}

          <h3
            className="
              mt-5
              max-w-[480px]
              text-[23px]
              font-bold
              leading-[1.25]
              tracking-tight
              text-slate-900
            "
          >
            {cardTitle}
          </h3>


          {/* DESCRIPTION */}

          <p
            className="
              mt-2
              line-clamp-2
              text-[13px]
              leading-5
              text-slate-500
            "
          >
            {description}
          </p>

        </div>


        {/* =================================================
            MAIN STATS
        ================================================= */}

        <div
          className="
            mx-7
            mt-6
            overflow-hidden
            rounded-2xl
            border
            border-slate-100
            bg-slate-50/70
          "
        >

          <div
            className="
              grid
              grid-cols-3
              divide-x
              divide-slate-200
            "
          >

            <VisaStat
              label="ENTRY"
              value={entry}
            />

            <VisaStat
              label="VALIDITY"
              value={validity}
            />

            <VisaStat
              label="ADULT"
              value={amount}
              highlight
            />

          </div>

        </div>


        {/* =================================================
            DETAILS
        ================================================= */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            ease-out

            ${
              hovered
                ? "max-h-[480px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div
            className="
              mx-7
              mt-5
              border-t
              border-slate-100
              pt-5
            "
          >

            {/* DETAIL GRID */}

            <div
              className="
                grid
                grid-cols-2
                gap-x-8
                gap-y-4
              "
            >

              <VisaDetail
                label="Duration"
                value={duration}
              />

              <VisaDetail
                label="Processing Time"
                value={processingTime}
              />

              <VisaDetail
                label="Child Amount"
                value={childAmount}
              />

              <VisaDetail
                label="Absconding Fees"
                value={abscondingFees}
              />

            </div>


            {/* =================================================
                DOCUMENTS
            ================================================= */}

            <div
              className="
                mt-5
                border-t
                border-slate-100
                pt-4
              "
            >

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                Required Documents
              </p>


              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {visibleDocuments.length > 0 ? (

                  visibleDocuments.map(
                    (document, index) => (

                      <span
                        key={`${document}-${index}`}
                        className="
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-semibold
                          text-slate-600
                          shadow-sm
                        "
                      >
                        {document}
                      </span>

                    )
                  )

                ) : (

                  <span className="text-[11px] text-slate-400">
                    No documents specified
                  </span>

                )}


                {/* MORE BUTTON */}

                {remainingDocuments > 0 && (

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      setShowAllDocuments(
                        !showAllDocuments
                      );
                    }}
                    className="
                      rounded-lg
                      border
                      border-[#5665d6]/20
                      bg-[#5665d6]/5
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-bold
                      text-[#5665d6]
                      transition
                      hover:bg-[#5665d6]/10
                    "
                  >

                    {showAllDocuments
                      ? "Show less"
                      : `+${remainingDocuments} More`}

                  </button>

                )}

              </div>

            </div>


            {/* =================================================
                APPLY BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={handleApply}
              className="
                group/apply
                relative
                mt-5
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-2xl
                bg-slate-900
                px-5
                text-[13px]
                font-bold
                text-white
                shadow-[0_12px_25px_rgba(15,23,42,0.15)]
                transition-all
                duration-300
                hover:bg-[#5665d6]
                hover:shadow-[0_15px_30px_rgba(86,101,214,0.25)]
              "
            >

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover/apply:translate-x-full
                "
              />

              <span className="relative">
                Apply Now
              </span>

              <ArrowRight
                size={16}
                className="
                  relative
                  transition-transform
                  duration-300
                  group-hover/apply:translate-x-1
                "
              />

            </button>

          </div>

        </div>


        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}

        <div
          className="
            mx-7
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-slate-100
            py-5
          "
        >

          {/* PROCESSING */}

          <div className="flex items-center gap-2.5">

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-emerald-50
              "
            >

              <ShieldCheck
                size={15}
                className="text-emerald-600"
              />

            </div>


            <div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                "
              >
                Visa Processing
              </p>

              <p
                className="
                  mt-0.5
                  text-[12px]
                  font-bold
                  text-slate-800
                "
              >
                {processingTime}
              </p>

            </div>

          </div>


          {/* VIEW DETAILS */}

          <div
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#5665d6]
            "
          >

            <span>
              {hovered
                ? "Details"
                : "View Details"}
            </span>

            <ArrowRight
              size={13}
              className={`
                transition-transform
                duration-300
                ${
                  hovered
                    ? "rotate-90"
                    : ""
                }
              `}
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   VISA STAT
========================================================= */

function VisaStat({
  label,
  value,
  highlight = false,
}) {

  return (
    <div className="px-5 py-4">

      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-1.5
          truncate
          text-[13px]
          font-bold
          ${
            highlight
              ? "text-[#5665d6]"
              : "text-slate-800"
          }
        `}
        title={String(value)}
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   VISA DETAIL
========================================================= */

function VisaDetail({
  label,
  value,
}) {

  return (
    <div>

      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-[12px]
          font-semibold
          text-slate-800
        "
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   MAIN VISA HERO
========================================================= */

const VisaHero = () => {

  const navigate = useNavigate();

  const pageRef = useRef(null);


  /* =====================================================
     DROPDOWN
  ===================================================== */

  const [openFilter, setOpenFilter] =
    useState(null);


  /* =====================================================
     SEARCH FORM
  ===================================================== */

  const [citizenOf, setCitizenOf] =
    useState("");

  const [goingTo, setGoingTo] =
    useState("");

  const [travelDate, setTravelDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [search, setSearch] =
    useState("");


  /* =====================================================
     COUNTRY DATA
  ===================================================== */

  const [countries, setCountries] =
    useState([]);

  const [loadingCountries, setLoadingCountries] =
    useState(false);


  /* =====================================================
     VISA DATA
  ===================================================== */

  const [activeVisas, setActiveVisas] =
    useState([]);

  const [searchResults, setSearchResults] =
    useState([]);

  const [loadingVisas, setLoadingVisas] =
    useState(false);

  const [searched, setSearched] =
    useState(false);


  /* =====================================================
     FETCH COUNTRIES
  ===================================================== */

  useEffect(() => {

    const fetchCountries = async () => {

      try {

        setLoadingCountries(true);

        /*
          Backend supports:

          status = Active
          visaStatus = Yes

          Therefore only countries which are:

          Active
          +
          Allow For Visa = Yes

          will come here.
        */

        const response =
          await getCountries({
            page: 1,
            limit: 1000,
            status: "Active",
            visaStatus: "Yes",
          });


        console.log(
          "========== COUNTRY RESPONSE =========="
        );

        console.log(response);


        let list = [];


        /*
          Backend response:

          {
            success: true,
            data: [...]
          }
        */

        if (
          Array.isArray(
            response?.data
          )
        ) {

          list =
            response.data;

        } else if (
          Array.isArray(
            response?.countries
          )
        ) {

          list =
            response.countries;

        } else if (
          Array.isArray(response)
        ) {

          list =
            response;

        } else if (
          Array.isArray(
            response?.data?.countries
          )
        ) {

          list =
            response.data.countries;

        }


        /* =================================================
           FRONTEND SAFETY FILTER
        ================================================= */

        list = list.filter(
          (country) => {

            const active =
              String(
                country?.status || ""
              )
                .trim()
                .toLowerCase() ===
              "active";


            const visaAllowed =
              String(
                country?.allowForVisa || ""
              )
                .trim()
                .toLowerCase() ===
              "yes";


            return (
              active &&
              visaAllowed
            );
          }
        );


        setCountries(list);


        console.log(
          "ACTIVE VISA ALLOWED COUNTRIES:",
          list
        );

      } catch (error) {

        console.error(
          "Fetch countries error:",
          error
        );

        setCountries([]);

      } finally {

        setLoadingCountries(false);

      }

    };


    fetchCountries();

  }, []);


  /* =====================================================
     COUNTRY DROPDOWN OPTIONS
  ===================================================== */

  const countryOptions =
    countries.map(
      (country) => ({
        label:
          country.countryName,

        value:
          country.countryName,

        country,
      })
    );


  /* =====================================================
     FIND COUNTRY CONFIG
  ===================================================== */

  const getCountryConfig =
    (countryName) => {

      if (!countryName) {
        return null;
      }

      return countries.find(
        (country) =>
          String(
            country?.countryName || ""
          )
            .trim()
            .toLowerCase() ===
          String(countryName)
            .trim()
            .toLowerCase()
      ) || null;
    };


  /* =====================================================
     FETCH ACTIVE VISAS
  ===================================================== */

  useEffect(() => {

    const fetchActiveVisas =
      async () => {

        try {

          setLoadingVisas(true);

          const response =
            await getVisas({
              page: 1,
              limit: 1000,
              status: "Active",
            });


          console.log(
            "========== ACTIVE VISA RESPONSE =========="
          );

          console.log(response);


          let list = [];


          if (
            Array.isArray(
              response?.visas
            )
          ) {

            list =
              response.visas;

          } else if (
            Array.isArray(
              response?.data
            )
          ) {

            list =
              response.data;

          } else if (
            Array.isArray(
              response?.data?.visas
            )
          ) {

            list =
              response.data.visas;

          } else if (
            Array.isArray(response)
          ) {

            list =
              response;

          }


          /* =================================================
             ONLY ACTIVE
          ================================================= */

          list =
            list.filter(
              (visa) =>
                String(
                  visa?.status ||
                  "Active"
                )
                  .trim()
                  .toLowerCase() ===
                "active"
            );


          setActiveVisas(list);


          console.log(
            "ACTIVE VISAS:",
            list
          );

        } catch (error) {

          console.error(
            "Fetch active visas error:",
            error
          );

          setActiveVisas([]);

        } finally {

          setLoadingVisas(false);

        }

      };


    fetchActiveVisas();

  }, []);


  /* =====================================================
     STARTING COUNTRY CHANGE
  ===================================================== */

  const handleCitizenChange =
    (value) => {

      setCitizenOf(value);

      /*
        Destination reset because
        starting country changed.
      */

      setGoingTo("");

      setSearchResults([]);

      setSearched(false);

      setOpenFilter(null);

    };


  /* =====================================================
     DESTINATION CHANGE
  ===================================================== */

  const handleDestinationChange =
    (value) => {

      setGoingTo(value);

      setSearchResults([]);

      setSearched(false);

      setOpenFilter(null);

    };


  /* =====================================================
     SEARCH VISA
  ===================================================== */

  const handleVisaSearch =
    async () => {

      if (!citizenOf) {

        alert(
          "Please select starting country."
        );

        return;
      }


      if (!goingTo) {

        alert(
          "Please select destination."
        );

        return;
      }


      /*
        Check destination configuration.

        Because dropdown already contains
        only allowForVisa = Yes countries,
        normally this will exist.
      */

      const destinationCountry =
        getCountryConfig(
          goingTo
        );


      if (!destinationCountry) {

        alert(
          "Visa is not available for this destination."
        );

        return;
      }


      try {

        setLoadingVisas(true);


        const response =
          await getVisas({
            page: 1,
            limit: 1000,
            going_from:
              citizenOf,
            going_to:
              goingTo,
            status:
              "Active",
          });


        console.log(
          "========== VISA SEARCH RESPONSE =========="
        );

        console.log(response);


        let list = [];


        if (
          Array.isArray(
            response?.visas
          )
        ) {

          list =
            response.visas;

        } else if (
          Array.isArray(
            response?.data
          )
        ) {

          list =
            response.data;

        } else if (
          Array.isArray(
            response?.data?.visas
          )
        ) {

          list =
            response.data.visas;

        } else if (
          Array.isArray(response)
        ) {

          list =
            response;

        }


        /* =================================================
           FRONTEND SAFETY FILTER
        ================================================= */

        list =
          list.filter(
            (visa) => {

              const fromMatch =
                String(
                  visa?.going_from ||
                  ""
                )
                  .trim()
                  .toLowerCase() ===
                String(citizenOf)
                  .trim()
                  .toLowerCase();


              const toMatch =
                String(
                  visa?.going_to ||
                  ""
                )
                  .trim()
                  .toLowerCase() ===
                String(goingTo)
                  .trim()
                  .toLowerCase();


              const activeMatch =
                String(
                  visa?.status ||
                  ""
                )
                  .trim()
                  .toLowerCase() ===
                "active";


              return (
                fromMatch &&
                toMatch &&
                activeMatch
              );

            }
          );


        setSearchResults(list);

        setSearched(true);


        console.log(
          "MATCHING VISA RESULTS:",
          list
        );


        console.log(
          "DESTINATION COUNTRY CONFIG:",
          destinationCountry
        );

      } catch (error) {

        console.error(
          "Visa search error:",
          error
        );

        setSearchResults([]);

        setSearched(true);

      } finally {

        setLoadingVisas(false);

      }

    };


  /* =====================================================
     RESET SEARCH
  ===================================================== */

  const resetVisaSearch =
    () => {

      setCitizenOf("");

      setGoingTo("");

      setTravelDate("");

      setReturnDate("");

      setSearch("");

      setSearchResults([]);

      setSearched(false);

      setOpenFilter(null);

    };


  /* =====================================================
     OUTSIDE CLICK
  ===================================================== */

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          pageRef.current &&
          !pageRef.current.contains(
            event.target
          )
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


  /* =====================================================
     SEARCH TEXT FILTER
  ===================================================== */

  const filteredResults =
    searchResults.filter(
      (visa) => {

        const text = `
          ${visa?.going_from || ""}
          ${visa?.going_to || ""}
          ${visa?.about || ""}
          ${visa?.description || ""}
          ${visa?.entry || ""}
          ${visa?.duration || ""}
        `.toLowerCase();


        return text.includes(
          search.toLowerCase()
        );

      }
    );


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
          SEARCH SECTION
      ===================================================== */}

      <div
        className="
          relative
          z-10
          px-5
          pt-10
          lg:px-10
          lg:pt-14
        "
      >

        {/* BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[420px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#5665d6]/10
            blur-[120px]
          "
        />


        <div
          className="
            relative
            mx-auto
            max-w-[1350px]
          "
        >

          {/* =================================================
              INTRO
          ================================================= */}

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

                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[#5665d6]/40
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-[#5665d6]
                  "
                />

              </span>

              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.18em]
                  text-[#5665d6]
                "
              >
                VISA MADE SIMPLE
              </span>

            </div>


            <h2
              className="
                mt-5
                text-[32px]
                font-bold
                tracking-tight
                text-slate-900
                md:text-[42px]
              "
            >

              Find the perfect visa for

              <span
                className="
                  ml-2
                  bg-gradient-to-r
                  from-[#4d5bd1]
                  via-[#7180ef]
                  to-[#5665d6]
                  bg-clip-text
                  text-transparent
                "
              >
                your journey
              </span>

            </h2>


            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-[14px]
                leading-6
                text-slate-500
                md:text-[15px]
              "
            >
              Select your nationality, destination and travel dates to
              discover the best visa options for your next adventure.
            </p>

          </div>


          {/* =====================================================
              SEARCH CARD
          ===================================================== */}

          <div
            className="
              relative
              overflow-visible
              rounded-[32px]
              border
              border-white
              bg-white
              p-5
              shadow-[0_30px_90px_rgba(15,23,42,0.10)]
              md:p-7
              lg:p-8
            "
          >

            {/* TOP ACCENT */}

            <div
              className="
                pointer-events-none
                absolute
                left-[8%]
                right-[8%]
                top-0
                h-[2px]
                rounded-full
                bg-gradient-to-r
                from-transparent
                via-[#5665d6]/60
                to-transparent
              "
            />


            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                mb-6
                flex
                flex-col
                gap-4
                border-b
                border-slate-100
                pb-5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              <div className="flex items-center gap-3.5">

                <div
                  className="
                    relative
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[15px]
                    bg-gradient-to-br
                    from-[#5665d6]
                    to-[#7180ef]
                    shadow-[0_10px_25px_rgba(86,101,214,0.25)]
                  "
                >

                  <Plane
                    size={19}
                    className="rotate-[25deg] text-white"
                  />

                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-white
                      bg-emerald-400
                    "
                  />

                </div>


                <div>

                  <div className="flex items-center gap-2">

                    <p
                      className="
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.18em]
                        text-[#5665d6]
                      "
                    >
                      Visa Journey Planner
                    </p>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span className="text-[9px] font-semibold text-slate-400">
                      Simple & secure
                    </span>

                  </div>


                  <h3
                    className="
                      mt-1
                      text-[20px]
                      font-extrabold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    Tell us about your trip
                  </h3>


                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Get the right visa options for your journey.
                  </p>

                </div>

              </div>


              {/* SECURE BADGE */}

              <div
                className="
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-emerald-100
                  bg-emerald-50/70
                  px-3.5
                  py-2
                "
              >

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-100
                  "
                >

                  <ShieldCheck
                    size={14}
                    className="text-emerald-600"
                  />

                </div>


                <div>

                  <p className="text-[10px] font-bold text-emerald-700">
                    Secure & Simple
                  </p>

                  <p className="text-[8px] text-emerald-600">
                    Your details stay protected
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                COUNTRY ROUTE
            ================================================= */}

            <div className="relative">

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[46%]
                  right-[46%]
                  top-[60px]
                  hidden
                  border-t
                  border-dashed
                  border-[#5665d6]/25
                  lg:block
                "
              />


              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-[65px]
                  z-20
                  hidden
                  h-2.5
                  w-2.5
                  -translate-x-1/2
                  rounded-full
                  bg-[#5665d6]
                  shadow-[0_0_0_5px_rgba(86,101,214,0.08)]
                  lg:block
                "
              />


              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  lg:grid-cols-[1fr_48px_1fr]
                  lg:items-end
                "
              >

                {/* =================================================
                    STARTING COUNTRY
                ================================================= */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.16em]
                      text-slate-500
                    "
                  >
                    Starting from

                    <span className="ml-1 text-red-500">
                      *
                    </span>

                  </label>


                  <VisaSelect
                    label="Starting country"
                    value={citizenOf}
                    placeholder={
                      loadingCountries
                        ? "Loading countries..."
                        : "Select starting country"
                    }
                    icon={Home}
                    options={countryOptions}
                    open={
                      openFilter ===
                      "citizen"
                    }
                    onToggle={() =>
                      setOpenFilter(
                        openFilter ===
                          "citizen"
                          ? null
                          : "citizen"
                      )
                    }
                    onSelect={
                      handleCitizenChange
                    }
                  />

                </div>


                {/* =================================================
                    PLANE CONNECTOR
                ================================================= */}

                <div
                  className="
                    hidden
                    h-[62px]
                    items-center
                    justify-center
                    lg:flex
                    
                  "
                >

                  <div
                    className="
                      relative
                      z-30
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      mt-6
                      border-[#5665d6]/15
                      bg-white
                      shadow-[0_8px_25px_rgba(86,101,214,0.12)]
                    "
                  >

                    <Plane
                      size={16}
                      className="rotate-[25deg] text-[#5665d6]"
                    />

                  </div>

                </div>


                {/* =================================================
                    DESTINATION
                ================================================= */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.16em]
                      text-slate-500
                    "
                  >
                    Destination

                    <span className="ml-1 text-red-500">
                      *
                    </span>

                  </label>


                  <VisaSelect
                    label="Destination country"
                    value={goingTo}
                    placeholder={
                      loadingCountries
                        ? "Loading countries..."
                        : "Select destination"
                    }
                    icon={Plane}
                    options={countryOptions}
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
                    onSelect={
                      handleDestinationChange
                    }
                  />

                </div>

              </div>

            </div>


            {/* =====================================================
                DATES + SEARCH
            ===================================================== */}

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                lg:grid-cols-[1fr_1fr_190px]
                lg:items-end
              "
            >

              {/* DEPARTURE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  Departure date

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                <div
                  className="
                    group
                    flex
                    h-[62px]
                    items-center
                    gap-3
                    rounded-[18px]
                    border
                    border-slate-200
                    bg-slate-50/60
                    px-3.5
                    transition-all
                    duration-300
                    hover:border-[#5665d6]/30
                    hover:bg-white
                    hover:shadow-[0_12px_30px_rgba(86,101,214,0.08)]
                    focus-within:border-[#5665d6]/50
                    focus-within:bg-white
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
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


                  <div className="min-w-0 flex-1">

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-slate-400
                      "
                    >
                      Travel date
                    </p>


                    <input
                      type="date"
                      value={travelDate}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setTravelDate(
                          e.target.value
                        )
                      }
                      className="
                        mt-0.5
                        w-full
                        cursor-pointer
                        bg-transparent
                        text-[13px]
                        font-bold
                        text-slate-800
                        outline-none
                      "
                    />

                  </div>

                </div>

              </div>


              {/* RETURN DATE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  Return date

                  <span className="ml-1 text-red-500">
                    *
                  </span>

                </label>


                <div
                  className="
                    group
                    flex
                    h-[62px]
                    items-center
                    gap-3
                    rounded-[18px]
                    border
                    border-slate-200
                    bg-slate-50/60
                    px-3.5
                    transition-all
                    duration-300
                    hover:border-[#5665d6]/30
                    hover:bg-white
                    hover:shadow-[0_12px_30px_rgba(86,101,214,0.08)]
                    focus-within:border-[#5665d6]/50
                    focus-within:bg-white
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
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


                  <div className="min-w-0 flex-1">

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-slate-400
                      "
                    >
                      Return date
                    </p>


                    <input
                      type="date"
                      value={returnDate}
                      min={
                        travelDate ||
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setReturnDate(
                          e.target.value
                        )
                      }
                      className="
                        mt-0.5
                        w-full
                        cursor-pointer
                        bg-transparent
                        text-[13px]
                        font-bold
                        text-slate-800
                        outline-none
                      "
                    />

                  </div>

                </div>

              </div>


              {/* SEARCH BUTTON */}

              <button
                type="button"
                onClick={
                  handleVisaSearch
                }
                disabled={
                  loadingVisas ||
                  loadingCountries
                }
                className="
                  group
                  relative
                  flex
                  h-[62px]
                  items-center
                  justify-center
                  gap-2.5
                  overflow-hidden
                  rounded-[18px]
                  bg-gradient-to-br
                  from-[#4d5bd1]
                  via-[#5665d6]
                  to-[#7180ef]
                  px-6
                  text-[13px]
                  font-extrabold
                  text-white
                  shadow-[0_16px_35px_rgba(86,101,214,0.28)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_22px_45px_rgba(86,101,214,0.38)]
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

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


                <div
                  className="
                    relative
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >

                  {loadingVisas ? (

                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                  ) : (

                    <Search size={16} />

                  )}

                </div>


                <span className="relative">
                  {loadingVisas
                    ? "Searching..."
                    : "Search Visa"}
                </span>


                <ArrowRight
                  size={16}
                  className="
                    relative
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>

            </div>


            {/* =====================================================
                TRUST FOOTER
            ===================================================== */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
                border-t
                border-slate-100
                pt-4
              "
            >

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                  "
                >

                  <CheckCircle2
                    size={13}
                    className="text-emerald-600"
                  />

                </div>

                <span className="text-[10px] font-semibold text-slate-500">
                  No hidden charges
                </span>

              </div>


              <div className="flex items-center gap-2">

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#5665d6]/10
                  "
                >

                  <ShieldCheck
                    size={13}
                    className="text-[#5665d6]"
                  />

                </div>

                <span className="text-[10px] font-semibold text-slate-500">
                  Secure application
                </span>

              </div>


              <div className="flex items-center gap-2">

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#5665d6]/10
                  "
                >

                  <Plane
                    size={12}
                    className="rotate-[25deg] text-[#5665d6]"
                  />

                </div>

                <span className="text-[10px] font-semibold text-slate-500">
                  Expert visa assistance
                </span>

              </div>

            </div>

          </div>


          {/* =====================================================
              SMALL STATS
          ===================================================== */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-8
              gap-y-3
              text-center
            "
          >

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
          VISA CARDS
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-5
          pt-14
          sm:px-6
          lg:px-8
          2xl:px-10
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
              setSearch(
                e.target.value
              )
            }
            placeholder="Search visa"
            className="
              w-full
              bg-transparent
              text-sm
              outline-none
            "
          />

        </div>


        {/* =================================================
            3 CARDS PER ROW
        ================================================= */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
            2xl:gap-7
          "
        >

          {!searched ? (

            <div
              className="
                col-span-full
                py-20
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#5665d6]/10
                "
              >

                <Plane
                  size={26}
                  className="rotate-[25deg] text-[#5665d6]"
                />

              </div>


              <p
                className="
                  mt-5
                  text-lg
                  font-bold
                  text-slate-700
                "
              >
                Select your journey
              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Choose your starting country and destination
                to explore available visas.
              </p>

            </div>

          ) : loadingVisas ? (

            <div
              className="
                col-span-full
                py-20
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  h-9
                  w-9
                  animate-spin
                  rounded-full
                  border-2
                  border-slate-200
                  border-t-[#5665d6]
                "
              />


              <p
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-slate-500
                "
              >
                Finding visa options...
              </p>

            </div>

          ) : filteredResults.length > 0 ? (

            filteredResults.map(
              (visa) => {

                /*
                  Every card gets the destination
                  country configuration.

                  So Apply Now can pass:

                  visa
                  +
                  countryConfig
                  +
                  dates
                */

                const countryConfig =
                  getCountryConfig(
                    visa?.going_to ||
                    goingTo
                  );


                return (
                  <VisaCard
                    key={visa._id}
                    visa={visa}
                    countryConfig={
                      countryConfig
                    }
                    travelDate={
                      travelDate
                    }
                    returnDate={
                      returnDate
                    }
                  />
                );

              }
            )

          ) : (

            <div
              className="
                col-span-full
                py-20
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-100
                "
              >

                <Search
                  size={28}
                  className="text-slate-400"
                />

              </div>


              <p
                className="
                  mt-5
                  text-lg
                  font-semibold
                  text-slate-600
                "
              >
                No visa available
              </p>


              <p
                className="
                  mx-auto
                  mt-1
                  max-w-md
                  text-sm
                  text-slate-400
                "
              >
                No active visa found for{" "}
                <span className="font-semibold text-slate-500">
                  {citizenOf}
                </span>{" "}
                →
                <span className="font-semibold text-slate-500">
                  {" "}
                  {goingTo}
                </span>
              </p>


              <button
                type="button"
                onClick={
                  resetVisaSearch
                }
                className="
                  mt-5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:border-[#5665d6]/30
                  hover:text-[#5665d6]
                "
              >
                Search another destination
              </button>

            </div>

          )}

        </div>

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

      `}</style>

    </section>
  );
};


export default VisaHero;