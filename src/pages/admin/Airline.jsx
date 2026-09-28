import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiEdit2,
  FiX,
  FiUploadCloud,
  FiCheckCircle,
  FiLoader,
  FiRefreshCw,
  FiImage,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

import {
  getAirlines,
  addAirline,
  updateAirline,
  updateAirlineStatus,
} from "../../api/airlineApi";

const SERVER_URL = "https://cliqkar-backend.onrender.com";
//https://cliqkar-backend.onrender.com
const getLogoUrl = (logo) => {
  if (!logo) return "";

  if (
    logo.startsWith("http://") ||
    logo.startsWith("https://") ||
    logo.startsWith("data:")
  ) {
    return logo;
  }

  return `${SERVER_URL}${logo.startsWith("/") ? "" : "/"}${logo}`;
};

// =====================================================
// AIRLINE FORM MODAL
// =====================================================

const AirlineFormModal = ({
  airline,
  onClose,
  onSuccess,
}) => {
  const isEdit = Boolean(airline?._id);

  const [formData, setFormData] = useState({
    name: airline?.name || "",
    code: airline?.code || "",
    logo: null,
    status: airline?.status || "Active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ===================================================
  // HANDLE INPUT
  // ===================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ===================================================
  // HANDLE LOGO
  // ===================================================

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a PNG, JPG, WEBP or SVG image."
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setError("");
  };

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Airline name is required.");
      return;
    }

    if (!formData.code.trim()) {
      setError("Airline IATA code is required.");
      return;
    }

    if (formData.code.trim().length !== 2) {
      setError("IATA code must contain exactly 2 letters.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = new FormData();

      payload.append("name", formData.name.trim());
      payload.append(
        "code",
        formData.code.trim().toUpperCase()
      );
      payload.append("status", formData.status);

      if (formData.logo) {
        payload.append("logo", formData.logo);
      }

      let response;

      if (isEdit) {
        response = await updateAirline(
          airline._id,
          payload
        );
      } else {
        response = await addAirline(payload);
      }

      if (!response?.success) {
        throw new Error(
          response?.message ||
            `Failed to ${
              isEdit ? "update" : "add"
            } airline`
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Airline save error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving airline."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-start gap-3">

              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <TbPlaneDeparture size={22} />
              </div>

              <div>

                <div className="flex items-center gap-2 flex-wrap">

                  <h2 className="text-lg font-bold text-slate-900">
                    {isEdit
                      ? "Edit Airline"
                      : "Add New Airline"}
                  </h2>

                  {isEdit && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded-full">
                      <FiCheckCircle size={10} />
                      {formData.status}
                    </span>
                  )}

                </div>

                <p className="text-xs text-slate-500 mt-1">
                  {isEdit
                    ? "Update airline master information and official branding."
                    : "Add a new airline to the global airline registry."}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
            >
              <FiX size={18} />
            </button>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* =================================================
              AIRLINE INFORMATION
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <TbPlaneDeparture size={15} />
              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Airline Information
                </p>

                <p className="text-[11px] text-slate-400">
                  Basic airline identification details
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* AIRLINE NAME */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Airline Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition">

                  <TbPlaneDeparture
                    size={17}
                    className="text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter airline name"
                    className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-300"
                  />

                </div>

              </div>

              {/* IATA CODE */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  IATA Code
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  maxLength={2}
                  onChange={handleChange}
                  placeholder="e.g. AI"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-700 uppercase outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                />

                <p className="text-[10px] text-slate-400 mt-1.5">
                  2-letter airline identification code
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              LOGO
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FiImage size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Official Logo
                </p>

                <p className="text-[11px] text-slate-400">
                  Upload the official airline logo
                </p>

              </div>

            </div>

            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Airline Logo
            </label>

            <div
              onDrop={(e) => {
                e.preventDefault();
                handleFile(
                  e.dataTransfer.files?.[0]
                );
              }}
              onDragOver={(e) =>
                e.preventDefault()
              }
              className="relative border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-2xl flex flex-col items-center justify-center py-9 text-center bg-slate-50/50 hover:bg-blue-50/30 transition"
            >

              <input
                type="file"
                id="airline-logo"
                className="hidden"
                accept=".png,.jpg,.jpeg,.webp,.svg,image/*"
                onChange={(e) =>
                  handleFile(
                    e.target.files?.[0]
                  )
                }
              />

              <label
                htmlFor="airline-logo"
                className="flex flex-col items-center cursor-pointer w-full"
              >

                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-500 mb-3">
                  <FiUploadCloud size={23} />
                </div>

                <p className="text-xs font-semibold text-slate-600">
                  Click to upload or drag & drop
                </p>

                <p className="text-[10px] text-slate-400 mt-1.5">
                  SVG, PNG, JPG or WEBP
                </p>

              </label>

            </div>

            {/* SELECTED FILE */}

            {formData.logo && (
              <div className="mt-3 flex items-center justify-between gap-3 border border-slate-200 rounded-xl px-3.5 py-3 bg-white">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FiImage size={16} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-semibold text-slate-700 truncate">
                      {formData.logo.name}
                    </p>

                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {Math.round(
                        formData.logo.size / 1024
                      )}{" "}
                      KB
                    </p>

                  </div>

                </div>

                <label
                  htmlFor="airline-logo"
                  className="text-[11px] font-semibold text-blue-600 cursor-pointer hover:text-blue-700 whitespace-nowrap"
                >
                  Replace
                </label>

              </div>
            )}

            {/* EXISTING LOGO */}

            {!formData.logo &&
              airline?.logo && (
                <div className="mt-3 flex items-center gap-3 border border-slate-200 rounded-xl px-3.5 py-3">

                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">

                    <img
                      src={getLogoUrl(airline.logo)}
                      alt={airline.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-slate-700">
                      Current Logo
                    </p>

                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Upload a new file to replace it
                    </p>

                  </div>

                </div>
              )}

          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiCheckCircle size={14} />
              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Operational Status
                </p>

                <p className="text-[11px] text-slate-400">
                  Control airline availability
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-3">

              {/* ACTIVE */}

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    status: "Active",
                  }))
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border transition ${
                  formData.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >

                <span
                  className={`w-2 h-2 rounded-full ${
                    formData.status === "Active"
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
                  setFormData((prev) => ({
                    ...prev,
                    status: "Deactive",
                  }))
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border transition ${
                  formData.status === "Deactive"
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >

                <span
                  className={`w-2 h-2 rounded-full ${
                    formData.status === "Deactive"
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

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-5 border-t border-slate-100">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition disabled:opacity-60"
            >

              {saving ? (
                <>
                  <FiLoader
                    size={14}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  {isEdit
                    ? "Save Changes"
                    : "Add Airline"}
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

// =====================================================
// AIRLINE DIRECTORY
// =====================================================

const AirlineDirectory = () => {

  const [airlines, setAirlines] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });

  const [selectedAirline, setSelectedAirline] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ===================================================
  // FETCH AIRLINES
  // ===================================================

  const fetchAirlines = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAirlines({
        page,
        limit: 10,
        search: filters.search.trim(),
        status: filters.status,
      });

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to fetch airlines"
        );
      }

      setAirlines(response.data || []);

      setPagination(
        response.pagination || {
          total: 0,
          currentPage: page,
          totalPages: 1,
          pageSize: 10,
        }
      );

    } catch (err) {
      console.error(
        "Fetch airlines error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load airlines."
      );

      setAirlines([]);
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchAirlines(1);
  }, []);

  // ===================================================
  // HANDLE FILTER
  // ===================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = (e) => {
    e.preventDefault();

    fetchAirlines(1);
  };

  // ===================================================
  // RESET
  // ===================================================

  const handleReset = () => {
    const resetFilters = {
      search: "",
      status: "",
    };

    setFilters(resetFilters);

    setTimeout(() => {
      fetchAirlines(1);
    }, 0);
  };

  // ===================================================
  // OPEN ADD
  // ===================================================

  const openAddModal = () => {
    setSelectedAirline(null);
    setShowModal(true);
  };

  // ===================================================
  // OPEN EDIT
  // ===================================================

  const openEditModal = (airline) => {
    setSelectedAirline(airline);
    setShowModal(true);
  };

  // ===================================================
  // STATUS TOGGLE
  // ===================================================

  const handleStatusToggle = async (airline) => {
    try {
      const newStatus =
        airline.status === "Active"
          ? "Deactive"
          : "Active";

      const response =
        await updateAirlineStatus(
          airline._id,
          newStatus
        );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to update status"
        );
      }

      setAirlines((prev) =>
        prev.map((item) =>
          item._id === airline._id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update airline status."
      );
    }
  };

  // ===================================================
  // CURRENT PAGE
  // ===================================================

  const currentPage =
    pagination.currentPage || 1;

  const totalPages =
    pagination.totalPages || 1;

  const totalAirlines =
    pagination.total || 0;

  const activeAirlines = airlines.filter(
    (airline) => airline.status === "Active"
  ).length;

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        <div>

          <p className="text-xs text-slate-400 mb-1.5">

            Master Data

            <span className="mx-2">
              ›
            </span>

            Global Aviation

            <span className="mx-2">
              ›
            </span>

            <span className="text-blue-600 font-semibold">
              Airlines Registry
            </span>

          </p>

          <div className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <TbPlaneDeparture size={21} />
              </div>

              <div>

                <h1 className="text-2xl font-bold text-slate-900">
                  Airlines Master Directory
                </h1>

                <p className="text-xs text-slate-400 mt-0.5">
                  Manage global airline master data
                </p>

              </div>

            </div>

            <span className="bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full">
              {totalAirlines} Airlines
            </span>

          </div>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition"
        >
          <FiPlus size={16} />
          Add New Airline
        </button>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 max-w-2xl">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <TbPlaneDeparture size={20} />
          </div>

          <div>

            <p className="text-xs font-medium text-slate-400">
              Total Airlines
            </p>

            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {totalAirlines}
            </p>

          </div>

        </div>

        {/* ACTIVE */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FiCheckCircle size={19} />
          </div>

          <div>

            <p className="text-xs font-medium text-slate-400">
              Active Airlines
            </p>

            <div className="flex items-center gap-2 mt-0.5">

              <p className="text-xl font-bold text-slate-900">
                {activeAirlines}
              </p>

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

            </div>

          </div>

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
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by airline name or IATA code..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
            />

          </div>

          {/* STATUS */}

          <div className="relative flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 min-w-[170px]">

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="appearance-none bg-transparent outline-none text-sm text-slate-600 w-full pr-6 cursor-pointer"
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
              className="absolute right-3.5 text-slate-400 pointer-events-none"
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
            className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >

            <FiRefreshCw size={14} />

            Reset

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
              fetchAirlines(currentPage)
            }
            className="text-xs font-semibold text-red-600 hover:text-red-800"
          >
            Retry
          </button>

        </div>
      )}

      {/* =================================================
          TABLE CARD
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

          <div>

            <p className="text-sm font-bold text-slate-900">
              Airlines Registry
            </p>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Live data from airline master database
            </p>

          </div>

          <button
            onClick={() =>
              fetchAirlines(currentPage)
            }
            disabled={loading}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
            title="Refresh"
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

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[720px]">

            <thead>

              <tr className="bg-slate-50/80 border-b border-slate-200">

                {/* SL */}

                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5 w-[90px]">
                  SL
                </th>

                {/* NAME */}

                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5">
                  Name
                </th>

                {/* CODE */}

                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5 w-[160px]">
                  Code
                </th>

                {/* LOGO */}

                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5 w-[180px]">
                  Logo
                </th>

                {/* ACTION */}

                <th className="text-right text-[11px] font-bold text-slate-500 uppercase tracking-wide px-5 py-3.5 w-[120px]">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <FiLoader
                        size={24}
                        className="text-blue-600 animate-spin mb-3"
                      />

                      <p className="text-sm font-semibold text-slate-600">
                        Loading airlines...
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Fetching latest airline data
                      </p>

                    </div>

                  </td>

                </tr>

              ) : airlines.length === 0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="5"
                    className="py-20 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                        <TbPlaneDeparture size={22} />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        No airlines found
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Try changing your search or filters.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                /* DATA */

                airlines.map((airline, index) => {

                  const serialNumber =
                    (currentPage - 1) *
                      pagination.pageSize +
                    index +
                    1;

                  return (
                    <tr
                      key={airline._id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition"
                    >

                      {/* SL */}

                      <td className="px-5 py-4">

                        <span className="text-xs font-semibold text-slate-400">
                          {serialNumber}
                        </span>

                      </td>

                      {/* NAME */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">

                            {airline.logo ? (
                              <img
                              src={getLogoUrl(airline.logo)}
                              alt={airline.name}
                                className="w-full h-full object-contain p-1.5"
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <TbPlaneDeparture
                                size={18}
                              />
                            )}

                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-800">
                              {airline.name}
                            </p>

                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Airline Partner
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CODE */}

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-lg uppercase">
                          {airline.code}
                        </span>

                      </td>

                      {/* LOGO */}

                      <td className="px-5 py-4">

                        <div className="w-16 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden">

                          {airline.logo ? (

                            <img
                            src={getLogoUrl(airline.logo)}
                            alt={airline.name}
                            className="max-w-full max-h-full object-contain p-1"
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          ) : (

                            <span className="text-[10px] text-slate-400">
                              No Logo
                            </span>

                          )}

                        </div>

                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-2">

                          {/* STATUS */}

                          <button
                            type="button"
                            onClick={() =>
                              handleStatusToggle(
                                airline
                              )
                            }
                            title="Change status"
                            className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-full border transition ${
                              airline.status ===
                              "Active"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                                : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                airline.status ===
                                "Active"
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {airline.status}

                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                airline
                              )
                            }
                            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition"
                            title="Edit airline"
                          >

                            <FiEdit2
                              size={15}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

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
                } airlines`
              : "No airlines to display"}

          </p>

          <div className="flex items-center gap-2">

            {/* PREVIOUS */}

            <button
              type="button"
              disabled={
                currentPage <= 1 ||
                loading
              }
              onClick={() =>
                fetchAirlines(
                  currentPage - 1
                )
              }
              className="flex items-center gap-1.5 border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >

              <FiChevronLeft size={14} />

              Previous

            </button>

            {/* CURRENT PAGE */}

            <div className="min-w-[38px] h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              {currentPage}
            </div>

            {/* NEXT */}

            <button
              type="button"
              disabled={
                currentPage >=
                  totalPages ||
                loading
              }
              onClick={() =>
                fetchAirlines(
                  currentPage + 1
                )
              }
              className="flex items-center gap-1.5 border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >

              Next

              <FiChevronRight size={14} />

            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (
        <AirlineFormModal
          airline={selectedAirline}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() =>
            fetchAirlines(currentPage)
          }
        />
      )}

    </div>
  );
};

export default AirlineDirectory;