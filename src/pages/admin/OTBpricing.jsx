import React, { useEffect, useState } from "react";

import {
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiX,
  FiEdit2,
  FiFilter,
  FiGrid,
  FiCheckCircle,
  FiTag,
  FiDollarSign,
  FiToggleRight,
  FiLoader,
  FiRefreshCw,
} from "react-icons/fi";

import {
  getAirlines,
  getAirlinePrices,
  createOrUpdateAirlinePrice,
} from "../../api/airlineApi";

import { getCountries } from "../../api/countryApi";


// =====================================================
// OTB PRICE MODAL
// =====================================================

const UpdateTariffModal = ({
  rule,
  airlines,
  countries,
  onClose,
  onSuccess,
}) => {
  const isEdit = Boolean(rule?._id);

  const [airlineId, setAirlineId] = useState(
    rule?.airline?._id || ""
  );

  const [countryId, setCountryId] = useState(
    rule?.country?._id || ""
  );

  const [charge, setCharge] = useState(
    rule?.price ?? ""
  );

  const [status, setStatus] = useState(
    rule?.status || "Active"
  );

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");


  // ===================================================
  // SAVE
  // ===================================================

  const handleSave = async () => {
    if (!airlineId) {
      setError("Please select an airline.");
      return;
    }

    if (!countryId) {
      setError("Please select a country.");
      return;
    }

    if (
      charge === "" ||
      Number(charge) < 0
    ) {
      setError("Please enter a valid OTB amount.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const response =
        await createOrUpdateAirlinePrice({
          airlineId,
          countryId,
          price: Number(charge),
          status,
        });

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to save OTB price"
        );
      }

      onSuccess();
      onClose();

    } catch (err) {
      console.error(
        "OTB price save error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save OTB price."
      );

    } finally {
      setIsSaving(false);
    }
  };


  // ===================================================
  // SELECTED AIRLINE
  // ===================================================

  const selectedAirline = airlines.find(
    (item) => item._id === airlineId
  );


  // ===================================================
  // SELECTED COUNTRY
  // ===================================================

  const selectedCountry = countries.find(
    (item) => item._id === countryId
  );


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div>

              <div className="flex items-center gap-2">

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiTag size={18} />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    {isEdit
                      ? "Update OTB Price"
                      : "Add OTB Price"}
                  </h2>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Configure airline-wise OTB verification pricing
                  </p>

                </div>

              </div>

            </div>


            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <FiX size={18} />
            </button>

          </div>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <div className="p-6 space-y-6">


          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </div>
          )}


          {/* =================================================
              AIRLINE & COUNTRY
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiTag size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Airline & Country
                </p>

                <p className="text-[11px] text-slate-400">
                  Select from existing master data
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


              {/* AIRLINE */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Airline Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <select
                    value={airlineId}
                    onChange={(e) =>
                      setAirlineId(
                        e.target.value
                      )
                    }
                    className="appearance-none w-full border border-slate-200 rounded-xl px-3.5 py-3 pr-10 text-sm text-slate-700 bg-white outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                  >

                    <option value="">
                      Select Airline
                    </option>

                    {airlines.map(
                      (airline) => (
                        <option
                          key={airline._id}
                          value={airline._id}
                        >
                          {airline.name}
                          {airline.code
                            ? ` (${airline.code})`
                            : ""}
                        </option>
                      )
                    )}

                  </select>

                  <FiChevronDown
                    size={15}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                </div>

              </div>


              {/* COUNTRY */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Country Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <select
                    value={countryId}
                    onChange={(e) =>
                      setCountryId(
                        e.target.value
                      )
                    }
                    className="appearance-none w-full border border-slate-200 rounded-xl px-3.5 py-3 pr-10 text-sm text-slate-700 bg-white outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                  >

                    <option value="">
                      Select Country
                    </option>

                    {countries.map(
                      (country) => (
                        <option
                          key={country._id}
                          value={country._id}
                        >
                          {country.countryName}
                          {country.code
                            ? ` (${country.code})`
                            : ""}
                        </option>
                      )
                    )}

                  </select>

                  <FiChevronDown
                    size={15}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              PRICE
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiDollarSign size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  OTB Pricing
                </p>

                <p className="text-[11px] text-slate-400">
                  Set the base OTB verification charge
                </p>

              </div>

            </div>


            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Amount
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <div className="relative max-w-sm">

              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                ₹
              </span>

              <input
                type="number"
                min="0"
                value={charge}
                onChange={(e) =>
                  setCharge(
                    e.target.value
                  )
                }
                placeholder="Enter amount"
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
              />

            </div>

            <p className="text-[10px] text-slate-400 mt-1.5">
              Base OTB verification fee charged for the selected airline and country.
            </p>

          </div>


          {/* =================================================
              STATUS
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiToggleRight size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Tariff Status
                </p>

                <p className="text-[11px] text-slate-400">
                  Control whether this OTB rate is available
                </p>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-3">


              {/* ACTIVE */}

              <button
                type="button"
                onClick={() =>
                  setStatus("Active")
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border transition ${
                  status === "Active"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >

                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "Active"
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                />

                Active

              </button>


              {/* DEACTIVE */}

              <button
                type="button"
                onClick={() =>
                  setStatus("Deactive")
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border transition ${
                  status === "Deactive"
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >

                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "Deactive"
                      ? "bg-red-500"
                      : "bg-slate-300"
                  }`}
                />

                Deactive

              </button>

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-100">

            <div className="text-[10px] text-slate-400">

              {selectedAirline &&
                selectedCountry && (
                  <>
                    {selectedAirline.name}
                    {" • "}
                    {selectedCountry.countryName}
                  </>
                )}

            </div>


            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition disabled:opacity-60"
              >

                {isSaving ? (
                  <>
                    <FiLoader
                      size={14}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiCheckCircle
                      size={14}
                    />

                    {isEdit
                      ? "Save Changes"
                      : "Add OTB Price"}
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


// =====================================================
// OTB PRICING DIRECTORY
// =====================================================

const OTBPricingTariffs = () => {

  const [rules, setRules] = useState([]);

  const [airlines, setAirlines] = useState([]);

  const [countries, setCountries] = useState([]);


  const [search, setSearch] = useState("");

  const [airlineFilter, setAirlineFilter] =
    useState("");

  const [countryFilter, setCountryFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");


  const [pagination, setPagination] =
    useState({
      total: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
    });


  const [activeRule, setActiveRule] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);


  const [loading, setLoading] =
    useState(false);

  const [masterLoading, setMasterLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ===================================================
  // FETCH AIRLINES + COUNTRIES
  // ===================================================

  const fetchMasterData = async () => {
    try {
      setMasterLoading(true);

      const [
        airlineResponse,
        countryResponse,
      ] = await Promise.all([

        getAirlines({
          page: 1,
          limit: 1000,
          status: "Active",
        }),

        getCountries({
          page: 1,
          limit: 1000,
          status: "Active",
        }),

      ]);


      if (airlineResponse?.success) {
        setAirlines(
          airlineResponse.data || []
        );
      }


      if (countryResponse?.success) {
        setCountries(
          countryResponse.data || []
        );
      }

    } catch (err) {

      console.error(
        "Master data fetch error:",
        err
      );

    } finally {
      setMasterLoading(false);
    }
  };


  // ===================================================
  // FETCH OTB RULES
  // ===================================================

  const fetchRules = async (
    page = 1
  ) => {

    try {

      setLoading(true);
      setError("");


      const response =
        await getAirlinePrices({

          page,

          limit: 10,

          isAdmin: "yes",

          airlineId:
            airlineFilter || undefined,

          countryId:
            countryFilter || undefined,

        });


      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to fetch OTB pricing"
        );
      }


      let data =
        response.data || [];


      // ==============================================
      // FRONTEND SEARCH
      // ==============================================

      if (search.trim()) {

        const searchValue =
          search
            .trim()
            .toLowerCase();


        data = data.filter(
          (item) => {

            const airlineName =
              item.airline?.name
                ?.toLowerCase() || "";

            const airlineCode =
              item.airline?.code
                ?.toLowerCase() || "";

            const countryName =
              item.country?.countryName
                ?.toLowerCase() || "";

            const countryCode =
              item.country?.code
                ?.toLowerCase() || "";

            return (
              airlineName.includes(
                searchValue
              ) ||
              airlineCode.includes(
                searchValue
              ) ||
              countryName.includes(
                searchValue
              ) ||
              countryCode.includes(
                searchValue
              )
            );

          }
        );

      }


      // ==============================================
      // STATUS FILTER
      // ==============================================

      if (statusFilter) {

        data = data.filter(
          (item) =>
            item.status === statusFilter
        );

      }


      setRules(data);


      setPagination(
        response.pagination || {
          total: data.length,
          currentPage: page,
          totalPages: 1,
          pageSize: 10,
        }
      );

    } catch (err) {

      console.error(
        "Fetch OTB pricing error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load OTB pricing."
      );

      setRules([]);

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {

    fetchMasterData();

    fetchRules(1);

  }, []);


  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = (e) => {

    e.preventDefault();

    fetchRules(1);

  };


  // ===================================================
  // RESET
  // ===================================================

  const handleReset = () => {

    setSearch("");
    setAirlineFilter("");
    setCountryFilter("");
    setStatusFilter("");

    setTimeout(() => {
      fetchRules(1);
    }, 0);

  };


  // ===================================================
  // ADD
  // ===================================================

  const openAddModal = () => {

    setActiveRule(null);
    setShowModal(true);

  };


  // ===================================================
  // EDIT
  // ===================================================

  const openEditModal = (rule) => {

    setActiveRule(rule);
    setShowModal(true);

  };


  // ===================================================
  // SUMMARY
  // ===================================================

  const totalRules =
    pagination.total || 0;

  const activeRules =
    rules.filter(
      (rule) =>
        rule.status === "Active"
    ).length;

  const inactiveRules =
    rules.filter(
      (rule) =>
        rule.status === "Deactive"
    ).length;


  const averageFee =
    rules.length > 0
      ? rules.reduce(
          (sum, rule) =>
            sum +
            Number(rule.price || 0),
          0
        ) / rules.length
      : 0;


  const currentPage =
    pagination.currentPage || 1;

  const totalPages =
    pagination.totalPages || 1;


  return (
    <div className="flex-1 min-w-0 min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        <div>

          <p className="text-xs text-slate-400 mb-1.5">

            Finance

            <span className="mx-2">
              ›
            </span>

            Commercials & Tariffs

            <span className="mx-2">
              ›
            </span>

            <span className="text-blue-600 font-semibold">
              OTB Price Master
            </span>

          </p>


          <div className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                🛫
              </div>

              <div>

                <h1 className="text-2xl font-bold text-slate-900">
                  OTB Price List
                </h1>

                <p className="text-xs text-slate-400 mt-0.5">
                  Manage airline-wise OTB verification pricing
                </p>

              </div>

            </div>


            <span className="bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full">
              {totalRules} Rules
            </span>

          </div>

        </div>


        <button
          onClick={openAddModal}
          disabled={masterLoading}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition disabled:opacity-50"
        >

          <FiPlus size={16} />

          Add

        </button>

      </div>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">


        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <p className="text-[10px] font-bold tracking-wide text-slate-400">
            TOTAL RULES
          </p>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {totalRules}
          </p>

        </div>


        {/* ACTIVE */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <p className="text-[10px] font-bold tracking-wide text-slate-400">
            ACTIVE RULES
          </p>

          <div className="flex items-center gap-2 mt-1">

            <p className="text-xl font-bold text-slate-900">
              {activeRules}
            </p>

            <span className="w-2 h-2 rounded-full bg-emerald-500" />

          </div>

        </div>


        {/* INACTIVE */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <p className="text-[10px] font-bold tracking-wide text-slate-400">
            INACTIVE
          </p>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {inactiveRules}
          </p>

        </div>


        {/* AVERAGE */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <p className="text-[10px] font-bold tracking-wide text-slate-400">
            AVERAGE FEE
          </p>

          <p className="text-xl font-bold text-slate-900 mt-1">
            ₹{averageFee.toFixed(2)}
          </p>

        </div>

      </div>


      {/* =================================================
          SEARCH / FILTER
      ================================================= */}

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5"
      >

        <div className="flex flex-col lg:flex-row gap-3">


          {/* SEARCH */}

          <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition">

            <FiSearch
              className="text-slate-400 flex-shrink-0"
              size={17}
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search airline or country..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
            />

          </div>


          {/* AIRLINE */}

          <div className="relative min-w-[170px]">

            <select
              value={airlineFilter}
              onChange={(e) =>
                setAirlineFilter(
                  e.target.value
                )
              }
              className="appearance-none w-full border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm text-slate-600 outline-none bg-white"
            >

              <option value="">
                All Airlines
              </option>

              {airlines.map(
                (airline) => (
                  <option
                    key={airline._id}
                    value={airline._id}
                  >
                    {airline.name}
                  </option>
                )
              )}

            </select>

            <FiChevronDown
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

          </div>


          {/* COUNTRY */}

          <div className="relative min-w-[170px]">

            <select
              value={countryFilter}
              onChange={(e) =>
                setCountryFilter(
                  e.target.value
                )
              }
              className="appearance-none w-full border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm text-slate-600 outline-none bg-white"
            >

              <option value="">
                All Countries
              </option>

              {countries.map(
                (country) => (
                  <option
                    key={country._id}
                    value={country._id}
                  >
                    {country.countryName}
                  </option>
                )
              )}

            </select>

            <FiChevronDown
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

          </div>


          {/* STATUS */}

          <div className="relative min-w-[140px]">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="appearance-none w-full border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm text-slate-600 outline-none bg-white"
            >

              <option value="">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Deactive">
                Deactive
              </option>

            </select>

            <FiChevronDown
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

          </div>


          {/* SEARCH */}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-60"
          >

            <FiSearch size={15} />

            Search

          </button>


          {/* RESET */}

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition"
          >

            <FiRefreshCw size={14} />

            Reset

          </button>


          <button
            type="button"
            className="hidden xl:flex items-center justify-center border border-slate-200 rounded-xl px-3 text-slate-400"
          >
            <FiGrid size={15} />
          </button>

        </div>

      </form>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">

          <p className="text-xs font-medium text-red-600">
            {error}
          </p>

          <button
            onClick={() =>
              fetchRules(
                currentPage
              )
            }
            className="text-xs font-semibold text-red-600 hover:text-red-800"
          >
            Retry
          </button>

        </div>

      )}


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


        {/* TABLE HEADER */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

          <div>

            <p className="text-sm font-bold text-slate-900">
              OTB Price List
            </p>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Live airline and country pricing records
            </p>

          </div>


          <button
            onClick={() =>
              fetchRules(
                currentPage
              )
            }
            disabled={loading}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
          >

            <FiRefreshCw
              size={15}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

          </button>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[720px]">

            <thead>

              <tr className="bg-slate-50/80 border-b border-slate-200">


                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5 w-[90px]">
                  SL
                </th>


                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5">
                  Airline Name
                </th>


                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5">
                  Country Name
                </th>


                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5">
                  Amount
                </th>


                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5">
                  Status
                </th>


                <th className="text-right text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="py-20 text-center"
                  >

                    <FiLoader
                      size={24}
                      className="text-blue-600 animate-spin mx-auto mb-3"
                    />

                    <p className="text-sm font-semibold text-slate-600">
                      Loading OTB prices...
                    </p>

                  </td>

                </tr>


              ) : rules.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                        <FiTag size={20} />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        No OTB pricing rules found
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Add a new airline-wise OTB price rule.
                      </p>

                    </div>

                  </td>

                </tr>


              ) : (

                rules.map(
                  (rule, index) => {

                    const serialNumber =
                      (currentPage - 1) *
                        pagination.pageSize +
                      index +
                      1;


                    return (

                      <tr
                        key={rule._id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition"
                      >


                        {/* SL */}

                        <td className="px-5 py-4">

                          <span className="text-xs font-semibold text-slate-400">
                            {serialNumber}
                          </span>

                        </td>


                        {/* AIRLINE */}

                        <td className="px-5 py-4">

                          <div>

                            <p className="text-sm font-semibold text-slate-800">
                              {rule.airline?.name ||
                                "—"}
                            </p>

                            {rule.airline?.code && (
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {rule.airline.code}
                              </p>
                            )}

                          </div>

                        </td>


                        {/* COUNTRY */}

                        <td className="px-5 py-4">

                          <span className="text-sm text-slate-600">
                            {rule.country
                              ?.countryName ||
                              "—"}
                          </span>

                        </td>


                        {/* AMOUNT */}

                        <td className="px-5 py-4">

                          <span className="text-sm font-bold text-slate-900">
                            ₹{" "}
                            {Number(
                              rule.price || 0
                            ).toFixed(2)}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                              rule.status ===
                              "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                rule.status ===
                                "Active"
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {rule.status}

                          </span>

                        </td>


                        {/* ACTION */}

                        <td className="px-5 py-4 text-right">

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                rule
                              )
                            }
                            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 inline-flex items-center justify-center transition"
                            title="Edit OTB price"
                          >

                            <FiEdit2
                              size={15}
                            />

                          </button>

                        </td>

                      </tr>

                    );

                  }
                )

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">

          <p className="text-xs text-slate-400">

            {pagination.total > 0
              ? `Showing ${
                  (currentPage - 1) *
                    pagination.pageSize +
                  1
                }–${Math.min(
                  currentPage *
                    pagination.pageSize,
                  pagination.total
                )} of ${
                  pagination.total
                } OTB Pricing Rules`
              : "No OTB pricing rules"}

          </p>


          <div className="flex items-center gap-2">


            <button
              type="button"
              disabled={
                currentPage <= 1 ||
                loading
              }
              onClick={() =>
                fetchRules(
                  currentPage - 1
                )
              }
              className="border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 transition disabled:opacity-40"
            >
              Previous
            </button>


            <div className="min-w-[38px] h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              {currentPage}
            </div>


            <button
              type="button"
              disabled={
                currentPage >=
                  totalPages ||
                loading
              }
              onClick={() =>
                fetchRules(
                  currentPage + 1
                )
              }
              className="border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 transition disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (

        <UpdateTariffModal
          rule={activeRule}
          airlines={airlines}
          countries={countries}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() =>
            fetchRules(
              currentPage
            )
          }
        />

      )}

    </div>
  );
};


export default OTBPricingTariffs;