
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiX,
  FiSave,
} from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { getAirlines } from "../../api/airlineApi";
import { getAirports } from "../../api/airportApi";

const emptyForm = {
  airlineName: "",
  airlineCode: "",
  flightNumber: "",
  fromCity: "",
  fromAirport: "",
  toCity: "",
  toAirport: "",
  departureDate: "",
  departureTime: "",
  arrivalDate: "",
  arrivalTime: "",
  cabinClass: "Economy",
  adultPrice: "",
  childPrice: "",
  infantPrice: "",
  fare: "",
  baggage: "15 kg",
  cabinBaggage: "7 kg",
  availableSeats: "1",
  refundable: "No",
  status: "Active",
  adminNote: "",
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";

const formatDate = (dateValue) => {
  if (!dateValue) return "—";

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OfflineTicketManagement = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch offline tickets
  const fetchFlights = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get("/admin/offline-tickets", {
        params: {
          search,
          status: statusFilter,
        },
      });

      setFlights(
        Array.isArray(response.data?.data)
          ? response.data.data
          : []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load offline tickets."
      );

      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  // Fetch airlines and airports from existing master APIs
  useEffect(() => {
    let mounted = true;

    const fetchAirlineAndAirportOptions = async () => {
      setCatalogLoading(true);

      try {
        const [airlineResponse, airportResponse] =
          await Promise.all([
            getAirlines({
              page: 1,
              limit: 500,
              status: "Active",
            }),
            getAirports({
              page: 1,
              limit: 500,
              status: "Active",
            }),
          ]);

        if (!mounted) return;

        const airlineData = airlineResponse?.data;
        const airportData = airportResponse?.data;

        setAirlines(
          Array.isArray(airlineData)
            ? airlineData
            : Array.isArray(airlineData?.airlines)
              ? airlineData.airlines
              : []
        );

        setAirports(
          Array.isArray(airportData)
            ? airportData
            : Array.isArray(airportData?.airports)
              ? airportData.airports
              : []
        );
      } catch (error) {
        if (!mounted) return;

        toast.error(
          error.response?.data?.message ||
            "Failed to load airlines and airports."
        );

        setAirlines([]);
        setAirports([]);
      } finally {
        if (mounted) {
          setCatalogLoading(false);
        }
      }
    };

    fetchAirlineAndAirportOptions();

    return () => {
      mounted = false;
    };
  }, []);

  // Ticket statistics
  const counts = useMemo(
    () => ({
      total: flights.length,
      active: flights.filter(
        (flight) => flight.status === "Active"
      ).length,
      inactive: flights.filter(
        (flight) => flight.status === "Inactive"
      ).length,
    }),
    [flights]
  );

  // Handle regular form fields
  const changeField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Select an airline from the existing Airline master data
  const changeAirline = (event) => {
    const selectedAirline = airlines.find(
      (airline) => airline._id === event.target.value
    );

    setForm((current) => ({
      ...current,
      airlineName: selectedAirline?.name || "",
      airlineCode: selectedAirline?.code || "",
    }));
  };

  // Format airport options
  const airportLabel = (airport) =>
    `${airport.airportCode} - ${airport.airportName} (${airport.cityName}, ${airport.countryName})`;

  // Select departure or arrival airport
  const changeAirport = (direction, event) => {
    const selectedAirport = airports.find(
      (airport) =>
        airportLabel(airport) === event.target.value
    );

    const cityField =
      direction === "from" ? "fromCity" : "toCity";

    const airportField =
      direction === "from" ? "fromAirport" : "toAirport";

    setForm((current) => ({
      ...current,
      [cityField]: selectedAirport?.cityName || "",
      [airportField]: selectedAirport
        ? airportLabel(selectedAirport)
        : "",
    }));
  };

  // Open the form for a new ticket
  const startAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  // Open the form for editing an existing ticket
  const startEdit = (flight) => {
    setEditingId(flight._id);

    setForm({
      ...emptyForm,
      ...flight,
      adultPrice: String(
        flight.adultPrice ?? flight.fare ?? ""
      ),
      childPrice: String(flight.childPrice ?? ""),
      infantPrice: String(flight.infantPrice ?? ""),
      fare: String(
        flight.fare ?? flight.adultPrice ?? ""
      ),
      availableSeats: String(
        flight.availableSeats ?? 1
      ),
      refundable: flight.refundable ? "Yes" : "No",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Close and reset the form
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  // Create or update an offline ticket
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      form.fromCity.trim().toLowerCase() ===
      form.toCity.trim().toLowerCase()
    ) {
      toast.error(
        "Departure and destination airports must be different."
      );
      return;
    }

    const payload = {
      ...form,
      adultPrice: Number(form.adultPrice),
      childPrice: Number(form.childPrice),
      infantPrice: Number(form.infantPrice),
      fare: Number(form.adultPrice),
      availableSeats: Number(form.availableSeats),
      refundable: form.refundable === "Yes",
    };

    setSaving(true);

    try {
      if (editingId) {
        await api.put(
          `/admin/offline-tickets/${editingId}`,
          payload
        );

        toast.success(
          "Offline ticket updated successfully."
        );
      } else {
        await api.post(
          "/admin/offline-tickets",
          payload
        );

        toast.success(
          "Offline ticket added successfully."
        );
      }

      closeForm();
      await fetchFlights();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save offline ticket."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete an offline ticket
  const handleDelete = async (flight) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${flight.airlineName} ${flight.flightNumber}?`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/admin/offline-tickets/${flight._id}`
      );

      toast.success(
        "Offline ticket deleted successfully."
      );

      await fetchFlights();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete offline ticket."
      );
    }
  };

  return (
    <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <MdFlight />
              Ticket Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Offline Tickets
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Select airlines and airports from master data
              to create and manage offline flights.
            </p>
          </div>

          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <FiPlus size={17} />
            Add Offline Ticket
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
              Total Records
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {counts.total}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
              Active Tickets
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {counts.active}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
              Inactive Tickets
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-500">
              {counts.inactive}
            </p>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="font-bold text-slate-900">
                  {editingId
                    ? "Edit Offline Ticket"
                    : "Add Offline Ticket"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Fields marked with * are required.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close form"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
              {/* Airline */}
              <div>
                <label className={labelClass}>
                  Airline *
                </label>

                <select
                  className={fieldClass}
                  value={
                    airlines.find(
                      (airline) =>
                        airline.name === form.airlineName &&
                        airline.code === form.airlineCode
                    )?._id || ""
                  }
                  onChange={changeAirline}
                  required
                  disabled={catalogLoading}
                >
                  <option value="">
                    {catalogLoading
                      ? "Loading airlines..."
                      : "Select an airline"}
                  </option>

                  {form.airlineName &&
                    !airlines.some(
                      (airline) =>
                        airline.name === form.airlineName &&
                        airline.code === form.airlineCode
                    ) && (
                      <option value="" disabled>
                        {`${form.airlineName}${
                          form.airlineCode
                            ? ` (${form.airlineCode})`
                            : ""
                        } — not in active airlines`}
                      </option>
                    )}

                  {airlines.map((airline) => (
                    <option
                      key={airline._id}
                      value={airline._id}
                    >
                      {airline.name} ({airline.code})
                    </option>
                  ))}
                </select>

                {!catalogLoading &&
                  airlines.length === 0 && (
                    <p className="mt-1 text-xs text-amber-600">
                      Please add an active airline in the
                      Airlines section first.
                    </p>
                  )}
              </div>

              {/* Airline Code */}
              <div>
                <label className={labelClass}>
                  Airline Code
                </label>

                <input
                  className={`${fieldClass} bg-slate-50`}
                  value={form.airlineCode}
                  readOnly
                  placeholder="Automatically populated from the selected airline"
                />
              </div>

              {/* Flight Number */}
              <div>
                <label className={labelClass}>
                  Flight Number *
                </label>

                <input
                  className={fieldClass}
                  name="flightNumber"
                  value={form.flightNumber}
                  onChange={changeField}
                  placeholder="e.g. 6E-203"
                  required
                />
              </div>

              {/* Departure Airport */}
              <div>
                <label className={labelClass}>
                  From Airport *
                </label>

                <select
                  className={fieldClass}
                  value={form.fromAirport}
                  onChange={(event) =>
                    changeAirport("from", event)
                  }
                  required
                  disabled={catalogLoading}
                >
                  <option value="">
                    {catalogLoading
                      ? "Loading airports..."
                      : "Select departure airport"}
                  </option>

                  {form.fromAirport &&
                    !airports.some(
                      (airport) =>
                        airportLabel(airport) ===
                        form.fromAirport
                    ) && (
                      <option value={form.fromAirport}>
                        {form.fromAirport} (saved record)
                      </option>
                    )}

                  {airports.map((airport) => (
                    <option
                      key={airport._id}
                      value={airportLabel(airport)}
                    >
                      {airportLabel(airport)}
                    </option>
                  ))}
                </select>

                <p className="mt-1 text-xs text-slate-500">
                  City: {form.fromCity || "Select an airport"}
                </p>
              </div>

              {/* Arrival Airport */}
              <div>
                <label className={labelClass}>
                  To Airport *
                </label>

                <select
                  className={fieldClass}
                  value={form.toAirport}
                  onChange={(event) =>
                    changeAirport("to", event)
                  }
                  required
                  disabled={catalogLoading}
                >
                  <option value="">
                    {catalogLoading
                      ? "Loading airports..."
                      : "Select arrival airport"}
                  </option>

                  {form.toAirport &&
                    !airports.some(
                      (airport) =>
                        airportLabel(airport) ===
                        form.toAirport
                    ) && (
                      <option value={form.toAirport}>
                        {form.toAirport} (saved record)
                      </option>
                    )}

                  {airports.map((airport) => (
                    <option
                      key={airport._id}
                      value={airportLabel(airport)}
                    >
                      {airportLabel(airport)}
                    </option>
                  ))}
                </select>

                <p className="mt-1 text-xs text-slate-500">
                  City: {form.toCity || "Select an airport"}
                </p>
              </div>

              {/* Departure Date */}
              <div>
                <label className={labelClass}>
                  Departure Date *
                </label>

                <input
                  className={fieldClass}
                  type="date"
                  name="departureDate"
                  value={form.departureDate}
                  onChange={changeField}
                  required
                />
              </div>

              {/* Departure Time */}
              <div>
                <label className={labelClass}>
                  Departure Time *
                </label>

                <input
                  className={fieldClass}
                  type="time"
                  name="departureTime"
                  value={form.departureTime}
                  onChange={changeField}
                  required
                />
              </div>

              {/* Arrival Date */}
              <div>
                <label className={labelClass}>
                  Arrival Date
                </label>

                <input
                  className={fieldClass}
                  type="date"
                  name="arrivalDate"
                  value={form.arrivalDate}
                  onChange={changeField}
                />
              </div>

              {/* Arrival Time */}
              <div>
                <label className={labelClass}>
                  Arrival Time *
                </label>

                <input
                  className={fieldClass}
                  type="time"
                  name="arrivalTime"
                  value={form.arrivalTime}
                  onChange={changeField}
                  required
                />
              </div>

              {/* Cabin Class */}
              <div>
                <label className={labelClass}>
                  Cabin Class
                </label>

                <select
                  className={fieldClass}
                  name="cabinClass"
                  value={form.cabinClass}
                  onChange={changeField}
                >
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>

              {/* Adult Price */}
              <div>
                <label className={labelClass}>
                  Adult Price (₹) *
                </label>

                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  step="0.01"
                  name="adultPrice"
                  value={form.adultPrice}
                  onChange={changeField}
                  placeholder="e.g. 5500"
                  required
                />
              </div>

              {/* Child Price */}
              <div>
                <label className={labelClass}>
                  Child Price (₹) *
                </label>

                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  step="0.01"
                  name="childPrice"
                  value={form.childPrice}
                  onChange={changeField}
                  placeholder="e.g. 4200"
                  required
                />
              </div>

              {/* Infant Price */}
              <div>
                <label className={labelClass}>
                  Infant Price (₹) *
                </label>

                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  step="0.01"
                  name="infantPrice"
                  value={form.infantPrice}
                  onChange={changeField}
                  placeholder="e.g. 1200"
                  required
                />
              </div>

              {/* Check-in Baggage */}
              <div>
                <label className={labelClass}>
                  Check-in Baggage
                </label>

                <input
                  className={fieldClass}
                  name="baggage"
                  value={form.baggage}
                  onChange={changeField}
                  placeholder="e.g. 15 kg"
                />
              </div>

              {/* Cabin Baggage */}
              <div>
                <label className={labelClass}>
                  Cabin Baggage
                </label>

                <input
                  className={fieldClass}
                  name="cabinBaggage"
                  value={form.cabinBaggage}
                  onChange={changeField}
                  placeholder="e.g. 7 kg"
                />
              </div>

              {/* Available Seats */}
              <div>
                <label className={labelClass}>
                  Available Seats
                </label>

                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  step="1"
                  name="availableSeats"
                  value={form.availableSeats}
                  onChange={changeField}
                  required
                />
              </div>

              {/* Refundable */}
              <div>
                <label className={labelClass}>
                  Refundable
                </label>

                <select
                  className={fieldClass}
                  name="refundable"
                  value={form.refundable}
                  onChange={changeField}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>
                  Status
                </label>

                <select
                  className={fieldClass}
                  name="status"
                  value={form.status}
                  onChange={changeField}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Admin Note */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className={labelClass}>
                  Admin Note
                </label>

                <textarea
                  className={fieldClass}
                  rows="2"
                  name="adminNote"
                  value={form.adminNote}
                  onChange={changeField}
                  placeholder="Enter an optional internal note"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave size={16} />

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Save Offline Ticket"}
              </button>
            </div>
          </form>
        )}

        {/* Saved Tickets */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="font-bold text-slate-900">
                Saved Offline Tickets
              </h2>

             
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  className={`${fieldClass} pl-9 sm:w-64`}
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by flight, airline, or route..."
                />
              </div>

              <select
                className={fieldClass}
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                type="button"
                onClick={fetchFlights}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <FiRefreshCw size={15} />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Loading offline tickets...
            </div>
          ) : flights.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <MdFlight size={22} />
              </div>

              <p className="font-semibold text-slate-800">
                No offline tickets found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Click Add Offline Ticket to create your first
                record.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1750px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    {[
                      "SL",
                      "Airline Name",
                      "From",
                      "To",
                      "Adult Price",
                      "Child Price",
                      "Infant Price",
                      "Seat",
                      "Flight Code",
                      "Check-In Bag",
                      "Cabin Bag",
                      "Departure",
                      "Arrival",
                      "Refundable",
                      "Status",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="whitespace-nowrap px-4 py-3 font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {flights.map((flight, index) => (
                    <tr
                      key={flight._id}
                      className="align-top hover:bg-slate-50/70"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {flight.airlineName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {flight.airlineCode || "—"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-800">
                          {flight.fromCity || "—"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {flight.fromAirport || "—"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-800">
                          {flight.toCity || "—"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {flight.toAirport || "—"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-900">
                        ₹
                        {Number(
                          flight.adultPrice ?? flight.fare ?? 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                        ₹
                        {Number(
                          flight.childPrice ?? 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                        ₹
                        {Number(
                          flight.infantPrice ?? 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {flight.availableSeats ?? 0}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">
                        {flight.flightNumber || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                        {flight.baggage || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                        {flight.cabinBaggage || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <p className="text-slate-800">
                          {formatDate(flight.departureDate)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {flight.departureTime || "—"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <p className="text-slate-800">
                          {formatDate(
                            flight.arrivalDate ||
                              flight.departureDate
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {flight.arrivalTime || "—"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            flight.refundable
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {flight.refundable ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            flight.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {flight.status || "Active"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(flight)}
                            title="Edit"
                            aria-label="Edit offline ticket"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <FiEdit2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(flight)}
                            title="Delete"
                            aria-label="Delete offline ticket"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default OfflineTicketManagement;
